export const FACT_CHECKER_ADDRESS = process.env.NEXT_PUBLIC_FACT_CHECKER_ADDRESS as `0x${string}`

export const FACT_CHECKER_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "newsHash", "type": "string" },
      { "internalType": "string", "name": "source", "type": "string" }
    ],
    "name": "verifyNews",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const