// app/api/ipfs/metadata/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { storeJSON, retrieveJSON } from '@/lib/ipfs-client'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const cid = await storeJSON(data)
    return NextResponse.json({ cid })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to store metadata' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const cid = searchParams.get('cid')
  
  if (!cid) {
    return NextResponse.json({ error: 'CID required' }, { status: 400 })
  }

  try {
    const data = await retrieveJSON(cid)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve metadata' },
      { status: 500 }
    )
  }
}