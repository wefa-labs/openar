import { FastifyInstance } from "fastify";

import deckController from "./controllers/deck";
import plantsController from "./controllers/plants";
import creaturesController from "./controllers/creatures";
import identityController from "./controllers/identity";

export async function router(fastify: FastifyInstance) {
  fastify.register(deckController, { prefix: "/deck" });
  fastify.register(plantsController, { prefix: "/plants" });
  fastify.register(creaturesController, { prefix: "/creatures" });
  fastify.register(identityController, { prefix: "/identity" });
}
