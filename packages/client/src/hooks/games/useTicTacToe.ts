import { useRow } from "@latticexyz/react";

import { useMUD } from "../useMud";

export interface TicTacToeDataProps {
  name: string;
  description?: string;
  image?: string;
  role: string;
  turnCount: number;
  currentPlayer: string;
  matchNumber: number;
  matchWinner?: string;
  gameWinner?: string;
  players: string[];
  board: number[];
  claimTicTacToePosition: (
    gameId: string,
    matchNumber: number,
    position: number
  ) => Promise<void>;
}

export const useTicTacToe = (
  user: `0x${string}`,
  gameId: string
): TicTacToeDataProps => {
  const {
    network: { storeCache },
    systemCalls: { claimTicTacToePosition },
  } = useMUD();
  const identity = useRow(storeCache, {
    table: "Identity",
    key: {},
  });
  const role = useRow(storeCache, {
    table: "Role",
    key: {},
  });
  const game = useRow(storeCache, {
    table: "Game",
    key: {},
  });
  const match = useRow(storeCache, {
    table: "Match",
    key: {},
  });

  return {
    name: "",
    matchNumber: 0,
    players: [],
    board: [],
    currentPlayer: "",
    role: "",
    turnCount: 0,
    description: "",
    image: "",
    matchWinner: "",
    gameWinner: "",
    ...identity,
    ...role,
    ...game,
    ...match,
    claimTicTacToePosition,
  };
};
