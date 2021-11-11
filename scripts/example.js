async function main() {
    
    const erc = await ethers.getContractFactory("OlympusERC20Token");
    const ercd = await erc.deploy();
    console.log("erc deployed to", ercd.address);
    
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });