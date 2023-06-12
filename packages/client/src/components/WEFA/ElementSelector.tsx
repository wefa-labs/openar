import React from "react";
import { a, config, useSpring } from "@react-spring/web";

import { useApp } from "../../hooks/app/useApp";
import { elementData, elements } from "../../constants";

interface ElementSelectorProps {
  active: boolean;
  selectedElement: WefaElement | null;
  onElementSelected: (element: WefaElement) => void;
}

export const ElementSelector: React.FC<ElementSelectorProps> = ({
  active,
  selectedElement,
  onElementSelected,
}) => {
  const { isDesktop } = useApp();
  // const elementTrail = useTrail(elements.length, {
  //   from: { opacity: 0 },
  //   to: { opacity: 1 },
  //   config: { ...config.default, clamp: true },
  // });

  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: active ? 1 : 0 },
    config: { ...config.gentle, clamp: true },
  });

  function handleSelect(element: WefaElement) {
    onElementSelected(element);
  }

  return (
    <div
      className={`explore-selector flex flex-col items-center gap-2 overflow-hidden pb-4 ${
        isDesktop ? "" : ""
      }`}
    >
      <a.h2
        className="flex w-full items-center justify-center gap-3 pt-2 font-semibold tracking-wide text-slate-800"
        style={spring}
      >
        <span className="flex flex-1 justify-end text-xl">Select</span>
        <span className="flex-1 text-xl"> Element</span>
      </a.h2>
      <ul className="grid w-full grid-cols-2 grid-rows-2 gap-3 lg:grid-cols-4 lg:grid-rows-1">
        {elements.map((element) => {
          const data = elementData[element];

          const Icon = data.Icon;

          return (
            <a.li
              key={element}
              style={{
                backgroundColor:
                  selectedElement === element ? `${data.color}72` : undefined,
                borderColor:
                  selectedElement === element ? `${data.color}` : undefined,
              }}
              className={`${
                active ? "" : "opacity-75"
              } h-full flex transform-gpu cursor-pointer flex-col items-center rounded-xl border-2 border-transparent p-2 text-center bg-base-100 shadow-xl`}
              onClick={() => handleSelect(element)}
            >
              <Icon
                style={{ fill: data.color, opacity: active ? 1 : 0.5 }}
                className={`
                ${active ? "" : "opacity-75"}
              `}
              />
              <h3
                className={`text-2xl font-bold ${active ? "" : "opacity-40"}`}
                style={{ color: data.color }}
              >
                {data.name}
              </h3>
              {/* <p className="line-clamp-3 text-sm font-light">
                {data.description}
              </p> */}
            </a.li>
          );
        })}
      </ul>
    </div>
  );
};
