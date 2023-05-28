import { useState } from "react";

import { useMUD } from "../useMud";
import { useGames } from "../games/useGames";

type ViewState = "games" | "tic-tac-toe" | "counter";

export const usePlay = () => {
  const [view, setView] = useState<ViewState>("counter");

  const {
    systemCalls: { createTicTacToeMatch, joinTicTacToeMatch },
  } = useMUD();
  const { checkerGames, tictactoeGames } = useGames();

  console.log("Play Data", { checkerGames, tictactoeGames });

  // function handleGameSelection(game: "tic-tac-toe" | "checkers") {
  //   if (game === "checkers") {
  //     setView("checkers");
  //   } else if (game === "tic-tac-toe") {
  //     setView("tic-tac-toe");
  //   }
  // }

  return {
    view,
    checkerGames,
    tictactoeGames,
    setView,
    createTicTacToeMatch,
    joinTicTacToeMatch,
  };
};
