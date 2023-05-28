import { getComponentValue } from "@latticexyz/recs";
import { awaitStreamValue } from "@latticexyz/utils";

import { SetupNetworkResult } from "./setupNetwork";
import { ClientComponents } from "./createClientComponents";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

enum TicTacToeRole {
  O = 0,
  X = 1,
}

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity }: SetupNetworkResult,
  { Counter }: ClientComponents
) {
  // SANITY CHECK
  const increment = async () => {
    const tx = await worldSend("increment", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  // OPENAR CALLS
  const createWorld = async (
    name: string,
    description: string,
    image: string
    // size: WorldSize
  ) => {
    const tx = await worldSend("createWorld", [name, description, image]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);

    console.log("world created");
  };

  const claimSpace = async (worldId: string) => {
    const tx = await worldSend("claimSpace", [worldId]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  // TIC TAC TOE CALLS
  const createTicTacToeMatch = async (
    role: TicTacToeRole,
    name: string,
    spaceId: string
  ) => {
    const tx = await worldSend("GameStart_create", [role, name, spaceId]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const joinTicTacToeMatch = async (matchId: string) => {
    const tx = await worldSend("GameStart_join", [matchId]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const claimTicTacToePosition = async (matchId: string, position: number) => {
    const tx = await worldSend("GameMove_claimPosition", [matchId, position]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const claimTicTacToeCollectible = async (matchId: string) => {
    const tx = await worldSend("GameCollectible_claim", [matchId]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  return {
    increment,
    createWorld,
    claimSpace,
    createTicTacToeMatch,
    joinTicTacToeMatch,
    claimTicTacToePosition,
    claimTicTacToeCollectible,
  };
}
