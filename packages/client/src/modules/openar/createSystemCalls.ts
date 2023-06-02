import { getComponentValue } from "@latticexyz/recs";
import { awaitStreamValue } from "@latticexyz/utils";

import { SetupNetworkResult } from "./setupNetwork";
import { ClientComponents } from "./createClientComponents";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

// enum MapSize {
//   Small = 0,
//   Medium = 1,
//   Large = 2,
// }

enum TicTacToeRole {
  O = 0,
  X = 1,
}

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity }: SetupNetworkResult,
  { Counter }: ClientComponents
) {
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
    worldId: string,
    spaceId: string
  ) => {
    const tx = await worldSend("createGame", [role, name, worldId, spaceId]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const joinTicTacToeMatch = async (gameId: string) => {
    const tx = await worldSend("joinGame", [gameId]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const claimTicTacToePosition = async (
    gameId: string,
    matchNumber: number,
    position: number
  ) => {
    const tx = await worldSend("claimPosition", [
      gameId,
      matchNumber,
      position,
    ]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const claimTicTacToeCollectible = async (gameId: string) => {
    const tx = await worldSend("claimGameTrophy", [gameId]);
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

// role on Wefa
// get other people involve
// weeding, planting, harvesting
