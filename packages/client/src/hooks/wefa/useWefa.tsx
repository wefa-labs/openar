import { createContext, useContext, useEffect, useState } from "react";

import { badges as badgeList } from "../../constants";

import {
  createBadge,
  readPlants,
  readCreatures,
  readBadges,
} from "../../modules/idb";
import { toast } from "react-toastify";

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
    const newBadges: WefaBadge[] = [];

    // Check if user has earned a badge by querying local DB for all plants and creatures
    const dbPlants = await readPlants();
    const dbCreatures = await readCreatures();
    const dbBadges = await readBadges();

    const earnedBadgesList = dbBadges.reduce<Record<BadgeType, WefaBadge>>(
      (acc, badge) => {
        acc[badge.id] = badge;
        return acc;
      },
      {} as Record<BadgeType, WefaBadge>
    );

    // 1st badge "early-adopter" should be awarded automatically.
    if (!earnedBadgesList["early-adopter"]) {
      const newBadge = badgeList["early-adopter"];

      newBadges.push(newBadge);
    }

    // If a user has not earned a badge, award 1st plant and creature badge
    if (dbPlants.length === 1 && !earnedBadgesList["1st-plant"]) {
      const newBadge = badgeList["1st-plant"];

      newBadges.push(newBadge);
    }

    if (dbCreatures.length === 1 && !earnedBadgesList["1st-creature"]) {
      const newBadge = badgeList["1st-creature"];

      newBadges.push(newBadge);
    }

    newBadges.forEach(async (badge) => {
      await createBadge(badge);

      toast.success("You've earned a new badge! Check your profile.");
    });

    const updatedBadges = await readBadges();

    setBadges(updatedBadges);

    handleFetchPlants();
    handleFetchCreatures();
  }

  useEffect(() => {
    handleFetchBadges();
    handleFetchPlants();
    handleFetchCreatures();
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
