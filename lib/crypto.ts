import { ethers } from 'ethers';
import { ReportInput } from './types';
import { verifyMessage } from 'ethers'

export function canonicalMessage(data: ReportInput, createdAt: string, opts?: { chainId?: number; domain?: string }) {
  const payload = {
    v: 'bcrc-v1',
    domain: (opts?.domain ?? (typeof window !== 'undefined' ? window.location.host : 'unknown')),
    chainId: opts?.chainId ?? 11155111,
    t: data.title.trim(),
    d: data.description.trim(),
    img: data.imageUrl || '',
    lat: Number(data.location.lat.toFixed(6)),
    lng: Number(data.location.lng.toFixed(6)),
    at: createdAt,
    nonce: typeof window !== 'undefined'
      ? Array.from(crypto.getRandomValues(new Uint8Array(6))).map(b => b.toString(16).padStart(2, '0')).join('')
      : ''
  }
  return `CrisisReport:\n${JSON.stringify(payload, null, 2)}`
}

export function messageDigest(message: string): string {
  return ethers.keccak256(ethers.toUtf8Bytes(message));
}

export function verifySignature(message: string, signature: string, expected: string) {
  try {
    const recovered = verifyMessage(message, signature);
    return recovered.toLowerCase() === expected.toLowerCase();
  } catch {
    return false;
  }
}
