import { createContext, useContext, useEffect, useState } from "react";

import {
  createBadge,
  readPlants,
  readCreatures,
  readBadges,
} from "../../modules/idb";

interface WefadexProps {
  badges: WefaBadge[];
  plants: Plant[];
  creatures: Creature[];
  handleBadgeCheck: () => Promise<void>;
  handleFetchBadges: () => Promise<void>;
  handleFetchPlants: () => Promise<void>;
  handleFetchCreatures: () => Promise<void>;
}

const WefaContext = createContext<WefadexProps | null>(null);

type Props = {
  children: React.ReactNode;
};

export const WefaProvider = ({ children }: Props) => {
  const currentValue = useContext(WefaContext);

  if (currentValue) throw new Error("WefaProvider can only be used once");

  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [badges, setBadges] = useState<WefaBadge[]>([]);

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

  async function handleBadgeCheck() {
    // Check if user has earned a badge by querying local DB for all plants and creatures
    // If a user has already earned a badge, don't award it again
    // async function checkBadges() {
    //   const earnedBadges: Record<BadgeType, WefaBadge> = {};
    //   const localBadges = await readBadges();
    //   if (localBadges) {
    //     localBadges.forEach((badge) => {
    //       earnedBadges[badge.id] = badge;
    //     });
    //   }
    //   const plants = await readPlants();
    //   const creatures = await readCreatures();
    //   const plantBadges = plants.reduce<Record<PlantBadgeType, boolean>>(
    //     (badges, plant) => {
    //       return {
    //         ...badges,
    //       };
    //     },
    //     {
    //       "1st-plant": false,
    //       "1st-flower": false,
    //       "1st-fruit": false,
    //       "1st-herb": false,
    //       "1st-vegetable": false,
    //       "all-plant-types": false,
    //     }
    //   );
    // }
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
        handleBadgeCheck,
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
