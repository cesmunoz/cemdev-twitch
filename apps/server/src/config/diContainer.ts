import { FastifyError, FastifyInstance, FastifyPluginOptions } from 'fastify';
import HomeService from '../home/service';
import HistoryService from '../histories/service';

declare module 'fastify' {
  interface FastifyInstance {
    homeService: HomeService;
    historyService: HistoryService;
  }
}

async function registerContainer(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
  done: (err?: FastifyError) => void,
) {
  const homeService = new HomeService({});
  fastify.decorate('homeService', homeService);

  const historyService = new HistoryService({});
  fastify.decorate('historyService', historyService);

  done();
}

export default registerContainer;
