import {
  createFastTxExecutor,
  createFaucetService,
  getSnapSyncRecords,
} from "@latticexyz/network";
import { getTableIds } from "@latticexyz/utils";
import { Contract, Signer, utils } from "ethers";
import { setupMUDV2Network } from "@latticexyz/std-client";
import { JsonRpcProvider } from "@ethersproject/providers";

import openarStoreConfig from "openar/mud.config";
// import checkersStoreConfig from "checkers/mud.config";
// import tictactoeStoreConfig from "tictactoe/mud.config";
import { IWorld__factory as OpenArWorld } from "openar/types/ethers-contracts/factories/IWorld__factory";
// import { IWorld__factory as CheckersWorld } from "checkers/types/ethers-contracts/factories/IWorld__factory";
// import { IWorld__factory as TictactoeWorld } from "tictactoe/types/ethers-contracts/factories/IWorld__factory";

import { world } from "./world";
import { getNetworkConfig } from "./getNetworkConfig";
import { defineContractComponents as openArComps } from "./contractComponents";
// import { defineContractComponents as checkersArComps } from "./checkers/contractComponents";
// import { defineContractComponents as tictactoeArComp } from "./tictactoe/contractComponents";

export type SetupNetworkResult = Awaited<ReturnType<typeof setupNetwork>>;

export async function setupNetwork() {
  const contractComponents = Object.assign(
    {},
    openArComps(world)
    // checkersArComps(world),
    // tictactoeArComp(world)
  );

  const storeConfig = Object.assign(
    {},
    openarStoreConfig
    // checkersStoreConfig,
    // tictactoeStoreConfig
  );

  const worldAbi = Object.assign(
    {},
    // CheckersWorld.abi,
    OpenArWorld.abi
    // TictactoeWorld.abi
  );

  const networkConfig = await getNetworkConfig();
  const result = await setupMUDV2Network<typeof contractComponents, any>({
    networkConfig,
    world,
    contractComponents: openArComps(world),
    syncThread: "main",
    storeConfig: openarStoreConfig,
    worldAbi: OpenArWorld.abi,
  });

  // Request drip from faucet
  const signer = result.network.signer.get();
  if (networkConfig.faucetServiceUrl && signer) {
    const address = await signer.getAddress();

    console.info("[Dev Faucet]: Player address -> ", address);

    const faucet = createFaucetService(networkConfig.faucetServiceUrl);

    if (address) {
      const requestDrip = async () => {
        const balance = await signer.getBalance();
        console.info(`[Dev Faucet]: Player balance -> ${balance}`);
        const lowBalance = balance?.lte(utils.parseEther("1"));
        if (lowBalance) {
          console.info(
            "[Dev Faucet]: Balance is low, dripping funds to player"
          );
          // Double drip
          await faucet.dripDev({ address });
          await faucet.dripDev({ address });
        }
      };

      requestDrip();

      setInterval(requestDrip, 20000);
    }

    // Request a drip every 20 seconds
  }

  const provider = result.network.providers.get().json;
  // const metamaskProvider = new Web3Provider((window as any).ethereum);
  // const metamaskSigner = metamaskProvider.getSigner();

  const signerOrProvider = signer ?? provider;

  // Create a World contract instance
  const openarWorldContract = OpenArWorld.connect(
    networkConfig.worldAddress,
    signerOrProvider
  );
  // const checkersWorldContract = CheckersWorld.connect(
  //   networkConfig.worldAddress,
  //   signerOrProvider
  // );
  // const tictactoeWorldContract = TictactoeWorld.connect(
  //   networkConfig.worldAddress,
  //   signerOrProvider
  // );

  const worldContract = Object.assign(
    {},
    openarWorldContract
    // checkersWorldContract,
    // tictactoeWorldContract
  );

  if (networkConfig.snapSync) {
    const currentBlockNumber = await provider.getBlockNumber();
    const tableRecords = await getSnapSyncRecords(
      networkConfig.worldAddress,
      getTableIds(openarStoreConfig),
      currentBlockNumber,
      signerOrProvider
    );

    console.log(`Syncing ${tableRecords.length} records`);
    result.startSync(tableRecords, currentBlockNumber);
  } else {
    result.startSync();
  }

  // Create a fast tx executor
  const fastTxExecutor =
    signer?.provider instanceof JsonRpcProvider
      ? await createFastTxExecutor(
          signerOrProvider as Signer & { provider: JsonRpcProvider }
        )
      : null;

  // TODO: infer this from fastTxExecute signature?
  type BoundFastTxExecuteFn<C extends Contract> = <F extends keyof C>(
    func: F,
    args: Parameters<C[F]>,
    options?: {
      retryCount?: number;
    }
  ) => Promise<ReturnType<C[F]>>;

  function bindFastTxExecute<C extends Contract>(
    contract: C
  ): BoundFastTxExecuteFn<C> {
    return async function (...args) {
      if (!fastTxExecutor) {
        throw new Error("no signer");
      }
      const { tx } = await fastTxExecutor.fastTxExecute(contract, ...args);
      return await tx;
    };
  }

  return {
    ...result,
    worldContract,
    worldSend: bindFastTxExecute(openarWorldContract),
    fastTxExecutor,
  };
}
