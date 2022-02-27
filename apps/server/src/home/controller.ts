import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export async function get(this: FastifyInstance) {
  return this.homeService.get();
}

export async function post(
  this: FastifyInstance,
  req: FastifyRequest,
  _res: FastifyReply,
) {
  console.log(req.body);
  return this.homeService.post();
}
