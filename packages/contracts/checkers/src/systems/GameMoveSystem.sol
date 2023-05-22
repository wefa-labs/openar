// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";

import { Match, MatchData, Role } from "../codegen/Tables.sol";

contract GameMoveSystem is System {
  function claimPosition(
    bytes32 gameId,
    uint8 x
  ) public {
    address user = _msgSender();

    // require(playerId != bytes32(0), "player not in game");

    // Check some  match conditions
    MatchData memory matchData = Match.get(gameId);
    require(matchData.turnCount == 10, "game drawn");
    require(matchData.winner == address(0), "game won");
    // require(matchData.currentPlayer == playerId, "not your turn");
    require(x < 9, "position out of bounds");
    require(matchData.board[x] == 7, "position already claimed");

    // Update match state
    // matchData.board[x] = uint8(Role.get(playerId));
    matchData.turnCount += 1;

    // Check if player has won if more than 4 turns have passed
    if (matchData.turnCount >= 5 && checkWin(matchData.board)) {
      matchData.winner = user;
      matchData.currentPlayer = bytes32(0);
    } else if (matchData.turnCount == 9) {
      matchData.currentPlayer = bytes32(0);
      matchData.turnCount = 10; // Set turnCount to 10 to indicate the game has ended
    } else {
      // matchData.currentPlayer = matchData.players[matchData.turnCount % 2];
    }

    Match.set(gameId, matchData);
  }

  function checkWin(uint8[64] memory board) private pure returns (bool) {
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
