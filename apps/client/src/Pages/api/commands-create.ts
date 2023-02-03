import type { NextApiRequest, NextApiResponse } from 'next'
import { PARTITION_KEYS, REDIS_KEYS } from '../../constants';
import DynamoDb from 'dynamoIO';
import Redis from 'redisIO';

type Data = {
  command: string;
  value: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { command, value } = req.body;
  await DynamoDb.insert({
    PK: PARTITION_KEYS.COMMANDS,
    SK: req.body.command,
    command,
    value,
  });

  await Redis.delete(REDIS_KEYS.COMMANDS);
  res.status(201).json({ command: 'test', value: 'test' })
};
