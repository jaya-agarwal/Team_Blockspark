// wagmi.config.ts
import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask, walletConnect } from 'wagmi/connectors';
import { ganache } from "./lib/chains";  // ← Add Ganache back

// Use Ganache as primary chain
export const chains = [ganache, sepolia, mainnet] as const;

export const config = createConfig({
  chains,
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id',
    }),
  ],
  transports: {
    [ganache.id]: http("http://127.0.0.1:7545"),  // ← Ganache RPC
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}