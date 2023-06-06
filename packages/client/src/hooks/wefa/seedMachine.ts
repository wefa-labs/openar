import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { createMachine, assign } from "xstate";

import { apiClient } from "../../modules/axios";
import { createPlant, createCreature, db, initDB } from "../../modules/idb";

export interface SeedContext {
  image: string | null;
  imageVerified: boolean;
  element: WefaElement | null;
  plant: PlantDetails | null;
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
  water: "assets/water-butterfly.png",
  fire: "assets/fire-butterfly.png",
  earth: "assets/earth-butterfly.png",
  air: "assets/air-butterfly.png",
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
      verified: assign((context, event, data) => {
        context.imageVerified = true;

        // TODO: Add plant to local DB for later use
        // TODO: Save plant details to context
        // TODO: Move state updates to actions
        console.log("Verified Image", context, event, data);

        toast.success("Plant verified!");

        return context;
      }),
      seeded: assign((context, event, data) => {
        // TODO: Move state updates to actions
        const creature: Creature = {
          id: `0x${nanoid()}`,
          name: "Test Creature",
          description: "Test Creature Description",
          image: creatureImage[context.element ?? "earth"],
          care: {
            checkedAt: new Date().getMilliseconds(),
            growthLevel: GrowthLevel.SEED,
          },
          isUploaded: false,
          localId: nanoid(),
          element: "earth",
          spaceId: "0x",
          model: "",
          trainer: "0x",
          createdAt: new Date().getMilliseconds(),
          updatedAt: new Date().getMilliseconds(),
        };

        context.creature = creature;
        createCreature(creature);
        context.plant &&
          context.image &&
          createPlant({
            id: `0x${nanoid()}`,
            caretakerAddress: "0x",
            // spaceAddress: "0x",
            name: context.plant.name,
            description: context.plant.description,
            image: context.image,
            isUploaded: false,
            plantId: 0,
            createdAt: new Date().getMilliseconds(),
            updatedAt: new Date().getMilliseconds(),
            care: {
              health: 100,
              growthLevel: 0 as GrowthLevel,
            },
            localId: nanoid(),
            // health: {
            //   current: 100,
            //   max: 100,
            //   healthStatus: 2 as GrowthLevel,
            // },
          });

        Promise.all([
          createCreature(creature),
          context.plant &&
            context.image &&
            createPlant({
              id: `0x${nanoid()}`,
              caretakerAddress: "0x",
              // spaceAddress: "0x",
              name: context.plant.name,
              description: context.plant.description,
              image: context.image,
              isUploaded: false,
              plantId: 0,
              createdAt: new Date().getMilliseconds(),
              updatedAt: new Date().getMilliseconds(),
              care: {
                health: 100,
                growthLevel: 0 as GrowthLevel,
              },
              localId: nanoid(),
              // health: {
              //   current: 100,
              //   max: 100,
              //   healthStatus: 2 as GrowthLevel,
              // },
            }),
        ]).then((res) => {
          console.log("Seeded Creature", { res, context, event, data });
          toast.success("Creature seeded!");
        });

        // Trigger some UI indication that creature has been seeded.

        return context;
      }),
      reset: assign((context, _event) => {
        context.image = null;
        context.element = null;
        context.plant = null;
        context.creature = null;
        context.imageVerified = false;
        context.error = null;

        return context;
      }),
      error: assign((context, event) => {
        context.error = "Something went wrong!";
        console.log("Error!", context, event);

        toast.error("Something went wrong!");

        return context;
      }),
    },
    services: {
      plantVerifier: async (context, event: { image?: string }, _meta) => {
        let image: string | null = context.image;

        if (event.image) {
          image = event.image;
        }

        if (!image) {
          throw new Error("No image provided!");
        }

        // TODO: Add form image upload
        // const formData = new FormData();

        // formData.append("image", image, image.name);

        // const data = {
        //   // Add other parameters here
        // };
        // formData.append("data", JSON.stringify(data));

        try {
          const { data } = await apiClient.post<{ plant: PlantResponse }>(
            "/plants/detect",
            { image }
          );

          return { details: data.plant.suggestions[0].plant_details };
        } catch (error) {
          console.log("Photo verification failed!", error);
          throw error;
        }
      },
      creatureGenerator: async (context, event: { element?: WefaElement }) => {
        let element: WefaElement | null = context.element;

        if (event.element) {
          element = event.element;
        }

        if (!element) {
          throw new Error("No element provided!");
        }

        try {
          const { data } = await apiClient.post<{ creature: Creature }>(
            "/creatures/seed",
            {
              image: context.image,
              element,
            }
          );

          return { element, data };
        } catch (error) {
          console.log("Creature generation failed!", error);
          throw error;
        }
      },
    },
  }
);
