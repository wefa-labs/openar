import { getComponentValue } from "@latticexyz/recs";
import { awaitStreamValue } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

enum MapSize {
  Small = 0,
  Medium = 1,
  Large = 2,
}

enum TicTacToeRole {
  O = 0,
  X = 1,
}

enum CheckerRole {
  RED = 0,
  BLACK = 1,
}

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity }: SetupNetworkResult,
  { Counter }: ClientComponents
) {
  const increment = async () => {
    const tx = await worldSend("openar_Increment_increment", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  const createMap = async (
    name: string,
    description: string,
    image: string,
    size: MapSize
  ) => {
    const tx = await worldSend("openar_MapSystem_createMap", [""]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const createCheckersGame = async (name: string, role: CheckerRole) => {
    const tx = await worldSend("openar_MapSystem_createMap", [""]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const joinCheckersGame = async (gameId: string) => {
    const tx = await worldSend("openar_MapSystem_createMap", [""]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const makeCheckerMove = async (gameId: number, from: number, to: number) => {
    const tx = await worldSend("openar_MapSystem_createMap", [""]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const createTicTacToeGame = async (name: string, role: TicTacToeRole) => {
    // const tx = await worldSend("tictactoe_GameInit_create", [role, name]);
    // await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const joinTicTacToeGame = async (gameId: string) => {
    // const tx = await worldSend("tictactoe_GameInit_join", [gameId]);
    // await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const claimTicTacToePosition = async (gameId: string, position: number) => {
    // const tx = await worldSend("tictactoe_GameMove_claimPosition", [
    //   gameId,
    //   position,
    // ]);
    // await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  return {
    increment,
    createMap,
    createCheckersGame,
    joinCheckersGame,
    makeCheckerMove,
    createTicTacToeGame,
    joinTicTacToeGame,
    claimTicTacToePosition,
  };
}

// role on Wefa
// get other people involve
// weeding, planting, harvesting
