import { useRow, useRows } from "@latticexyz/react";

import { useMUD } from "../useMud";

export const useSpace = (id: `0x${string}`) => {
  const {
    network: { storeCache },
    systemCalls: { createCheckersGame, createTicTacToeMatch },
  } = useMUD();

  const state = useRow(storeCache, {
    key: { id },
    table: "State",
    // namespace: "openar",
  });

  const identity = useRow(storeCache, {
    key: { id },
    table: "Identity",
    // namespace: "openar",
  });

  const cells = useRows(storeCache, {
    // key: { eq: { spaceId: id } },
    table: "Cell",
    // namespace: "openar",
  });

  console.log("Space Data", { id, state, identity, cells });

  return {
    state,
    identity,
    cells,
    createCheckersGame,
    createTicTacToeMatch,
  };
};
