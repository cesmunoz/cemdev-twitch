import type { NextApiRequest, NextApiResponse } from 'next'
import { PARTITION_KEYS, REDIS_KEYS } from '../../../../client/src/constants';
import DynamoDb from 'dynamoIO';
import Redis from 'redisIO';

const DAY_IN_SECONDS = 86400;

type Data = {
  command: string;
  value: string;
}

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

type Commands = {
  PK: string;
  SK: string;
  command: string;
  value: string;
};

type CommandsResponse = Omit<Commands, 'PK' | 'SK'>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  const items: CommandsResponse[] = await getCommands();
  const response = items.map(
    ({ command, value }) => ({
      command,
      value,
    }),
  );
  res.status(200).json(response);
}
