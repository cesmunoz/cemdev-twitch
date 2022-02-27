import { Handler } from '@netlify/functions';
import { PARTITION_KEYS } from './constants';
import DynamoDb from './utils/DynamoDb';

const handler: Handler = async (_event, _context) => {
  const { Items } = await DynamoDb.query({
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': PARTITION_KEYS.COMMANDS,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify(Items),
  };
};

// eslint-disable-next-line import/prefer-default-export
export { handler };
