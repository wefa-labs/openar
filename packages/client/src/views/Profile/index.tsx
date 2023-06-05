import { useState } from "react";
import { a, useSpring, useTransition } from "@react-spring/web";

// import { useProfile } from "../../hooks/views/useProfile";

import { ProfileHarvest } from "./Harvest"; // Badges
import { ProfileSettings } from "./Settings";
import { ProfileDataProps } from "../../hooks/views/useProfile";
import { avatar, badges } from "../../constants";

type Tab = "harvest" | "settings" | "wallet";

const tabs: Tab[] = ["harvest", "settings"];

interface ProfileProps extends ProfileDataProps {}

// TODO: Stylize Bleyle following desings in Figma
export const Profile: React.FC<ProfileProps> = () => {
  const [tab, setTab] = useState<Tab>("harvest");

  const avatarSpring = useSpring({
    from: { opacity: 0, transform: "translate3d(0, -100%, 0)" },
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
    <section className="profile-view h-full w-full overflow-hidden pt-6 px-6 sm:px-12">
      <a.div
        className="profile-avatar flex flex-col items-center"
        style={avatarSpring}
      >
        <div className="avatar">
          <div className=" text-neutral-content rounded-full w-32">
            <img src={avatar} alt="profile avatar" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-6">Username</h2>
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
        <a.div style={style} className="profile-tabs w-full">
          {tab === "harvest" && (
            <ProfileHarvest badges={Object.values(badges)} />
          )}
          {/* {tab === "wallet" && <ProfileWallet />} */}
          {tab === "settings" && <ProfileSettings />}
        </a.div>
      ))}
    </section>
  );
};

export default Profile;
