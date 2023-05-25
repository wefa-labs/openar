import { useRow } from "@latticexyz/react";
import { useMUD } from "../useMud";

export const useCheckers = (
  user: `0x${string}`,
  id: `0x${string}`,
  game: Checkers
) => {
  const {
    network: { storeCache },
    systemCalls: { makeCheckerMove },
  } = useMUD();
  const identity = useRow(storeCache, {
    table: "Identity",
    namespace: "checkers",
    key: { id },
  });
  const yourRole = useRow(storeCache, {
    table: "Role",
    namespace: "checkers",
    key: { user, gameId: id, matchId: id },
  });

  console.log("Checkers Game Data", identity, yourRole, game);

  return {
    identity,
    yourRole,
    game,
    makeCheckerMove,
  };
};
