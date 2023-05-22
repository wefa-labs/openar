// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";

import { SizeEnum, StateEnum } from "../codegen/Types.sol";
import { Map, Identity, IdentityData, Range, Size, State, GridCount, Grid } from "../codegen/Tables.sol";

contract GridSystem is System {
  function claimGrid(
    bytes32 mapId
  ) public returns (bytes32) {
    address user = _msgSender();

    // Check if valid map
    require(State.get(mapId) == StateEnum.Active, "map not active");
    
    // Check grid size and count to ensure open grid
    SizeEnum size = Size.get(mapId);
    uint32 gridCount = GridCount.get(mapId);

    if (size == SizeEnum.Small) {
      require(gridCount < 9, "sm map full");
    } else if (size == SizeEnum.Medium) {
      require(gridCount < 81, "md map full");
    } else if (size == SizeEnum.Large) {
      require(gridCount < 729, "lg map full");
    } else {
      revert("invalid grid size");
    }

    // Create grid
    bytes32 gridId = getUniqueEntity();

    State.set(gridId, StateEnum.Active);
    // Determine range based on grid size starting at 0 and incrementing by 9 and when x ends, increment y by 9 and reset x
 
    return gridId;
  }

  function transferGrid(
    bytes32 mapId,
    bytes32 gridId,
    address to
  ) public returns (bytes32) {
    address user = _msgSender();

    // Check if valid grid
    require(Grid.get(user , gridId) != bytes32, "not grid owner");
    require(State.get(mapId) == StateEnum.Active, "map not active");
    require(State.get(gridId) == StateEnum.Active, "grid not active");

    // Transfer grid
    Grid.set(to, mapId, gridId);
    
    return gridId;
  }

  function setGrid(
    bytes32 mapId,
    bytes32 gridId,
    StateEnum state,
    string memory name,
    string memory description,
    string memory image
  ) public returns (bytes32) {
    address client = _msgSender();

    // Check if valid grid
    require(Grid.get(client, gridId) != bytes32, "not grid owner");
    require(State.get(mapId) == StateEnum.Active, "map not active");
    require(State.get(gridId) == StateEnum.Active, "grid not active");

    State.set(gridId, state);
    IdentityData memory identity = Identity.get(gridId);

    if (bytes32(name) != 0) {
      identity.name = name;
    }

    if (bytes32(description) != 0) {
      identity.description = description;
    }

    if (bytes32(image) != 0) {
      identity.image = image;
    }

    State.set(gridId, state);
    Identity.set(gridId, identity);

    return gridId;
  }
}
