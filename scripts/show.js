async function main() {

    //DAO: multisig
    //const [deployer, MockDAO] = await ethers.getSigners();
    const [deployer] = await ethers.getSigners();
    const accounts = await ethers.getSigners();
    MockDAO = deployer;

    // -- contracts --
    
    const OHM = await ethers.getContractFactory("OlympusERC20Token");
    //const ohm = await OHM.deploy();
    const ohm = await OHM.attach('0xD907eC8EeDDCaCE5F2E299fa06C3EDD1497F6525');

    console.log("OlympusERC20Token ", ohm.address);
    
    //ohm.transfer(accounts[1], 100);
    

    let n = await ohm.name();
    console.log(n);    

    let d = await ohm.decimals();

    console.log("accounts " + accounts[0].address);
    
    console.log("OlympusERC20Token ", ohm.address);
    console.log("OlympusERC20Token ", d);

    let addr = accounts[0].address;
    let b = await ohm.balanceOf(addr);
    console.log("balance " + b.toNumber()/10**d + " ( " + addr + " )");


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


    
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });