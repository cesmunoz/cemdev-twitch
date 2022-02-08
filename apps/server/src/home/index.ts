import { get } from './controller'; 

const ROUTE = "/home"
export default async function (fastify: any, options: any, done: any) {
  fastify.get(ROUTE, get);
  done();
}
