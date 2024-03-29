import fastify from 'fastify';
import fp from 'fastify-plugin';
// import fc from 'fastify-cors';
import dotenv from 'dotenv';
import registerContainer from './config/diContainer';
import homeRoutes from './home';
import historyRoutes from './histories';
import webhooks from './webhooks';
import { connect } from './twitchBot';

dotenv.config();
const PORT = process.env.PORT || 8080;

const server = fastify({ logger: true });

// server.register(fc, {
//   origin: '*',
// });

// server.get('/', async () => ({ hello: 'world!' }));
// server.get('/ping', async (_req, reply) => reply.send('pong'));

// server.register(fp(registerContainer));
// server.register(homeRoutes, { prefix: '/home' });
// server.register(webhooks, { prefix: '/webhooks' });
// server.register(historyRoutes, { prefix: '/histories' });

const start = async () => {
  try {
    connect();
    await server.listen(PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
