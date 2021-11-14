// pragma solidity ^0.6.12;

// // SPDX-License-Identifier: MIT

// /* 
//  --- Launchswap: contract for launching ventures ---
//  investor submit capital and can redeem it at a cost
//  for now this is a single instance of the swap
//  the owner of the contract defines the mechanics
//  owner defines the mid price and the spread
//  users swap at the resulting bid and ask
//  in first iteration no liquidity pools
// */


// //import "OpenZeppelin/openzeppelin-contracts@3.2.0/contracts/math/SafeMath.sol";
// //import "OpenZeppelin/openzeppelin-contracts@3.2.0/contracts/access/Ownable.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.2.0/contracts/math/SafeMath.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.2.0/contracts/access/Ownable.sol";

// import "https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/proxy/Initializable.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/access/OwnableUpgradeable.sol";

// //import "OpenZeppelin/openzeppelin-contracts-upgradeable@3.2.0/contracts/access/OwnableUpgradeable.sol";
// //import "OpenZeppelin/openzeppelin-contracts-upgradeable@3.2.0/contracts/proxy/Initializable.sol";


// /*
// Participation certificates (PC)
// */

// contract PCert is Initializable, Ownable {    

//     using SafeMath for uint256;
    
//     bool initialized;

//     uint256 private _issuedSupply;
//     uint8 private _decimals;
//     string private _symbol;

//     mapping (address => uint256) private _balances;
    
//     event Issued(address account, uint256 amount);
//     event Redeemed(address account, uint256 amount);

//     //function initialize(string memory symbol) initializer public {
//     function initialize(string memory symbol) public {
//         _symbol = symbol;
//         _decimals = 18;
        
//         initialized = true;
//     }

//     /** Creates `amount` PC and assigns them to `account`
//     */
//     function issue(address account, uint256 amount) public onlyOwner {
//         require(initialized, "Contract not initialized");
//         require(account != address(0), "zero address");

//         _issuedSupply = _issuedSupply.add(amount);
//         _balances[account] = _balances[account].add(amount);
        
//         emit Issued(account, amount);
//     }

//     function redeem(address account, uint256 amount) public onlyOwner {
//         require(initialized, "Contract not initialized");
//         require(account != address(0), "zero address");
//         require(_balances[account] >= amount, "Insufficent balance");

//         _balances[account] = _balances[account].sub(amount);
//         _issuedSupply = _issuedSupply.sub(amount);
        
//         emit Redeemed(account, amount);
//     }

//     function balanceOf(address account) public view returns (uint256) {
//         return _balances[account];
//     }

//     function symbol() public view returns (string memory) {
//         return _symbol;
//     }

//     function decimals() public view returns (uint8) {
//         return _decimals;
//     }

//     function totalSupply() public view returns (uint256) {
//         return _issuedSupply;
//     }


// }

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.2.0/contracts/math/SafeMath.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.2.0/contracts/token/ERC20/ERC20.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.2.0/contracts/token/ERC20/SafeERC20.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.2.0/contracts/access/Ownable.sol";


// import "https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/proxy/Initializable.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/access/OwnableUpgradeable.sol";



// contract LaunchSwap is Initializable, OwnableUpgradeable {
    
//     using SafeMath for uint256;
//     using SafeERC20 for IERC20;

//     //TODO : dynamic and ordering?
//     Round[10] public rounds;

//     uint8 public currentRound;
    
//     /* 
//      * a discrete funding round
//      */
//     struct Round {
        
//         string name;
//         uint256 mid;
//         uint256 spread;
//         uint256 cap;
        
//         uint256 startTimestamp;
//         uint256 endTimestamp;
        
//         mapping (address => uint256) investors; //calculate from events emitted?
//         uint256 invested;
        
//         bool whitelisted;
        
//         address[] whitelistAddresses;
//         mapping (address => uint256) whitelist;
        
//     }
    
//     string public launchName;
//     string public launchTicker;
    
//     address public launchTokenAddress;
//     address public investTokenAddress;
    
//     address public treasuryAddress;
        
//     PCert public pc;
    
//     uint256 public launchTimestamp;
    
//     //total amount collected for all the participation rounds
//     uint256 public totalInvested;
//     //total amount release to treasury
//     uint256 public totalReleased;

//     bool initialized = false;

//     //EVENTS

//     event Invested(address participant, uint256 amountInvested, uint8 round, uint256 amountIssued);
//     event Divested(address participant, uint256 amountDivested, uint8 round, uint256 amountRefunded);
    
//     event RoundChange(uint8 newRound);
    
//     event TokensRedeemed(address participant, uint256 amountRedeemed);
    
//     event CapitalReleased(uint256 amount);

//     /*
//      * initialize the contract
//      */
//     function initialize(string memory _launchName, string memory _launchTicker, address _investTokenAddress, address _treasuryAddress) initializer public {
                
//         __Context_init_unchained();
//         __Ownable_init_unchained();
        
//         launchName = _launchName;
//         launchTicker = _launchTicker;
//         investTokenAddress = _investTokenAddress;
        
//         treasuryAddress = _treasuryAddress;

//         //symbol of future token not reserved yet, so use launchticker is temporary
//         string memory symbolPC = string(abi.encodePacked("pc", launchTicker));
        
//         pc = new PCert();
//         pc.initialize(symbolPC);
        
//         initialized = true;
        
//     }

//     /*
//      * link the launchtoken
//      */
//     function setLaunchToken(address _launchTokenAddress) external onlyOwner {
//         launchTokenAddress = _launchTokenAddress;
//     }
    
//     function getName() public view returns (string memory) {
//         require(initialized, "Contract not initialized");
//         return launchName;
//     }
    
//     function setLaunchTimestamp(uint256 _launchTimestamp) external onlyOwner {
//         require(initialized, "Contract not initialized");
        
//         launchTimestamp = _launchTimestamp;
//     }
    
//     function setRound(uint8 index, string memory name, uint256 mid, uint256 spread, uint256 cap, uint256 startTimestamp, uint256 endTimestamp, bool whitelisted) external onlyOwner {
//         require(index > 0, "Round index must start at 1");
//         require(initialized, "Contract not initialized");
        
//         rounds[index].name = name;
//         rounds[index].mid = mid;
//         rounds[index].spread = spread;
//         rounds[index].cap = cap;
//         rounds[index].startTimestamp = startTimestamp;
//         rounds[index].endTimestamp = endTimestamp;
//         rounds[index].whitelisted = whitelisted;
        
//         return;
//     }

//     function _addWLAddress(uint8 index, address investorAddress) internal {
//         Round storage r = rounds[index];
//         bool found;
//         found = false;
//         for (uint256 j = 0; j < r.whitelistAddresses.length; j++) {
//             if(investorAddress == r.whitelistAddresses[j]) {
//                 found = true;
//                 break;
//             }
//         }
        
//         if(!found) {
//             r.whitelistAddresses.push(investorAddress);
//         }
//     }
    
//     function addRoundWhiteList(uint8 index, address[] memory addresses, uint256[] memory maxInvestAmounts) external onlyOwner {
//         require(index > 0, "Round index must start at 1");
//         require(addresses.length == maxInvestAmounts.length, "Addresses and amounts array lengths must match");
        
//         Round storage r = rounds[index];
        
//         for (uint256 i = 0; i < addresses.length; i++) {
            
//             address investorAddress = addresses[i];
            
//             r.whitelist[investorAddress] = maxInvestAmounts[i];
            
//             _addWLAddress(index, investorAddress);
//         }        
//     }
    
//     function startNextRound() external onlyOwner {
//         currentRound = currentRound + 1;
        
//         emit RoundChange(currentRound);
//     }
    
//     //depositLaunchTokens
//     function depositLaunchTokens(uint256 amount) external onlyOwner {
//         require(initialized, "Contract not initialized");
//         require(launchTokenAddress != address(0), "launchTokenAddress not set");
        
//         ERC20 launchToken = ERC20(launchTokenAddress);
        
//         require(launchToken.allowance(_msgSender(), address(this)) >= amount, "Please approve amount to deposit");
//         require(launchToken.balanceOf(_msgSender()) >= amount, "Insufficient balance to deposit");
        
//          // Transfer tokens from sender to this contract
//         launchToken.transferFrom(_msgSender(), address(this), amount);
        
//         return;
//     }

//     function currentRoundInfo() public view returns (uint8 index, string memory name, uint256 mid, uint256 spread, uint256 bid, uint256 ask, uint256 cap, uint256 startTimestamp, uint256 endTimestamp, uint256 invested) {
//         require(initialized, "Contract not initialized");
//         require(currentRound > 0, "No valid rounds!");
//         Round memory r = rounds[currentRound];
        
//         return (currentRound, r.name, r.mid, r.spread, calculateBid(r.mid, r.spread), calculateAsk(r.mid, r.spread), r.cap, r.startTimestamp, r.endTimestamp, r.invested);
//     }

//     function getCurrentWL() public view returns (address[] memory){
//         Round storage r = rounds[currentRound];
//         uint k = r.whitelistAddresses.length;
//         address[] memory ret = new address[](k);
//         for (uint i = 0; i < k; i++) {
//             ret[i] = r.whitelistAddresses[i];
//         }
//         return ret;
//     }

//     function whitelistAmount(address addr) public view returns (uint256 amount){
        
//         //require is whitelisted
//         Round storage r = rounds[currentRound];
//         require(r.whitelist[addr] > 0, "no valid whitelist address");
//         return r.whitelist[addr];
//     }

//     function calculateBid(uint256 mid, uint256 spread) public pure returns (uint256) {
//         return mid.sub(_calculateOffset(mid, spread));
//     }
    
//     function calculateAsk(uint256 mid, uint256 spread) public pure returns (uint256) {
//         return mid.add(_calculateOffset(mid, spread));
//     }
    
//     function _calculateOffset(uint256 mid, uint256 spread) internal pure returns (uint256) {
//         //spread is % and has precision 2 dp eg. 5% is 500
//         return mid.mul(spread.div(2)).div(10000);
//     }
    
//     function investCalculateIssueAmount(uint256 investAmount, uint8 investTokenDecimals, uint256 ask) public pure returns (uint256) {
        
//         //pc decimals 18
//         //uint8 PC_DECIMALS = 18;
//         uint256 decimalsDiff = uint256(18 - investTokenDecimals);
        
//         // amount / ask (fixed point calc, account for decimal diffs USDC to PC and ask precision)
//         return investAmount.mul(10 ** uint256(investTokenDecimals)).div(ask).mul(10 ** decimalsDiff);
//     }
    
//     /* 
//      * participate in a funding event
//      */
//     function invest(uint256 investAmount) external {
//         require(currentRound > 0, "No valid rounds!");
        
//         Round storage r = rounds[currentRound];
        
//         //timestamp valid?
//         require(block.timestamp >= r.startTimestamp && block.timestamp <= r.endTimestamp, "Current round not within valid time period");
//         //cap reached?
//         require(r.invested.add(investAmount) <= r.cap, "Cap for current round reached");
        
//         if(r.whitelisted) {
//             require(investAmount <= r.whitelist[_msgSender()], "Invest amount has not been whitelisted for current round");
//         }
        
//         //e.g. USDC
//         ERC20 investToken = ERC20(investTokenAddress);
        
//         require(investToken.allowance(_msgSender(), address(this)) >= investAmount, "Please approve amount to invest");
//         require(investToken.balanceOf(_msgSender()) >= investAmount, "Insufficient investtoken balance to invest");
                
//         uint256 ask = calculateAsk(r.mid, r.spread);
        
//         uint256 issueAmount = investCalculateIssueAmount(investAmount, investToken.decimals(), ask);

//         //safetransfer
//         // Transfer tokens from sender to this contract
//         investToken.transferFrom(_msgSender(), address(this), investAmount);
//         //issue PCs
//         pc.issue(_msgSender(), issueAmount);
        
//         r.investors[_msgSender()] = r.investors[_msgSender()].add(investAmount);
//         r.invested = r.invested.add(investAmount);
        
//         totalInvested = totalInvested.add(investAmount);
        
//         emit Invested(_msgSender(), investAmount, currentRound, issueAmount);
//     }
    
//     function divestCalculateRefundAmount(uint256 divestAmount, uint8 investTokenDecimals, uint256 bid) public pure returns (uint256) {
        
//         //pc decimals 18
//         //uint8 PC_DECIMALS = 18;
//         uint256 decimalsDiff = uint256(18 - investTokenDecimals);
        
//         // divestAmount * bid (fixed point calc, account for decimal diffs PC to USDc and bid precision)
//         return divestAmount.mul(bid).div(10 ** uint256(investTokenDecimals)).div(10 ** decimalsDiff);
//     }
    
//     /**
//      * participant exits. the loss is determined by the bid-ask spread
//      */
//     function divest(uint256 divestAmount) external {
        
//         require(currentRound > 0, "No valid rounds!");
        
//         ERC20 investToken = ERC20(investTokenAddress);
                
//         Round storage r = rounds[currentRound];
        
//         uint256 bid = calculateBid(r.mid, r.spread);

//         //the amount in USDC
//         uint256 refundAmount = divestCalculateRefundAmount(divestAmount, investToken.decimals(), bid);

//         require(investToken.balanceOf(address(this)) >= refundAmount, "Insufficient investToken balance to divest");
        
//         //redeem PCs
//         pc.redeem(_msgSender(), divestAmount);
        
//         // Transfer tokens from contract to sender        
//         investToken.transfer(_msgSender(), refundAmount);

//         r.investors[_msgSender()] = r.investors[_msgSender()].sub(refundAmount);        
//         r.invested = r.invested.sub(refundAmount);        
//         totalInvested = totalInvested.sub(refundAmount);
        
//         emit Divested(_msgSender(), divestAmount, currentRound, refundAmount);
//     }

//     /**
//      *  redeem PC to tokens
//      *  will convert all available PCs to tokens
//      *  called by investor
//      */
//     function redeemAtLaunch() external {

//         require(launchTimestamp != 0 && block.timestamp >= launchTimestamp, "Token not launched yet");
//         require(launchTokenAddress != address(0), "launchTokenAddress not set");
        
//         uint256 balance = pc.balanceOf(_msgSender());
        
//         require(balance > 0, "No Participation credits to redeem");
        
//         ERC20 launchToken = ERC20(launchTokenAddress);
        
//         require(launchToken.balanceOf(address(this)) >= balance, "Insufficient launchtoken contract balance");
        
//         // redeem PC and send tokens
//         pc.redeem(_msgSender(), balance);
        
//         //TODO: account for decimals diff
        
//         launchToken.transfer(_msgSender(), balance);
        
//         emit TokensRedeemed(_msgSender(), balance);
//     }
    
//     /**
//      * release capital to the treasury address 
//      */
//     function releaseCapital(uint256 amount) external onlyOwner {
        
//         ERC20 investToken = ERC20(investTokenAddress);
        
//         require(investToken.balanceOf(address(this)) >= amount, "Insufficient contract balance to release capital amount");
        
//         investToken.transfer(treasuryAddress, amount);
        
//         totalReleased = totalReleased.add(amount);

//         emit CapitalReleased(amount);
//     }
    
    
// }