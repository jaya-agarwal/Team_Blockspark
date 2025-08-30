// app/(components)/NFTReward.tsx
'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { toast } from 'sonner'

interface NFTRewardProps {
  onMint?: (tokenId: number) => void
}

const CONTRIBUTION_TYPES = [
  { id: 'crisis_report', label: 'Crisis Report', value: '1.0', emoji: '📝', color: 'from-blue-500 to-cyan-500' },
  { id: 'verification', label: 'Report Verification', value: '0.5', emoji: '✅', color: 'from-green-500 to-emerald-500' },
  { id: 'governance', label: 'DAO Governance', value: '0.3', emoji: '🏛️', color: 'from-purple-500 to-indigo-500' },
  { id: 'donation', label: 'Donation Milestone', value: '0.8', emoji: '💰', color: 'from-yellow-500 to-orange-500' }
]

export default function NFTReward({ onMint }: NFTRewardProps) {
  const { isConnected, address } = useAccount()
  const [minting, setMinting] = useState(false)
  const [selectedType, setSelectedType] = useState('crisis_report')
  const [location, setLocation] = useState('')

  const handleMintNFT = async () => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first')
      return
    }

    if (!location.trim()) {
      toast.error('Please enter a location')
      return
    }

    setMinting(true)
    try {
      const selectedContribution = CONTRIBUTION_TYPES.find(t => t.id === selectedType)
      
      // Simulate minting
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const tokenId = Math.floor(Math.random() * 1000) + 1
      
      toast.success(`🎉 NFT #${tokenId} Minted! (Simulation Mode)`, {
        description: `You earned ${selectedContribution?.value} ETH for your ${selectedContribution?.label}`
      })
      
      onMint?.(tokenId)
      setLocation('')

    } catch (error) {
      console.error('Minting error:', error)
      toast.error('Failed to mint NFT. Please try again.')
    } finally {
      setMinting(false)
    }
  }

  return (
    <div className="space-y-4 text-black-force"> {/* Added text-black-force */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Earn NFT Rewards</h3>
        <p className="text-sm opacity-90">
          Mint unique NFTs for your crisis response contributions
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contribution Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black bg-white"
          >
            {CONTRIBUTION_TYPES.map(type => (
              <option key={type.id} value={type.id} className="text-black bg-white">
                {type.emoji} {type.label} ({type.value} ETH)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Mumbai, India"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black bg-white"
          />
        </div>

        <button
          onClick={handleMintNFT}
          disabled={minting || !location.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {minting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Minting NFT...
            </div>
          ) : (
            '🎨 Mint Contribution NFT (Simulation)'
          )}
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <h4 className="font-semibold text-yellow-800 text-sm mb-1">Simulation Mode</h4>
        <p className="text-yellow-700 text-xs">
          Currently in simulation mode. Connect to a real blockchain and deploy the NFT contract to enable real minting.
        </p>
      </div>
    </div>
  )
}