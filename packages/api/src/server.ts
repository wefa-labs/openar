import fs from "fs";
import path from "path";
import fastify from "fastify";
import { FastifyRedis } from "@fastify/redis";

import { Identifier, Wefadex } from "@prisma/client";

declare module "fastify" {
  export interface Session {
    // username: string | null;
    identifier?: Identifier;
    decks: Record<string, Wefadex>;
    nonce?: string;
    currentChallenge?: string;
  }

  export interface FastifyInstance {
    redis: FastifyRedis;
  }

  // export interface FastifyRequest {
  //   file?: Multipart
  // }
}

const useHttps = process.env.NODE_ENV === "development";

const httpsOptions = {
  http2: useHttps,
  https: useHttps
    ? {
        allowHTTP1: true,
        key: fs.readFileSync(path.join(__dirname, "../cert/fastify.key")),
        cert: fs.readFileSync(path.join(__dirname, "../cert/fastify.cert")),
      }
    : undefined,
};

export const server = fastify({
  trustProxy: true,
  bodyLimit: 1048576 * 7,
  logger: !!(process.env.NODE_ENV !== "development"),
  ...httpsOptions,
});
