import Redis, { KeyType, ValueType } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();
const { REDIS_URL } = process.env;

type ExpirationType = number | string;

const client = new Redis(REDIS_URL);

export default {
  set: (key: KeyType, value: ValueType) => client.set(key, value),
  get: (key: KeyType) => client.get(key),
  delete: (key: KeyType) => client.del(key),
  setWithExp: (key: KeyType, value: ValueType, exp: ExpirationType) =>
    client.set(key, value, 'EX', exp),
};
