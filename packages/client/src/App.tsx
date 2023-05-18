import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";

// import { WagmiConfig } from "wagmi";
// import { BrowserRouter } from "react-router-dom";

// import { wagmiClient } from "./modules/wagmi";
// import {
//   DeviceDetectProvider,
//   isHandheld,
// } from "./hooks/device/useDeviceDetect";

// import { Appbar } from "../../test/packages/client/src/components/Layout/AppBar";
// import { Header } from "../../test/packages/client/src/components/Layout/Header";
// import { NotificationProvider } from "../../test/packages/client/src/components/Layout/Notifications";

// import Views from "../../test/packages/client/src/views";

// function App() {
//   return (
//     <WagmiConfig client={wagmiClient}>
//       <DeviceDetectProvider value={isHandheld ? "handheld" : "desktop"}>
//         <NotificationProvider>
//           <BrowserRouter>
//             {isHandheld ? <Appbar /> : <Header />}
//             <Views />
//           </BrowserRouter>
//         </NotificationProvider>
//       </DeviceDetectProvider>
//     </WagmiConfig>
//   );
// }

export const App = () => {
  const {
    components: { Counter },
    systemCalls: { increment },
    network: { singletonEntity },
  } = useMUD();

  const counter = useComponentValue(Counter, singletonEntity);

  return (
    <>
      <div>
        Counter: <span>{counter?.value ?? "??"}</span>
      </div>
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("new counter value:", await increment());
        }}
      >
        Increment
      </button>
    </>
  );
};
