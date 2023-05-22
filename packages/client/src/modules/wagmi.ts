import { createClient, configureChains } from "wagmi";
import { optimismGoerli, optimism } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";

const { chains, provider, webSocketProvider } = configureChains(
  [optimismGoerli, optimism],
  [alchemyProvider({ apiKey: import.meta.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Open AR",
  projectId: "ec43956523c23098d98f8fc8cc8db3c6",
  chains,
});

export const generateClient = () =>
  createClient({
    autoConnect: false,
    connectors,
    provider,
    webSocketProvider,
  });

export { chains };

export const wagmiClient = generateClient();
