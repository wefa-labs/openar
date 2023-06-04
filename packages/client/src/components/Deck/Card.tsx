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
  actions: Action[];
}

export interface DeckCardProps extends DeckCardData {
  style?: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
  onClick?: React.MouseEventHandler<HTMLLIElement>;
  isDesktop: boolean;
}

export const DeckCard: React.FC<DeckCardProps> = ({
  name,
  // description,
  image,
  style,
  actions,
  onClick,
}) => {
  return (
    <a.li style={style} onClick={onClick} className="carousel-item">
      <label
        htmlFor="deck-viewer-dialog"
        className="card-compact card bg-base-100 shadow-xl cursor-pointer"
      >
        <figure className="w-48 aspect-square object-cover overflow-hidden">
          <img src={image} alt={name} />
        </figure>
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          {/* <p>{description}</p> */}
          <div className="card-actions justify-end">
            {actions.map((action) => (
              <button
                key={action.name}
                className="btn-primary btn"
                onClick={action.onClick}
              >
                {action.name}
              </button>
            ))}
          </div>
        </div>
      </label>
    </a.li>
  );
};
