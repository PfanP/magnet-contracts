async function main() {

    //DAO: multisig
    //const [deployer, MockDAO] = await ethers.getSigners();
    const [deployer] = await ethers.getSigners();
    const accounts = await ethers.getSigners();
    MockDAO = deployer;

    // -- contracts --
    
    const OHM = await ethers.getContractFactory("OlympusERC20Token");
    const ohm = await OHM.deploy();
    //const ohm = await OHM.attach('0xDe6D2D63b10c088263B55154638746bD1057312F');

    console.log("OlympusERC20Token ", ohm.address);    
    console.log("accounts " + accounts[0].address);
    
    const BondCalc = await ethers.getContractFactory("OlympusBondingCalculator");
    const bondcalc = await BondCalc.deploy(ohm.address);
    
    console.log("bondcalc " + bondcalc.address);

    //const DAI = await ethers.getContractFactory('DAI');
    //const dai = await DAI.deploy( 0 );
    
    const zeroAddress = '0x0000000000000000000000000000000000000000';

    //TODO
    let dai = ohm;
    //TODO
    let ohmdai = ohm;
    
    let _blocksNeededForQueue=0
    const Treasury = await ethers.getContractFactory('OlympusTreasury'); 
    const treasury = await Treasury.deploy( ohm.address, dai.address, ohmdai.address, _blocksNeededForQueue );
    const someBond = await ethers.getContractFactory('OlympusBondDepository');
    //
    const bond = await someBond.deploy(ohm.address, dai.address, treasury.address, MockDAO.address, zeroAddress);
    console.log("bond " + bond.address);

    const daiBondBCV = '369';
    const bondVestingLength = '33110';
    const minBondPrice = '50000';
    const maxBondPayout = '50'
    const bondFee = '10000';
    const maxBondDebt = '1000000000000000';
    const intialBondDebt = '1000';

    await bond.initializeBondTerms(daiBondBCV, bondVestingLength, minBondPrice, maxBondPayout, bondFee, maxBondDebt, intialBondDebt);

    let bterms = await bond.terms();

    //console.log(bterms.length);
    console.log(bterms.fee.toNumber());
    console.log(bterms.controlVariable.toNumber());
    let debt = await bond.currentDebt();
    console.log("currentDebt " + debt.toNumber());
    //console.log(await bond.totalDebt());
    
    let supply = await ohm.totalSupply();
    console.log("supply " + supply);


    // let depositor = accounts[0].address;

    // let tx = await bond.deposit(100, 1000, depositor);
    // let receipt = await tx.wait();
    // console.log(tx);
    // console.log(receipt.events[1].args);

    
    // console.log(receipt.events[1].args);

    //     let tx: ContractTransaction = await myToken.connect(accounts[0]).transfer(accounts[1].address, 1);
    // let receipt: ContractReceipt = await tx.wait();
    // console.log(receipt.events?.filter((x) => {return x.event == "Transfer"}));


    //deploy tokens

    //deploy BondDepo
    
    //deposit()
    //check events
    

    // const OHMWETH = "0xfffae4a0f4ac251f4705717cd24cadccc9f33e06";
    // let x = await bondcalc.getKValue(OHMWETH);
    // console.log(">> " + x);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });