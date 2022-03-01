import { FastifyInstance } from 'fastify';

export async function get(this: FastifyInstance) {
  return this.historyService.get();
}
