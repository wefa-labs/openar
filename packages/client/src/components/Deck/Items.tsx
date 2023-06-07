import { SpringValue } from "@react-spring/web";

import { DeckCard } from "./Card";
import { DeckViewerData } from "./Viewer";

interface DeckItemsProps {
  type: "plants" | "creatures";
  isDesktop: boolean;
  items: (Plant | Creature)[];
  trail: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  }[];
  openSheet: ({ data }: { data?: DeckViewerData }) => void;
}

export const DeckItems: React.FC<DeckItemsProps> = ({
  items,
  trail,
  isDesktop,
  openSheet,
  type,
}) => {
  return (
    <ul
      className={
        isDesktop
          ? "grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] px-6 sm:px-12 overflow-auto gap-6 pb-32 pt-6 h-full"
          : "flex flex-col overflow-scroll h-full gap-3 pb-20"
      }
      // className={`grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] px-6 sm:px-12 overflow-scroll h-full`}
    >
      {trail.map((props, index) => (
        <DeckCard
          {...items[index]}
          key={items[index].id}
          style={{ ...props }}
          paddingTop={index === 0}
          onClick={() =>
            openSheet({
              data: {
                ...items[index],
                type: type === "plants" ? "plant" : "creature",
                actions: [],
              },
            })
          }
          isDesktop={isDesktop}
          actions={[]}
        />
      ))}
    </ul>
  );
};
