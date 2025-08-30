// lib/nft.ts
export interface NFTContribution {
  type: string
  value: bigint
  location: string
  timestamp: number
}

export interface UserNFT {
  id: number
  type: string
  value: string
  timestamp: number
  location: string
  metadata: string
}

// Mock functions - replace with actual contract interactions
export async function mintContributionNFT(
  to: `0x${string}`,
  contribution: NFTContribution
): Promise<number> {
  // Simulate minting delay
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  const tokenId = Math.floor(Math.random() * 10000) + 1
  console.log('Minting NFT:', { to, contribution, tokenId })
  
  return tokenId
}

export async function getUserNFTs(user: `0x${string}`): Promise<UserNFT[]> {
  // Simulate API call
  return [
    {
      id: 1,
      type: 'crisis_report',
      value: '1.5 ETH',
      timestamp: Date.now() - 86400000,
      location: 'Mumbai, India',
      metadata: 'ipfs://Qm...'
    },
    {
      id: 2,
      type: 'verification',
      value: '0.8 ETH',
      timestamp: Date.now() - 172800000,
      location: 'Assam, India',
      metadata: 'ipfs://Qm...'
    }
  ]
}

export async function getNFTRewardValue(type: string): Promise<bigint> {
  const values: { [key: string]: bigint } = {
    'crisis_report': parseEther('1.0'),
    'verification': parseEther('0.5'),
    'governance': parseEther('0.3'),
    'donation': parseEther('0.8')
  }
  
  return values[type] || parseEther('0.1')
}