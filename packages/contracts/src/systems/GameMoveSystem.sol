// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18;

import { System } from "@latticexyz/world/src/System.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";

import { RoleEnum } from "../codegen/Types.sol";
import { IWorld } from "../codegen/world/IWorld.sol";
import {Game, GameData, Match, MatchData, Role } from "../codegen/Tables.sol";

contract GameMoveSystem is System {
  function claimPosition(
    bytes32 gameId,
    uint8 matchNumber,
    uint8 x
  ) public {
    require(x < 9, "position out of bounds");

    address user = _msgSender();

    GameData memory gameData = Game.get(gameId);

    // Check some Game Conditiona
    require(gameData.matchesPlayed == matchNumber, "match not found");
    require(gameData.winner == address(0), "game won");

    // Check some  match conditions
    MatchData memory matchData = Match.get(gameId, matchNumber);
    require(matchData.winner == address(1), "match drawn");
    require(matchData.winner == address(0), "match won");
    require(matchData.currentPlayer == user, "not your turn");
    require(matchData.board[x] == 7, "position already claimed");

    // Update match state
    matchData.board[x] = uint8(Role.get(user, gameId));
    matchData.turnCount += 1;

    if (matchData.turnCount >= 5 && checkWin(matchData.board)) {
      matchData.winner = user;
      matchData.currentPlayer = address(0);
      gameData.matchesPlayed += 1;
      gameData.winner = user;
    } else if (matchData.turnCount == 9) {
      matchData.currentPlayer = address(0);
      matchData.winner = address(1); // Set winner to 1 to indicate a draw
      gameData.matchesPlayed += 1;
      gameData.winner = address(1);
    } else {
      matchData.currentPlayer = matchData.players[0] == user ? matchData.players[1] : matchData.players[0];      
    }

    RoleEnum role = Role.get(user, gameId);

    IWorld(_world()).setCell(gameData.worldId, gameData.spaceId, 9 * matchNumber + x, bytes32(uint256(role)));

    Match.set(gameId, matchNumber, matchData);
    Game.set(gameId, gameData);
  }

  function checkWin(uint8[] memory board) private pure returns (bool) {
    // Check rows
    for (uint8 row = 0; row < 3; row++) {
        if (board[row * 3] != 0 && board[row * 3] == board[row * 3 + 1] && board[row * 3] == board[row * 3 + 2]) {
            return true;
        }
    }

    // Check columns
    for (uint8 col = 0; col < 3; col++) {
        if (board[col] != 0 && board[col] == board[col + 3] && board[col] == board[col + 6]) {
            return true;
        }
    }

    // Check diagonals
    if (board[0] != 0 && board[0] == board[4] && board[0] == board[8]) {
        return true;
    }

    if (board[2] != 0 && board[2] == board[4] && board[2] == board[6]) {
        return true;
    }

    return false;
  }
}
