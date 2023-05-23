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
  appName: "Open AR",
  projectId: "ec43956523c23098d98f8fc8cc8db3c6",
  chains,
});

const config = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

export { chains, config };
