// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";

import { SizeEnum, StateEnum } from "../codegen/Types.sol";
import { ARWorld, ARWorldData, Identity, IdentityData, Size, State, Owner } from "../codegen/Tables.sol";

contract WorldSystem is System {
  function createWorld(
    string memory name,
    string memory description,
    string memory image
    // SizeEnum size
  ) public returns (bytes32) {
    address owner = _msgSender();
    bytes32 worldId = getUniqueEntity();

    Identity.set(worldId, IdentityData({
      name: name,
      description: description,
      image: image
    }));
    ARWorld.set(worldId, ARWorldData({
      id: worldId,
      spaceCount: 0
    }));    
    Owner.set(worldId, owner);
    Size.set(worldId, SizeEnum.Mini);
    State.set(worldId, StateEnum.Active);

    return worldId;
  }
}
