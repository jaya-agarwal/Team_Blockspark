// app/(routes)/rewards/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import NFTReward from '@/app/(components)/NFTReward'
import { toast } from 'sonner'

interface UserNFT {
  id: number
  type: string
  value: string
  timestamp: number
  location: string
}

export default function RewardsPage() {
  const { isConnected, address } = useAccount()
  const [userNFTs, setUserNFTs] = useState<UserNFT[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isConnected && address) {
      loadUserNFTs()
    } else {
      setLoading(false)
    }
  }, [isConnected, address])

  const loadUserNFTs = async () => {
    try {
      const mockNFTs: UserNFT[] = [
        {
          id: 1,
          type: 'crisis_report',
          value: '1.5 ETH',
          timestamp: Date.now() - 86400000,
          location: 'Mumbai, India'
        },
        {
          id: 2,
          type: 'verification',
          value: '0.8 ETH',
          timestamp: Date.now() - 172800000,
          location: 'Assam, India'
        }
      ]
      setUserNFTs(mockNFTs)
    } catch (error) {
      console.error('Error loading NFTs:', error)
      toast.error('Failed to load your NFTs')
    } finally {
      setLoading(false)
    }
  }

  const handleMintSuccess = (tokenId: number) => {
    const newNFT: UserNFT = {
      id: tokenId,
      type: 'new_contribution',
      value: '1.0 ETH',
      timestamp: Date.now(),
      location: 'Various'
    }
    setUserNFTs(prev => [newNFT, ...prev])
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-black">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-black"> {/* Added text-black */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Proof-of-Help Rewards</h1>
        <p className="text-gray-600">
          Earn NFT rewards for your contributions to crisis response and verification
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NFT Minting Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6 text-black"> {/* Added text-black */}
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Earn Rewards</h2>
            <NFTReward onMint={handleMintSuccess} />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">How to earn NFTs:</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Submit verified crisis reports (+1.0 ETH value)</li>
              <li>• Verify reports using Chainlink (+0.5 ETH value)</li>
              <li>• Participate in DAO governance (+0.3 ETH value)</li>
              <li>• Complete donation milestones (+0.8 ETH value)</li>
            </ul>
          </div>
        </div>

        {/* NFT Gallery Section */}
        <div className="bg-white rounded-lg border p-6 text-black"> {/* Added text-black */}
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Contribution NFTs</h2>
          
          {userNFTs.length > 0 ? (
            <div className="grid gap-4">
              {userNFTs.map(nft => (
                <div key={nft.id} className="flex items-center p-4 border rounded-lg bg-gradient-to-r from-gray-50 to-white text-black">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white text-2xl">
                      {nft.type === 'crisis_report' ? '📝' : 
                       nft.type === 'verification' ? '✅' : 
                       nft.type === 'governance' ? '🏛️' : '💰'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">Contribution #{nft.id}</h4>
                    <p className="text-sm text-gray-600 capitalize">{nft.type.replace('_', ' ')}</p>
                    <p className="text-sm text-green-600 font-medium">{nft.value}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(nft.timestamp).toLocaleDateString()} • {nft.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              <div className="text-gray-400 text-6xl mb-4">🎁</div>
              <h3 className="text-gray-600 mb-2">No NFTs yet</h3>
              <p className="text-gray-500 text-sm">
                Start contributing to crisis response to earn your first NFT reward
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}