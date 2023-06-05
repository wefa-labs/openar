import { useState } from "react";
import { a, useTransition } from "@react-spring/web";

import { useApp } from "../../hooks/app/useApp";
import { DeckDataProps, DeckTab } from "../../hooks/views/useDeck";

import { DeckStats } from "../../components/Deck/Stats";
import { DeckViewer, DeckViewerData } from "../../components/Deck/Viewer";
import { DeckItems } from "../../components/Deck/Items";

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
      tension: 300,
      friction: 20,
      clamp: true,
    },
  });

  return (
    <section className="deck-view flex flex-col justify-center pt-6">
      <a.div
        className="deck-stats px-6 sm:px-12 grid place-items-center"
        style={statsSpring}
      >
        <DeckStats />
      </a.div>
      <a.div
        className="deck-tabs flex flex-col rounded-t-3xl px-6 pt-3 bg-primary shadow-xl"
        style={tabsSpring}
      >
        <div className="tabs tabs-boxed w-fit">
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
