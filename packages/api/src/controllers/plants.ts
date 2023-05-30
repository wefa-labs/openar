import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { fetchCurrentWeather } from "../modules/weather";
import { detectPlantHealth, detectPlantType } from "../modules/plant";

type Plant =
  | "basil"
  | "oregano"
  | "cilantro"
  | "mint"
  | "spinach"
  | "green_beans"
  | "bell_peppers"
  | "zuchinni"
  | "peach"
  | "strawberry"
  | "watermelon"
  | "lemon"
  | "sunflower"
  | "lavender"
  | "coneflower"
  | "daylillies"
  | "impatiens";

const plants: Record<number, Plant> = {
  1: "basil",
  2: "oregano",
  3: "cilantro",
  4: "mint",
  5: "spinach",
  6: "green_beans",
  7: "bell_peppers",
  8: "zuchinni",
  9: "peach",
  10: "strawberry",
  11: "watermelon",
  12: "lemon",
  13: "sunflower",
  14: "lavender",
  15: "coneflower",
  16: "daylillies",
  17: "impatiens",
};

const plantsZones: Record<Plant, number[]> = {
  basil: [],
  oregano: [],
  cilantro: [],
  mint: [],
  spinach: [],
  green_beans: [],
  bell_peppers: [],
  zuchinni: [],
  peach: [],
  strawberry: [],
  watermelon: [],
  lemon: [],
  sunflower: [],
  lavender: [],
  coneflower: [],
  daylillies: [],
  impatiens: [],
};

export default async function plantController(fastify: FastifyInstance) {
  fastify.post("/detect", async function (req: FastifyRequest, reply: FastifyReply) {
    // const body = req.body as { image: string };

    try {
      const file = await req.file();
      const buffer = await file?.toBuffer();

      // VERIFY PLANT IMAGE
      const plant = await detectPlantType(buffer);

      reply.send({ plant });
    } catch (error) {
      console.log(error);

      reply.status(400).send({ error });
    }
  });

  fastify.post("/verify", async function (req: FastifyRequest, reply: FastifyReply) {
    const body = req.body as { plantId: number; image: string; zipcode: number };

    try {
      // CHECK PLANT ZONE
      // const zone = await fetchPlantZones(body.zipcode);
      // Check zone is right ont to add plant

      // VERIFY PLANT IMAGE
      const plant = await detectPlantType(body.image);

      if (!plant?.suggestions[0].plant_name || plant?.suggestions[0].plant_name !== plants[body.plantId]) {
        throw new Error("Plant not in curated list");
      }

      // Check QR codes if any in image
      // Check metadata of image

      // GET PLANT INPUTS
      const health = await detectPlantHealth(body.image);

      // Get plant inputs from image like color, shades, etc.

      // GET ENVIRONMENT INPUTS
      const weather = await fetchCurrentWeather(body.zipcode);

      // HIT CREDENTIAL MICROSERVICE
      // Generate intial claim for plant
      // Associate claim with DiD which may be 3 types
      // Key local based, Device, and Blockchain
      // Return claim/proof to client

      // HIT CREATURE GENERATION MICROSERVICE
      // Feed inputs to createure generation service
      // Return 2D image and 3D model to client

      reply.send({ weather, health });
    } catch (error) {
      console.log(error);

      reply.send({ error });
    }
  });

  fastify.post("/nurture/:id", async function (req: FastifyRequest, reply: FastifyReply) {
    const params = req.params as { id?: string };
    const body = req.body as { image: string; spaceAddrs: `0x${string}` };

    try {
      if (!params.id) throw new Error("ID not specified");

      const id = parseInt(params.id);

      // VERIFY OWNERSHIP
      // Check user ownership with 3 options
      // Session ID if not authenticated
      // Device Credential ID from WebAuth or local DiD
      // Verifiable Credential generated when connecting on chain

      // VERIFY AUTHENTICITY
      // Check image is similar to previous
      // Check image is in right stage of plant life
      // Check QR codes in image

      // CHECK PLANT HEALTH
      const health = await detectPlantHealth(body.image);

      console.log("API Plant Nurture", { health });

      // Detemine based on health how much to nurture plant

      // GENERATE CREDENTIAL/PROOF
      // Hit Polygon ID Node to generate claim
      // Chain claim to previous plant updates
      // Create proof and pass back to client and store in cache

      reply.send({ health });
    } catch (error) {
      console.log(error);

      reply.send({ error });
    }
  });
}
