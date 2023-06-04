import React from "react";
import { a, config, useTrail } from "@react-spring/web";

import useDeviceDetect from "../../hooks/app/useDeviceDetect";
import { elementData, elements } from "../../constants";

interface ElementSelectorProps {
  selectedElement: WefaElement | null;
  onElementSelected: (element: WefaElement) => void;
}

// TODO: Stylize Bleyle to make similar to other card components in other tabs
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
