// lib/verification.ts
import { createPublicClient, http } from 'viem'
import { ganache } from './chains'

export const FACT_CHECKER_ADDRESS = process.env.NEXT_PUBLIC_FACT_CHECKER_ADDRESS as `0x${string}`

export interface Verification {
  newsHash: string
  isVerified: boolean
  timestamp: number
  verifiedBy: `0x${string}`
  source: string
}

export async function verifyNews(newsHash: string, source: string): Promise<boolean> {
  // This would interact with Chainlink oracle in production
  // For demo, we'll simulate verification
  return Math.random() > 0.2; // 80% success rate
}