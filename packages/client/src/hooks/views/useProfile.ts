import { useAccount, useBalance, useEnsAvatar, useEnsName } from "wagmi";

import { useGames } from "../games/useGames";
import { useWorlds } from "../openar/useWorlds";

export const useProfile = () => {
  const { data: balance } = useBalance();
  const { address, status: accountStatus } = useAccount();
  const { data: name, status: nameStatus } = useEnsName();
  const { data: avatar, status: avatarStatus } = useEnsAvatar();

  const { tictactoeGames, checkerGames } = useGames();
  const { worlds, onCreateWorld, handleWorldSubmit, worldFormRegister } =
    useWorlds();

  console.log("Profile Data", {
    worlds,
    tictactoeGames,
    checkerGames,
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
    worlds,
    worldFormRegister,
    handleWorldSubmit,
    onCreateWorld,
    games: [...tictactoeGames, ...checkerGames],
  };
};
