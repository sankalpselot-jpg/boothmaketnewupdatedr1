'use client'
import { useRegion } from '@/hooks/useRegion'
import type { Region, Currency } from '@/types/database'

const regions: { id: Region; label: string; flag: string }[] = [
  { id: 'EU', label: 'Europe', flag: '🇪🇺' },
  { id: 'UK', label: 'United Kingdom', flag: '🇬🇧' },
  { id: 'IN', label: 'India', flag: '🇮🇳' },
]
const currencies: { id: Currency; label: string }[] = [
  { id: 'EUR', label: '€ EUR' },
  { id: 'GBP', label: '£ GBP' },
  { id: 'INR', label: '₹ INR' },
]

export default function RegionBar() {
  const { region, currency, setRegion, setCurrency } = useRegion()
  return (
    <div className="bg-[#0A1520] px-10 py-2 flex items-center justify-between text-xs">
      <div className="flex items-center gap-1.5 text-white/40">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
        Select region:
      </div>
      <div className="flex gap-1">
        {regions.map(r => (
          <button key={r.id}
            onClick={() => setRegion(r.id)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              region === r.id
                ? 'text-white border-white/20 bg-white/8'
                : 'text-white/45 border-transparent hover:text-white/80'
            }`}
          >
            <span>{r.flag}</span>{r.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 text-white/40">
        <span>Currency:</span>
        {currencies.map(c => (
          <button key={c.id}
            onClick={() => setCurrency(c.id)}
            className={`px-2.5 py-0.5 rounded-full border text-[11.5px] transition-all ${
              currency === c.id
                ? 'bg-gold/20 border-gold/40 text-gold-light'
                : 'border-white/12 text-white/55 hover:text-gold-light'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  )
}
