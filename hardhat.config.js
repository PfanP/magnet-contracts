require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ganache");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-ethers");


//require("hardhat-prettier");


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
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: ["c2116e844ce28b95fce219e716bf7db375ebbf243d6ae241af5c53e442fde0c8"]

      //ChainID:  43113
    }
  }
  
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

// task action function receives the Hardhat Runtime Environment as second argument
task("web3", "Prints accounts", async (_, { web3 }) => {
  console.log(await web3.eth.getAccounts());

  
});

task(
  "number",
  "Prints the current block number",
  async (_, { ethers }) => {
    await ethers.provider.getBlockNumber().then((blockNumber) => {
      console.log("Current block number: " + blockNumber);
    });
  }
);


  
  
  // paths: {
  //   sources: "./contracts",
  //   tests: "./test",
  //   cache: "./cache",
  //   artifacts: "./artifacts"
  // },
  // mocha: {
  //   timeout: 20000
  // }
