import { useRow } from "@latticexyz/react";
import { useMUD } from "../useMud";

export const useTicTacToe = (
  user: `0x${string}`,
  id: `0x${string}`,
  game: TicTacToe
) => {
  const {
    network: { storeCache },
    systemCalls: { claimTicTacToePosition },
  } = useMUD();
  const identity = useRow(storeCache, {
    table: "Identity",
    key: {},
  });
  const yourRole = useRow(storeCache, {
    table: "Role",
    key: {},
  });

  console.log(
    "TicTacToe Game Data",
    identity,
    yourRole,
    claimTicTacToePosition
  );

  return {
    identity,
    yourRole,
    game,
    claimTicTacToePosition,
  };
};
