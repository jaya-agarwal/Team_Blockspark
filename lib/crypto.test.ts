// lib/crypto.test.ts
import { describe, expect, it } from 'vitest'
import { canonicalMessage, verifySignature, messageDigest } from './crypto'
import { ethers } from 'ethers'

describe('crypto utilities', () => {
  const testData = {
    title: 'Test Report',
    description: 'This is a test report',
    imageUrl: 'https://example.com/image.jpg',
    location: { lat: 20.5937, lng: 78.9629 },
    category: 'test',
    timestamp: Date.now()
  }

  it('should generate canonical message with proper structure', () => {
    const createdAt = new Date().toISOString()
    const message = canonicalMessage(testData, createdAt)
    
    expect(message).toContain('CrisisReport:')
    expect(message).toContain('"v": "bcrc-v1"')
    expect(message).toContain('"t": "Test Report"')
    expect(message).toContain('"d": "This is a test report"')
  })

  it('should verify a valid signature', async () => {
    const wallet = ethers.Wallet.createRandom()
    const message = 'Test message to sign'
    const signature = await wallet.signMessage(message)
    
    const isValid = verifySignature(message, signature, wallet.address)
    expect(isValid).toBe(true)
  })

  it('should reject an invalid signature', () => {
    const message = 'Test message to sign'
    const signature = 'invalid-signature'
    const address = '0x0000000000000000000000000000000000000000'
    
    const isValid = verifySignature(message, signature, address)
    expect(isValid).toBe(false)
  })

  it('should generate message digest', () => {
    const message = 'Test message'
    const digest = messageDigest(message)
    
    expect(digest).toMatch(/^0x[a-f0-9]{64}$/)
  })
})