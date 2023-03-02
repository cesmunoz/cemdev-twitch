import Redis, { RedisKey, RedisValue } from 'ioredis';


import dotenv from 'dotenv';

dotenv.config();
const { REDIS_URL } = process.env;

type ExpirationType = number | string;

const client = new Redis(REDIS_URL as string);

export default {
  set: (key: RedisKey, value: RedisValue) => client.set(key, value),
  get: (key: RedisKey) => client.get(key),
  delete: (key: RedisKey) => client.del(key),
  setWithExp: (key: RedisKey, value: RedisValue, exp: ExpirationType) =>
    client.set(key, value, 'EX', exp),
};
