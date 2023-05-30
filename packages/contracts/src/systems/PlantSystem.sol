// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {System} from "@latticexyz/world/src/System.sol";

import {GrowthLevelEnum} from "../codegen/Types.sol";
import {Identity, IdentityData, Asset, AssetData, Care, CareData, Element, Owner} from "../codegen/Tables.sol";

contract PlantSystem is System {
    function redeem(
        string memory image,
        string memory meta,
        int32 long,
        int32 lat,
        GrowthLevelEnum growthLevel,
        address userAddrs
    ) public returns (address) {
        // require(healthStatus != HealthStatusEnum.DEAD, "plant is dead");
        address user = _msgSender();

        // bool isMember = ISpace(spaceAddrs).isMember(userAddrs);
        // require(isMember, "not member of space");

        // check that proof is valid - Proof Verifies Zone, Plant, Image, Location, Health, Growth and Season

        // Mint Plant Token with that system.
        // uint256 tokenId = mintPlant(sender, meta);

        // Identity.set(player, IdentityData(meta, block.timestamp));
        // TokenID.set(player, 0);
        // Asset.set(player, AssetData(image, ""));
        // Care.set(player, CareData(block.timestamp, growthLevel));
        // Owner.set(player, userAddrs);

        return user;
    }
}
