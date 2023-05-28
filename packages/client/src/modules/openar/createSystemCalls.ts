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

  // CHECKERS CALLS
  const createCheckersGame = async (
    role: CheckerRole,
    name: string,
    spaceId: string
  ) => {
    const tx = await worldSend("checkers_GameStart_create", [
      role,
      name,
      spaceId,
    ]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const joinCheckersGame = async (gameId: string, spaceId: string) => {
    const tx = await worldSend("checkers_GameStart_join", [gameId, spaceId]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const makeCheckerMove = async (
    gameId: string,
    spaceId: string,
    from: number,
    to: number
  ) => {
    const tx = await worldSend("checkers_GameMove_movePosition", [
      gameId,
      spaceId,
      from,
      to,
    ]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  // TIC TAC TOE CALLS
  const createTicTacToeMatch = async (
    role: TicTacToeRole,
    name: string,
    spaceId: string
  ) => {
    const tx = await worldSend("tictactoe_GameStart_create", [
      role,
      name,
      spaceId,
    ]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const joinTicTacToeMatch = async (matchId: string) => {
    const tx = await worldSend("tictactoe_GameStart_join", [matchId]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const claimTicTacToePosition = async (matchId: string, position: number) => {
    const tx = await worldSend("tictactoe_GameMove_claimPosition", [
      matchId,
      position,
    ]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const claimTicTacToeCollectible = async (matchId: string) => {
    const tx = await worldSend("tictactoe_GameCollectible_claim", [matchId]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  return {
    increment,
    createWorld,
    claimSpace,
    createCheckersGame,
    joinCheckersGame,
    makeCheckerMove,
    createTicTacToeMatch,
    joinTicTacToeMatch,
    claimTicTacToePosition,
    claimTicTacToeCollectible,
  };
}
