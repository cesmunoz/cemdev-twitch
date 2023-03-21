import KSUID from 'ksuid';
import { ChatUserstate, Client } from 'tmi.js';
import { PARTITION_KEYS, REDIS_KEYS } from '../constants';
import Redis from 'redisIO';
import Dynamo from 'dynamoIO';

let twitchClient: Client;
let commands: Array<CommandType> = [];
const REGEXP_COMMAND = /\{(.*)\}/;
const HELP_COMMANDS = ["!help", "!comandos", "!ayuda"];
const DAY_IN_SECONDS = 86400;

type CommandType = {
  PK: string;
  SK: string;
  command: string;
  value: string;
};

// TODO: Missing commands
/*
!uptime
!setup
!horarios
*/


const getCommands = async () => {
  const items = await Redis.get(REDIS_KEYS.COMMANDS);

  if (items) {
    return JSON.parse(items);
  }

  const { Items } = await Dynamo.query({
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

  await Dynamo.insert(model);

  await Redis.delete(REDIS_KEYS.REQUESTS);
}

const say = async (target: string, message: string) => twitchClient.say(target, message);


const handler = async (
  target: string,
  context: ChatUserstate,
  msg: string,
  self: boolean,
) => {
  if (self) {
    return;
  }

  const commandName = msg.trim().split(' ')[0];
  if (!commandName.startsWith('!')) {
    return;
  }

  if (HELP_COMMANDS.includes(commandName)) {
    const helpMessage = commands.map((item) => item.command).join(' || ');
    say(target, `Los commandos habilitados son: ${helpMessage}`);
    return;
  }

  if (commandName === '!request') {
    saveRequest(context, msg);
    say(target, "La peticion ha sido guardada con exito!");
    return;
  }

  const command = commands.find((item) => item.command === commandName);

  if (!command) {
    console.log(`* Unknown command ${commandName}`);
    // TODO: Register possible future command
    return;
  }

  const matches = command.value.match(REGEXP_COMMAND);
  if (!matches) {
    say(target, command.value);
    return;
  }

  const [commandKeyTemplate, commandKeyValue] = matches;
  const message = command.value.replace(
    commandKeyTemplate,
    context[commandKeyValue],
  );
  say(target, message);
};

export const messageEvent = async (client: Client) => {
  twitchClient = client;
  commands = await getCommands();
  client.on('message', handler)
};