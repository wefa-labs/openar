import { useEffect, useState } from "react";
import { a, config, useTransition } from "@react-spring/web";

import { useApp } from "../../hooks/app/useApp";
import { DeckDataProps, DeckTab } from "../../hooks/views/useDeck";

import { DeckStats } from "../../components/Deck/Stats";
import { DeckViewer, DeckViewerData } from "../../components/Deck/Viewer";
import { DeckItems } from "../../components/Deck/Items";
import { useWefa } from "../../hooks/wefa/useWefa";

const tabs: DeckTab[] = ["plants", "creatures"];

interface DeckProps extends DeckDataProps {}

const Deck: React.FC<DeckProps> = ({
  tab,
  changeTab,
  plants,
  creatures,
  plantTrail,
  creatureTrail,
  statsSpring,
  tabsSpring,
}) => {
  const { isDesktop } = useApp();
  const { energy, handleFetchEnergy, handleFetchPlants, handleFetchCreatures } =
    useWefa();

  const [viewerOpen, setViewerOpen] = useState(false);
  const [sheetData, setSheetData] = useState<DeckViewerData>({
    name: "",
    description: "",
    image: "",
    type: "creature",
    actions: [],
  });

  function openSheet({ data }: { data?: DeckViewerData }) {
    data && setSheetData(data);
    setViewerOpen(true);
  }

  function closeSheet() {
    setViewerOpen(false);
  }

  const transition = useTransition(tab, {
    from: { opacity: 0, transform: "translate3d(0, 0, 100%)" },
    enter: { opacity: 1, transform: "translate3d(0, 0%, 0)" },
    leave: { opacity: 0, transform: "translate3d(0,0, -100%)" },
    config: {
      ...config.gentle,
      clamp: true,
    },
  });

  useEffect(() => {
    handleFetchEnergy();
    handleFetchPlants();
    handleFetchCreatures();
  }, []);

  return (
    <section className="deck-view flex-col justify-center bg-primary">
      <a.div className="deck-stats sm:px-6 px-3 w-full" style={statsSpring}>
        <DeckStats energy={energy} />
      </a.div>
      <a.div
        style={tabsSpring}
        className="deck-tabs relative flex flex-col rounded-t-3xl w-full px-6 bg-base-100 shadow-xl"
      >
        <div className="absolute top-3 left-3 tabs tabs-boxed rounded-xl w-fit z-10">
          {tabs.map((name) => (
            <button
              key={name}
              className={`tab capitalize w-20 ${
                name === tab ? "tab-active" : ""
              }`}
              onClick={() => changeTab(name)}
              type="button"
            >
              {name}
            </button>
          ))}
        </div>
        {transition((style, tab) => (
          <a.div style={style} className="h-full">
            {tab === "plants" && (
              <DeckItems
                type={tab}
                isDesktop={isDesktop}
                items={plants}
                trail={plantTrail}
                openSheet={openSheet}
              />
            )}
            {tab === "creatures" && (
              <DeckItems
                type={tab}
                isDesktop={isDesktop}
                items={creatures}
                trail={creatureTrail}
                openSheet={openSheet}
              />
            )}
          </a.div>
        ))}
      </a.div>
      <DeckViewer {...sheetData} open={viewerOpen} onDismiss={closeSheet} />
    </section>
  );
};

export default Deck;
