import { WagmiConfig } from "wagmi";
import { BrowserRouter } from "react-router-dom";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { wagmiClient, chains } from "./modules/wagmi";
import { DeviceDetectProvider, isHandheld } from "./hooks/useDeviceDetect";

import { Appbar } from "./components/Layout/AppBar";
import { Header } from "./components/Layout/Header";
import { NotificationProvider } from "./components/Layout/Notifications";

import Views from "./views";

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <DeviceDetectProvider value={isHandheld ? "handheld" : "desktop"}>
          <NotificationProvider>
            <BrowserRouter>
              <Header />
              <Appbar />
              <Views />
            </BrowserRouter>
          </NotificationProvider>
        </DeviceDetectProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
