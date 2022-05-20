import { Handler } from '@netlify/functions';
import { PARTITION_KEYS, REDIS_KEYS } from './constants';
import { DynamoDb, Redis } from './utils';

const DAY_IN_SECONDS = 86400;
const getRequests = async () => {
  const items = await Redis.get(REDIS_KEYS.REQUESTS);
  if (items) {
    return JSON.parse(items);
  }

  const { Items } = await DynamoDb.query({
    KeyConditionExpression:
      'PK = :pk and begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': PARTITION_KEYS.REQUESTS,
      ':sk': '#',
    },
  });

  await Redis.setWithExp(
    REDIS_KEYS.REQUESTS,
    JSON.stringify(Items),
    DAY_IN_SECONDS,
  );

  return Items;
};

type Requests = {
  PK: string;
  SK: string;
  id: string;
  username: string;
  value: string;
  checked: boolean;
};

type RequestsResponse = Omit<Requests, 'PK' | 'SK'>;

const handler: Handler = async () => {
  const items: RequestsResponse[] = await getRequests();
  const response = items.map(
    ({
      id, username, value, checked,
    }) => ({
      id,
      username,
      value,
      checked,
    }),
  );
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

// eslint-disable-next-line import/prefer-default-export
export { handler };
