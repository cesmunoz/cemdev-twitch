import { Handler } from '@netlify/functions';
import { PARTITION_KEYS, REDIS_KEYS } from './constants';
import { DynamoDb, Redis } from './utils';

const DAY_IN_SECONDS = 86400;
const getCommands = async () => {
  const items = await Redis.get(REDIS_KEYS.COMMANDS);
  if (items) {
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

const handler: Handler = async () => {
  const items = await getCommands();
  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};

// eslint-disable-next-line import/prefer-default-export
export { handler };
