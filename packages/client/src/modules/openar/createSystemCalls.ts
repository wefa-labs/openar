import { getComponentValue } from "@latticexyz/recs";
import { awaitStreamValue } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

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
  // SANITY CHECK
  const increment = async () => {
    const tx = await worldSend("openar_Increment_increment", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  // OPENAR CALLS
  const createMap = async (
    name: string,
    description: string,
    image: string
    // size: MapSize
  ) => {
    const tx = await worldSend("openar_MapSystem_createMap", [
      name,
      description,
      image,
    ]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const claimGrid = async (mapId: string) => {
    const tx = await worldSend("openar_GridSystem_claimGrid", [mapId]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  // CHECKERS CALLS
  const createCheckersGame = async (
    role: CheckerRole,
    name: string,
    gridId: string
  ) => {
    // @ts-ignore
    const tx = await worldSend("checkers_GameStart_create", [
      role,
      name,
      gridId,
    ]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const joinCheckersGame = async (gameId: string, gridId: string) => {
    // @ts-ignore
    const tx = await worldSend("checkers_GameStart_join", [gameId, gridId]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const makeCheckerMove = async (
    gameId: string,
    gridId: string,
    from: number,
    to: number
  ) => {
    // @ts-ignore
    const tx = await worldSend("checkers_GameMove_movePosition", [
      gameId,
      gridId,
      from,
      to,
    ]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  // TIC TAC TOE CALLS
  const createTicTacToeMatch = async (name: string, role: TicTacToeRole) => {
    // @ts-ignore
    const tx = await worldSend("tictactoe_GameStart_create", [role, name]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const joinTicTacToeMatch = async (matchId: string) => {
    // @ts-ignore
    const tx = await worldSend("tictactoe_GameStart_join", [matchId]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const claimTicTacToePosition = async (matchId: string, position: number) => {
    // @ts-ignore
    const tx = await worldSend("tictactoe_GameMove_claimPosition", [
      matchId,
      position,
    ]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const claimTicTacToeCollectible = async (matchId: string) => {
    // @ts-ignore
    const tx = await worldSend("tictactoe_GameCollectible_claim", [matchId]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  return {
    increment,
    createMap,
    claimGrid,
    createCheckersGame,
    joinCheckersGame,
    makeCheckerMove,
    createTicTacToeMatch,
    joinTicTacToeMatch,
    claimTicTacToePosition,
    claimTicTacToeCollectible,
  };
}
