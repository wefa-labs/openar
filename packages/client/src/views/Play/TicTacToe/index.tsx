import React from "react";
import { a, useTransition } from "@react-spring/web";

import { GameMode, useGame } from "../../../hooks/games/useGame";
import { useTicTacToe } from "../../../hooks/games/useTicTacToe";

import { TicTacToe2D } from "./2D";
import { TicTacToe3D } from "./3D";

interface TicTacToeProps {
  user: `0x${string}`;
  gameId: string;
  gameMode: GameMode;
}

export const TicTacToeGame: React.FC<TicTacToeProps> = ({
  user,
  gameId,
  gameMode,
}) => {
  const {
    mode,
    // state,
    // setMode,
    // setState
  } = useGame(gameMode);
  const ticTacToeData = useTicTacToe(user, gameId);

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
      {item === "2D" && <TicTacToe2D {...ticTacToeData} />}
      {item === "3D" && <TicTacToe3D {...ticTacToeData} />}
    </a.main>
  ));
};
