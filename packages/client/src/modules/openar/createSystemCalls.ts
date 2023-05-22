import { getComponentValue } from "@latticexyz/recs";
import { awaitStreamValue } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity }: SetupNetworkResult,
  { Counter }: ClientComponents
) {
  const increment = async () => {
    const tx = await worldSend("openar_Increment_increment", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  // const createGame = async (role: 0 | 1, name: string) => {
  //   const tx = await worldSend("tictactoe_GameInit_create", [role, name]);
  //   await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  // };

  // const joinGame = async (gameId: string) => {
  //   const tx = await worldSend("tictactoe_GameInit_join", [gameId]);
  //   await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  // };

  // const claimPosition = async (gameId: string, position: number) => {
  //   const tx = await worldSend("tictactoe_GameMove_claimPosition", [
  //     gameId,
  //     position,
  //   ]);
  //   await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  // };

  return {
    increment,
    // createGame,
    // claimPosition,
    // joinGame,
  };
}

// role on Wefa
// get other people involve
// weeding, planting, harvesting
