import React from "react";
import { a, SpringValue, Interpolation } from "@react-spring/web";
import { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";

import { DeckCardData } from "./Card";

export interface DeckSheetData extends DeckCardData {
  type: "creature" | "plant";
  canceled?: boolean;
}

export interface DeckSheetProps extends DeckSheetData, ReactDOMAttributes {
  style: {
    display: Interpolation<number, "none" | "block">;
    bottom: string;
    y: SpringValue<number>;
  };
}

// TODO: Stylize Bleyle following desings in Figma
export const DeckSheet: React.FC<DeckSheetProps> = ({
  style,
  actions,
  image,
  name,
  type,
  canceled,
  description,
  ...attributes
}) => {
  return (
    <a.aside
      className="fixed bottom-0 left-0 right-0 z-10 mb-16 flex h-screen touch-pan-y flex-col gap-4 rounded-lg p-4 "
      style={style}
      {...attributes}
    >
      Bottom Sheet
    </a.aside>
  );
};
