import { Handler } from '@netlify/functions';
import { PARTITION_KEYS, REDIS_KEYS } from './constants';
import { Redis, DynamoDb } from './utils';

const handler: Handler = async (event) => {
  const { command } = event.queryStringParameters;

  const params = {
    Key: {
      PK: PARTITION_KEYS.COMMANDS,
      SK: command,
    },
  };

  await DynamoDb.delete(params);
  await Redis.delete(REDIS_KEYS.COMMANDS);

  return {
    statusCode: 200,
  };
};

// eslint-disable-next-line import/prefer-default-export
export { handler };
