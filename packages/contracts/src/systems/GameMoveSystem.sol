// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";

// Compoonents - Write
import { Identity, IdentityData } from "../codegen/tables/Identity.sol";
import { TokenID } from "../codegen/tables/TokenID.sol";
import { Role } from "../codegen/tables/Role.sol";
import { OwnedBy } from "../codegen/tables/OwnedBy.sol";

// import { HealthStatus, GrowthLevel } from "../codegen/Types.sol";
import { addressToEntityKey } from "../addressToEntityKey.sol";

contract GameMoveSystem is System {
  function claimPosition(
    address userAddrs
  ) public returns (bytes32) {
    // require(healthStatus != HealthStatus.DEAD, "plant is dead");
    address spaceAddrs = _msgSender();
    bytes32 player = addressToEntityKey(userAddrs);

    return player;
  }
}
