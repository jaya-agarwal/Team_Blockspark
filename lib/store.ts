// lib/store.ts
import { SignedReport } from './types';
export * from './storage'

const STORAGE_KEY = 'crisis-reports';

export function saveReport(report: SignedReport): void {
  const reports = getReports();
  reports.push(report);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

export function getReports(): SignedReport[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
export function exportReportsJson(): string {
  return JSON.stringify(getReports());
}

export function importReportsJson(json: string): void {
  try {
    const reports = JSON.parse(json);
    if (Array.isArray(reports)) {
      localStorage.setItem(STORAGE_KEY, json);
    }
  } catch (error) {
    console.error('Invalid JSON format:', error);
  }
}