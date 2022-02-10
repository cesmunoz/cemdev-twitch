import fastify from "fastify";
import fp from "fastify-plugin";
import dotenv from "dotenv";
import homeRoutes from "./home";
import registerContainer from "./config/diContainer";
import getTwitchBotClient from "./twitchBot";
import registerTwitchEvents from "./events";

dotenv.config();
const PORT = process.env.PORT || 3001;

const server = fastify({ logger: true });

server.get("/", async () => ({ hello: "world!" }));
server.get("/ping", async (_req, reply) => reply.send("pong"));

server.register(fp(registerContainer));
server.register(homeRoutes);

const start = async () => {
  try {
    const twitchClient = getTwitchBotClient();
    registerTwitchEvents(twitchClient);
    await twitchClient.connect();

    await server.listen(PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
