import React from "react";
import { a, SpringValue } from "@react-spring/web";

export interface WefaBadgeCardProps extends WefaBadge {
  style?: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
}

export const WefaBadgeCard: React.FC<WefaBadgeCardProps> = ({
  name,
  Icon,
  description,
  style,
}) => {
  return (
    <a.li style={style} className="">
      <label
        htmlFor="badge-viewer-dialog"
        className="unselectable card-compact card-side card bg-base-100 shadow-xl cursor-pointer py-2 px-2"
      >
        <figure className="w-24 aspect-square object-cover rounded-lg">
          <img src={Icon} alt={name} />
        </figure>
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="line-clamp-2">{description}</p>
        </div>
      </label>
    </a.li>
  );
};
