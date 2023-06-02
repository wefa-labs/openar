import { a, useTransition } from "@react-spring/web";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import useDeviceDetect from "../hooks/app/useDeviceDetect";

import Deck from "./Deck";
// import Play from "./Play";
import Explore from "./Explore";
import Profile from "./Profile";

export default function Views() {
  const location = useLocation();
  const { isDesktop } = useDeviceDetect();

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

  return transitions((style, location) => (
    <a.main
      className={`overflow-y-contain flex h-[calc(100vh-4rem)] flex-col overflow-y-hidden px-6 sm:px-8 pt-12 ${
        isDesktop ? "" : ""
      }`}
      style={style}
    >
      <Routes location={location}>
        <Route path="/deck" element={<Deck />} />
        {/* <Route path="/play" element={<Play />} /> */}
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/world" />} />
      </Routes>
    </a.main>
  ));
}
