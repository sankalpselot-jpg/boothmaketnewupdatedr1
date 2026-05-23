import type { Metadata } from 'next'
import Link from 'next/link'
import RegionBar from '@/components/region/RegionBar'
import Topbar from '@/components/layout/Topbar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = { title: 'Trade Show Calendar 2026' }

const shows = [
  { month: 'June 2026', items: [
    { flag: '🇬🇧', name: 'London Tech Week', venue: 'ExCeL London', city: 'London, UK', dates: '9–13 Jun 2026', region: 'UK', sector: 'Technology' },
    { flag: '🇩🇪', name: 'Hannover Messe', venue: 'Hannover Exhibition Grounds', city: 'Hannover, DE', dates: '22–26 Jun 2026', region: 'EU', sector: 'Industrial' },
    { flag: '🇬🇧', name: 'The Meetings Show', venue: 'ExCeL London', city: 'London, UK', dates: '19–20 Jun 2026', region: 'UK', sector: 'Events & MICE' },
    { flag: '🇫🇷', name: 'Viva Technology', venue: 'Paris Expo Porte de Versailles', city: 'Paris, FR', dates: '11–14 Jun 2026', region: 'EU', sector: 'Technology' },
  ]},
  { month: 'August 2026', items: [
    { flag: '🇩🇪', name: 'Interpack', venue: 'Messe Düsseldorf', city: 'Düsseldorf, DE', dates: '7–13 Aug 2026', region: 'EU', sector: 'Packaging' },
  ]},
  { month: 'September 2026', items: [
    { flag: '🇮🇳', name: 'India International Jewellery Show', venue: 'Bombay Exhibition Centre', city: 'Mumbai, IN', dates: '8–11 Sep 2026', region: 'IN', sector: 'Jewellery' },
    { flag: '🇩🇪', name: 'IAA Mobility', venue: 'Messe München', city: 'Munich, DE', dates: '10–20 Sep 2026', region: 'EU', sector: 'Automotive' },
  ]},
  { month: 'October 2026', items: [
    { flag: '🇬🇧', name: 'UK Construction Week', venue: 'NEC Birmingham', city: 'Birmingham, UK', dates: '6–8 Oct 2026', region: 'UK', sector: 'Construction' },
    { flag: '🇩🇪', name: 'Frankfurt Book Fair', venue: 'Messe Frankfurt', city: 'Frankfurt, DE', dates: '14–18 Oct 2026', region: 'EU', sector: 'Publishing' },
    { flag: '🇮🇳', name: 'Pharma India Expo', venue: 'HITEX Exhibition Centre', city: 'Hyderabad, IN', dates: '22–24 Oct 2026', region: 'IN', sector: 'Pharma' },
  ]},
  { month: 'November 2026', items: [
    { flag: '🇮🇳', name: 'India International Trade Fair (IITF)', venue: 'Pragati Maidan', city: 'New Delhi, IN', dates: '14–27 Nov 2026', region: 'IN', sector: 'Trade' },
    { flag: '🇳🇱', name: 'Formnext', venue: 'Messe Frankfurt', city: 'Frankfurt, DE', dates: '18–21 Nov 2026', region: 'EU', sector: 'Manufacturing' },
    { flag: '🇬🇧', name: 'Salesforce World Tour London', venue: 'ExCeL London', city: 'London, UK', dates: '5 Nov 2026', region: 'UK', sector: 'Technology' },
  ]},
  { month: 'January 2027', items: [
    { flag: '🇮🇳', name: 'Auto Expo', venue: 'Bharat Mandapam, Greater Noida', city: 'Delhi NCR, IN', dates: '17–22 Jan 2027', region: 'IN', sector: 'Automotive' },
  ]},
  { month: 'February 2027', items: [
    { flag: '🇮🇳', name: 'ELECRAMA', venue: 'BIEC', city: 'Bengaluru, IN', dates: '14–18 Feb 2027', region: 'IN', sector: 'Electrical' },
    { flag: '🇩🇪', name: 'Ambiente', venue: 'Messe Frankfurt', city: 'Frankfurt, DE', dates: '7–11 Feb 2027', region: 'EU', sector: 'Consumer Goods' },
  ]},
  { month: 'March 2027', items: [
    { flag: '🇪🇸', name: 'Mobile World Congress', venue: 'Fira Barcelona', city: 'Barcelona, ES', dates: '1–4 Mar 2027', region: 'EU', sector: 'Telecoms' },
    { flag: '🇬🇧', name: 'BETT', venue: 'ExCeL London', city: 'London, UK', dates: '24–26 Mar 2027', region: 'UK', sector: 'Education Tech' },
  ]},
]

const REGION_TAG: Record<string, string> = { EU: 'tag-eu', UK: 'tag-uk', IN: 'tag-in' }

export default function ShowsPage() {
  return (
    <>
      <RegionBar /><Topbar /><Header />
      <main className="bg-cream">
        <section className="bg-navy py-16 px-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="max-w-[900px] mx-auto text-center relative z-10">
            <p className="section-label text-gold-light">2026–2027 Season</p>
            <h1 className="font-display font-extrabold text-5xl text-white tracking-tight mb-5">Trade Show Calendar</h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Key upcoming exhibitions across Europe, United Kingdom and India. Book your booth rental early to guarantee availability.
            </p>
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-10 py-16">
          <div className="space-y-12">
            {shows.map(group => (
              <div key={group.month}>
                <h2 className="font-display font-extrabold text-2xl text-navy mb-5 flex items-center gap-3">
                  {group.month}
                  <span className="text-[13px] font-normal text-[#6B6B6B] font-sans">{group.items.length} show{group.items.length !== 1 ? 's' : ''}</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {group.items.map(show => (
                    <div key={show.name} className="card p-5 hover:-translate-y-0.5 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{show.flag}</span>
                          <div>
                            <h3 className="font-display font-semibold text-navy text-[15px] leading-tight">{show.name}</h3>
                            <p className="text-[12px] text-[#6B6B6B] mt-0.5">{show.venue}</p>
                          </div>
                        </div>
                        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${REGION_TAG[show.region]}`}>{show.region}</span>
                      </div>
                      <div className="flex items-center justify-between text-[12.5px]">
                        <div className="flex items-center gap-3 text-[#6B6B6B]">
                          <span>📅 {show.dates}</span>
                          <span>📍 {show.city}</span>
                        </div>
                        <span className="bg-cream-dark text-[#6B6B6B] px-2 py-0.5 rounded text-[11px]">{show.sector}</span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-cream-dark flex gap-2">
                        <Link href="/quote" className="text-[12px] text-gold hover:text-gold-light font-medium transition-colors">Request quote for this show →</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 bg-navy rounded-2xl p-10 text-center">
            <h2 className="font-display font-extrabold text-3xl text-white mb-3">Don't see your show?</h2>
            <p className="text-white/60 mb-7">We cover hundreds of shows across Europe, UK and India. Contact us with your show name and we'll confirm availability.</p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact" className="bg-gold text-white px-7 py-3 rounded font-medium hover:bg-gold-light transition-colors">Contact Us</Link>
              <Link href="/quote" className="border border-white/30 text-white px-7 py-3 rounded font-medium hover:bg-white/10 transition-colors">Request a Quote</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
