// app/(components)/ChainSelector.tsx
'use client'

import { useSwitchChain, useChainId } from 'wagmi'
import { ganache } from '@/lib/chains'  // ← Import Ganache

const CHAINS = [
  { id: ganache.id, name: 'Ganache Local' },  // ← Only Ganache
]

export default function ChainSelector() {
  const { switchChain } = useSwitchChain()
  const chainId = useChainId()

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Network:</label>
      <select
        value={chainId}
        onChange={(e) => switchChain({ chainId: Number(e.target.value) })}
        className="p-2 border rounded"
      >
        {CHAINS.map((chain) => (
          <option key={chain.id} value={chain.id}>
            {chain.name}
          </option>
        ))}
      </select>
    </div>
  )
}