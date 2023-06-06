import React from "react";
import { a, config, useSpring } from "@react-spring/web";

import { useApp } from "../../hooks/app/useApp";

interface PlantInfoProps extends PlantDetails {}

export const PlantInfo: React.FC<PlantInfoProps> = ({
  name,
  description,
  // type,
  // zone,
}) => {
  const { isDesktop } = useApp();

  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      ...config.default,
      clamp: true,
    },
    delay: 420,
  });

  return (
    <a.div
      className={`bg-base-100 p-2 shadow-xl rounded-xl absolute bottom-2 left-2 w-5/6 flex flex-col transition-all ${
        isDesktop ? "" : ""
      }`}
      style={spring}
    >
      <h4 className="line-clamp-1 text-base">
        <span className="font-semibold">{name}</span> Detected
      </h4>
      <p className="line-clamp-1 text-sm font-light">{description}</p>
      {/* <div className="flex gap-3">
        <span className="badge badge-primary">{type}</span>
        <span className="badge badge-secondary">{zone}</span>
      </div> */}
    </a.div>
  );
};
