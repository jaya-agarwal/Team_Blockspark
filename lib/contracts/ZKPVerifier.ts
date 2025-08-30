export const ZKP_VERIFIER_ADDRESS = process.env.NEXT_PUBLIC_ZKP_VERIFIER_ADDRESS as `0x${string}`

export const ZKP_VERIFIER_ABI = [
  {
    "inputs": [
      { "internalType": "bytes32", "name": "proofHash", "type": "bytes32" },
      { "internalType": "bool", "name": "isValid", "type": "bool" }
    ],
    "name": "verifyProof",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const