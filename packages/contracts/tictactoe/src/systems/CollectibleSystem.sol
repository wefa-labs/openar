// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { MintSystem } from "./MintSystem.sol";
import { TransferSystem } from "./TransferSystem.sol";
import { addressToEntityKey } from "../addressToEntityKey.sol";
import { MatchData, Match, PlayerID } from "../codegen/Tables.sol";

contract CollectibleSystem is MintSystem, TransferSystem {
  function claim(
    bytes32 gameId
  ) public returns (uint256) {
    address user = _msgSender();
    MatchData memory matchData = Match.get(gameId);
    require(matchData.winner == user, "not winner");
    uint256 tokenId = mint( _msgSender(), uint(gameId));

    matchData.trophyClaimed = true;

    Match.set(gameId, matchData);

    return tokenId;
  }

  function gift(
    uint256 tokenId,
    address recipient
  ) public returns (uint256) {
    transfer(tokenId, recipient);
    
    return tokenId;
  }
}
