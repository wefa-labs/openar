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
}

export const DeckCard: React.FC<DeckCardProps> = ({
  name,
  description,
  image,
  style,
  actions,
  onClick,
}) => {
  return (
    <a.li
      style={style}
      onClick={onClick}
      className="card-compact carousel-item card bg-base-100 shadow-xl"
    >
      <figure>
        <img src={image} alt={name} />
      </figure>
      <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <p>{description}</p>
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
    </a.li>
  );
};
