import { data as creatureData } from "../../mocks/creatures.json";
import { data as plantData } from "../../mocks/plants.json";

import { useEffect, useState } from "react";

import { readPlants, readCreatures, readBadges } from "../../modules/idb";
import { badges as wefaBadges } from "../../constants";

interface WefadexProps {
  badges: WefaBadge[];
  plants: Plant[];
  creatures: Creature[];
  handleFetchPlants: () => Promise<void>;
  handleFetchCreatures: () => Promise<void>;
  handleFetchBadges: () => Promise<void>;
}

export const useWefadex = (spaceId: string): WefadexProps => {
  const [creatures, setCreatures] = useState<Creature[]>(creatureData as any);
  const [plants, setPlants] = useState<Plant[]>(plantData as any);
  const [badges, setBadges] = useState<WefaBadge[]>(Object.values(wefaBadges));

  async function handleFetchPlants() {
    const newPlants = await readPlants();

    // console.log("newPlants", newPlants);
    setPlants(newPlants);
  }

  async function handleFetchCreatures() {
    const newCreatures = await readCreatures();

    // console.log("newCreatures", newCreatures);
    setCreatures(newCreatures);
  }

  async function handleFetchBadges() {
    const newBadges = await readBadges();

    // console.log("newBadges", newBadges);
    setBadges(newBadges);
  }

  useEffect(() => {
    handleFetchBadges();
    handleFetchPlants();
    handleFetchCreatures();
  }, [spaceId]);

  return {
    badges,
    plants,
    creatures,
    handleFetchBadges,
    handleFetchPlants,
    handleFetchCreatures,
  };
};
