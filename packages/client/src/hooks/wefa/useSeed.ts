import { useMachine } from "@xstate/react";

import { SeedContext, seedMachine } from "./seedMachine";

export interface SeedDataProps extends SeedContext {
  plantingState: boolean;
  elementState: boolean;
  isDetecting: boolean;
  isSeeding: boolean;
  verifyPlant: (image: string | ArrayBuffer) => void;
  seedCreature: (element: WefaElement) => void;
  retrySeeding: () => void;
  reset: () => void;
}

export const useSeed = (): SeedDataProps => {
  const [state, send] = useMachine(seedMachine);

  const plantingState =
    state.matches("idle") ||
    state.matches("plant_verified") ||
    state.matches("verifying_plant");
  const elementState =
    state.matches("plant_verified") ||
    state.matches("seeding_creature") ||
    state.matches("creature_seeded");
  const isSeeding = state.matches("seeding_creature");
  const isDetecting = state.matches("verifying_plant");

  function verifyPlant(image: string | ArrayBuffer) {
    send({ type: "SELECT_PLANT", image });
  }

  function seedCreature(element: WefaElement) {
    if (state.matches("creature_seeded")) {
      send({ type: "REGENERATE", element });
      return;
    }

    send({ type: "SELECT_ELEMENT", element });
  }

  function retrySeeding() {
    send({ type: "RETRY_SEEDING" });
  }

  function reset() {
    send({ type: "RESET" });
  }

  return {
    plantingState,
    elementState,
    isDetecting,
    isSeeding,
    verifyPlant,
    seedCreature,
    retrySeeding,
    reset,
    ...state.context,
  };
};
