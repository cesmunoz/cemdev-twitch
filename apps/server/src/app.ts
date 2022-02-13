import fastify from "fastify";
import fp from "fastify-plugin";
import dotenv from "dotenv";
import registerContainer from "./config/diContainer";
import homeRoutes from "./home";
import twitchBot from "./twitchBot";

dotenv.config();
const PORT = process.env.PORT || 3001;

const server = fastify({ logger: true });

server.get("/", async () => ({ hello: "world!" }));
server.get("/ping", async (_req, reply) => reply.send("pong"));

server.register(fp(registerContainer));
server.register(homeRoutes, { prefix: "/home" });

const start = async () => {
  try {
    twitchBot.connect();
    await server.listen(PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
