import { useRow, useRows } from "@latticexyz/react";

import { useMUD } from "../useMud";

export const useWorld = (id: `0x${string}`) => {
  const {
    network: { storeCache },
    systemCalls: { claimSpace },
  } = useMUD();

  const state = useRow(storeCache, {
    key: [id],
    table: "State",
    namespace: "openar",
  });

  const identity = useRow(storeCache, {
    key: { id },
    table: "Identity",
    namespace: "openar",
  });

  const spaces = useRows(storeCache, {
    // key: { eq: { spaceId: id } },
    table: "Space",
    namespace: "openar",
  });

  console.log("World Data", { id, state, identity, spaces });

  return {
    state,
    identity,
    spaces,
    claimSpace,
  };
};
