// import fs from "fs";
import dotenv from "dotenv";
// import Redis from "ioredis";
import RedisStore from "connect-redis";
import session, { SessionStore } from "@fastify/session";

dotenv.config();

import { router } from "./router";
import { server } from "./server";
// import path from "path";

const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined;
const host = IS_GOOGLE_CLOUD_RUN ? "0.0.0.0" : undefined;
const port = Number(process.env.PORT) || 3008;

// const redis = new Redis({
//   port: 6379,
//   username: "",
//   host: process.env.REDIS_HOST,
//   password: process.env.REDIS_PASSWORD,
//   tls: {
//     ca: [fs.readFileSync(path.join(__dirname, "../cert/sg-wefa-cache.cert"), "ascii")],
//   },
//   connectTimeout: 20000,
//   // family: 6,
// });

// Middleware
// server.register(require("@fastify/redis"), { client: redis, host: process.env.REDIS_HOST });
server.register(require("@fastify/cors"), { origin: "*" }); // Adjust the "origin" option as needed
server.register(require("@fastify/helmet"));
server.register(require("@fastify/sensible"));
server.register(require("@fastify/cookie"));
server.register(session, {
  secret: `${process.env.SESSION_SECRET ?? "issa a secret with minimum length of 32 characters"}}`,
  saveUninitialized: true,
  cookieName: "wefa_cookie",
  cookie: {
    maxAge: 86400000, // 1 day
    httpOnly: true,
  },
  // store: new RedisStore({
  //   client: redis,
  //   prefix: "wefa:",
  // }) as SessionStore,
});
server.register(require("@fastify/multipart"));

// Router
server.register(router);

server.get("/status", async function (_req, reply) {
  reply.send({ status: "ok" });
});

server.listen({ port, host });

export default server;

console.log(`🚀  Fastify server running at https://localhost:${port}/status`);
