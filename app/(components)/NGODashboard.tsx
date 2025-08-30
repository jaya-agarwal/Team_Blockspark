// app/(components)/NGODashboard.tsx (Create this)
'use client'
import { useState } from 'react'

export default function NGODashboard() {
  const [activeDonations, setActiveDonations] = useState([
    {
      id: 1,
      donor: '0x1234...abcd',
      amount: '0.5 ETH',
      milestones: [
        { id: 1, description: 'Food supplies', completed: false },
        { id: 2, description: 'Medical aid', completed: false }
      ]
    }
  ])

  const completeMilestone = (donationId: number, milestoneId: number) => {
    setActiveDonations(prev => prev.map(donation => 
      donation.id === donationId 
        ? {
            ...donation,
            milestones: donation.milestones.map(milestone =>
              milestone.id === milestoneId
                ? { ...milestone, completed: true }
                : milestone
            )
          }
        : donation
    ))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">NGO Dashboard</h1>
      <div className="space-y-4">
        {activeDonations.map(donation => (
          <div key={donation.id} className="border rounded-lg p-4">
            <h3 className="font-semibold">Donation #{donation.id}</h3>
            <p>From: {donation.donor}</p>
            <p>Amount: {donation.amount}</p>
            
            <div className="mt-3">
              <h4 className="font-medium mb-2">Milestones:</h4>
              {donation.milestones.map(milestone => (
                <div key={milestone.id} className="flex items-center justify-between p-2 border-b">
                  <span>{milestone.description}</span>
                  {milestone.completed ? (
                    <span className="text-green-600">✅ Completed</span>
                  ) : (
                    <button
                      onClick={() => completeMilestone(donation.id, milestone.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}