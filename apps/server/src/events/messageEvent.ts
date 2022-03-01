import { ChatUserstate, Client } from 'tmi.js';
import { PARTITION_KEYS, REDIS_KEYS } from '../constants';
import { Redis, DynamoDb } from '../utils';

const REGEXP_COMMAND = /\{(.*)\}/;

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
    console.log('RETRIEVE FROM CACHE');
    return JSON.parse(items);
  }

  const { Items } = await DynamoDb.query({
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': PARTITION_KEYS.COMMANDS,
    },
  });

  await Redis.setWithExp(
    REDIS_KEYS.COMMANDS,
    JSON.stringify(Items),
    DAY_IN_SECONDS,
  );

  return Items;
};

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

    if (commandName === '!help') {
      const helpMessage = commandItems
        .map((item: CommandType) => item.command)
        .join(' || ');
      return client.say(
        target,
        `Los commandos habilitados son: ${helpMessage}`,
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
