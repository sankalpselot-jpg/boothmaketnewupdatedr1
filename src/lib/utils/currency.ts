import type { Currency, Region } from '@/types/database'

export const REGION_CURRENCIES: Record<Region, Currency> = {
  EU: 'EUR',
  UK: 'GBP',
  IN: 'INR',
}

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: '€',
  GBP: '£',
  INR: '₹',
}

export const TAX_RATES: Record<Region, { rate: number; label: string }> = {
  EU: { rate: 0.20, label: 'VAT (20%)' },
  UK: { rate: 0.20, label: 'VAT (20%)' },
  IN: { rate: 0.18, label: 'GST (18%)' },
}

export const TAX_LABELS: Record<Region, string> = {
  EU: 'ex-VAT',
  UK: 'ex-VAT',
  IN: 'ex-GST',
}

export function formatPrice(amount: number, currency: Currency): string {
  const symbol = CURRENCY_SYMBOLS[currency]
  if (currency === 'INR') {
    return `${symbol}${amount.toLocaleString('en-IN')}`
  }
  return `${symbol}${amount.toLocaleString('en-EU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export function getPriceForCurrency(product: {
  price_eur: number; price_gbp: number; price_inr: number
}, currency: Currency): number {
  switch (currency) {
    case 'EUR': return product.price_eur
    case 'GBP': return product.price_gbp
    case 'INR': return product.price_inr
  }
}

export function calculateTax(amount: number, region: Region): number {
  return amount * TAX_RATES[region].rate
}
