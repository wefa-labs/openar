import { useState } from "react";
import { a, useSpring, useTransition } from "@react-spring/web";

// import Hero from "./ProfileHero";
// import { useProfile } from "../../hooks/views/useProfile";

import { ProfileHarvest } from "./Harvest";
import { ProfileSettings } from "./Settings";

type Tab = "harvest" | "settings" | "wallet";

const tabs: Tab[] = ["harvest", "settings"];

// TODO: Stylize Bleyle

export default function Profile() {
  const [tab, setTab] = useState<Tab>("harvest");

  const avatarSpring = useSpring({
    from: { opacity: 0, transform: "translate3d(0, 100%, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0%, 0)" },
  });

  const transition = useTransition(tab, {
    from: { opacity: 0, transform: "translate3d(0, 0, 100%)" },
    enter: { opacity: 1, transform: "translate3d(0, 0%, 0)" },
    leave: { opacity: 0, transform: "translate3d(0,0, -100%)" },
    config: {
      tension: 300,
      friction: 20,
      clamp: true,
    },
  });

  return (
    <>
      <a.div
        className="flex flex-col basis-1/4 items-center gap-3"
        style={avatarSpring}
      >
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-32">
            <span className="text-4xl">KK</span>
          </div>
        </div>
        <div className="tabs tabs-boxed">
          {tabs.map((name) => (
            <button
              key={name}
              className={`tab capitalize ${name === tab ? "tab-active" : ""}`}
              onClick={() => setTab(name)}
              type="button"
            >
              {name}
            </button>
          ))}
        </div>
      </a.div>
      {transition((style, tab) => (
        <a.div style={style} className="basis-3/4 w-full overflow-hidden">
          {tab === "harvest" && <ProfileHarvest />}
          {/* {tab === "wallet" && <ProfileWallet />} */}
          {tab === "settings" && <ProfileSettings />}
        </a.div>
      ))}
    </>
  );
}
