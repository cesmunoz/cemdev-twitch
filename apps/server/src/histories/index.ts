import { FastifyInstance } from 'fastify';
import { get } from './controller';

export default async function (fastify: FastifyInstance) {
  fastify.get('/', get);
}
