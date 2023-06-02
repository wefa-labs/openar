import { useState } from "react";
import { useDrag } from "@use-gesture/react";
import { useSpring, useTrail, config } from "@react-spring/web";

import { useWefadex } from "../wefa/useDeck";

import { DeckSheetData } from "../../components/Deck/Components";

export const height = window.innerHeight - 24;

export const useDeck = () => {
  const [sheetData, setSheetData] = useState<DeckSheetData>({
    name: "",
    description: "å",
    image: "",
    type: "creature",
    actions: [],
  });

  const { plants, creatures, mintCreature } = useWefadex();

  const [{ y }, api] = useSpring(() => ({ y: height }));
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

  function openSheet({
    canceled,
    data,
  }: {
    canceled?: boolean;
    data?: DeckSheetData;
  }) {
    data && setSheetData(data);
    api.start({
      y: 0,
      immediate: false,
      config: canceled ? config.wobbly : config.stiff,
    });
  }

  function closeSheet(velocity = 0) {
    api.start({
      y: height,
      immediate: false,
      config: { ...config.stiff, velocity },
    });
  }

  const bind = useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
      cancel,
      canceled,
    }) => {
      if (my < -70) cancel();

      if (last) {
        my > height * 0.5 || (vy > 0.5 && dy > 0)
          ? closeSheet(vy)
          : openSheet({ canceled });
      }
      // when the user keeps dragging, we just move the sheet according to
      // the cursor position
      else api.start({ y: my, immediate: true });
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  );

  return {
    y,
    name,
    plants,
    creatures,
    mintCreature,
    plantTrail,
    creatureTrail,
    openSheet,
    closeSheet,
    sheetData,
    bind,
  };
};
