import { FastifyInstance } from 'fastify';
import { get, post } from './controller';

export default async function (fastify: FastifyInstance) {
  fastify.get('/', get);
  fastify.post('/', post);
}
