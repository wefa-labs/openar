import { createClient, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
// import { infuraProvider } from "wagmi/providers/infura";
import { InjectedConnector } from "wagmi/connectors/injected";
import { goerli, polygonMumbai, polygon } from "wagmi/chains";

const { chains, provider, webSocketProvider } = configureChains(
  [goerli, polygon, polygonMumbai], // Using Goerli for testnet experience
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
