import { FastifyInstance } from 'fastify';
import { post } from './controller';

export default async function (fastify: FastifyInstance) {
  fastify.post('/callback', post);
}
