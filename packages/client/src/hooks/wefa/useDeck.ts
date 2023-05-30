import { useMachine } from "@xstate/react";

import { deckMachine } from "./deckMachine";
import { useState } from "react";

export const useWefadex = () => {
  const [state, send] = useMachine(deckMachine);
  const [creatures] = useState<Critter[]>([]);
  const [plants] = useState<Plant[]>([]);

  function mintCreature(id: string) {
    if (!state.matches("idle")) throw new Error("Not idle");
    send("MINT", { id });
  }

  return {
    ...state.context,
    mintCreature,
    plants,
    creatures,
  };
};
