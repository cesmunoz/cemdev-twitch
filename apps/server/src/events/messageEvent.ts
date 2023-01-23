import KSUID from 'ksuid';
import { ChatUserstate, Client } from 'tmi.js';
import { PARTITION_KEYS, REDIS_KEYS } from '../constants';
import { Redis, DynamoDb } from '../utils';

const REGEXP_COMMAND = /\{(.*)\}/;

const HELP_COMMANDS = ["!help", "!comandos", "!ayuda"];

// TODO: better handler commands
/*
!uptime
!setup
!horarios
*/

// const commandHandlers: TwitchHandleCommand = {
//   '!dice': handleDice,
// };
// const handleDice = () => {
//   const sides = 6;
//   const result = Math.floor(Math.random() * sides) + 1;
//   return `You rolled a ${result}`;
// };

type CommandType = {
  PK: string;
  SK: string;
  command: string;
  value: string;
};

const DAY_IN_SECONDS = 86400;

const getCommands = async () => {
  const items = await Redis.get(REDIS_KEYS.COMMANDS);

  if (items) {
    return JSON.parse(items);
  }

  const { Items } = await DynamoDb.query({
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ":pk": 'COMMANDS',
    },
  });

  await Redis.setWithExp(
    REDIS_KEYS.COMMANDS,
    JSON.stringify(Items),
    DAY_IN_SECONDS,
  );

  return Items;
};

const saveRequest = async (context: any, message: string) => {
  const ksuidSync = KSUID.randomSync().string;

  const { username } = context;

  const model = {
    PK: PARTITION_KEYS.REQUESTS,
    SK: `#${username}#${ksuidSync}`,
    id: ksuidSync,
    username,
    checked: false,
    value: message.replace('!request', '').trim()
  };

  await DynamoDb.insert(model);

  await Redis.delete(REDIS_KEYS.REQUESTS);
}

const registerEvent = (client: Client) => {
  const handler = async (
    target: string,
    context: ChatUserstate,
    msg: string,
    self: boolean,
  ) => {
    if (self) {
      // Ignore messages from the bot
      return;
    }

    const commandName = msg.trim().split(' ')[0];
    if (!commandName.startsWith('!')) {
      return;
    }

    const commandItems: Array<CommandType> = await getCommands();

    if (HELP_COMMANDS.includes(commandName)) {
      const helpMessage = commandItems
        .map((item: CommandType) => item.command)
        .join(' || ');
      return client.say(
        target,
        `Los commandos habilitados son: ${helpMessage}`,
      );
    }

    if (commandName === '!request') {
      saveRequest(context, msg);
      return client.say(
        target,
        `La peticion ha sido guardada con exito!`,
      );
    }

    const command = commandItems.find(
      (item: CommandType) => item.command === commandName,
    );

    if (!command) {
      console.log(`* Unknown command ${commandName}`);
      // TODO: Register possible future command
      return;
    }

    const matches: RegExpMatchArray | null =
      command.value.match(REGEXP_COMMAND);

    if (!matches) {
      return client.say(target, command.value);
    }

    const [commandKeyTemplate, commandKeyValue] = matches;
    const message = command.value.replace(
      commandKeyTemplate,
      context[commandKeyValue],
    );
    client.say(target, message);
  };

  client.on('message', handler);
};

export default registerEvent;
