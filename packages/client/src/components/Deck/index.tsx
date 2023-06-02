import React from "react";
import { a } from "@react-spring/web";

import { DeckCard } from "./Card";
import { useDeck, height } from "../../hooks/views/useDeck";
import { DeckSheet, UserStats } from "./Components";

interface WefadexProps {}

// TODO: Stylize Bleyle following desings in Figma

export const Wefadex: React.FC<WefadexProps> = () => {
  const {
    y,
    bind,
    plantTrail,
    creatureTrail,
    plants,
    creatures,
    openSheet,
    closeSheet,
    sheetData,
  } = useDeck();

  const display = y.to((py) => (py < height ? "block" : "none"));
  const bgStyle = {
    transform: y.to([0, height], ["translateY(-8%)", "translateY(0px)"]),
    opacity: y.to([0, height], [0.4, 1], "clamp"),
  };

  return (
    <section className="flex w-full overflow-hidden">
      <a.div
        className="flex w-full flex-col gap-4"
        onClick={() => closeSheet()}
        style={bgStyle}
      >
        <UserStats />
        <h3 className=" text-2xl font-semibold">Plants</h3>
        <ul className="carousel-center carousel space-x-4">
          {plantTrail.map((props, index) => (
            <DeckCard
              {...plants[index]}
              key={plants[index].id}
              style={props}
              onClick={() =>
                openSheet({
                  canceled: false,
                  data: { ...plants[index], type: "plant", actions: [] },
                })
              }
              actions={[]}
            />
          ))}
        </ul>
        <h3 className="text-2xl font-semibold">Creatures</h3>
        <ul className="carousel-center carousel space-x-4">
          {creatureTrail.map((props, index) => (
            <DeckCard
              {...creatures[index]}
              key={creatures[index].id}
              style={props}
              onClick={() => {
                openSheet({
                  canceled: false,
                  data: {
                    ...creatures[index],
                    type: "creature",
                    actions: [],
                  },
                });
              }}
              actions={[]}
            />
          ))}
        </ul>
      </a.div>
      <DeckSheet
        {...sheetData}
        {...bind()}
        style={{
          display,
          bottom: `calc(-100vh + ${height - 100}px)`,
          y,
        }}
      />
    </section>
  );
};
