// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";

import { RoleEnum } from "../codegen/Types.sol";
import { Identity, Match, MatchData, Role } from "../codegen/Tables.sol";

contract GameCollectibleSystem is System {

  function claim(
    bytes32 matchId
  ) public returns (string memory meta) {
    address user = _msgSender();
    
    // TODO: Check if already minted using the match ID as the token ID

    MatchData memory matchData = Match.get(matchId, 0);

    require(matchData.id == matchId, "game doesn't exist");
    require(matchData.players[0] != user, "already in game");
    require(matchData.players[1] == address(0), "game is full");
    
    matchData.players[1] = user;
    
    Match.set(matchId, 0, matchData);

    // TODO: Mint NFT
    // Randomly pick between Tic, Tac, and Toe as  the token URI

    return "metadata";
  }
}
