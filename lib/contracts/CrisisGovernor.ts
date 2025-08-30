export const CRISIS_GOVERNOR_ADDRESS = process.env.NEXT_PUBLIC_GOVERNOR_ADDRESS as `0x${string}`

export const CRISIS_GOVERNOR_ABI = [
  // Basic governor functions - you can expand this later
  {
    "inputs": [
      { "internalType": "address[]", "name": "targets", "type": "address[]" },
      { "internalType": "uint256[]", "name": "values", "type": "uint256[]" },
      { "internalType": "bytes[]", "name": "calldatas", "type": "bytes[]" },
      { "internalType": "string", "name": "description", "type": "string" }
    ],
    "name": "propose",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const