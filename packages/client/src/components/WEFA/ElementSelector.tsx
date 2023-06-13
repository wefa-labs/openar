import React from "react";
import { a, config, useTransition } from "@react-spring/web";

import { useApp } from "../../hooks/app/useApp";
import { elementData, elements } from "../../constants";
import { ProgressBar } from "../ProgressBar";

type State = "idle" | "loading" | "done";

interface ElementSelectorProps {
  state: State;
  selectedElement: WefaElement | null;
  onElementSelected: (element: WefaElement) => void;
}

export const ElementSelector: React.FC<ElementSelectorProps> = ({
  state,
  selectedElement,
  onElementSelected,
}) => {
  const { isDesktop } = useApp();
  // const elementTrail = useTrail(elements.length, {
  //   from: { opacity: 0 },
  //   to: { opacity: 1 },
  //   config: { ...config.default, clamp: true },
  // });

  const transition = useTransition(state, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
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
      {transition((style, state) => (
        <a.div className="pt-2 w-full" style={style}>
          {state === "idle" && null}
          {state === "loading" && <ProgressBar />}
          {state === "done" && (
            <a.h2 className="flex w-full items-center justify-center gap-3 font-semibold tracking-wide">
              <span className="flex flex-1 justify-end text-xl">Select</span>
              <span className="flex-1 text-xl"> Element</span>
            </a.h2>
          )}
        </a.div>
      ))}
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
                state === "done" ? "" : "opacity-75"
              } h-full flex transform-gpu cursor-pointer flex-col items-center rounded-xl border-2 border-transparent p-2 text-center bg-base-100 shadow-xl`}
              onClick={() => handleSelect(element)}
            >
              <Icon
                style={{
                  fill: data.color,
                  opacity: state === "done" ? 1 : 0.5,
                }}
                className={`
                ${state === "done" ? "" : "opacity-75"}
              `}
              />
              <h3
                className={`text-2xl font-bold ${
                  state === "done" ? "" : "opacity-40"
                }`}
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
