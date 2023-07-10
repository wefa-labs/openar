import { useState } from "react";

import { useMUD } from "../useMud";
import { useGames } from "../games/useGames";
import { TicTacToeRole } from "../../modules/openar/createSystemCalls";

type ViewState = "games" | "tic-tac-toe" | "counter";

export interface PlayDataProps {
  view: ViewState;
  // checkerGames: any[];
  games: any[];
  setView: React.Dispatch<React.SetStateAction<ViewState>>;
  createTicTacToeMatch: (
    role: TicTacToeRole,
    name: string,
    worldId: string,
    spaceId: string
  ) => Promise<void>;
  joinTicTacToeMatch: (gameId: string) => Promise<void>;
  handleGameSelection: (game: "tic-tac-toe" | "checkers") => void;
}

export const usePlay = (): PlayDataProps => {
  const [view, setView] = useState<ViewState>("tic-tac-toe");

  const {
    systemCalls: { createTicTacToeMatch, joinTicTacToeMatch },
  } = useMUD();
  const { games } = useGames();

  // console.log("Play Data", { checkerGames, games });

  function handleGameSelection(game: "tic-tac-toe" | "checkers") {
    if (game === "checkers") {
      // setView("checkers");
    } else if (game === "tic-tac-toe") {
      setView("tic-tac-toe");
    } else if (game === "counter") {
      setView("counter");
    }
  }

  return {
    view,
    // checkerGames,
    games,
    setView,
    createTicTacToeMatch,
    joinTicTacToeMatch,
    handleGameSelection,
  };
};
