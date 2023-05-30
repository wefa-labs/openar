import { generateNonce, SiweMessage } from "siwe";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default async function userController(fastify: FastifyInstance) {
  fastify.get("/", async function (req: FastifyRequest, reply: FastifyReply) {
    reply.send({
      identifier: req.session.identifier,
      decks: req.session.decks,
    });
  });

  // Returns the current user by checking the session returning 200 if the user is logged in and 401 if not
  fastify.get("/nonce", async function (req: FastifyRequest, reply: FastifyReply) {
    req.session.nonce = generateNonce();
    reply.send({ nonce: req.session.nonce });
  });

  // Returns the current user by checking the session returning 200 if the user is logged in and 401 if not
  fastify.post("/login", async function (req: FastifyRequest, reply: FastifyReply) {
    const body = req.body as { message: string; signature: string };

    try {
      const siweMessage = new SiweMessage(body.message);
      const fields = await siweMessage.validate(body.signature);

      if (fields.nonce !== req.session.nonce) {
        reply.status(422).send({ error: "Invalid nonce." });
        return;
      }

      req.session.nonce = undefined;
      req.session.identifier = {
        id: fields.address,
        type: "ETHER",
      };

      reply.send({ identifier: req.session.identifier });
    } catch (error) {
      const _error = error as Error;
      console.error(_error);
      return reply.status(400).send({ error: _error.message });
    }
  });

  fastify.post("/logout", async function (req: FastifyRequest, reply: FastifyReply) {
    // req.session.username = null;
    req.session.identifier = undefined;
    req.session.decks = {};
    req.session.nonce = undefined;
    req.session.currentChallenge = undefined;

    req.session.destroy();

    reply.send({ success: true });
  });
}