// app/(components)/VerificationBadge.tsx
'use client'

import { useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { FACT_CHECKER_ABI, FACT_CHECKER_ADDRESS } from '@/lib/contracts'
import { toast } from 'sonner'

interface VerificationBadgeProps {
  newsHash: string
  onVerified?: (verified: boolean) => void
}

export default function VerificationBadge({ newsHash, onVerified }: VerificationBadgeProps) {
  const { isConnected } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const [verifying, setVerifying] = useState(false)

  const handleVerify = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    setVerifying(true)
    try {
      // Simulate Chainlink oracle call
      const source = "Chainlink Oracle Simulation"
      const result = await writeContractAsync({
        address: FACT_CHECKER_ADDRESS,
        abi: FACT_CHECKER_ABI,
        functionName: 'verifyNews',
        args: [newsHash, source]
      })

      toast.success('News verification submitted to DAO!')
      onVerified?.(true)
    } catch (error) {
      console.error('Verification error:', error)
      toast.error('Failed to verify news')
    } finally {
      setVerifying(false)
    }
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h4 className="font-semibold text-blue-800 mb-2">Fact Check This Report</h4>
      <p className="text-blue-600 text-sm mb-3">
        Use Chainlink oracles and DAO consensus to verify this information
      </p>
      <button
        onClick={handleVerify}
        disabled={verifying}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {verifying ? 'Verifying...' : 'Verify with Chainlink + DAO'}
      </button>
    </div>
  )
}