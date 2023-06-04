import React from "react";
import { a, useSpring } from "@react-spring/web";

import useDeviceDetect from "../../hooks/app/useDeviceDetect";

interface PlantInfoProps extends PlantDetails {}

export const PlantInfo: React.FC<PlantInfoProps> = ({
  name,
  description,
  type,
  zone,
}) => {
  const { isDesktop } = useDeviceDetect();

  const spring = useSpring({
    from: { opacity: 0, transform: "translateY(100%)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  return (
    <a.div
      className={`absolute bottom-0 left-0 transition-all ${
        isDesktop ? "" : ""
      }`}
      style={spring}
    >
      {name}
      {description}
      {type}
      {zone}
    </a.div>
  );
};
