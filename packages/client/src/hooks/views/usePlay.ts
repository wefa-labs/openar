import { useState } from "react";

// import { useMUD } from "../useMud";
// import { useGames } from "../games/useGames";
// import { TicTacToeRole } from "../../modules/openar/createSystemCalls";

type ViewState = "games" | "tic-tac-toe" | "counter";

export interface PlayDataProps {
  view: ViewState;
  // checkerGames: any[];
  // tictactoeGames: any[];
  setView: React.Dispatch<React.SetStateAction<ViewState>>;
  // createTicTacToeMatch: (
  //   role: TicTacToeRole,
  //   name: string,
  //   worldId: string,
  //   spaceId: string
  // ) => Promise<void>;
  // joinTicTacToeMatch: (gameId: string) => Promise<void>;
}

export const usePlay = (): PlayDataProps => {
  const [view, setView] = useState<ViewState>("tic-tac-toe");

  // const {
  //   systemCalls: { createTicTacToeMatch, joinTicTacToeMatch },
  // } = useMUD();
  // const { checkerGames, tictactoeGames } = useGames();

  // console.log("Play Data", { checkerGames, tictactoeGames });

  // function handleGameSelection(game: "tic-tac-toe" | "checkers") {
  //   if (game === "checkers") {
  //     setView("checkers");
  //   } else if (game === "tic-tac-toe") {
  //     setView("tic-tac-toe");
  //   }
  // }

  return {
    view,
    // checkerGames,
    // tictactoeGames,
    setView,
    // createTicTacToeMatch,
    // joinTicTacToeMatch,
  };
};
