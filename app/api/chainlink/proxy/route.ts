// app/api/chainlink/proxy/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')
  
  if (!url) {
    return NextResponse.json({ error: 'URL parameter required' }, { status: 400 })
  }

  try {
    // Validate URL for security
    const parsedUrl = new URL(url)
    const allowedDomains = ['api.news.org', 'data.gov', 'weather.api']
    
    if (!allowedDomains.some(domain => parsedUrl.hostname.endsWith(domain))) {
      return NextResponse.json({ error: 'Domain not allowed' }, { status: 403 })
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'CrisisDApp-Verification/1.0'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data' }, 
      { status: 500 }
    )
  }
}