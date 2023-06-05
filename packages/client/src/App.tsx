import { WagmiConfig } from "wagmi";
import { ErrorBoundary } from "@sentry/react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { config, chains } from "./modules/wagmi";
import { DeviceDetectProvider, isHandheld } from "./hooks/app/useDeviceDetect";

import { Appbar } from "./components/Layout/AppBar";
import { Header } from "./components/Layout/Header";
// import { NotificationProvider } from "./components/Layout/Notifications";

import Views from "./views";

function App() {
  return (
    <ErrorBoundary fallback={<p>An error has occurred</p>}>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains}>
          <DeviceDetectProvider value={isHandheld ? "handheld" : "desktop"}>
            <BrowserRouter>
              <Header />
              <Appbar />
              <Views />
              <ToastContainer className="bottom-16" />
            </BrowserRouter>
          </DeviceDetectProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ErrorBoundary>
  );
}

export default App;
