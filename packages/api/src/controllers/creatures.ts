import { WefaElement } from "@prisma/client";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

// import { detectPlantHealth } from "../modules/plant";
// import { fetchCurrentWeather } from "../modules/weather";
import { generateCreature } from "../modules/creature-generator";

export default async function creaturesController(fastify: FastifyInstance) {
  fastify.post("/seed", async function (req: FastifyRequest, reply: FastifyReply) {
    const body = req.body as { plant: string; element: WefaElement };

    if (!body.plant || !body.element) {
      return reply.status(400).send({ error: "Missing plant or element" });
    }

    try {
      // GET PLANT INPUTS
      // const health = await detectPlantHealth(body.image);

      // Get plant inputs from image like color, shades, etc.

      // GET ENVIRONMENT INPUTS
      // const weather = await fetchCurrentWeather(body.zipcode);

      // HIT CREDENTIAL MICROSERVICE
      // Generate intial claim for creatures
      // Associate claim with DiD which may be 3 types
      // Key local based, Device, and Blockchain
      // Return claim/proof to client

      // HIT CREATURE GENERATION MICROSERVICE
      const creature = await generateCreature(body.plant, body.element);
      // Return 2D image and 3D model to client

      reply.send({ ...creature });
    } catch (error) {
      console.log(error);

      reply.status(400).send({ error });
    }
  });
}
