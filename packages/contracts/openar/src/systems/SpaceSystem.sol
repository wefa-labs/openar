// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";

import { SizeEnum, StateEnum } from "../codegen/Types.sol";
import { ARWorld, ARWorldData, Identity, IdentityData, Size, State, Space, SpaceData, Owner } from "../codegen/Tables.sol";

contract SpaceSystem is System {
  function claimSpace(
    bytes32 worldId
  ) public returns (bytes32) {
    address client = _msgSender();

    require(ARWorld.get(worldId).id == worldId, "world not found");
    require(State.get(worldId) == StateEnum.Active, "world not active");
    
    SizeEnum size = Size.get(worldId);
    uint32 spaceCount = ARWorld.get(worldId).spaceCount;
   
    if (size == SizeEnum.Mini) {
      require(spaceCount <= 4, "mini world full");
    } else if (size == SizeEnum.Small) {
      require(spaceCount <= 9, "sm world full");
    } else if (size == SizeEnum.Medium) {
      require(spaceCount <= 81, "md world full");
    } else if (size == SizeEnum.Large) {
      require(spaceCount <= 729, "lg world full");
    } else {
      revert("invalid space size");
    }

    bytes32 spaceId = getUniqueEntity();

    Space.set(worldId, spaceId, SpaceData({
      id: spaceId,
      position: spaceCount
    }));
    State.set(spaceId, StateEnum.Active);
    Owner.set(spaceId, client);
    ARWorld.set(worldId, ARWorldData({
      id: worldId,
      spaceCount: spaceCount + 1
    }));
 
    return spaceId;
  }

  function transferSpace(
    bytes32 worldId,
    bytes32 spaceId,
    // address from,  // TODO: change from address to
    address to
  ) public returns (bytes32) {
    address client = _msgSender();

    require(ARWorld.get(worldId).id == worldId, "world not found");
    require(State.get(worldId) == StateEnum.Active, "world not active");
    require(Space.get(worldId, spaceId).id == spaceId, "space not found");
    require(Owner.get(spaceId) == client, "not space owner");
    require(State.get(spaceId) == StateEnum.Active, "space not active");

    Owner.set(spaceId, to);
    
    return spaceId;
  }

  function setSpace(
    bytes32 worldId,
    bytes32 spaceId,
    StateEnum state,
    string memory name,
    string memory description,
    string memory image
  ) public returns (bytes32) {
    address client = _msgSender();

    require(ARWorld.get(worldId).id == worldId, "world not found");
    require(State.get(worldId) == StateEnum.Active, "world not active");
    require(Space.get(worldId, spaceId).id == spaceId, "space not found");
    require(Owner.get(spaceId) == client, "not space owner");
    require(State.get(spaceId) == StateEnum.Active, "space not active");

    // SpaceData  memory space = Space.get(worldId, spaceId);
    IdentityData memory identity = Identity.get(spaceId);

    if (bytes(name).length > 0) {
      identity.name = name;
    }
    if (bytes(description).length > 0) {
      identity.description = description;
    }
    if (bytes(image).length > 0) {
      identity.image = image;
    }

    State.set(spaceId, state);
    Identity.set(spaceId, identity);

    return spaceId;
  }
}
