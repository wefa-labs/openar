import { a, config, useSpring } from "@react-spring/web";
import { Link, useLocation } from "react-router-dom";

import { RC as CardsIcon } from "../../assets/cards.svg";
import { RC as WorldIcon } from "../../assets/world.svg";
import { RC as ProfileIcon } from "../../assets/profile.svg";

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
    path: "/deck",
    title: "Deck",
    Icon: CardsIcon,
  },
  {
    path: "/world",
    title: "World",
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
    <a.nav className="btm-nav z-50 bg-white py-4" style={spring}>
      {tabs.map(({ path, Icon, title }) => (
        <Link to={path} key={title}>
          <button
            className={`flex flex-col items-center ${
              pathname === path ? "active" : ""
            }`}
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
