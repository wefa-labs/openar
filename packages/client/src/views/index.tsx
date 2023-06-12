import { a, useTransition } from "@react-spring/web";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";

import { useApp } from "../hooks/app/useApp";
import { useDeck } from "../hooks/views/useDeck";
import { useExplore } from "../hooks/views/useExplore";
import { useProfile } from "../hooks/views/useProfile";

import Deck from "./Deck";
// import Play from "./Play";
import Explore from "./Explore";
import Profile from "./Profile";
import { useEffect } from "react";

type LowerElement = "water" | "earth" | "fire" | "air";

export default function Views() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
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

  const { isDesktop, setTheme } = useApp();

  const deck = useDeck();
  const explore = useExplore();
  const profile = useProfile();

  const element = searchParams.get("element") as LowerElement | null;

  console.log("element", element);

  useEffect(() => {
    if (element) {
      setTheme(element);
    }
  }, [element]);

  return transitions((style, location) => (
    <a.main
      className={`overflow-y-contain flex h-[calc(100vh-4rem)] overflow-hidden max-h-[calc(100vh-4rem)] ${
        isDesktop ? "" : ""
      }`}
      style={style}
    >
      <Routes location={location}>
        <Route path="/deck" element={<Deck {...deck} />} />
        {/* <Route path="/play" element={<Play />} /> */}
        <Route path="/explore" element={<Explore {...explore} />} />
        <Route path="/profile" element={<Profile {...profile} />} />
        <Route path="*" element={<Navigate to="/explore" />} />
      </Routes>
    </a.main>
  ));
}
