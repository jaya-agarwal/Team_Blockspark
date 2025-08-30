// app/(components)/DonationStatus.tsx
'use client'

import { useState, useEffect } from 'react'

interface DonationStatusProps {
  donationId: number
}

export default function DonationStatus({ donationId }: DonationStatusProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-green-600 mb-2">✅ Donation Created!</h3>
        <p className="text-gray-600">Donation ID: #{donationId}</p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h4 className="font-semibold text-green-800 mb-4">Next Steps:</h4>
        <ol className="text-green-700 space-y-2 list-decimal list-inside">
          <li>NGO will complete milestones and provide evidence</li>
          <li>DAO members will verify completed milestones</li>
          <li>Funds will be automatically released upon verification</li>
          <li>You can track progress on this page</li>
        </ol>
      </div>

      <div className="text-center">
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Another Donation
        </button>
      </div>
    </div>
  )
}