// app/(routes)/verification/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import VerificationBadge from '@/app/(components)/VerificationBadge'
import { toast } from 'sonner'

interface VerificationRequest {
  id: string
  title: string
  description: string
  ipfsHash: string
  source: string
  timestamp: number
  status: 'pending' | 'verified' | 'rejected'
}

export default function VerificationPortal() {
  const { isConnected, address } = useAccount()
  const [requests, setRequests] = useState<VerificationRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVerificationRequests()
  }, [])

  const loadVerificationRequests = async () => {
    // Mock data - replace with actual API calls
    const mockRequests: VerificationRequest[] = [
      {
        id: '1',
        title: 'Flood in Mumbai Suburbs',
        description: 'Reports of severe flooding in Andheri and Bandra areas, need immediate rescue operations.',
        ipfsHash: 'QmXyz123abc',
        source: 'Citizen Report #4567',
        timestamp: Date.now() - 3600000,
        status: 'pending'
      },
      {
        id: '2',
        title: 'Earthquake in Northeast',
        description: 'Magnitude 6.3 earthquake reported in Assam, infrastructure damage reported.',
        ipfsHash: 'QmDef456ghi',
        source: 'Government Alert',
        timestamp: Date.now() - 7200000,
        status: 'verified'
      }
    ]
    setRequests(mockRequests)
    setLoading(false)
  }

  const handleVerification = async (requestId: string, verified: boolean) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: verified ? 'verified' : 'rejected' }
        : req
    ))
    
    toast.success(verified ? 'Content verified successfully!' : 'Content marked as unreliable')
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Verification Portal</h1>
        <p className="text-gray-600">
          Verify crisis reports using Chainlink oracles and DAO consensus
        </p>
      </div>

      {!isConnected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">
            Connect your wallet to participate in verification and earn rewards
          </p>
        </div>
      )}

      <div className="grid gap-6">
        {requests.map(request => (
          <div key={request.id} className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{request.title}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Source: {request.source} • {new Date(request.timestamp).toLocaleString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                request.status === 'verified' ? 'bg-green-100 text-green-800' :
                request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {request.status.toUpperCase()}
              </span>
            </div>

            <p className="text-gray-700 mb-4">{request.description}</p>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                IPFS: {request.ipfsHash.slice(0, 8)}...{request.ipfsHash.slice(-4)}
              </div>
              
              {request.status === 'pending' && isConnected && (
                <VerificationBadge 
                  newsHash={request.ipfsHash}
                  onVerified={(verified) => handleVerification(request.id, verified)}
                />
              )}
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-gray-600 text-lg mb-2">No verification requests</h3>
            <p className="text-gray-500">New crisis reports will appear here for verification</p>
          </div>
        )}
      </div>
    </div>
  )
}