import { Chain } from "wagmi/chains";
import { defineChain } from 'viem'

// Ganache local chain - make sure it matches the Chain type exactly
export const ganache: Chain = {
  id: 1337,
  name: "Ganache Local",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:7545"],
    },
  },
  blockExplorers: {
    default: {
      name: "Ganache Local",
      url: "http://127.0.0.1:7545",
    },
  },
  testnet: true,
} as const; // Add as const to make it a literal type