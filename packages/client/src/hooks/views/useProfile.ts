import { FetchBalanceResult } from "wagmi/dist/actions";
import { useAccount, useBalance, useEnsAvatar, useEnsName } from "wagmi";

import { useGames } from "../games/useGames";
// import { useWorlds } from "../openar/useWorlds";

type Status = "disconnected" | "connected" | "reconnecting" | "connecting";

export interface ProfileProps {
  balance?: FetchBalanceResult;
  address?: string;
  accountStatus?: Status;
  name?: string;
  nameStatus?: Status;
  avatar?: string;
  avatarStatus?: Status;
  // worlds: any[];
  // worldFormRegister: any;
  // handleWorldSubmit: any;
  // onCreateWorld: any;
  games: any[];
}

export const useProfile = () => {
  const { data: balance } = useBalance();
  const { address, status: accountStatus } = useAccount();
  const { data: name, status: nameStatus } = useEnsName();
  const { data: avatar, status: avatarStatus } = useEnsAvatar();

  const { tictactoeGames } = useGames();
  // const { worlds, onCreateWorld, handleWorldSubmit, worldFormRegister } = useWorlds();

  console.log("Profile Data", {
    // worlds,
    tictactoeGames,
    balance,
    name,
    avatar,
  });

  return {
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
    games: [...tictactoeGames],
  };
};
