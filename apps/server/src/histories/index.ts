import {
  FastifyInstance,
  FastifyPluginOptions,
} from 'fastify';
import { get } from './controller';

export default async function (
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
) {
  fastify.get('/', get);
}
