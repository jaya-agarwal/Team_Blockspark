// lib/types.ts
export interface Location {
  lat: number;
  lng: number;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface ReportData {
  title: string
  description: string
  category: string
  location: LatLng
  timestamp: number
}

export interface ReportInput {
  title: string;
  description: string;
  location: LatLng;
  category: string; // Add this
  timestamp: number; // Add this
  imageUrl?: string;
}

export type SignedReport = {
  id: string
  createdAt: string // ISO
  author: `0x${string}`
  data: ReportInput
  message: string
  signature: string
}
