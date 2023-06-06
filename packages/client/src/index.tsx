import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
// import { mount as mountDevTools } from "@latticexyz/dev-tools";

// import { setup } from "./modules/openar/setup";

// import { MUDProvider } from "./hooks/useMud";

import { ComingSoon } from "./components/Layout/ComingSoon";
import App from "./App";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-spring-bottom-sheet/dist/style.css";

Sentry.init({
  dsn: "https://fd38e1523baa4f458456c6b4dc7658d5@o1400298.ingest.sentry.io/6729137",
  integrations: [
    new Sentry.BrowserTracing({
      // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: [
        "localhost",
        /^https:\/\/wefa\.app\/api/,
        "https://wefa.app/",
        "https://dev.wefa.app",
      ],
    }),
    new Sentry.Replay(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const rootElement = document.getElementById("react-root");
if (!rootElement) throw new Error("React root not found");
const root = ReactDOM.createRoot(rootElement);

if (import.meta.env.PROD) {
  root.render(<ComingSoon />);
} else {
  // setup().then((result) => {
  root.render(
    // <MUDProvider value={result}>
    <App />
    // </MUDProvider>
  );
  // mountDevTools();
  // });
}
