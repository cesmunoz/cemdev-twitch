import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import { get } from "./controller";

const ROUTE = "/home";
export default async function (
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
  done: (err?: FastifyError) => void,
) {
  fastify.get(ROUTE, get);
  done();
}
