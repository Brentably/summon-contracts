// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.7.0 <0.9.0;

import "../GnosisSafe/interfaces/ERC1155TokenReceiver.sol";
import "../GnosisSafe/interfaces/ERC721TokenReceiver.sol";
import "../GnosisSafe/interfaces/ERC777TokensRecipient.sol";
import "../GnosisSafe/interfaces/IERC165.sol";

/// @title Default Callback Handler - returns true for known token callbacks
/// @author Richard Meissner - <richard@gnosis.pm>
contract MoonBirdsCallbackHandler is ERC1155TokenReceiver, ERC777TokensRecipient, ERC721TokenReceiver, IERC165 {
    event MoonBirdLendedFrom(address indexed lender, uint indexed tokenId);

    string public constant NAME = "MoonBirds Callback Handler";
    string public constant VERSION = "1.0.0";
    address public constant MOONBIRDS_ADDRESS = address(0x23581767a106ae21c074b2276D25e5C3e136a68b);
    mapping(bytes => address) public EncodedMoonbirdToLender; // map from token => lender

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return 0xf23a6e61;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] calldata,
        uint256[] calldata,
        bytes calldata
    ) external pure override returns (bytes4) {
        return 0xbc197c81;
    }


    /*
    function onERC721Received(
        address _operator,
        address _from,
        uint256 _tokenId,
        bytes calldata _data
    ) external returns (bytes4);
     */
    function onERC721Received(
        address /*_operator*/,
        address _from,
        uint256 _tokenId,
        bytes calldata /*_data*/
    ) external override returns (bytes4) {
        if(address(msg.sender) == MOONBIRDS_ADDRESS) {
            bytes memory encodedMoonbird = abi.encode(address(msg.sender), _tokenId);
            EncodedMoonbirdToLender[encodedMoonbird] = _from;
            emit MoonBirdLendedFrom(_from, _tokenId);
        }
        // emit event, store transfer data. CHECK BACK THIS LATER TO MAKE SURE IS SECURE
        return 0x150b7a02;
    }

    function tokensReceived(
        address,
        address,
        address,
        uint256,
        bytes calldata,
        bytes calldata
    ) external pure override {
        // We implement this for completeness, doesn't really have any value
    }

    function supportsInterface(bytes4 interfaceId) external view virtual override returns (bool) {
        return
            interfaceId == type(ERC1155TokenReceiver).interfaceId ||
            interfaceId == type(ERC721TokenReceiver).interfaceId ||
            interfaceId == type(IERC165).interfaceId;
    }
}
