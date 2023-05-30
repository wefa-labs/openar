// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {System} from "@latticexyz/world/src/System.sol";

// Compoonents - Write
import {Identity, IdentityData} from "../codegen/tables/Identity.sol";
// import {TokenID} from "../codegen/tables/TokenID.sol";
import {Asset, AssetData} from "../codegen/tables/Asset.sol";
import {Care, CareData} from "../codegen/tables/Care.sol";
import {Element} from "../codegen/tables/Element.sol";
import {Owner} from "../codegen/tables/Owner.sol";

import {GrowthLevelEnum} from "../codegen/Types.sol";
import {addressToEntityKey} from "../addressToEntityKey.sol";
// import {ISpace} from "../interfaces/ISpace.sol";

contract PlantSystem is System {
    // using Counters for Counters.Counter;

    // Counters.Counter private _tokenIds;

    function redeem(
        string memory image,
        string memory meta,
        int32 long,
        int32 lat,
        GrowthLevelEnum growthLevel,
        address userAddrs
    ) public returns (bytes32) {
        // require(healthStatus != HealthStatusEnum.DEAD, "plant is dead");
        address spaceAddrs = _msgSender();
        bytes32 player = addressToEntityKey(userAddrs);

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

        return player;
    }

    //     function mintPlant(address _player, string memory _tokenURI) public returns (uint256) {
    //         uint256 newItemId = _tokenIds.current();

    //         _mint(_player, newItemId);
    //         _setTokenURI(newItemId, _tokenURI);

    //         _tokenIds.increment();

    //         return newItemId;
    //     }

    //     function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    //         super._burn(tokenId);
    //     }

    //     function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    //         return super.tokenURI(tokenId);
    //     }
}
