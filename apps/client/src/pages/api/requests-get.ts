import type { NextApiRequest, NextApiResponse } from 'next'
import { PARTITION_KEYS, REDIS_KEYS } from '../../../../client/src/constants';
import DynamoDb from 'dynamoIO';
import Redis from 'redisIO';

const DAY_IN_SECONDS = 86400;

type Data = {
  id: string;
  username: string;
  value: string;
}

const getRequests = async () => {
  const items = await Redis.get(REDIS_KEYS.REQUESTS);
  if (items) {
    return JSON.parse(items);
  }

  const { Items } = await DynamoDb.query({
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': PARTITION_KEYS.REQUESTS,
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
  username: string;
  value: string;
};

type CommandsResponse = Omit<Requests, 'PK'>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  const items: CommandsResponse[] = await getRequests();
  const response = items.map(
    ({ SK, username, value }) => ({
      id: SK,
      username,
      value,
    }),
  );
  res.status(200).json(response);
}
