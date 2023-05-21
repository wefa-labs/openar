import { getComponentValue } from "@latticexyz/recs";
import { awaitStreamValue } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { Wefadex } from "../components/Deck";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity }: SetupNetworkResult,
  { Counter }: ClientComponents
) {
  const increment = async () => {
    const tx = await worldSend("increment", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  const createGame = async (role: 0 | 1, name: string) => {
    const tx = await worldSend("create", [role, name]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const joinGame = async (gameId: string) => {
    const tx = await worldSend("join", [gameId]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  return {
    increment,
    createGame,
    joinGame,
  };
}

// role on Wefa
// get other people involve
// weeding, planting, harvesting
