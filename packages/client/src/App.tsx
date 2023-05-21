import { WagmiConfig } from "wagmi";
import { BrowserRouter } from "react-router-dom";

import { wagmiClient } from "./modules/wagmi";
import {
  DeviceDetectProvider,
  isHandheld,
} from "./hooks/device/useDeviceDetect";

import { Appbar } from "./components/Layout/AppBar";
import { Header } from "./components/Layout/Header";
import { NotificationProvider } from "./components/Layout/Notifications";

import Views from "./views";

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <DeviceDetectProvider value={isHandheld ? "handheld" : "desktop"}>
        <NotificationProvider>
          <BrowserRouter>
            <Header />
            <Appbar />
            <Views />
          </BrowserRouter>
        </NotificationProvider>
      </DeviceDetectProvider>
    </WagmiConfig>
  );
}

export default App;
