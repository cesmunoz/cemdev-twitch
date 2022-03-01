import Redis from 'ioredis';

const { REDIS_URL } = process.env;

const client = new Redis(REDIS_URL);

export default {
  set: (key, value) => client.set(key, value),
  get: (key) => client.get(key),
  delete: (key) => client.del(key),
  setWithExp: (key, value, exp) => client.set(key, value, 'EX', exp),
};
