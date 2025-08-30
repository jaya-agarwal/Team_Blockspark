// app/layout.tsx
import type { Metadata } from "next"
import { Toaster } from 'sonner'
import { Inter } from "next/font/google"
import "./globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import WalletProvider from "./(components)/WalletProvider"
import Navigation from "./(components)/Navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Crisis Response DApp - Report, Verify, Donate",
  description: "Decentralized crisis response platform with Chainlink verification and NFT rewards",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster position="top-right" />
        </WalletProvider>
      </body>
    </html>
  )
}