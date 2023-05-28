// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";

import { RoleEnum } from "../codegen/Types.sol";
import { Identity, IdentityData, Match, MatchData, Role } from "../codegen/Tables.sol";

contract GameStartSystem is System {
  function create(
    RoleEnum role,
    string memory name,
    bytes32 spaceId
  ) public returns (bytes32) {
    address user = _msgSender();

    // TODO: Transfer space ownership to system
    // world.transferGridOwnership(spaceId, address(this));

    bytes32 matchId = getUniqueEntity();

    address[] memory players = new address[](2);
    players[0] = user;

    Identity.set(matchId , IdentityData({
      name: name,
      description: "",
      image: ""
    }));
    Match.set(matchId, matchId, MatchData({
      turnCount: 0,
      id: matchId,
      spacePosition: 0,
      currentPlayer: address(0),
      winner: address(0),
      players: players
      // board: [7,7,7,7,7,7,7,7,7]
    }));
    Role.set(user, matchId, role);

    return matchId;
  }

  function join(
    bytes32 matchId
  ) public returns (RoleEnum) {
    address user = _msgSender();

    MatchData memory matchData = Match.get(matchId, 0);

    require(matchData.id == matchId, "game doesn't exist");
    require(matchData.players[0] != user, "already in game");
    require(matchData.players[1] == address(0), "game is full");
    
    matchData.players[1] = user;
    matchData.currentPlayer = matchData.players[uint8(block.timestamp) % 2]; // solhint-disable-line not-rely-on-time
    
    RoleEnum opponentRole = Role.get(matchData.players[0], matchId);
    RoleEnum role = opponentRole == RoleEnum.X ? RoleEnum.O : RoleEnum.X;
    Role.set(user, matchId, role);

    Match.set(matchId, 0, matchData);

    return role;
  }
}
