import { useMachine } from "@xstate/react";
import { createContext, useContext, useEffect } from "react";

import { SeedContext as SeedMachineContext, seedMachine } from "./seedMachine";
import { useWefa } from "./useWefa";

export interface SeedDataProps extends SeedMachineContext {
  plantingState: boolean;
  elementState: boolean;
  isDetecting: boolean;
  isSeeding: boolean;
  verifyPlant: (image: string | ArrayBuffer) => void;
  seedCreature: (element: WefaElement) => void;
  retrySeeding: () => void;
  reset: () => void;
}

const SeedContext = createContext<SeedDataProps | null>(null);

type Props = {
  children: React.ReactNode;
};

export const SeedProvider = ({ children }: Props) => {
  const currentValue = useContext(SeedContext);

  if (currentValue) throw new Error("SeedProvider can only be used once");
  const { handleBadgeCheck } = useWefa();
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

  useEffect(() => {
    if (state.matches("plant_verified")) {
      handleBadgeCheck();
    }

    if (state.matches("creature_seeded")) {
      handleBadgeCheck();
    }
  }, [state.value]);

  return (
    <SeedContext.Provider
      value={{
        plantingState,
        elementState,
        isDetecting,
        isSeeding,
        verifyPlant,
        seedCreature,
        retrySeeding,
        reset,
        ...state.context,
      }}
    >
      {children}
    </SeedContext.Provider>
  );
};

export const useSeed = () => {
  const value = useContext(SeedContext);
  if (!value) throw new Error("Must be used within a SeedProvider");
  return value;
};
