import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import HomeService from "../home/service";

async function registerContainer(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
  done: (err?: FastifyError) => void,
) {
  const homeService = new HomeService(1);
  fastify.decorate("homeService", homeService);

  done();
}

export default registerContainer;
