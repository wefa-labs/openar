import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { detectPlantHealth } from "../modules/plant";
import { fetchCurrentWeather } from "../modules/weather";

export default async function creaturesController(fastify: FastifyInstance) {
  fastify.post("/seed", async function (req: FastifyRequest, reply: FastifyReply) {
    const body = req.body as { plantId: number; image: string; zipcode: number };

    try {
      // GET PLANT INPUTS
      const health = await detectPlantHealth(body.image);

      // Get plant inputs from image like color, shades, etc.

      // GET ENVIRONMENT INPUTS
      // const weather = await fetchCurrentWeather(body.zipcode);

      // HIT CREDENTIAL MICROSERVICE
      // Generate intial claim for creatures
      // Associate claim with DiD which may be 3 types
      // Key local based, Device, and Blockchain
      // Return claim/proof to client

      // HIT CREATURE GENERATION MICROSERVICE
      // Feed inputs to createure generation service
      // Return 2D image and 3D model to client
      // Post requests to the pythonservice that will return a JSOn object with the type structure of a creature.

      reply.send({ health });
    } catch (error) {
      console.log(error);

      reply.status(400).send({ error });
    }
  });
}
