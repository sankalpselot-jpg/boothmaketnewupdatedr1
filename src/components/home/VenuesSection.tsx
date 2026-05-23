import Link from 'next/link'
import type { Venue, Region } from '@/types/database'

type Props = { venues: Venue[] }

const regionMeta: Record<Region, { flag: string; name: string; sub: string }> = {
  EU: { flag: '🇪🇺', name: 'Europe', sub: 'Germany · France · Netherlands · Spain · Italy' },
  UK: { flag: '🇬🇧', name: 'United Kingdom', sub: 'London · Birmingham · Manchester · Glasgow' },
  IN: { flag: '🇮🇳', name: 'India', sub: 'Delhi · Mumbai · Bengaluru · Chennai · Hyderabad' },
}

export default function VenuesSection({ venues }: Props) {
  const byRegion = (['EU','UK','IN'] as Region[]).map(r => ({
    region: r,
    meta: regionMeta[r],
    venues: venues.filter(v => v.region === r).slice(0, 5),
  }))

  return (
    <section className="py-16 px-10 max-w-[1280px] mx-auto">
      <p className="section-label">Our Coverage</p>
      <h2 className="section-title mb-9">Top Venues We Serve</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {byRegion.map(({ region, meta, venues }) => (
          <div key={region} className="card overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
            <div className="p-6 pb-4">
              <div className="flex items-center gap-3 mb-3.5">
                <span className="text-[28px]">{meta.flag}</span>
                <div>
                  <div className="font-display font-extrabold text-xl text-navy">{meta.name}</div>
                  <div className="text-[12.5px] text-[#6B6B6B] mt-0.5">{meta.sub}</div>
                </div>
              </div>
            </div>
            <div className="border-t border-[#DDD8CF]">
              {venues.map(v => (
                <div key={v.id} className="flex justify-between items-center px-6 py-3 border-b border-cream-dark text-[13.5px]">
                  <span className="text-[#1A1A1A]">{v.name}</span>
                  <span className="text-[12px] text-[#6B6B6B]">{v.city}</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-3.5">
              <Link href={`/regions/${region.toLowerCase()}`} className="text-gold hover:text-gold-light text-[13px] font-medium transition-colors">
                View all {meta.name} venues →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
