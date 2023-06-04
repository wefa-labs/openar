import { DeckDataProps, useDeck } from "../../hooks/views/useDeck";

import { DeckCard } from "../../components/Deck/Card";
import { DeckViewer } from "../../components/Deck/Viewer";
import { DeckStats } from "../../components/Deck/Stats";

interface DeckProps extends DeckDataProps {}

const Deck: React.FC<DeckProps> = () => {
  const {
    plantTrail,
    creatureTrail,
    plants,
    viewerOpen,
    creatures,
    openSheet,
    // closeSheet,
    sheetData,
  } = useDeck();

  return (
    <section className="deck-view w-full h-full flex flex-col gap-6 justify-center pt-16">
      {/* <button className="btn btn-primary" onClick={() => openSheet({})}>
          Start Battle
        </button> */}
      <DeckStats />
      <div className="deck-plants w-full relative">
        <h3 className="text-2xl font-semibold  px-6 sm:px-12">Plants</h3>
        <ul className="absolute carousel-center carousel space-x-6  px-6 sm:px-12 w-full">
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
        <h3 className="text-2xl font-semibold px-6 sm:px-12">Creatures</h3>
        <ul className="absolute carousel-center carousel space-x-6  px-6 sm:px-12 w-full">
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
      <DeckViewer {...sheetData} open={viewerOpen} />
    </section>
  );
};

export default Deck;
