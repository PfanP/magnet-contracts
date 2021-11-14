// SPDX-License-Identifier: AGPL-3.0-or-later
// pragma solidity 0.7.5;

// import "./libraries/IERC20.sol";

// //work in progress

// contract FairLaunch {
    
//     uint256 tokenToSell;
//     address investToken;
//     address launchToken;

//     constructor (address _investToken, address _launchToken){
//         investToken = _investToken;
//         launchToken = _launchToken;
//     }

//     //external onlyOwner
//     function depositLaunchTokens(uint256 amount) public {
//         // require(initialized, "Contract not initialized");
//         // require(launchTokenAddress != address(0), "launchTokenAddress not set");
        
//         // require(launchToken.allowance(_msgSender(), address(this)) >= amount, "Please approve amount to deposit");
//         // require(launchToken.balanceOf(_msgSender()) >= amount, "Insufficient balance to deposit");
        
//          // Transfer tokens from sender to this contract
//         IERC20(launchToken).transferFrom(msg.sender, address(this), amount);
        
//         return;
//     }

//     //price calcuation
//     function priceCalc() private returns (uint256)  {

//     }

//     function purchasetoken(uint256 amount) public {
//         //sell up to 500'000 MAG
//         //USDT.transferFrom(msg.sender, amount)
//         //uint256 price = priceCalc();
//         //MAG.transfer(price)
//     }
// }