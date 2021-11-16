async function main() {

    //DAO: multisig
    //const [deployer, MockDAO] = await ethers.getSigners();
    const [deployer] = await ethers.getSigners();
    const accounts = await ethers.getSigners();
    MockDAO = deployer;

    // -- contracts --
    
    const OHM = await ethers.getContractFactory("OlympusERC20Token");
    const BondCalc = await ethers.getContractFactory("OlympusBondingCalculator");
    const Treasury = await ethers.getContractFactory('OlympusTreasury'); 

    const ohm = await OHM.attach('0xDe6D2D63b10c088263B55154638746bD1057312F');
    const bondcalc = await BondCalc.attach("0x10D9485C3021E1Db054df81A4e1D5c8217A69213");
    //const treasury = await Treasury.attach("0x53a5C104D10f3479547E31A5D6BA28928254D822");
    const Bond = await ethers.getContractFactory('OlympusBondDepository');
    const bond = await Bond.attach("0xcC11AA3fe4168A5de787e48C26170dD4804E198C");


    //const daiBondBCV = '369';
    const daiBondBCV = '369';
    const bondVestingLength = '33110';
    const minBondPrice = '50000';
    const maxBondPayout = '50'
    const bondFee = '10000';
    const maxBondDebt = '1000000000000000';
    const intialBondDebt = '0';

    console.log("OlympusERC20Token ", ohm.address);    
    console.log("accounts " + accounts[0].address);
    
    console.log("bondcalc " + bondcalc.address);

    // controlVariable; // scaling variable for price
    // vestingTerm; // in blocks
    // minimumPrice; // vs principle value
    // maxPayout; // in thousandths of a %. i.e. 500 = 0.5%
    // fee; // as % of bond payout, in hundreths. ( 500 = 5% = 0.05 for every 1 paid)
    // maxDebt; // 9 decimal debt ratio, max % total supply created as debt

    let bcv = await bond.terms();
    console.log("bcv " + bcv);

    //369,33110,50000,50,10000,1000000000000000

    //await bond.initializeBondTerms('0', bondVestingLength, minBondPrice, maxBondPayout, bondFee, maxBondDebt, intialBondDebt);

    //const DAI = await ethers.getContractFactory('DAI');
    //const dai = await DAI.deploy( 0 );
    
    const zeroAddress = '0x0000000000000000000000000000000000000000';

    //TODO
    let dai = ohm;
    //TODO
    let ohmdai = ohm;
    
    let _blocksNeededForQueue=0
    
    let bterms = await bond.terms();

    //console.log(bterms.length);
    // console.log(bterms.fee.toNumber());
    // console.log(bterms.controlVariable.toNumber());
    // let debt = await bond.currentDebt();
    // console.log("currentDebt " + debt.toNumber());
    // //console.log(await bond.totalDebt());
    
    // let supply = await ohm.totalSupply();
    // console.log("supply " + supply);


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