async function main() {

    //DAO: multisig
    //const [deployer, MockDAO] = await ethers.getSigners();
    const [deployer] = await ethers.getSigners();
    const accounts = await ethers.getSigners();
    MockDAO = deployer;

    // What epoch will be first epoch
    const firstEpochNumber = '338';

    // How many blocks are in each epoch
    const epochLengthInBlocks = '2200';

    // First block epoch occurs
    const firstEpochBlock = '8961000';

    // Large number for approval for DAI
    const largeApproval = '100000000000000000000000000000000';

    // Ethereum 0 address, used when toggling changes in treasury
    const zeroAddress = '0x0000000000000000000000000000000000000000';

    // -- contracts --
    
    const OHM = await ethers.getContractFactory("TimeERC20Token");
    const SOHM = await ethers.getContractFactory('MEMOries');
    const Treasury = await ethers.getContractFactory("TimeTreasury");
    const DAI = await ethers.getContractFactory('DAI');
    // Deploy Staking
    const Staking = await ethers.getContractFactory('TimeStaking');
    const StakingHelper = await ethers.getContractFactory('StakingHelper');
    const DAIBond = await ethers.getContractFactory('TimeBondDepository');

    //     OlympusERC20Token deployed to 0x2EB8810A81d795bf4f87Ade064F2B8041f217c02
    // dai deployed to 0xF7aB4e78c704a826E89DED70A55891eEE23278e4
    // treasury deployed to 0x53a5C104D10f3479547E31A5D6BA28928254D822
    // distributor deployed to 0x54B82aCc71b601F023417887D0796B877f887A8E
    // sOHM deployed to 0x43A0C7F3433A73Be05bFce83B31c365a6939Bf17
    // daiBond deployed to 0xcC11AA3fe4168A5de787e48C26170dD4804E198C
    // staking deployed to 0xba9674D17BdC1F30d0A5dD2855a641CaD4b8f149
    // stakingWarmup deployed to 0x0371aCf8556D1C24F0dE8ff69832F94c87D0FEd1
    // stakingHelper deployed to 0xc0E04C58580bF7bf169688340FF116194d43bFF1

    const treasury = await Treasury.attach('0x53a5C104D10f3479547E31A5D6BA28928254D822');
    const dai = await DAI.attach('0xF7aB4e78c704a826E89DED70A55891eEE23278e4');
    const ohm = await OHM.attach('0x2EB8810A81d795bf4f87Ade064F2B8041f217c02');
    const sOHM = await SOHM.deploy();
    const daiBond = await DAIBond.deploy(ohm.address, dai.address, treasury.address, MockDAO.address, zeroAddress);

    const staking = await Staking.deploy(ohm.address, sOHM.address, epochLengthInBlocks, firstEpochNumber, firstEpochBlock);
    const stakingHelper = await StakingHelper.deploy(staking.address, ohm.address);

    //const ohm = await OHM.deploy();
    //ohm.transfer(accounts[1], 100);

    let n = await ohm.name();
    console.log("name " + n);

    let d = await ohm.decimals();
    console.log("accounts " + accounts[0].address);
    
    // console.log("OlympusERC20Token ", ohm.address);
    // console.log("OlympusERC20Token ", d);

    let addr = accounts[0].address;
    let b = await ohm.balanceOf(addr);
    console.log("balance " + b.toNumber()/10**d + " ( " + addr + " )");

    let x = await treasury.reserveTokens(0);
    console.log("reserveToken: " + x);
    
    let totalReserves = await treasury.totalReserves();
    let totalDebt = await treasury.totalDebt();
    console.log("totalReserves: " + totalReserves/10**9);
    console.log("totalDebt: " + totalDebt);

    await dai.approve(treasury.address, largeApproval );
    await ohm.approve(staking.address, largeApproval);

    await treasury.toggle('0', daiBond.address, zeroAddress);
    await treasury.incurDebt(100, dai.address);

    // let x1 = await treasury.liquidityTokens(0);
    // console.log("liquidityTokens: " + x1);
    

    // const Bond = await ethers.getContractFactory("MockOlympusBondDepository");
    // const daibond = await Bond.attach("0xdEF18E03653ec73125E0E8d43C6B9A9876dF982E");

    // console.log("daibond ", daibond.address);
    // let x = await daibond.totalDebt();
    // console.log("daibond ", x.toNumber()/10**9);

    // //let amount = 1000 * 10**18;
    // let amount = "1000000000000000000000";

    // await daibond.deposit(amount, '60000', deployer.address );

    // let z = await daibond.totalDebt();
    // console.log("daibond ", z.toNumber()/10**9);
    // await stakingHelper.stake('100000000000');

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });