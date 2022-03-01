import { Handler } from '@netlify/functions';
import { PARTITION_KEYS, REDIS_KEYS } from './constants';
import { Redis, DynamoDb } from './utils';

const handler: Handler = async (event, context) => {
  const { command, value } = JSON.parse(event.body);

  const model = {
    PK: PARTITION_KEYS.COMMANDS,
    SK: command,
    command,
    value,
  };
  const result: any = await DynamoDb.insert(model);
  const response = result?.Item || model;

  delete model.PK;
  delete model.SK;

  await Redis.delete(REDIS_KEYS.COMMANDS);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

// eslint-disable-next-line import/prefer-default-export
export { handler };
