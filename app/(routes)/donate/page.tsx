// app/(routes)/donations/page.tsx
'use client'
import { useState, useEffect } from 'react'

interface Donation {
  id: number
  ngoName: string
  totalAmount: string
  timestamp: number
  status: 'active' | 'completed'
}

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([])

  useEffect(() => {
    // Load from localStorage or use mock data
    const mockDonations: Donation[] = [
      {
        id: 1,
        ngoName: 'Red Cross Emergency Fund',
        totalAmount: '0.5 ETH',
        timestamp: Date.now() - 86400000,
        status: 'active'
      },
      {
        id: 2,
        ngoName: 'Doctors Without Borders',
        totalAmount: '1.2 ETH',
        timestamp: Date.now() - 172800000,
        status: 'completed'
      }
    ]
    setDonations(mockDonations)
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Donations</h1>
      
      <div className="space-y-4">
        {donations.map(donation => (
          <div key={donation.id} className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Donation #{donation.id}</h3>
                <p className="text-gray-600">{donation.ngoName}</p>
                <p className="text-green-600 font-bold text-lg">{donation.totalAmount}</p>
                <p className="text-sm text-gray-500">
                  Created: {new Date(donation.timestamp).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                donation.status === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {donation.status.toUpperCase()}
              </span>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {donations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🎁</div>
          <h3 className="text-gray-600 text-lg mb-2">No donations yet</h3>
          <p className="text-gray-500">Create your first donation to get started</p>
        </div>
      )}
    </div>
  )
}