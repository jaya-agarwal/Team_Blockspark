'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount, useSignMessage, useChainId, useWriteContract } from 'wagmi'
import { v4 as uuid } from 'uuid'
import { saveReport } from '@/lib/storage'
import { ReportInput, SignedReport } from '@/lib/types'
import { canonicalMessage, messageDigest } from '@/lib/crypto'
import { REGISTRY_ABI, REGISTRY_ADDRESS } from '@/lib/contract'
import { reportSchema } from '@/lib/validate'
import { toast } from 'sonner'
import Link from 'next/link'
import { MapPicker } from '@/app/(components)/MapPicker'

interface LatLng {
  lat: number;
  lng: number;
}

export default function ReportPage() {
  const router = useRouter()
  const { isConnected, address } = useAccount()
  const chainId = useChainId()
  const { signMessageAsync, isPending: isSigning } = useSignMessage()
  const { writeContractAsync } = useWriteContract()
  
  const [form, setForm] = useState<ReportInput>({
    title: '',
    description: '',
    imageUrl: '',
    location: { lat: 20.5937, lng: 78.9629 },
    category: '',
    timestamp: Date.now()
  })

  const isSubmitting = isSigning

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // Validate inputs
    const parsed = reportSchema.safeParse(form)
    if (!parsed.success) {
      parsed.error.issues.forEach(issue => toast.error(issue.message))
      return
    }

    if (!isConnected || !address) {
      toast.error('Please connect your wallet first.')
      return
    }

    try {
      const createdAt = new Date().toISOString()
      const message = canonicalMessage(form, createdAt, { 
        chainId,
        domain: typeof window !== 'undefined' ? window.location.host : 'unknown' 
      })
      const signature = await signMessageAsync({ message })

      const record: SignedReport = {
        id: uuid(),
        createdAt,
        author: address as `0x${string}`,
        data: form,
        message,
        signature,
      }

      // 1) Persist locally
      saveReport(record)
      toast.success('Report saved locally')

      // 2) Persist hash on-chain
      const digest = messageDigest(message) as `0x${string}`
      try {
        await writeContractAsync({
          abi: REGISTRY_ABI,
          address: REGISTRY_ADDRESS,
          functionName: 'saveReport',
          args: [digest, record.id],
        })
        toast.success('Report hash stored on blockchain')
      } catch (err) {
        console.error('saveReport tx failed', err)
        toast.warning('Report saved locally but failed to store on blockchain')
      }

      router.push('/feed')
    } catch (error) {
      console.error('Submission error:', error)
      toast.error('Error submitting report. Please try again.')
    }
  }

  return (
    <main className="grid gap-4 lg:grid-cols-2">
      <section className="card">
        <h2 className="mb-4 text-xl font-semibold">Submit Crisis Report</h2>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="label">Title</label>
            <input 
              className="input" 
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="e.g., Flooding near XYZ" 
              required 
            />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea 
              className="input min-h-[120px]" 
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="What happened? Resources needed?" 
              required 
            />
          </div>
          <div>
            <label className="label">Image URL (optional)</label>
            <input 
              className="input" 
              value={form.imageUrl}
              onChange={e => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://…" 
            />
          </div>
          <div>
            <label className="label">Pick Location (click on map)</label>
            <MapPicker 
              position={form.location} 
              onPick={(p: LatLng) => setForm({ ...form, location: p })} 
            />
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button 
              className="btn btn-primary" 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing…' : 'Sign & Submit'}
            </button>
            <Link href="/" className="btn border">Cancel</Link>
          </div>
          <p className="text-xs text-gray-500">
            We will generate a message from your inputs and ask your wallet to sign. 
            The signed report is stored in your browser and a hash is saved on the blockchain.
          </p>
        </form>
      </section>

      <aside className="card">
        <h3 className="mb-2 text-lg font-semibold">Preview</h3>
        <pre className="whitespace-pre-wrap break-words text-xs bg-gray-50 p-3 rounded-xl border">
          {JSON.stringify(form, null, 2)}
        </pre>
        <p className="mt-2 text-xs text-gray-500">
          Connected: {isConnected ? address : 'No wallet'}
        </p>
      </aside>
    </main>
  )
}