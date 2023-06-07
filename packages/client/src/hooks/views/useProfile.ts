import { useState } from "react";
import { FetchBalanceResult } from "wagmi/dist/actions";
import { SpringValue, useSpring } from "@react-spring/web";
import { useAccount, useBalance, useEnsAvatar, useEnsName } from "wagmi";

import { useWefa } from "../wefa/useWefa";
// import { useGames } from "../games/useGames";
// import { useWorlds } from "../openar/useWorlds";

type Status =
  | "disconnected"
  | "connected"
  | "reconnecting"
  | "connecting"
  | "error"
  | "idle"
  | "loading"
  | "success";

type ProfileTab = "harvest" | "settings" | "wallet";

export interface ProfileDataProps {
  badges: WefaBadge[];
  balance?: FetchBalanceResult;
  address?: string;
  accountStatus?: Status;
  name?: string | null;
  nameStatus?: Status;
  avatar?: string | null;
  avatarStatus?: Status;
  // worlds: any[];
  // worldFormRegister: any;
  // handleWorldSubmit: any;
  // onCreateWorld: any;
  // games: any[];
  tab: ProfileTab;
  changeTab: (tab: ProfileTab) => void;
  avatarSpring: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
}

export const useProfile = (): ProfileDataProps => {
  const [tab, setTab] = useState<ProfileTab>("harvest");

  const { data: balance } = useBalance();
  const { address, status: accountStatus } = useAccount();
  const { data: name, status: nameStatus } = useEnsName();
  const { data: avatar, status: avatarStatus } = useEnsAvatar();

  // const { tictactoeGames } = useGames();
  const { badges } = useWefa();

  const avatarSpring = useSpring({
    from: { opacity: 0, transform: "translate3d(0, -100%, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0%, 0)" },
  });

  // const { worlds, onCreateWorld, handleWorldSubmit, worldFormRegister } = useWorlds();

  // console.log("Profile Data", {
  //   // worlds,
  //   tictactoeGames,
  //   balance,
  //   name,
  //   avatar,
  // });

  function changeTab(tab: ProfileTab) {
    setTab(tab);
  }

  return {
    badges,
    balance,
    address,
    accountStatus,
    name,
    nameStatus,
    avatar,
    avatarStatus,
    // worlds,
    // worldFormRegister,
    // handleWorldSubmit,
    // onCreateWorld,
    // games: [...tictactoeGames],
    tab,
    changeTab,
    avatarSpring,
  };
};
