import { a, useTransition } from "@react-spring/web";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { useRefresh } from "../hooks/useRefresh";
import useDeviceDetect from "../hooks/device/useDeviceDetect";

import Deck from "./Deck";
import Explore from "./Explore";
import Profile from "./Profile";

export default function Views() {
  const location = useLocation();
  const device = useDeviceDetect();
  const { refreshCont, pullChange } = useRefresh();

  const transitions = useTransition(location, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      tension: 300,
      friction: 20,
      clamp: true,
    },
  });

  return (
    <>
      <div
        ref={refreshCont}
        className={` w-fit ${device === "desktop" ? "" : "m-auto -mt-10 "}`}
        style={{ marginTop: pullChange / 3.118 || "" }}
      >
        {device === "handheld" ? (
          <div className="refresh-icon rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
              style={{ transform: `rotate(${pullChange}deg)` }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        ) : null}
      </div>
      {transitions((style, location) => (
        <a.main
          className={`overflow-y-contain flex h-[calc(100vh-4rem)] flex-col items-center overflow-y-auto px-6 sm:px-8 ${
            device === "desktop" ? "m-auto mt-16 max-w-7xl " : "mb-16"
          }`}
          style={style}
        >
          <Routes location={location}>
            <Route path="/deck" element={<Deck />} />
            <Route path="/world" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/world" />} />
          </Routes>
        </a.main>
      ))}
    </>
  );
}
