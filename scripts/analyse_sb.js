
const TIME_BOND = "0xe02b1aa2c4be73093be79d763fdffc0e3cf67318";

//snowbank_staking = 


    async function main() {

    //DAO: multisig
    //const [deployer, MockDAO] = await ethers.getSigners();
    const [deployer] = await ethers.getSigners();
    const accounts = await ethers.getSigners();
    MockDAO = deployer;

    // -- contracts --

    const sb_address = "0x7d1232b90d3f809a54eeaeebc639c62df8a8942f";
    
    const OHM = await ethers.getContractFactory("OlympusERC20Token");
    const Bond = await ethers.getContractFactory('OlympusBondDepository');

    const ohm = await OHM.attach(sb_address);
    console.log(await ohm.decimals());
    let x = await ohm.totalSupply();
    console.log("totalSupply " + (x/10**9).toString());
    

    //const bondcalc = await BondCalc.attach("0x10D9485C3021E1Db054df81A4e1D5c8217A69213");
    // //const treasury = await Treasury.attach("0x53a5C104D10f3479547E31A5D6BA28928254D822");
    
    //const daibond = await Bond.attach("0x85784d5e2CCae89Bcb39EbF0ac6Cdc93d42d99AD");
    const daibond = await Bond.attach("0x587bc7775f88d9a190aa02d30f7df2c9bb183f5d");

    let bcv = await daibond.terms();
    console.log("bcv " + bcv);

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });