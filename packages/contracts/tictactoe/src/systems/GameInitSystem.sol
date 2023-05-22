// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";

import { RoleEnum } from "../codegen/Types.sol";
import { Identity, IdentityData, Match, MatchData, Role } from "../codegen/Tables.sol";

contract GameInitSystem is System {
  function create(
    RoleEnum role,
    string memory name,
    bytes32 gridId
  ) public returns (bytes32) {
    address user = _msgSender();

    bytes32 gameId = getUniqueEntity();

    Identity.set(gameId, IdentityData({
      name: name,
      createdAt: block.timestamp // solhint-disable-line not-rely-on-time
    }));
    Match.set(gameId, gridId, MatchData({
      board: [7,7,7,7,7,7,7,7,7],
      winner: address(0),
      currentPlayer: bytes32(0),
      turnCount: 0
    }));
    // Role.set(user, gameId, role);

    return gameId;
  }

  function join(
    bytes32 gameId,
    bytes32 gridId
  ) public returns (RoleEnum) {
    address user = _msgSender();

    // IdentityData memory game = Identity.get(gameId, gridId);
    // require(game.createdAt != 0, "game doesn't exist");

    // MatchData memory matchData = Match.get(gameId);
    // require(matchData.players[1] == bytes32(0), "game is full");
    // require(PlayerID.get(playerAddrs, gameId) != bytes32(0), "already in game");

    // RoleEnum opponentRole = Role.get(user, gameId);
    RoleEnum role = RoleEnum.X;
    // RoleEnum role = opponentRole == RoleEnum.X ? RoleEnum.O : RoleEnum.X;
    // Role.set(playerId, role);

    return role;
  }
}
