// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";

import { RoleEnum } from "../codegen/Types.sol";
import { Identity, IdentityData, Match, MatchData, Role, PlayerID } from "../codegen/Tables.sol";

contract GameInitSystem is System {
  function create(
    RoleEnum role,
    string memory name
  ) public returns (bytes32) {
    address user = _msgSender();

    bytes32 gameId = getUniqueEntity();
    bytes32 playerId = getUniqueEntity();

    Identity.set(gameId, IdentityData({
      name: name,
      createdAt: block.timestamp // solhint-disable-line not-rely-on-time
    }));
    Match.set(gameId, MatchData({
      board: [
        2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2
        ],
      players: [playerId, bytes32(0)],
      winner: address(0),
      currentPlayer: bytes32(0),
      turnCount: 0
    }));

    PlayerID.set(user, gameId, playerId);
    Role.set(playerId, role);

    return gameId;
  }

  function join(
    bytes32 gameId
  ) public returns (RoleEnum) {
    address playerAddrs = _msgSender();

    IdentityData memory game = Identity.get(gameId);
    require(game.createdAt != 0, "game doesn't exist");

    MatchData memory matchData = Match.get(gameId);
    require(matchData.players[1] == bytes32(0), "game is full");
    require(PlayerID.get(playerAddrs, gameId) != bytes32(0), "already in game");

    bytes32 playerId = getUniqueEntity();
    PlayerID.set(playerAddrs, gameId, playerId);

    RoleEnum opponentRole = Role.get(matchData.players[0]);
    RoleEnum role = opponentRole == RoleEnum.X ? RoleEnum.O : RoleEnum.X;
    Role.set(playerId, role);

    return role;
  }
}
