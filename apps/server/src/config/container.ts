import { asClass } from "awilix";
import { diContainer } from "fastify-awilix";
import { HelloWorldController } from "../controllers/HelloWorldController";
import { HelloWorldRepository } from "../repositories/HelloWorldRepository";

export const registerContainer = () =>
  diContainer.register({
    helloWorldController: asClass(HelloWorldController),
    helloWorldRepository: asClass(HelloWorldRepository),
  });
