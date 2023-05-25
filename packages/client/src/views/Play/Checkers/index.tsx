import React from "react";
import { a, useTransition } from "@react-spring/web";

import { GameMode, useGame } from "../../../hooks/games/useGame";

import { Checkers2D } from "./2D";
import { Checkers3D } from "./3D";

interface CheckersProps {
  gameMode: GameMode;
  game?: Checkers;
}

export const CheckersGame: React.FC<CheckersProps> = ({ gameMode }) => {
  const {
    mode,
    // state,
    // setMode,
    // setState
  } = useGame(gameMode);

  const transitions = useTransition(mode, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      tension: 300,
      friction: 20,
      clamp: true,
    },
  });

  return transitions((style, item) => (
    <a.main className="" style={style}>
      {item === "2D" && <Checkers2D />}
      {item === "3D" && <Checkers3D />}
    </a.main>
  ));
};
