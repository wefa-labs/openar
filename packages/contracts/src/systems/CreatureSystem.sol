// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {System} from "@latticexyz/world/src/System.sol";

import {GrowthLevelEnum} from "../codegen/Types.sol";
import {Identity, IdentityData, Asset, AssetData, Care, CareData, Element, Owner} from "../codegen/Tables.sol";

contract CreatureSystem is System {
    function redeem(string memory image, string memory meta, int32 longitude, int32 latitude, address spaceAddrs)
        public
        returns (address)
    {
        address user = _msgSender();

        // bool isMember = ISpace(spaceAddrs).isMember(userAddrs);
        // require(isMember, "not member of space");

        // Check that proof is valid - Proof Verifies Zone, Plant, Image, Location, Health, Growth and Effect
        // require(verifyProof(plantId, spaceAddrs, longitude, latitude, commitment, proofData), "Invalid Proof");

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

    function nurture(bytes32 _entity, int32 _energy) public returns (bytes memory) {
        // address spaceAddrs = Home.get(_entity);
        // bool isMember = ISpace(spaceAddrs).isMember(msg.sender);
        // require(isMember, "not space member");
        require(Owner.get(_entity) == msg.sender, "not creature trainer");

        // bytes32 spaceId = addressToEntityKey(spaceAddrs);
        // int32 spaceEnergy = Energy.get(spaceId);

        // require(spaceEnergy >= _energy, "not enough energy");

        CareData memory care = Care.get(_entity);

        // require(care.checkedAt + 1 days < block.timestamp, "creature fed");

        int32 energyCost = _energy;

        care.checkedAt = block.timestamp;

        Care.set(_entity, care);

        return abi.encode(energyCost);
    }
}
