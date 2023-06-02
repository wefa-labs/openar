import { createMachine } from "xstate";
import { apiClient } from "../../modules/axios";
import { db, initDB } from "../../modules/idb";
import { uniqueId } from "xstate/lib/utils";

interface SeedContext {
  image: File | null;
  imageVerified: boolean;
  element: WefaElement | null;
  creature: Creature | null;
  error: string | null;
}

declare type WefaElement = "water" | "earth" | "fire" | "air";

enum GrowthLevel {
  SEED,
  BUDDING,
  FLOWERING,
  RIPENING,
}

const creatureImage: Record<WefaElement, string> = {
  water: "assets/water_butterfly.png",
  fire: "assets/fire_butterfly.png",
  earth: "assets/earth_butterfly.png",
  air: "assets/air_butterfly.png",
};

export const seedMachine = createMachine(
  {
    id: "seed",
    version: "0.0.1",
    description:
      "Seed machine for WEFA enabling discovery flow with creature creation.",
    type: "compound",
    strict: true,
    tsTypes: {} as import("./seedMachine.typegen").Typegen0,
    predictableActionArguments: true,
    tags: ["seed", "game", "nature", "critters", "creatures"],
    initial: "idle",
    schema: {
      context: {
        image: null,
        element: null,
        creature: null,
        imageVerified: false,
        error: null,
      } as SeedContext,
    },
    states: {
      idle: {
        on: {
          SELECT_PLANT: {
            target: "verifying_plant",
            cond: "isPhotoValid",
          },
        },
      },
      verifying_plant: {
        invoke: {
          id: "plantVerifier",
          src: "plantVerifier",
          onDone: {
            target: "plant_verified",
            actions: "verified",
          },
          onError: {
            target: "idle",
            actions: "error",
          },
        },
      },
      plant_verified: {
        on: {
          SELECT_ELEMENT: {
            target: "seeding_creature",
            cond: "isSeedingValid",
          },

          RETRY_SEEDING: {
            target: "seeding_creature",
            cond: "isSeedingRetryValid",
          },
          SELECT_PLANT: {
            target: "verifying_plant",
            cond: "isPhotoValid",
          },
        },
      },
      seeding_creature: {
        invoke: {
          id: "creatureGenerator",
          src: "creatureGenerator",
          onDone: {
            target: "creature_seeded",
            actions: "seeded",
          },
          onError: {
            target: "plant_verified",
            actions: "error",
          },
        },
      },
      creature_seeded: {
        on: {
          RESET: {
            target: "idle",
            actions: "reset",
          },
          REGENERATE: {
            target: "seeding_creature",
            cond: "isSeedingValid",
          },
        },
      },
    },
    entry: async (context, event) => {
      context.image = null;
      context.imageVerified = false;
      context.element = null;
      context.creature = null;
      context.error = null;

      if (!db) await initDB();

      console.log("Seed machine entered.", context, event);
    },
    exit: (context, event) => {
      console.log("Seed machine exited.", context, event);
      // TODO: Save state to indexedDB
    },
  },
  {
    delays: {
      LIGHT_DELAY: (_context, _event) => {
        return true;
      },
    },
    guards: {
      isPhotoValid: (_context, event: { image: string | ArrayBuffer }) => {
        return !!event.image;
      },
      isSeedingValid: (context, event: { element: WefaElement }) => {
        return !!context.image && (!!event.element || !!context.element);
      },
      isSeedingRetryValid: (context) => {
        return !context.creature && !!context.element;
      },
    },
    actions: {
      verified: (context, event) => {
        console.log("Seeded!", context, event);
        // Trigger some UI indication that creature has been seeded.
      },
      seeded: (context, event) => {
        console.log("Seeded!", context, event);
        // Trigger some UI indication that creature has been seeded.
      },
      reset: (context, _event) => {
        context.image = null;
        context.element = null;
        context.creature = null;
        context.imageVerified = false;
        context.error = null;
      },
      error: (context, event) => {
        context.error = "Something went wrong!";
        console.log("Error!", context, event);
      },
    },
    services: {
      plantVerifier: async (context, event: { image?: File }, _meta) => {
        console.log("Verifying Photo!", context, event);

        let image: File | null = null;

        if (event.image) {
          console.log("Image provided!", event.image);
          image = event.image;
        }

        if (!image) {
          console.log("No image provided, using context image.", context.image);
          return;
        }

        const formData = new FormData();

        formData.append("image", image, image.name);

        const data = {
          // Add other parameters here
        };
        formData.append("data", JSON.stringify(data));

        try {
          const { data } = await apiClient.postForm<PlantResponse>(
            "/plants/detect",
            formData
          );

          console.log("Plant detected!", data);

          context.imageVerified = true;
        } catch (error) {
          console.log("Photo verification failed!", error);
          throw error;
        }
      },
      creatureGenerator: async (context, event: { element?: WefaElement }) => {
        console.log("Generating Creature!", context, event);

        if (event.element) {
          console.log("Element provided!", event.element);
          context.element = event.element;
        }

        try {
          const { data } = await apiClient.patchForm<{ creature: Creature }>(
            "/creatures/seed",
            {
              image: context.image,
              element: context.element,
            }
          );

          console.log("Creature seeded!", data);

          context.creature = {
            id: `0x${uniqueId()}`,
            name: "Test Creature",
            description: "Test Creature Description",
            image: creatureImage[context.element ?? "earth"],
            care: {
              checkedAt: new Date().getMilliseconds(),
              growthLevel: GrowthLevel.SEED,
            },
            element: "earth",
            spaceId: "0x",
            model: "",
            trainer: "0x",
            createdAt: new Date().getMilliseconds(),
            updatedAt: new Date().getMilliseconds(),
          };

          await db?.put("creatures", context.creature);

          // context.creature = data.creature;
          console.log("Creature generated!", context.creature);
        } catch (error) {
          console.log("Creature generation failed!", error);
          throw error;
        }
      },
    },
  }
);
