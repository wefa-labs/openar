import { a, useTransition } from "@react-spring/web";

import { usePlay } from "../../hooks/views/usePlay";

import { Counter } from "./Counter";
import { TicTacToeGame } from "./TicTacToe";

export default function Play() {
  const {
    view,
    // checkerGames,
    // tictactoeGames,
    // setView,
    // createCheckersGame,
    // createTicTacToeMatch,
    // joinCheckersGame,
    // joinTicTacToeMatch,
  } = usePlay();

  const transitions = useTransition(view, {
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
      {item === "games" && <div>Games</div>}
      {item === "counter" && <Counter />}
      {item === "tic-tac-toe" && <TicTacToeGame gameMode="2D" />}
    </a.main>
  ));
}
