import { useRows } from "@latticexyz/react";

import { useMUD } from "../useMud";

export const useGames = () => {
  const {
    network: { storeCache },
  } = useMUD();

  const games = useRows(storeCache, {
    table: "Game",
    namespace: "checkers",
  });

  // console.log("Games Data", { checkerGames, tictactoeGames });

  return {
    games,
  };
};
