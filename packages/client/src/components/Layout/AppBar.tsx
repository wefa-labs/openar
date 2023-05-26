import { a, config, useSpring } from "@react-spring/web";
import { Link, useLocation } from "react-router-dom";

import { RC as CardsIcon } from "../../assets/cards.svg";
import { RC as WorldIcon } from "../../assets/world.svg";
import { RC as ProfileIcon } from "../../assets/profile.svg";
import useDeviceDetect from "../../hooks/app/useDeviceDetect";

const tabs: {
  path: string;
  title: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}[] = [
  {
    path: "/play",
    title: "Play",
    Icon: CardsIcon,
  },
  {
    path: "/explore",
    title: "Explore",
    Icon: WorldIcon,
  },
  {
    path: "/profile",
    title: "Profile",
    Icon: ProfileIcon,
  },
];

export const Appbar = () => {
  const { pathname } = useLocation();
  const { isDesktop } = useDeviceDetect();

  const spring = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(100%)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
    config: {
      ...config.slow,
      friction: 48,
      clamp: true,
    },
  });

  return (
    <a.nav
      className={
        isDesktop
          ? "tabs w-full bg-white rounded-3xl py-2 px-4 max-w-2xl flex justify-around items-center shadow-lg"
          : "btm-nav z-50 bg-white py-4 fixed z-10"
      }
      style={spring}
    >
      {tabs.map(({ path, Icon, title }) => (
        <Link to={path} key={title}>
          <button
            className={`flex flex-col items-center ${
              pathname === path ? "active tab-active" : ""
            } ${isDesktop ? "tab" : ""}}`}
          >
            <Icon
              width={32}
              height={32}
              className={`${
                pathname === path ? "fill-indigo-400" : "fill-slate-800"
              }`}
            />
            <p
              className={`text-sm tracking-wide ${
                pathname === path ? "text-indigo-400" : "text-slate-800"
              }`}
            >
              {title}
            </p>
          </button>
        </Link>
      ))}
    </a.nav>
  );
};
