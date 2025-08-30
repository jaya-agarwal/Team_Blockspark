// hardhat.config.ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
      accounts: {
        mnemonic: "your ganache mnemonic here", // Replace with your Ganache mnemonic
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10
      }
    }
  }
};

export default config;