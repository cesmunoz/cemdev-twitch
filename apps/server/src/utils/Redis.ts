import Redis from 'ioredis';
import dotenv from 'dotenv';


dotenv.config();
const { REDIS_URL } = process.env;

const client = new Redis(REDIS_URL);

export default {
  set: (key: any, value: any) => client.set(key, value),
  get: (key: any) => client.get(key),
  delete: (key: any) => client.del(key),
  setWithExp: (key: any, value: any, exp: any) => client.set(key, value, 'EX', exp),
};
