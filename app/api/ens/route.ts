// app/api/ens/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: 'ENS name required' }, { status: 400 });
  }

  try {
    const client = createPublicClient({
      chain: mainnet,
      transport: http(),
    });

    const address = await client.getEnsAddress({ name });
    
    if (!address) {
      return NextResponse.json({ error: 'ENS name not found' }, { status: 404 });
    }

    return NextResponse.json({ address });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to resolve ENS' },
      { status: 500 }
    );
  }
}