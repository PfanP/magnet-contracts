async function main() {

    //DAO: multisig
    //const [deployer, MockDAO] = await ethers.getSigners();
    const [deployer] = await ethers.getSigners();
    const accounts = await ethers.getSigners();
    MockDAO = deployer;

    // -- contracts --
    
    const OHM = await ethers.getContractFactory("OlympusERC20Token");
    //const ohm = await OHM.deploy();
    const ohm = await OHM.attach('0xDe6D2D63b10c088263B55154638746bD1057312F');

    console.log("OlympusERC20Token ", ohm.address);
    
    //ohm.transfer(accounts[1], 100);
    

    let n = await ohm.name();
    console.log(n);    

    let d = await ohm.decimals();

    console.log("accounts " + accounts[0].address);
    
    console.log("OlympusERC20Token ", ohm.address);
    console.log("OlympusERC20Token ", d);

    let b = await ohm.balanceOf(accounts[0].address);
    console.log("balance " + b.toNumber()/10**d);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });