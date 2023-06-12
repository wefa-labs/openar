import { a, useTransition } from "@react-spring/web";

import { avatar } from "../../constants";

import { useApp } from "../../hooks/app/useApp";
import { ProfileDataProps, ProfileTab } from "../../hooks/views/useProfile";

import { ProfileInfo } from "../../components/Profile/Info";
import { ProfileBadges } from "../../components/Profile/Badges"; // Badges
import { ProfileSettings } from "../../components/Profile/Settings";

const tabs: ProfileTab[] = ["harvest", "settings"];

interface ProfileProps extends ProfileDataProps {}

export const Profile: React.FC<ProfileProps> = ({
  badges,
  tab,
  changeTab,
  tabsSpring,
  avatarSpring,
}) => {
  const { isDesktop } = useApp();

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
    <section className="profile-view flex flex-col w-full bg-primary">
      <ProfileInfo avatar={avatar} avatarSpring={avatarSpring} />
      <a.div
        style={tabsSpring}
        className="profile-tabs relative flex flex-col rounded-t-3xl w-full px-6 bg-base-100 shadow-xl"
      >
        <div className="absolute top-3 left-3 tabs tabs-boxed rounded-xl w-fit z-10">
          {tabs.map((name) => (
            <button
              key={name}
              className={`tab capitalize w-20 ${
                name === tab ? "tab-active" : ""
              }`}
              onClick={() => changeTab(name)}
              type="button"
            >
              {name}
            </button>
          ))}
        </div>
        {transition((style, tab) => (
          <a.div style={style} className="h-full">
            {tab === "harvest" && (
              <ProfileBadges badges={badges} isDesktop={isDesktop} />
            )}
            {/* {tab === "wallet" && <ProfileWallet />} */}
            {tab === "settings" && <ProfileSettings />}
          </a.div>
        ))}
      </a.div>
    </section>
  );
};

export default Profile;
