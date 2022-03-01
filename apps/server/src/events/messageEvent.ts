import { Client } from 'tmi.js';
import { PARTITION_KEYS } from '../../constants';
import DynamoDb from '../utils/DynamoDb';

const REGEXP_COMMAND = /\{(.*)\}/;

const handleDice = () => {
  const sides = 6;
  const result = Math.floor(Math.random() * sides) + 1;
  return `You rolled a ${result}`;
};

type TwitchHandleCommand = {
  [key: string]: (_arg: any, user: any) => string;
};

const commandHandlers: TwitchHandleCommand = {
  '!dice': handleDice,
  // "!uptime": handleUptime,
  // "!setup": handleSetups,
  // "!horarios": handleSchedule,
};
// TODO: better handler commands
/*
!uptime
!setup
!horarios
*/

const registerEvent = (client: Client) => {
  const handler = async (target: any, context: any, msg: any, self: any) => {
    if (self) {
      // Ignore messages from the bot
      return;
    }

    const commandName = msg.trim().split(' ')[0];
    if (!commandName.startsWith('!')) {
      return;
    }

    const { Items }: any = await DynamoDb.query({
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': PARTITION_KEYS.COMMANDS,
      },
    });

    if (commandName === '!help') {
      const helpMessage = Items.map((item: any) => item.command).join(' || ');
      return client.say(
        target,
        `Los commandos habilitados son: ${helpMessage}`,
      );
    }

    const command = Items.find((item: any) => item.command === commandName);

    if (!command) {
      console.log(`* Unknown command ${commandName}`);
      // TODO: Register possible future command
      return;
    }

    const matches: any = command.value.match(REGEXP_COMMAND);

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
