import HomeService from '../home/service';

async function registerContainer(fastify:any, options:any, done:any) {

  const homeService = new HomeService(1);
  fastify.decorate('homeService', homeService);

  done();
}

export default registerContainer;
