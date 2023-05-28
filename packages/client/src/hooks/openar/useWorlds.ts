import { useForm } from "react-hook-form";
import { useRows } from "@latticexyz/react";

import { useMUD } from "../useMud";

interface WorldInputData {
  name: string;
  description: string;
  image: string;
}

export const useWorlds = () => {
  const { register, reset, handleSubmit } = useForm<WorldInputData>({
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
    shouldUseNativeValidation: true,
  });

  const {
    network: { storeCache },
    systemCalls: { createWorld },
  } = useMUD();

  const worlds = useRows(storeCache, {
    table: "ARWorld",
  });

  async function onCreateWorld(data: WorldInputData) {
    await createWorld(data.name, data.description, data.image);
    reset();
  }

  console.log("Worlds Data", { worlds });

  return {
    worlds,
    onCreateWorld,
    handleWorldSubmit: handleSubmit,
    worldFormRegister: register,
  };
};
