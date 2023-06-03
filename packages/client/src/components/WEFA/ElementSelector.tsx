import React from "react";
import { a, config, useTrail } from "@react-spring/web";

import { RC as WaterIcon } from "../../assets/water.svg";
import { RC as EarthIcon } from "../../assets/earth.svg";
import { RC as FireIcon } from "../../assets/fire.svg";
import { RC as AirIcon } from "../../assets/air.svg";
import useDeviceDetect from "../../hooks/app/useDeviceDetect";

interface ElementSelectorProps {
  selectedElement: WefaElement | null;
  onElementSelected: (element: WefaElement) => void;
}

interface WefaElementData {
  name: string;
  description: string;
  image: string;
  color: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

const elements: WefaElement[] = ["water", "earth", "air", "fire"];

const elementData: Record<WefaElement, WefaElementData> = {
  water: {
    name: "Water",
    description: "Change, Adaptability, and Flexibility.",
    image:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    color: "#3b82f6",
    Icon: WaterIcon,
  },
  earth: {
    name: "Earth",
    description: "Substance, Stability, and Rigidity.",
    image:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    color: "#047857",
    Icon: EarthIcon,
  },
  fire: {
    name: "Fire",
    description: "Power, Assertiveness, and Passion.",
    image:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    color: "#dc2626",
    Icon: FireIcon,
  },
  air: {
    name: "Air",
    description: "Freedom, Expansion, and Movement.",
    image:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    color: "#eab308",
    Icon: AirIcon,
  },
};

export const ElementSelector: React.FC<ElementSelectorProps> = ({
  selectedElement,
  onElementSelected,
}) => {
  const { isDesktop } = useDeviceDetect();
  const elementTrail = useTrail(elements.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { ...config.default, clamp: true },
  });

  function handleSelect(element: WefaElement) {
    onElementSelected(element);
  }

  return (
    <div
      className={`explore-selector flex h-full w-full basis-1/2 flex-col items-center gap-2 overflow-hidden pb-4 ${
        isDesktop ? "" : ""
      }`}
    >
      <h2 className="flex w-full items-center justify-center gap-3 pt-2 font-semibold tracking-wide text-slate-800">
        <span className="flex flex-1 justify-end text-xl">Select</span>
        <span className="flex-1 text-xl"> Element</span>
      </h2>
      <ul className="grid w-full grid-cols-2 grid-rows-2 gap-3 lg:grid-cols-4 lg:grid-rows-1">
        {elementTrail.map((style, index) => {
          const element = elements[index];
          const data = elementData[element];

          const Icon = data.Icon;

          return (
            <a.li
              key={element}
              style={{
                ...style,
                backgroundColor:
                  selectedElement === element ? `${data.color}72` : undefined,
                borderColor:
                  selectedElement === element ? `${data.color}` : undefined,
              }}
              className={`flex aspect-square transform-gpu cursor-pointer flex-col items-center rounded-xl border-2 p-2 text-center`}
              onClick={() => handleSelect(element)}
            >
              <Icon style={{ fill: data.color }} />
              <h3
                className={`text-2xl font-bold`}
                style={{ color: data.color }}
              >
                {data.name}
              </h3>
              <p className="line-clamp-3 text-sm font-light">
                {data.description}
              </p>
            </a.li>
          );
        })}
      </ul>
    </div>
  );
};
