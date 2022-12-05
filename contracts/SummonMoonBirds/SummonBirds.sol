// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './SummonBirdsUtils.sol';
import './MoonBirdsCallbackHandler.sol';
import "../GnosisSafe/interfaces/ERC721TokenReceiver.sol";

contract Summon is SummonUtils, MoonBirdsCallbackHandler, ERC721TokenReceiver {
  address public owner;
  address public SummonManager;
  address public MoonBirdsAddress;
   // address public constant MOONBIRDS_ADDRESS = address(0x23581767a106ae21c074b2276D25e5C3e136a68b);
    address public MOONBIRDS_ADDRESS;
    mapping(bytes => address) public EncodedMoonbirdToLender; // map from token => lender

  // constructor(address _owner ) {
  //     owner = _owner;
  //     SummonFactory = msg.sender;
  // }


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


function init(address _owner, address _moonbirdsAddress) external {
    require(owner == address(0) && SummonManager == address(0) && MoonBirdsAddress == address(0));
    owner = _owner;
    SummonManager = msg.sender;
    MOONBIRDS_ADDRESS = _moonbirdsAddress;
}


/* 
function safeTransferWhileNesting(
        address from,
        address to,
        uint256 tokenId
    ) external {
        require(ownerOf(tokenId) == _msgSender(), "Moonbirds: Only owner");
        nestingTransfer = 2;
        safeTransferFrom(from, to, tokenId);
        nestingTransfer = 1;
    }
*/

function safeWithdrawMoonBird(address tokenAddress, uint256 tokenId) public returns(bool success, bytes memory data) {
    bytes memory encodedMoonbird = abi.encode(tokenAddress, tokenId);
    address lender = EncodedMoonbirdToLender[encodedMoonbird];

    require(msg.sender == lender || msg.sender == owner, "can only be called by lender or owner");
 
    
    EncodedMoonbirdToLender[encodedMoonbird] = address(0);

    (success, data) = tokenAddress.call(abi.encodeWithSignature("safeTransferWhileNesting(address,address,uint256)",address(this),lender,tokenId));
    require(success, "call failed");
  }


  function safeWithdraw(address tokenAddress, uint256 tokenId, address lender) public returns(bool success, bytes memory data) {
    require(msg.sender == SummonManager, "can only be called by Summon Manager");
    (success, data) = tokenAddress.call(abi.encodeWithSignature("safeTransferFrom(address,address,uint256)",address(this),lender,tokenId));
    require(success, "call failed");
  }



  


  function isValidSignature(
    bytes32 _hash,
    bytes calldata _signature
  ) external view returns (bytes4) {
   // Validate signatures
   if ((recoverSigner(_hash, _signature)) == owner) {
     return 0x1626ba7e;
   } else {
     return 0xffffffff;
   }
  }


}