require("@nomicfoundation/hardhat-toolbox");

const dotenv = require("dotenv");
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  
  networks: { 
      mainnet: {
      url: "https://rpc.ankr.com/gnosis",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      }
     },

  gnosisscan: {
    apiKey: {
      chiado: process.env.GNOSISSCAN_API_KEY || "",
      gnosis: process.env.GNOSISSCAN_API_KEY || "",
    },
  },
};
