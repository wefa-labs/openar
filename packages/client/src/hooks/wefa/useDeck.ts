import { data as creatureData } from "../../mocks/critters.json";
import { data as plantData } from "../../mocks/plants.json";

import { useEffect, useState } from "react";

import { fetchPlants, fetchCreatures } from "../../modules/idb";

export const useWefadex = (spaceId: string) => {
  const [creatures, setCreatures] = useState<Creature[]>(creatureData as any);
  const [plants, setPlants] = useState<Plant[]>(plantData as any);

  async function handleFetchPlants() {
    const newPlants = await fetchPlants();

    console.log("newPlants", newPlants);
    setPlants(newPlants);
  }

  async function handleFetchCreatures() {
    const newCreatures = await fetchCreatures();

    console.log("newCreatures", newCreatures);
    setCreatures(newCreatures);
  }

  useEffect(() => {
    // handleFetchPlants();
    // handleFetchCreatures();
  }, [spaceId]);

  return {
    plants,
    creatures,
    handleFetchPlants,
    handleFetchCreatures,
  };
};
