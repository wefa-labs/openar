// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";

import { RoleEnum } from "../codegen/Types.sol";
import { IWorld } from "../codegen/world/IWorld.sol";
import { ARWorld, Identity, IdentityData, Game, GameData, Match, MatchData, Role, Owner } from "../codegen/Tables.sol";

contract GameStartSystem is System {
  function createGame(
    RoleEnum role,
    string memory name,
    bytes32 worldId,
    bytes32 spaceId
  ) public returns (bytes32) {
    address user = _msgSender();

    require(Owner.get(spaceId) == user, "not owner of space");
    require(ARWorld.get(worldId).spaceCount > 0, "no spaces found");

    IWorld(_world()).transferSpace(worldId, spaceId, address(this));

    bytes32 gameId = getUniqueEntity();

    address[] memory players = new address[](2);
    uint8[] memory board = new uint8[](9);
    players[0] = user;

    Game.set(gameId, GameData({
        matchesPlayed: 0,
        worldId: worldId,
        spaceId: spaceId,
        winner: address(0),
        players: players
    }));
    Identity.set(gameId , IdentityData({
      name: name,
      description: "",
      image: ""
    }));
    Match.set(gameId, 0, MatchData({
      turnCount: 0,
      currentPlayer: address(0),
      winner: address(0),
      players: players,
      board: board
    }));
    Role.set(user, gameId, role);

    return gameId;
  }

  function joinGame(
    bytes32 gameId
  ) public returns (RoleEnum) {
    address user = _msgSender();

    GameData memory gameData = Game.get(gameId);

    require(gameData.players.length <= 1, "game is full");
    require(gameData.players[0] != user, "already in game");
    require(gameData.matchesPlayed == 0, "game already started");
    require(gameData.winner == address(0), "game already won");

    MatchData memory matchData = Match.get(gameId, 0);

    gameData.players[1] = user;

    matchData.players[1] = user;
    matchData.currentPlayer = matchData.players[uint8(block.timestamp) % 2]; // solhint-disable-line not-rely-on-time
    
    RoleEnum opponentRole = Role.get(matchData.players[0], gameId);
    RoleEnum role = opponentRole == RoleEnum.X ? RoleEnum.O : RoleEnum.X;

    Role.set(user, gameId, role);
    Match.set(gameId, 0, matchData);
    Game.set(gameId, gameData);

    return role;
  }
}
