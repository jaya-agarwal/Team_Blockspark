// app/(components)/MilestoneCard.tsx
'use client'

import { useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { DONATION_ESCROW_ABI, DONATION_ESCROW_ADDRESS } from '@/lib/contracts/DonationEscrow'
import { toast } from 'sonner'

interface Milestone {
  id: number
  description: string
  amount: string
  completed: boolean
  approved: boolean
}

interface MilestoneCardProps {
  donationId: number
  milestone: Milestone
  isNGO: boolean
  isDAO: boolean
  onUpdate: () => void
}

export default function MilestoneCard({ donationId, milestone, isNGO, isDAO, onUpdate }: MilestoneCardProps) {
  const { writeContractAsync } = useWriteContract()
  const [completing, setCompleting] = useState(false)
  const [approving, setApproving] = useState(false)

  const handleCompleteMilestone = async () => {
    setCompleting(true)
    try {
      await writeContractAsync({
        address: DONATION_ESCROW_ADDRESS,
        abi: DONATION_ESCROW_ABI,
        functionName: 'completeMilestone',
        args: [BigInt(donationId), BigInt(milestone.id)]
      })
      
      toast.success('Milestone completion submitted!')
      onUpdate()
    } catch (error) {
      console.error('Completion error:', error)
      toast.error('Failed to complete milestone')
    } finally {
      setCompleting(false)
    }
  }

  const handleApproveMilestone = async () => {
    setApproving(true)
    try {
      await writeContractAsync({
        address: DONATION_ESCROW_ADDRESS,
        abi: DONATION_ESCROW_ABI,
        functionName: 'approveMilestone',
        args: [BigInt(donationId), BigInt(milestone.id)]
      })
      
      toast.success('Milestone approved! Funds released.')
      onUpdate()
    } catch (error) {
      console.error('Approval error:', error)
      toast.error('Failed to approve milestone')
    } finally {
      setApproving(false)
    }
  }

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-800">Milestone #{milestone.id}</h4>
          <p className="text-gray-600 text-sm mt-1">{milestone.description}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          milestone.approved ? 'bg-green-100 text-green-800' :
          milestone.completed ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {milestone.approved ? 'Approved' : milestone.completed ? 'Pending Approval' : 'Not Started'}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-green-600">{milestone.amount} ETH</span>
        
        <div className="flex gap-2">
          {isNGO && !milestone.completed && (
            <button
              onClick={handleCompleteMilestone}
              disabled={completing}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {completing ? 'Completing...' : 'Mark Complete'}
            </button>
          )}
          
          {isDAO && milestone.completed && !milestone.approved && (
            <button
              onClick={handleApproveMilestone}
              disabled={approving}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
            >
              {approving ? 'Approving...' : 'Approve & Release Funds'}
            </button>
          )}
        </div>
      </div>

      {milestone.approved && (
        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
          <p className="text-green-700 text-sm">✅ Funds released to NGO</p>
        </div>
      )}
    </div>
  )
}