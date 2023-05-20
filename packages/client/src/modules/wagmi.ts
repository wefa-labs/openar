import { createClient, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { optimismGoerli, optimism } from "wagmi/chains";

const { chains, provider, webSocketProvider } = configureChains(
  [optimismGoerli, optimism],
  [publicProvider()]
);
export const generateClient = () =>
  createClient({
    autoConnect: false,
    connectors: [new InjectedConnector({ chains })],
    provider,
    webSocketProvider,
  });

export const wagmiClient = generateClient();
