'use client'
import { useEffect, useState } from 'react'
import { useReadContract } from 'wagmi'
import { getReports, exportReportsJson, importReportsJson } from '@/lib/store'
import { SignedReport } from '@/lib/types'
import ReportCard from '@/app/(components)/ReportCard'
import MapClient from '@/app/(components)/MapClient'
import { REGISTRY_ABI, REGISTRY_ADDRESS } from '@/lib/contract'
import { messageDigest, verifySignature } from '@/lib/crypto'
import { toast } from 'sonner'

function useOnchainAuthor(digest: `0x${string}` | undefined) {
  const { data } = useReadContract({
    abi: REGISTRY_ABI,
    address: REGISTRY_ADDRESS,
    functionName: 'authorOf',
    args: digest ? [digest] : undefined,
    query: {
      enabled: !!digest,
    },
  })
  return (data as `0x${string}` | undefined) ?? undefined
}

export default function FeedPage() {
  const [reports, setReports] = useState<SignedReport[]>([])
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setReports(getReports())
  }, [])

  const handleExport = () => {
    try {
      const blob = new Blob([exportReportsJson()], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'bcrc-reports.json'
      a.click()
      URL.revokeObjectURL(url)
      toast.success('Reports exported successfully')
    } catch (error) {
      toast.error('Failed to export reports')
    }
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    try {
      const text = await file.text()
      importReportsJson(text)
      setReports(getReports())
      toast.success('Reports imported successfully')
    } catch (error) {
      toast.error('Failed to import reports')
    } finally {
      // Reset the input
      e.target.value = ''
    }
  }

  // Filter reports based on status filter and search query
  const filtered = reports.filter(report => {
    // Apply status filter
    if (filter === 'verified') {
      if (!verifySignature(report.message, report.signature, report.author)) return false
    }
    if (filter === 'onchain') {
      const digest = messageDigest(report.message) as `0x${string}`
      const onchainAuthor = useOnchainAuthor(digest)
      if (!onchainAuthor || onchainAuthor.toLowerCase() !== report.author.toLowerCase()) return false
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        report.data.title.toLowerCase().includes(query) ||
        report.data.description.toLowerCase().includes(query)
      )
    }
    
    return true
  })

  // Convert reports to markers for the map
  const markers = filtered.map(r => ({
    id: r.id,
    lat: r.data.location.lat,
    lng: r.data.location.lng,
    title: r.data.title,
  }))
  
  // Center map on India by default
  const center = { lat: 20.5937, lng: 78.9629 }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Crisis Reports Feed</h1>
        
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded"
          />
          
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Reports</option>
            <option value="verified">Signature Verified</option>
            <option value="onchain">On-Chain Verified</option>
          </select>
          
          <button 
            className="btn border p-2 rounded hover:bg-gray-100"
            onClick={handleExport}
          >
            Export
          </button>

          <label className="btn border p-2 rounded hover:bg-gray-100 cursor-pointer">
            Import
            <input 
              type="file" 
              accept="application/json" 
              className="hidden"
              onChange={handleImport} 
            />
          </label>
        </div>
      </div>
      
      {/* Map and Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Map View</h2>
          <MapClient position={center} markers={markers} />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Reports ({filtered.length})</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {filtered.map(r => {
              const digest = messageDigest(r.message) as `0x${string}`
              const onchainAuthor = useOnchainAuthor(digest)
              const isOnchain = onchainAuthor && onchainAuthor.toLowerCase() === r.author.toLowerCase()
              const isSignatureVerified = verifySignature(r.message, r.signature, r.author)
              
              return (
                <ReportCard 
                  key={r.id} 
                  r={r} 
                  onchainAuthor={onchainAuthor}
                  isSignatureVerified={isSignatureVerified}
                />
              )
            })}
            
            {filtered.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                {reports.length === 0 
                  ? "No reports yet. Be the first to submit one!" 
                  : "No reports match your current filter."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}