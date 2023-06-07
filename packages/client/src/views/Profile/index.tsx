import { a, useTransition } from "@react-spring/web";

import { ProfileHarvest } from "./Harvest"; // Badges
import { ProfileSettings } from "./Settings";
import { ProfileDataProps } from "../../hooks/views/useProfile";
import { avatar } from "../../constants";

type Tab = "harvest" | "settings" | "wallet";

const tabs: Tab[] = ["harvest", "settings"];

interface ProfileProps extends ProfileDataProps {}

export const Profile: React.FC<ProfileProps> = ({
  badges,
  tab,
  changeTab,
  avatarSpring,
}) => {
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
    <section className="profile-view px-6 sm:px-12 flex flex-col max-w-screen-sm w-full mx-auto">
      <a.div
        className="profile-avatar flex flex-col items-center w-full"
        style={avatarSpring}
      >
        <div className="avatar">
          <div className=" text-neutral-content rounded-full w-32">
            <img src={avatar} alt="profile avatar" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-6">Username</h2>
        <div className="tabs tabs-boxed w-fit">
          {tabs.map((name) => (
            <button
              key={name}
              className={`tab capitalize ${name === tab ? "tab-active" : ""}`}
              onClick={() => changeTab(name)}
              type="button"
            >
              {name}
            </button>
          ))}
        </div>
      </a.div>
      {transition((style, tab) => (
        <a.div style={style} className="profile-tabs w-full">
          {tab === "harvest" && <ProfileHarvest badges={badges} />}
          {/* {tab === "wallet" && <ProfileWallet />} */}
          {tab === "settings" && <ProfileSettings />}
        </a.div>
      ))}
    </section>
  );
};

export default Profile;
