// app/(components)/DonationForm.tsx
'use client'
import { useState, useEffect } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { DONATION_ESCROW_ABI, DONATION_ESCROW_ADDRESS } from '@/lib/contracts/DonationEscrow'
import { toast } from 'sonner'
import DonationStatus from './DonationStatus'

// Pre-filled NGO addresses for demo
const DEMO_NGOS = [
  { address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', name: 'Red Cross Emergency Fund' },
  { address: '0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c', name: 'UNICEF Crisis Response' },
  { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', name: 'Doctors Without Borders' }
]

export default function DonationForm() {
  const { isConnected, address } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const [mounted, setMounted] = useState(false)
  const [createdDonationId, setCreatedDonationId] = useState<number | null>(null)
  
  const [formData, setFormData] = useState({
    ngoAddress: DEMO_NGOS[0].address,
    ngoName: DEMO_NGOS[0].name,
    totalAmount: '0.5',
    currency: 'ETH',
    milestones: [
      { 
        id: 1, 
        description: 'Emergency food and water supplies', 
        amount: '0.2',
        completed: false 
      },
      { 
        id: 2, 
        description: 'Medical aid and first response teams', 
        amount: '0.15',
        completed: false 
      },
      { 
        id: 3, 
        description: 'Rebuilding infrastructure and shelters', 
        amount: '0.15',
        completed: false 
      }
    ]
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const addMilestone = () => {
    const newId = formData.milestones.length > 0 
      ? Math.max(...formData.milestones.map(m => m.id)) + 1 
      : 1
    
    setFormData(prev => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        { 
          id: newId, 
          description: '', 
          amount: '0.1',
          completed: false 
        }
      ]
    }))
  }

  const updateMilestone = (id: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map(milestone => 
        milestone.id === id ? { ...milestone, [field]: value } : milestone
      )
    }))
  }

  const removeMilestone = (id: number) => {
    if (formData.milestones.length <= 1) {
      toast.error('At least one milestone is required')
      return
    }
    
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter(m => m.id !== id)
    }))
  }

  const calculateTotal = () => {
    return formData.milestones.reduce((total, milestone) => {
      return total + parseFloat(milestone.amount || '0')
    }, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isConnected || !mounted) {
      toast.error('Please connect your wallet first')
      return
    }

    const totalCalculated = calculateTotal()
    if (Math.abs(totalCalculated - parseFloat(formData.totalAmount)) > 0.001) {
      toast.error('Milestone amounts must add up to the total amount')
      return
    }

    try {
      const totalAmount = parseEther(formData.totalAmount)
      const descriptions = formData.milestones.map(m => m.description)
      const amounts = formData.milestones.map(m => parseEther(m.amount))

      // For demo purposes - show success message
      console.log('Creating donation with:', {
        ngoAddress: formData.ngoAddress,
        totalAmount: formData.totalAmount,
        descriptions,
        amounts
      })

      // Simulate donation ID - in real app, this would come from contract
      const simulatedDonationId = Math.floor(Math.random() * 1000) + 1
      setCreatedDonationId(simulatedDonationId)

      toast.success('🚀 Donation escrow created successfully!', {
        description: 'Funds will be released as milestones are completed and verified.'
      })

    } catch (error) {
      console.error('Donation error:', error)
      toast.error('Failed to create donation. Please try again.')
    }
  }

  if (!mounted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg border-2 border-blue-100 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  const totalCalculated = calculateTotal()
  const hasAmountMismatch = Math.abs(totalCalculated - parseFloat(formData.totalAmount)) > 0.001

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg border-2 border-blue-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Secure Donation with Milestone Escrow</h2>
      
      {!createdDonationId ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NGO Selection */}
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-blue-50">
            <label className="block text-sm font-medium mb-2 text-blue-700">Select NGO</label>
            <select
              value={formData.ngoAddress}
              onChange={(e) => {
                const selectedNGO = DEMO_NGOS.find(ngo => ngo.address === e.target.value)
                setFormData(prev => ({ 
                  ...prev, 
                  ngoAddress: e.target.value,
                  ngoName: selectedNGO?.name || ''
                }))
              }}
              className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-black bg-white"
              required
            >
              {DEMO_NGOS.map(ngo => (
                <option key={ngo.address} value={ngo.address}>
                  {ngo.name} ({ngo.address.slice(0, 8)}...)
                </option>
              ))}
            </select>
          </div>

          {/* Total Amount */}
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-green-50">
            <label className="block text-sm font-medium mb-2 text-green-700">Total Donation Amount</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="any"
                min="0.01"
                value={formData.totalAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, totalAmount: e.target.value }))}
                className="flex-1 p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors text-black bg-white"
                required
              />
              <span className="px-3 py-2 bg-green-200 text-green-800 rounded-lg font-medium">ETH</span>
            </div>
          </div>

          {/* Milestones */}
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-purple-50">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-purple-700">Milestones</label>
              <button 
                type="button" 
                onClick={addMilestone}
                className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
              >
                + Add Milestone
              </button>
            </div>
            
            {formData.milestones.map((milestone) => (
              <div key={milestone.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 p-3 bg-white rounded-lg border border-purple-100">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    value={milestone.description}
                    onChange={(e) => updateMilestone(milestone.id, 'description', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:border-purple-500 focus:ring-1 focus:ring-purple-200 text-black bg-white"
                    placeholder="Milestone description"
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="any"
                    min="0.001"
                    value={milestone.amount}
                    onChange={(e) => updateMilestone(milestone.id, 'amount', e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded focus:border-purple-500 focus:ring-1 focus:ring-purple-200 text-black bg-white"
                    placeholder="Amount"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeMilestone(milestone.id)}
                    className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            {/* Total Calculation */}
            <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-purple-700">Total Milestones:</span>
                <span className="text-sm font-bold text-purple-800">{totalCalculated.toFixed(3)} ETH</span>
              </div>
              {hasAmountMismatch && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                  <p className="text-red-600 text-sm">
                    ⚠️ Milestone amounts ({totalCalculated.toFixed(3)} ETH) don't match total amount ({formData.totalAmount} ETH)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={hasAmountMismatch}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            🚀 Create Secure Donation Escrow
          </button>
        </form>
      ) : (
        <DonationStatus donationId={createdDonationId} />
      )}

      {/* Info Box */}
      <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">How it works:</h4>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• Funds are held in secure escrow smart contract</li>
          <li>• NGO completes milestones and provides proof</li>
          <li>• DAO verifiers approve completed milestones</li>
          <li>• Funds are automatically released upon approval</li>
          <li>• Transparent and accountable donation process</li>
        </ul>
      </div>
    </div>
  )
}