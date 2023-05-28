// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "forge-std/Test.sol";
import { MudV2Test } from "@latticexyz/std-contracts/src/test/MudV2Test.t.sol";

import { IWorld } from "../src/codegen/world/IWorld.sol";
import { SizeEnum, StateEnum } from "../src/codegen/Types.sol";
import { Identity, IdentityData, ARWorld, ARWorldData } from "../src/codegen/Tables.sol";

contract SystemTest is MudV2Test {
  IWorld public world;

  function setUp() public override {
    super.setUp();
    world = IWorld(worldAddress);
  }

  function testWorldExists() public {
    uint256 codeSize;
    address addr = worldAddress;
    assembly {
      codeSize := extcodesize(addr)
    }
    assertTrue(codeSize > 0);
  }

  function testCreateWorld() public {
    bytes32 id =  world.createWorld("Test", "worldId should be Test", "Image");
    // string memory data = Identity.getName(id);
    // assertEq(data, "Test");
  }

  function testClaimSpace() public {
    bytes32 worldId = world.createWorld("Test", "worldId should be Test", "");
    world.claimSpace(worldId);
  }

  function testTransferSpace() public {
    bytes32 worldId = world.createWorld("Test", "worldId should be Test", "");
    bytes32 spaceId = world.claimSpace(worldId);
    world.transferSpace(worldId, spaceId, address(0));
  }

   function testSetSpace() public {
    bytes32 worldId = world.createWorld("Test", "worldId should be Test", "");
    bytes32 spaceId = world.claimSpace(worldId);
    world.setSpace(worldId, spaceId, StateEnum.Active, "Test", "Test", "Test");
  }

  function testSetCell() public {
    bytes32 worldId = world.createWorld("Test", "worldId should be Test", "");
    bytes32 spaceId = world.claimSpace(worldId);

    world.setCell(worldId, spaceId, 0, 0, 0, bytes32(uint256(1)));
  }

}
