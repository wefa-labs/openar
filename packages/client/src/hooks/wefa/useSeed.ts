import { useMachine } from "@xstate/react";

import { seedMachine } from "./seedMachine";

export const useSeed = () => {
  const [state, send] = useMachine(seedMachine);

  const plantState =
    state.matches("idle") ||
    state.matches("plant_verified") ||
    state.matches("verifying_plant");
  const isSeeding = state.matches("seeding_creature");
  const isDetecting = state.matches("verifying_plant");

  function verifyPlant(image: File) {
    send({ type: "SELECT_PLANT", image });
  }

  function seedCreature(element: WefaElement) {
    if (state.matches("creature_seeded")) {
      send({ type: "REGENERATE", element });
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
    plantState,
    isDetecting,
    isSeeding,
    verifyPlant,
    seedCreature,
    retrySeeding,
    reset,
    ...state.context,
  };
};
