import type { NextApiRequest, NextApiResponse } from 'next'
import { PARTITION_KEYS, REDIS_KEYS } from '../../../../client/src/constants';
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
  await DynamoDb.update({
    Key: {
      PK: PARTITION_KEYS.COMMANDS,
      SK: command,
    },
    UpdateExpression: 'set #value = :value',
    ExpressionAttributeNames: {
      '#value': 'value',
    },
    ExpressionAttributeValues: {
      ':value': value,
    },
  });

  await Redis.delete(REDIS_KEYS.COMMANDS);
  res.status(200).json({ command, value })
};
