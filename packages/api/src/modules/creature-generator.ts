import { WefaElement } from "@prisma/client";

const generatorUrl = process.env.GENERATOR_SERVICE_URL ?? "http://127.0.0.1:8080";

export async function generateCreature(plant: string, element: WefaElement) {
  try {
    const data: { img: string } = await (
      await fetch(`${generatorUrl}/generate-creature`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          description: plant,
          creature_type: "butterfly",
          element_type: element.toLowerCase(),
        }),
      })
    ).json();

    // console.log("Generator Data", data);

    return data;
  } catch (error) {
    console.error("Error generating creature", error);

    throw error;
  }
}
