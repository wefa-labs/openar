import { createContext, useContext, useEffect, useState } from "react";

import { data as creatureData } from "../../mocks/creatures.json";
import { data as plantData } from "../../mocks/plants.json";

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

const WefaContext = createContext<WefadexProps | null>(null);

type Props = {
  children: React.ReactNode;
};

export const WefaProvider = ({ children }: Props) => {
  const currentValue = useContext(WefaContext);

  if (currentValue) throw new Error("WefaProvider can only be used once");

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
    // handleFetchBadges();
    // handleFetchPlants();
    // handleFetchCreatures();
  }, []);

  return (
    <WefaContext.Provider
      value={{
        badges,
        plants,
        creatures,
        handleFetchBadges,
        handleFetchPlants,
        handleFetchCreatures,
      }}
    >
      {children}
    </WefaContext.Provider>
  );
};

export const useWefa = () => {
  const value = useContext(WefaContext);
  if (!value) throw new Error("Must be used within a WefaProvider");
  return value;
};
