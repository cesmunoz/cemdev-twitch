import { fastifyAwilixPlugin, diContainer } from "fastify-awilix";
import fastify from "fastify";
import { asClass, asFunction, Lifetime } from "awilix";
import { HelloWorldController } from "./controllers/HelloWorldController";
import { HelloWorldRepository } from "./repositories/HelloWorldRepository";

const server = fastify({ logger: true });
server.register(fastifyAwilixPlugin, {
  disposeOnClose: true,
  disposeOnResponse: true
});

diContainer.register({
  helloWorldController: asClass(HelloWorldController),
  helloWorldRepository: asClass(HelloWorldRepository)
});

server.get("/", async (request, reply) => {
  return { hello: "world!" };
});

server.get("/keep-alive", (req, reply) => {
  return (
    server.diContainer.resolve("helloWorldController") as HelloWorldController
  ).get(req, reply);
});

const start = async () => {
  try {
    await server.listen(3001);
  } catch (err) {
    server.log.error(err);
    // process.exit(1);
  }
};

start();
