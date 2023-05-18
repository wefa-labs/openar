import { FastifyInstance } from "fastify";

import authController from "./controllers/auth";

export async function router(fastify: FastifyInstance) {
  fastify.register(authController, { prefix: "/auth" });
}
