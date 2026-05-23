import type { Region } from '@/types/database'

export const REGION_LABELS: Record<Region, string> = {
  EU: 'Europe',
  UK: 'United Kingdom',
  IN: 'India',
}

export const REGION_FLAGS: Record<Region, string> = {
  EU: '🇪🇺',
  UK: '🇬🇧',
  IN: '🇮🇳',
}

export const REGION_PHONE_PREFIXES: Record<Region, string> = {
  EU: '+',
  UK: '+44',
  IN: '+91',
}

export const COMPLIANCE_LABELS: Record<Region, string[]> = {
  EU: ['CE Certified', 'GDPR Compliant', 'EU VAT Invoicing', 'EU Fire Safety'],
  UK: ['UKCA Marked', 'UK GDPR', 'UK VAT Invoicing', 'BS EN Standards'],
  IN: ['ISI Marked', 'BIS Standards', 'GST Invoicing', 'FSSAI Compliant'],
}

export function getRegionFromCountry(country: string): Region {
  const euCountries = ['DE','FR','NL','ES','IT','BE','AT','PL','SE','DK','FI','PT','IE','CZ','HU','RO']
  if (country === 'GB') return 'UK'
  if (country === 'IN') return 'IN'
  if (euCountries.includes(country)) return 'EU'
  return 'EU'
}
