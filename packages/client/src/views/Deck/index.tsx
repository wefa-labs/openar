import { a } from "@react-spring/web";

import { height, useDeck } from "../../hooks/views/useDeck";

import { DeckCard } from "../../components/Deck/Card";
import { DeckSheet } from "../../components/Deck/Sheet";
import { DeckStats } from "../../components/Deck/Stats";

export default function Deck() {
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
    <section className=" w-full h-full ">
      <a.div
        className="deck-view w-full h-full flex flex-col gap-6 px-6 sm:px-12 justify-center"
        onClick={() => closeSheet()}
        style={bgStyle}
      >
        <DeckStats />
        <div className="deck-plants w-full relative">
          <h3 className=" text-2xl font-semibold">Plants</h3>
          <ul className="absolute carousel-center carousel space-x-6">
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
        </div>
        <div className="deck-creatures w-full relative">
          <h3 className="text-2xl font-semibold">Creatures</h3>
          <ul className="absolute carousel-center carousel space-x-6">
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
        </div>
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
}
