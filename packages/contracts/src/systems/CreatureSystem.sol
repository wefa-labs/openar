// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18;

import {System} from "@latticexyz/world/src/System.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";

import {GrowthLevelEnum} from "../codegen/Types.sol";
import { IWorld } from "../codegen/world/IWorld.sol";
import {Identity, IdentityData, Asset, AssetData, Care, CareData, Cell, Element, Owner} from "../codegen/Tables.sol";

contract CreatureSystem is System {
    function seedCreature(
        string memory image,
        string memory name,
        bytes32 worldId,
        bytes32 spaceId,
        uint8 cellPosition)
        public
        returns (address)
    {
        address user = _msgSender();

        require(Owner.get(spaceId) == user, "not owner of space");

        bytes32 cell = Cell.get(worldId, spaceId, cellPosition);

        require(cell == bytes32(0), "cell not empty");

        bytes32 creatureId = getUniqueEntity();

        IWorld(_world()).setCell(worldId, spaceId, cellPosition, creatureId);

        // Mint Creature TokenID - address will be entity id for creature
        // uint256 tokenId = mintCreature(msg.sender, meta);

        // Create Creature Entity
        // uint256 entity = world.getUniqueEntityId();

        // Identity.set(player, IdentityData(meta, block.timestamp));
        // TokenID.set(player, 0);
        // Asset.set(player, AssetData(image, ""));
        // Care.set(player, CareData(block.timestamp, GrowthLevelEnum.SEED));
        // Energy.set(player, 1);
        // Owner.set(player, msg.sender);

        return user;
    }
}
