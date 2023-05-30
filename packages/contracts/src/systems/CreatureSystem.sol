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

// import {ISpace} from "../interfaces/ISpace.sol";
import {GrowthLevelEnum} from "../codegen/Types.sol";
import {addressToEntityKey} from "../addressToEntityKey.sol";

contract CreatureSystem is System {
    // using Counters for Counters.Counter;

    // Counters.Counter private _tokenIds;

    function redeem(string memory image, string memory meta, int32 longitude, int32 latitude, address spaceAddrs)
        public
        returns (bytes32)
    {
        address userAddrs = _msgSender();
        bytes32 player = addressToEntityKey(userAddrs);

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
        Asset.set(player, AssetData(image, ""));
        // Care.set(player, CareData(block.timestamp, GrowthLevelEnum.SEED));
        // Energy.set(player, 1);
        Owner.set(player, msg.sender);

        return player;
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

    // function mintCreature(address _player, string memory _tokenURI) public returns (uint256) {
    //     uint256 newItemId = _tokenIds.current();
    //     _mint(_player, newItemId);
    //     _setTokenURI(newItemId, _tokenURI);

    //     _tokenIds.increment();

    //     return newItemId;
    // }

    // function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    //     super._burn(tokenId);
    // }

    // function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    //     return super.tokenURI(tokenId);
    // }
}
