import { data as creatureData } from "../../mocks/critters.json";
import { data as plantData } from "../../mocks/plants.json";

import { useEffect, useState } from "react";

import { fetchPlants, fetchCreatures } from "../../modules/idb";

interface WefadexProps {
  plants: Plant[];
  creatures: Creature[];
  handleFetchPlants: () => Promise<void>;
  handleFetchCreatures: () => Promise<void>;
}

export const useWefadex = (spaceId: string): WefadexProps => {
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
