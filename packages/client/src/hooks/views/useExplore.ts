import { useState } from "react";

import { useWorlds } from "../openar/useWorlds";

export const useExplore = () => {
  const [selectedWorld, setSelectedWorld] = useState("");
  const { worlds, onCreateWorld, handleWorldSubmit } = useWorlds();

  // const worldList: Record<string, any> = {};

  // worlds.forEach((world) => {
  //   worldList[world.value] = {};
  // });

  console.log("Explore Data", { worlds, onCreateWorld, handleWorldSubmit });

  return {
    worlds,
    selectedWorld,
    setSelectedWorld,
    onCreateWorld,
    handleWorldSubmit,
  };
};
