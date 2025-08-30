// lib/storage.ts
import { SignedReport } from './types'

const KEY = 'bcrc_reports_v1'

function safeGet(): SignedReport[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as SignedReport[]) : []
  } catch {
    return []
  }
}

export function listReports(): SignedReport[] {
  return safeGet().sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function getReports(): SignedReport[] {
  return listReports()
}

export function saveReport(r: SignedReport) {
  const all = safeGet()
  all.unshift(r)
  localStorage.setItem(KEY, JSON.stringify(all))
}

export function clearReports() {
  localStorage.removeItem(KEY)
}

export function exportReportsJson(): string {
  return JSON.stringify(listReports(), null, 2)
}

/**
 * importReportsJson:
 * - Accepts JSON string
 * - Validates that items look like SignedReport
 * - Stores valid reports
 * Returns number of imported reports
 */
export function importReportsJson(json: string): number {
  try {
    const arr = JSON.parse(json)
    if (!Array.isArray(arr)) throw new Error('Invalid file')

    const validReports = arr.filter((item: any) =>
      item &&
      typeof item.id === 'string' &&
      typeof item.createdAt === 'string' &&
      typeof item.author === 'string' &&
      typeof item.message === 'string' &&
      typeof item.signature === 'string' &&
      typeof item.data === 'object' &&
      item.data.location &&
      typeof item.data.location.lat === 'number' &&
      typeof item.data.location.lng === 'number'
    )

    localStorage.setItem(KEY, JSON.stringify(validReports))
    return validReports.length
  } catch (error) {
    console.error('Import error:', error)
    throw new Error('Failed to import reports. The file may be corrupted or in an invalid format.')
  }
}
