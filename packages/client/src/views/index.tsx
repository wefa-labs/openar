import { a, useTransition } from "@react-spring/web";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { useDeck } from "../hooks/views/useDeck";
import { useSeed } from "../hooks/wefa/useSeed";
import { useProfile } from "../hooks/views/useProfile";
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

  const deck = useDeck();
  const seed = useSeed();
  const profile = useProfile();

  return transitions((style, location) => (
    <a.main
      className={`overflow-y-contain flex h-[calc(100vh-4rem)] overflow-hidden ${
        isDesktop ? "" : ""
      }`}
      style={style}
    >
      <Routes location={location}>
        <Route path="/deck" element={<Deck {...deck} />} />
        {/* <Route path="/play" element={<Play />} /> */}
        <Route path="/explore" element={<Explore {...seed} />} />
        <Route path="/profile" element={<Profile {...profile} />} />
        <Route path="*" element={<Navigate to="/explore" />} />
      </Routes>
    </a.main>
  ));
}
