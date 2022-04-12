import { Handler } from '@netlify/functions';
import { PARTITION_KEYS } from './constants';
import DynamoDb from './utils/DynamoDb';

const handler: Handler = async () => {
  const { Items } = await DynamoDb.query({
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': PARTITION_KEYS.HISTORIES,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify(Items),
  };
};

export default { handler };
