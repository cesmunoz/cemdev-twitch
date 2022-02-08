import fastify from "fastify";
import fp from 'fastify-plugin';
import homeRoutes from './home';
import registerContainer from "./config/diContainer";

const server = fastify({ logger: true });

server.get("/", async () => ({ hello: "world!" }));
server.get("/ping", async (req, reply) => reply.send('pong'));

server.register(fp(registerContainer));
server.register(homeRoutes);

const start = async () => {
  try {
    await server.listen(3001);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
