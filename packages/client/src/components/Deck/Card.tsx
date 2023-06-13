import React from "react";
import { a, SpringValue } from "@react-spring/web";

interface Action {
  name: string;
  onClick: () => void;
  tooltip: string;
}

export interface DeckCardData {
  name: string;
  description?: string | null;
  image: string;
  element?: WefaElement;
  actions: Action[];
}

export interface DeckCardProps extends DeckCardData {
  style?: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
  onClick?: React.MouseEventHandler<HTMLLIElement>;
  paddingTop?: boolean;
  isDesktop: boolean;
}

export const DeckCard: React.FC<DeckCardProps> = ({
  name,
  // description,
  image,
  style,
  element,
  // actions,
  isDesktop,
  paddingTop,
  onClick,
}) => {
  return (
    <a.li style={style} onClick={onClick} className="">
      <label
        htmlFor="deck-viewer-dialog"
        className={`${
          isDesktop ? "" : `${paddingTop ? "mt-16" : ""}`
        } unselectable bg-base-100 shadow-xl cursor-pointer flex justify-between items-center rounded-xl`}
      >
        <div className="pl-4 flex flex-col gap-3">
          <h4 className="font-bold text-xl line-clamp-1 capitalize">{name}</h4>
          {/* <div>
            <span className="badge">Water</span>
          </div> */}
        </div>
        <figure className="h-28 w-28 object-cover md:h-full md:w-48 aspect-square object-cover rounded-xl">
          <img
            src={image}
            alt={name}
            className="object-cover md:h-full md:w-48 aspect-square object-cover rounded-xl"
          />
        </figure>
      </label>
    </a.li>
  );
};
