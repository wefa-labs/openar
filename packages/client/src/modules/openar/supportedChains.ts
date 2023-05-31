import { MUDChain, latticeTestnet } from "@latticexyz/common/chains";
import { foundry, optimism, optimismGoerli } from "@wagmi/chains";

// If you are deploying to chains other than anvil or Lattice testnet, add them here
export const supportedChains: MUDChain[] = import.meta.env.DEV
  ? [foundry, latticeTestnet]
  : [latticeTestnet];
