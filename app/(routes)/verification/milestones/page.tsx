// app/(routes)/verification/milestones/page.tsx - Enhanced
'use client'
import { useState } from 'react'

export default function MilestoneVerificationPage() {
  const [pendingVerifications, setPendingVerifications] = useState([
    {
      id: 1,
      donationId: 123,
      ngo: 'Red Cross',
      milestone: 'Emergency food distribution',
      amount: '0.2 ETH',
      evidence: 'Photos and receipts uploaded',
      status: 'pending'
    }
  ])

  const approveMilestone = (verificationId: number) => {
    setPendingVerifications(prev => prev.map(v =>
      v.id === verificationId ? { ...v, status: 'approved' } : v
    ))
  }

  const rejectMilestone = (verificationId: number) => {
    setPendingVerifications(prev => prev.map(v =>
      v.id === verificationId ? { ...v, status: 'rejected' } : v
    ))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Milestone Verification</h1>
      
      <div className="space-y-4">
        {pendingVerifications.map(verification => (
          <div key={verification.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Donation #{verification.donationId}</h3>
                <p className="text-gray-600">{verification.ngo}</p>
                <p className="text-green-600 font-bold">{verification.amount}</p>
                <p className="text-sm">{verification.milestone}</p>
                <p className="text-xs text-gray-500">Evidence: {verification.evidence}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                verification.status === 'approved' ? 'bg-green-100 text-green-800' :
                verification.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {verification.status}
              </span>
            </div>
            
            {verification.status === 'pending' && (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => approveMilestone(verification.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => rejectMilestone(verification.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  ❌ Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}