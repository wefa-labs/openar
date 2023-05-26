import { createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { latticeTestnet } from "@latticexyz/common/chains";

import "@rainbow-me/rainbowkit/styles.css";

const { chains, publicClient } = configureChains(
  [latticeTestnet],
  [alchemyProvider({ apiKey: import.meta.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "OpenAR",
  chains,
});

const config = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

export { chains, config };
