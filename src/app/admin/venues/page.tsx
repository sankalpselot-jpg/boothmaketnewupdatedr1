import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Venues' }

export default async function AdminVenuesPage() {
  const supabase = await createClient()
  const { data: venues } = await supabase.from('venues').select('*').order('region').order('city')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-extrabold text-2xl text-navy">Venues</h1>
        <p className="text-[13px] text-[#6B6B6B]">{venues?.length || 0} venues across 3 regions</p>
      </div>

      {(['EU', 'UK', 'IN'] as const).map(region => {
        const regionVenues = venues?.filter(v => v.region === region) || []
        if (!regionVenues.length) return null
        return (
          <div key={region} className="mb-8">
            <h2 className="font-display font-semibold text-navy mb-3 flex items-center gap-2">
              <span>{region === 'EU' ? '🇪🇺 Europe' : region === 'UK' ? '🇬🇧 United Kingdom' : '🇮🇳 India'}</span>
              <span className="text-[12px] text-[#6B6B6B] font-normal">({regionVenues.length})</span>
            </h2>
            <div className="card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-cream border-b border-[#DDD8CF]">
                    {['Venue Name', 'City', 'Country', 'Website'].map(h => (
                      <th key={h} className="text-left px-5 py-3 font-semibold text-navy">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {regionVenues.map(v => (
                    <tr key={v.id} className="border-b border-cream-dark hover:bg-cream/40 transition-colors">
                      <td className="px-5 py-3 font-medium text-navy">{v.name}</td>
                      <td className="px-5 py-3 text-[#6B6B6B]">{v.city}</td>
                      <td className="px-5 py-3 text-[#6B6B6B]">{v.country}</td>
                      <td className="px-5 py-3">
                        {v.website
                          ? <a href={v.website} target="_blank" rel="noopener noreferrer"
                              className="text-gold hover:text-gold-light text-[12.5px]">
                              {new URL(v.website).hostname}
                            </a>
                          : <span className="text-[#DDD8CF]">—</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}
