import { useRows } from "@latticexyz/react";

import { useMUD } from "../useMud";

export const useGames = () => {
  const {
    network: { storeCache },
  } = useMUD();

  const checkerGames = useRows(storeCache, {
    table: "Game",
    namespace: "checkers",
  });
  const tictactoeGames = useRows(storeCache, {
    table: "Match",
    namespace: "tictactoe",
  });

  console.log("Games Data", { checkerGames, tictactoeGames });

  return {
    checkerGames,
    tictactoeGames,
  };
};
