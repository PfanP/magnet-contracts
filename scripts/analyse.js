
//snowbank_staking = 0x85784d5e2CCae89Bcb39EbF0ac6Cdc93d42d99AD

    async function main() {

    //DAO: multisig
    //const [deployer, MockDAO] = await ethers.getSigners();
    const [deployer] = await ethers.getSigners();
    const accounts = await ethers.getSigners();
    MockDAO = deployer;

    // -- contracts --
    
    const OHM = await ethers.getContractFactory("OlympusERC20Token");
    const Bond = await ethers.getContractFactory('OlympusBondDepository');

    const ohm = await OHM.attach('0x383518188c0c6d7730d91b2c03a03c837814a899');
    console.log(await ohm.decimals());
    let x = await ohm.totalSupply();
    console.log(x);
    console.log(x.toString());

    //const bondcalc = await BondCalc.attach("0x10D9485C3021E1Db054df81A4e1D5c8217A69213");
    // //const treasury = await Treasury.attach("0x53a5C104D10f3479547E31A5D6BA28928254D822");
    
    const daibond = await Bond.attach("0x575409F8d77c12B05feD8B455815f0e54797381c");

    let bcv = await daibond.terms();
    console.log("bcv " + bcv);

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });