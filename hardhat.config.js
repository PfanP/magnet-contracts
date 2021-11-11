require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ganache");

//import SignerWithAddress from "@nomiclabs/hardhat-ethers/signers"


module.exports = {
  defaultNetwork: "localhost",
  solidity: {
    version: "0.7.5",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  
  // networks: {
  //   hardhat: {
  //   },
  //   rinkeby: {
  //     url: "https://eth-rinkeby.alchemyapi.io/v2/123abc123abc123abc123abc123abcde",
  //     accounts: [privateKey1, privateKey2, ...]
  //   }
  // },

};


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
  
  
  // paths: {
  //   sources: "./contracts",
  //   tests: "./test",
  //   cache: "./cache",
  //   artifacts: "./artifacts"
  // },
  // mocha: {
  //   timeout: 20000
  // }
