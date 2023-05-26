// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";

import { RoleEnum } from "../codegen/Types.sol";
import { Identity, Game, GameData, Role } from "../codegen/Tables.sol";

contract GameStartSystem is System {
  function create(
    RoleEnum role,
    string memory name,
    bytes32 spaceId
  ) public returns (bytes32) {
    address user = _msgSender();

    // TODO: Transfer space ownership to system

    bytes32 gameId = getUniqueEntity();

    Identity.set(gameId, name);
    Game.set(gameId, spaceId, GameData({
      turnCount: 0,
      id: gameId,
      currentPlayer: role == RoleEnum.Black ? user : address(0),
      winner: address(0),
      players: [user, address(0)],
      board: [
        2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2
      ]
    }));
    Role.set(user, gameId, role);

    return gameId;
  }

  function join(
    bytes32 gameId,
    bytes32 spaceId
  ) public returns (RoleEnum) {
    address user = _msgSender();

    GameData memory game = Game.get(gameId, spaceId);
    require(game.id == gameId, "game not found");
    require(game.id != bytes32(0), "game doesn't exist");
    require(game.players[0] != user, "already in game");
    require(game.players[1] == address(0), "game is full");

    RoleEnum opponentRole = Role.get(game.players[0], gameId);
    RoleEnum role = opponentRole == RoleEnum.Red ? RoleEnum.Black : RoleEnum.Red;
    Role.set(user, gameId, role);

    game.players[1] = user;
    game.currentPlayer = role == RoleEnum.Black ? user : game.players[0];

    Game.set(gameId, spaceId, game);

    return role;
  }
}
