// crisis-dapp/lib/dao.ts
import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'

export const CRISIS_GOVERNOR_ADDRESS = process.env.NEXT_PUBLIC_GOVERNOR_ADDRESS as `0x${string}`
export const CRISIS_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http()
})

export interface Proposal {
  id: number
  title: string
  description: string
  ipfsHash: string
  proposer: `0x${string}`
  forVotes: bigint
  againstVotes: bigint
  abstainVotes: bigint
  state: number
}

export async function getProposalState(proposalId: number): Promise<number> {
  // Mock implementation - replace with actual contract call
  return 1 // Active state
}

export async function getVotes(account: `0x${string}`): Promise<bigint> {
  // Mock implementation - replace with actual contract call
  return BigInt(1000)
}