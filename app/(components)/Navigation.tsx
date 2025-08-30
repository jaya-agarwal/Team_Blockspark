// app/(components)/Navigation.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'

const navigation = [
  { name: 'Home', href: '/' },
  // { name: 'Report Crisis', href: '/report' },
  // { name: 'View Feed', href: '/feed' },
  { name: 'Donation Activity', href: '/donate' },
  { name: 'Verification', href: '/verification' },
  { name: 'Rewards', href: '/rewards' },
  // { name: 'DAO', href: '/dao' },
  { name: 'Milestone Verification', href: '/verification/milestones' },
  
]

export default function Navigation() {
  const pathname = usePathname()
  const { isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show loading state during initial render to prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-white font-bold text-xl">
              CrisisDApp
            </Link>
            
            <div className="hidden md:flex items-center space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-white/20 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300 hidden sm:block">
              {isConnected ? 'Connected' : 'Not Connected'}
            </div>
            <ConnectButton />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="grid grid-cols-2 gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium text-center transition-colors ${
                  pathname === item.href
                    ? 'bg-white/20 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}