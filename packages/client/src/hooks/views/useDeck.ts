import { useState } from "react";
import { useTrail, config, SpringValue } from "@react-spring/web";

import { useWefadex } from "../wefa/useDeck";

import { DeckViewerData } from "../../components/Deck/Viewer";

export const height = window.innerHeight - 24;

export interface DeckDataProps {
  plants: Plant[];
  creatures: Creature[];
  plantTrail: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  }[];
  creatureTrail: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  }[];
  openSheet: ({
    canceled,
    data,
  }: {
    canceled?: boolean;
    data?: DeckViewerData;
  }) => void;
  closeSheet: (velocity?: number) => void;
  sheetData: DeckViewerData;
  viewerOpen: boolean;
}

export const useDeck = (): DeckDataProps => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [sheetData, setSheetData] = useState<DeckViewerData>({
    name: "",
    description: "å",
    image: "",
    type: "creature",
    actions: [],
  });

  const { plants, creatures } = useWefadex("");

  const plantTrail = useTrail(plants?.length ?? 0, {
    from: { opacity: 0, transform: "translate3d(0, 30px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
    config: {
      ...config.gentle,
      friction: 20,
      clamp: true,
    },
  });
  const creatureTrail = useTrail(creatures?.length ?? 0, {
    from: { opacity: 0, transform: "translate3d(0, 30px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
    config: {
      ...config.gentle,
      friction: 20,
      clamp: true,
    },
  });

  function openSheet({ data }: { data?: DeckViewerData }) {
    data && setSheetData(data);
    setViewerOpen(true);
  }

  function closeSheet() {
    setViewerOpen(false);
  }

  return {
    plants,
    creatures,
    plantTrail,
    creatureTrail,
    viewerOpen,
    openSheet,
    closeSheet,
    sheetData,
  };
};
