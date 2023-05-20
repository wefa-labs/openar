import { createClient, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
// import { infuraProvider } from "wagmi/providers/infura";
import { InjectedConnector } from "wagmi/connectors/injected";
import { goerli, optimismGoerli, optimism } from "wagmi/chains";

const { chains, provider, webSocketProvider } = configureChains(
  [goerli, optimism, optimismGoerli], // Using Goerli for testnet experience
  [
    // infuraProvider({
    //   apiKey: process.env.VITE_VERCEL_INFURA_API_KEY ?? "",
    // }),
    publicProvider(),
  ]
);
export const generateClient = () =>
  createClient({
    autoConnect: false,
    connectors: [new InjectedConnector({ chains })],
    provider,
    webSocketProvider,
  });

export const wagmiClient = generateClient();
