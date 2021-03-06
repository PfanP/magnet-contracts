async function main() {

    //DAO: multisig
    //const [deployer, MockDAO] = await ethers.getSigners();
    const [deployer] = await ethers.getSigners();
    const accounts = await ethers.getSigners();
    MockDAO = deployer;

    for (const account of accounts) {
      console.log(account.address);
    }
    
    console.log('Deploying contracts with the account: ' + deployer.address);
    console.log('MockDAO: ' + MockDAO.address);

    // let amountMint = ethers.BigNumber.from(9000000000000000000000000);
    // amountMint.toString()

    // -- params --

    // Initial staking index
    const initialIndex = '7675210820';

    // First block epoch occurs
    const firstEpochBlock = '8961000';

    // What epoch will be first epoch
    const firstEpochNumber = '338';

    // How many blocks are in each epoch
    const epochLengthInBlocks = '2200';

    // Initial reward rate for epoch
    const initialRewardRate = '3000';

    // Ethereum 0 address, used when toggling changes in treasury
    const zeroAddress = '0x0000000000000000000000000000000000000000';

    // Large number for approval for DAI
    const largeApproval = '100000000000000000000000000000000';

    // Initial mint for DAI (10,000,000)
    const initialMint = '10000000000000000000000000';

    // DAI bond BCV
    const daiBondBCV = '369';

    // Bond vesting length in blocks. 33110 ~ 5 days
    const bondVestingLength = '33110';

    // Min bond price
    const minBondPrice = '50000';

    // Max bond payout
    const maxBondPayout = '50'

    // DAO fee for bond
    const bondFee = '10000';

    // Max debt bond can take on
    const maxBondDebt = '1000000000000000';

    // Initial Bond debt
    const intialBondDebt = '0'

    // -- contracts --
    
    const OHM = await ethers.getContractFactory("TimeERC20Token");
    const ohm = await OHM.deploy();

    // Deploy DAI
    const DAI = await ethers.getContractFactory('DAI');
    const dai = await DAI.deploy( 0 );

    console.log("mint");


    // Deploy 10,000,000 mock DAI
    await dai.mint( deployer.address, initialMint );

    const Treasury = await ethers.getContractFactory('TimeMockTreasury');

    //TODO check
    let _blocksNeededForQueue=0
    const treasury = await Treasury.deploy( ohm.address, dai.address, _blocksNeededForQueue );

    
    const OlympusBondingCalculator = await ethers.getContractFactory('TimeBondingCalculator');
    const olympusBondingCalculator = await OlympusBondingCalculator.deploy( ohm.address );
    console.log("olympusBondingCalculator deployed to", olympusBondingCalculator.address);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const Distributor = await ethers.getContractFactory('Distributor');
    const distributor = await Distributor.deploy(treasury.address, ohm.address, epochLengthInBlocks, firstEpochBlock);

    
    // Deploy sOHM
    const SOHM = await ethers.getContractFactory('MEMOries');
    const sOHM = await SOHM.deploy();
    
    // Deploy Staking
    const Staking = await ethers.getContractFactory('TimeStaking');
    const staking = await Staking.deploy( ohm.address, sOHM.address, epochLengthInBlocks, firstEpochNumber, firstEpochBlock );
    
    // Deploy staking warmpup
    const StakingWarmpup = await ethers.getContractFactory('StakingWarmup');
    const stakingWarmup = await StakingWarmpup.deploy(staking.address, sOHM.address);
    
    
    // Deploy staking helper
    const StakingHelper = await ethers.getContractFactory('StakingHelper');
    const stakingHelper = await StakingHelper.deploy(staking.address, ohm.address);
    
    // Deploy DAI bond
    //@dev changed function call to Treasury of 'valueOf' to 'valueOfToken' in BondDepository due to change in Treausry contract
    const DAIBond = await ethers.getContractFactory('TimeBondDepository');
    console.log("MockDAO.address " + MockDAO.address);
    const daiBond = await DAIBond.deploy(ohm.address, dai.address, treasury.address, MockDAO.address, zeroAddress);
    
    // queue and toggle DAI bond reserve depositor
    await treasury.queue('0', daiBond.address);
    await treasury.toggle('0', daiBond.address, zeroAddress);
    
    console.log("toggle");

    // Set DAI bond terms
    await daiBond.initializeBondTerms(daiBondBCV, bondVestingLength, minBondPrice, maxBondPayout, bondFee, maxBondDebt, intialBondDebt);
    console.log("Set DAI bond terms");
    
    // Set staking for DAI bond
    console.log("Set staking for DAI");
    await daiBond.setStaking(staking.address, stakingHelper.address);
    
    // Initialize sOHM and set the index
    console.log("Initialize sOHM and set the index");
    await sOHM.initialize(staking.address);
    await sOHM.setIndex(initialIndex);
    
    // set distributor contract and warmup contract
    console.log("set distributor contract and warmup contract");
    await staking.setContract('0', distributor.address);
    await staking.setContract('1', stakingWarmup.address);
    
    // Set treasury for OHM token
    console.log("setvault");
    await ohm.setVault(treasury.address);
    
    // Add staking contract as distributor recipient
    console.log("Add staking contract as distributor recipient");
    await distributor.addRecipient(staking.address, initialRewardRate);
    
    // queue and toggle reward manager
    console.log("queue and toggle reward manager");
    await treasury.queue('8', distributor.address);
    await treasury.toggle('8', distributor.address, zeroAddress);
    
    // queue and toggle deployer reserve depositor
    console.log("queue and toggle deployer reserve depositor");
    await new Promise(resolve => setTimeout(resolve, 1000));
    //TODO FAIL
    await treasury.queue('0', deployer.address);
    await treasury.toggle('0', deployer.address, zeroAddress);
    
    // queue and toggle liquidity depositor
    console.log("queue and toggle liquidity depositor");
    await treasury.queue('4', deployer.address, );
    await treasury.toggle('4', deployer.address, zeroAddress);
    
    // Approve the treasury to spend DAI
    console.log("Approve the treasury to spend DAI");
    await dai.approve(treasury.address, largeApproval );
    
    // Approve dai bonds to spend deployer's DAI
    console.log("Approve dai bonds to spend deployer's DAI");
    await dai.approve(daiBond.address, largeApproval );
    
    // Approve staking and staking helper contact to spend deployer's OHM
    console.log("Approve staking and staking helper contact to spend deployer's OHM");
    await ohm.approve(staking.address, largeApproval);
    await ohm.approve(stakingHelper.address, largeApproval);
    
    // Deposit 9,000,000 DAI to treasury, 600,000 OHM gets minted to deployer and 8,400,000 are in treasury as excesss reserves
    await treasury.deposit('9000000000000000000000000', dai.address, '8400000000000000');
    
    // Stake OHM through helper
    await stakingHelper.stake('100000000000', deployer.address);
    
    // Bond 1,000 OHM in each of their bonds
    //let amount = 1000 * 10**18;
    // await daiBond.deposit('1000000000000000000000', '60000', deployer.address );
    
    //console.log(await daiBond.totalDebt().toNumber());
    
    console.log("OlympusERC20Token deployed to", ohm.address);
    console.log("dai deployed to", dai.address);
    console.log("treasury deployed to", treasury.address);
    console.log("distributor deployed to", distributor.address);
    console.log("sOHM deployed to", sOHM.address);
    console.log("daiBond deployed to", daiBond.address);
    console.log("staking deployed to", staking.address);
    console.log("stakingWarmup deployed to", stakingWarmup.address);
    console.log("stakingHelper deployed to", stakingHelper.address);
    
    console.log("=== done ===")
    
    
    // OlympusStaking
    // StakingHelper
    // Aave Allocator
    // Convex Allocator
    // Onsen Allocator
    // DAO
    // Staking Warm Up

    
    
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });