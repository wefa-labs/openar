import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
  VerifyRegistrationResponseOpts,
  VerifiedRegistrationResponse,
  VerifiedAuthenticationResponse,
} from "@simplewebauthn/server";
// import {
//   isoUint8Array,
//   isoBase64URL,
//   decodeCredentialPublicKey,
//   decodeClientDataJSON,
// } from "@simplewebauthn/server/helpers";
import base64url from "base64url";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { AuthenticationResponseJSON, RegistrationResponseJSON } from "@simplewebauthn/typescript-types";

import { prisma } from "../modules/prisma";

const { RP_ID = "localhost" } = process.env;

export const rpID = RP_ID;
export const rpName = "WEFA RP";
export let expectedOrigin = process.env.NODE_ENV === "development" ? "https://localhost:3008" : "https://api.wefa.app";

export default async function userController(fastify: FastifyInstance) {
  // Returns WebAuth Register Options
  fastify.post("/register-options", async function (req: FastifyRequest, reply: FastifyReply) {
    const { name } = req.body as { name: string };

    const options = generateRegistrationOptions({
      rpID,
      rpName,
      userID: req.session.sessionId,
      userName: name,
      // timeout: 60000,
      attestationType: "none",
      authenticatorSelection: {
        residentKey: "required",
        userVerification: "preferred",
      },
      supportedAlgorithmIDs: [-7, -257],
    });

    req.session.currentChallenge = options.challenge;

    reply.send(options);
  });

  // User register WebAuth credential
  fastify.post("/register", async function (req: FastifyRequest, reply: FastifyReply) {
    const body = req.body as RegistrationResponseJSON;

    let verification: VerifiedRegistrationResponse;

    console.log("Registering device", body);

    try {
      const opts: VerifyRegistrationResponseOpts = {
        response: body,
        expectedChallenge: `${req.session.currentChallenge}`,
        expectedOrigin,
        expectedRPID: rpID,
        requireUserVerification: true,
      };
      verification = await verifyRegistrationResponse(opts);
    } catch (error) {
      const _error = error as Error;
      console.error(_error);

      return reply.status(400).send({ error: _error.message });
    }

    const { verified, registrationInfo } = verification;

    if (verified && registrationInfo) {
      const { credentialPublicKey, credentialID, counter } = registrationInfo;

      const id = Buffer.from(credentialID).toString("base64");

      const name = req.session.decks[id].name;

      if (!name) {
        return reply.status(400).send({ error: "Username not found" });
      }

      // Check if the device is already registered with prisma client
      const cred = await prisma.wefadex.findUnique({
        where: {
          id,
        },
      });

      if (!cred) {
        console.log("Adding new device credential to database", {
          id: credentialID.toString(),
          key: Array.from(credentialPublicKey),
          username: name,
          counter,
        });

        await prisma.wefadex.create({
          data: {
            id: Buffer.from(credentialID).toString("base64"),
            // key: Buffer.from(credentialPublicKey).toString(""),
            public_key: Buffer.from(credentialPublicKey),
            name: name,
            counter,
          },
        });
      }
    }

    req.session.currentChallenge = undefined;

    reply.send({ verified });
  });

  // Returns available login options - similar to register options
  fastify.get("/sync-options", async function (req: FastifyRequest, reply: FastifyReply) {
    const options = generateAuthenticationOptions({
      rpID,
      timeout: 60000,
      userVerification: "preferred",
    });

    req.session.currentChallenge = options.challenge;

    reply.send(options);
  });

  // Allow registered user to authenticate
  fastify.post("/sync", async function (req: FastifyRequest, reply: FastifyReply) {
    const body = req.body as AuthenticationResponseJSON;

    const bodyCredIDBuffer = base64url.toBuffer(body.rawId);
    const credential = await prisma.wefadex.findUnique({
      where: {
        id: bodyCredIDBuffer.toString(),
      },
    });

    if (!credential) {
      return reply.status(400).send({ error: "Authenticator is not registered with this site" });
    }

    let verification: VerifiedAuthenticationResponse;

    try {
      verification = await verifyAuthenticationResponse({
        response: body,
        expectedChallenge: `${req.session.currentChallenge}`,
        expectedOrigin,
        expectedRPID: rpID,
        authenticator: {
          credentialID: bodyCredIDBuffer,
          credentialPublicKey: Uint8Array.from(credential.public_key),
          counter: Number(credential.counter),
        },
        requireUserVerification: true,
      });
    } catch (error) {
      const _error = error as Error;
      console.error(_error);
      return reply.status(400).send({ error: _error.message });
    }

    const { verified, authenticationInfo } = verification;

    if (verified) {
      await prisma.wefadex.update({
        where: {
          id: bodyCredIDBuffer.toString(),
        },
        data: {
          counter: authenticationInfo.newCounter,
        },
      });
    }

    req.session.currentChallenge = undefined;
    req.session.decks[credential.id] = credential;

    reply.send({ verified });
  });
}
