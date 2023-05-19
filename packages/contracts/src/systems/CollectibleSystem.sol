// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { MintSystem } from "./MintSystem.sol";
import { TransferSystem } from "./TransferSystem.sol";
import { addressToEntityKey } from "../addressToEntityKey.sol";
import { Identity, IdentityData, TokenID, Role, PlayerID } from "../codegen/Tables.sol";

contract CollectibleSystem is MintSystem, TransferSystem {
  function claim(
    uint256 gameId
  ) public returns (uint256) {
    uint256 tokenId = mint(gameId, _msgSender());

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
