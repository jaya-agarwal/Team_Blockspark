// lib/contract.ts
export const REGISTRY_ADDRESS =
  process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`

export const REGISTRY_ABI = [
  {
    "type":"function","name":"saveReport","stateMutability":"nonpayable",
    "inputs":[{"name":"digest","type":"bytes32"},{"name":"id_","type":"string"}],
    "outputs":[]
  },
  {
    "type":"function","name":"authorOf","stateMutability":"view",
    "inputs":[{"name":"digest","type":"bytes32"}],
    "outputs":[{"type":"address"}]
  },
  {
    "type":"event","name":"ReportSaved","inputs":[
      {"name":"digest","type":"bytes32","indexed":true},
      {"name":"author","type":"address","indexed":true},
      {"name":"timestamp","type":"uint256","indexed":false},
      {"name":"id","type":"string","indexed":false}
    ],"anonymous":false
  }
] as const