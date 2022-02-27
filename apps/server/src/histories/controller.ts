import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export async function get(this: FastifyInstance) {
  return this.historyService.get();
}
