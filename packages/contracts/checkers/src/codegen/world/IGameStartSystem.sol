// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

import { RoleEnum } from "./../Types.sol";

interface IGameStartSystem {
  function checkers_GameStart_create(RoleEnum role, string memory name, bytes32 gridId) external returns (bytes32);

  function checkers_GameStart_join(bytes32 gameId, bytes32 gridId) external returns (RoleEnum);
}