// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";

import { Game, GameData, Role } from "../codegen/Tables.sol";

contract GameMoveSystem is System {
  function movePosition(
    bytes32 gameId,
    bytes32 spaceId,
    uint8 from,
    uint8 to
  ) public {
    address user = _msgSender();

    require(from < 64, "position out of bounds");
    require(to < 64, "position out of bounds");

    // Check some  game conditions
    GameData memory gameData = Game.get(gameId, spaceId);

    require(gameData.winner == address(0), "game won");
    require(gameData.currentPlayer == user, "not your turn");
    
    // TODO: Update space on space in openar namespace.

    // Game.set(gameId, gameData);
  }
}
