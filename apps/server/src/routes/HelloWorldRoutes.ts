import { HelloWorldController } from "../controllers/HelloWorldController";

const HelloWorldRoutes = (server:any, options:any, done:any) => {
  
  const controller = server.diContainer.resolve("helloWorldController") as HelloWorldController;
  
  server.get('/hello', (req:any, res:any) => {
    controller.get(req, res);
  });

  done();
}

export default HelloWorldRoutes;
