import { fastifyAwilixPlugin } from "fastify-awilix";
import fastify from "fastify";
import {registerContainer} from "./config/container";
import { HelloWorldController } from "./controllers/HelloWorldController";

import routes from './routes';

const server = fastify({ logger: true });
server.register(fastifyAwilixPlugin, {
  disposeOnClose: true,
  disposeOnResponse: true,
});

registerContainer();

routes.forEach((route:any) => {
  server.register(route);
})

server.get("/", async () => ({ hello: "world!" }));
server.get("/keep-alive", (req, res) => (server.diContainer.resolve("helloWorldController") as HelloWorldController).get(req, res));


const start = async () => {
  try {
    await server.listen(3001);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
