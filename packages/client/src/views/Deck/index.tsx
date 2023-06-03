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
    <section className="deck-view w-full h-full overflow-hidden">
      <a.div
        className="flex w-full flex-col gap-4"
        onClick={() => closeSheet()}
        style={bgStyle}
      >
        <DeckStats />
        <div className="deck-plants">
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
        </div>
        <div className="deck-creatures">
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
