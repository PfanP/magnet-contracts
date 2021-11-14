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