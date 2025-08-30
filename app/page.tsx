// app/page.tsx
'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import ChainSelector from './(components)/ChainSelector';
import DonationForm from './(components)/DonationForm';
import ConnectionStatus from './(components)/ConnectButton'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-8">
        <div className="w-full max-w-4xl animate-pulse">
          <div className="h-12 bg-gray-700 rounded mb-8"></div>
          <div className="h-10 bg-gray-700 rounded mb-6"></div>
          <div className="h-96 bg-gray-700 rounded"></div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-8">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Crisis Response DApp
          </h1>
          <ConnectButton />
        </div>
        
        <ConnectionStatus />
        
        <div className="mt-8">
          <ChainSelector />
          <DonationForm />
        </div>
        
        <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <h3 className="text-lg font-semibold mb-4">Supported Testnets:</h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Ganache Local (1337)
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              Ethereum Sepolia
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
              Base Sepolia
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
              Polygon Amoy
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
              Optimism Sepolia
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
              Arbitrum Sepolia
            </li>
          </ul>
          <p className="mt-4 text-gray-300 text-sm">
            All donations are free on testnets (no real funds required).
          </p>
        </div>
      </div>
    </main>
  )
}