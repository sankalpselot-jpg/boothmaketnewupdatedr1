'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RegionBar from '@/components/region/RegionBar'
import Topbar from '@/components/layout/Topbar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useRegion } from '@/hooks/useRegion'
import { useAuth } from '@/hooks/useAuth'
import { REGION_FLAGS, REGION_LABELS } from '@/lib/utils/regions'
import toast from 'react-hot-toast'
import type { Region } from '@/types/database'

export default function QuotePage() {
  const { user, profile } = useAuth()
  const { region, setRegion } = useRegion()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    contact_name: profile?.full_name || '',
    contact_email: user?.email || '',
    contact_company: profile?.company_name || '',
    contact_phone: profile?.phone || '',
    region: region as Region,
    event_name: '',
    event_date: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const { data, error } = await res.json()
      if (error) { toast.error(error); return }
      toast.success('Quote request submitted! We\'ll be in touch within 24 hours.')
      router.push(`/quote/confirmation?ref=${data.quote_number}`)
    } finally {
      setSubmitting(false)
    }
  }

  const regions: Region[] = ['EU', 'UK', 'IN']

  return (
    <>
      <RegionBar /><Topbar /><Header />
      <main className="min-h-screen bg-cream py-14 px-10">
        <div className="max-w-[860px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="section-label">Custom Pricing</p>
            <h1 className="font-display font-extrabold text-4xl text-navy tracking-tight mb-4">Request a Quote</h1>
            <p className="text-[#6B6B6B] text-base max-w-lg mx-auto">
              For large setups, multi-booth orders or cross-regional events — tell us what you need and we'll prepare a tailored proposal within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 card p-8 space-y-5">
              <h2 className="font-display font-bold text-navy text-base mb-1">Contact Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Full Name *</label>
                  <input className="input" value={form.contact_name}
                    onChange={e => setForm(f => ({ ...f, contact_name: e.target.value }))}
                    placeholder="Jane Smith" required />
                </div>
                <div>
                  <label className="label">Company</label>
                  <input className="input" value={form.contact_company}
                    onChange={e => setForm(f => ({ ...f, contact_company: e.target.value }))}
                    placeholder="Acme Ltd" />
                </div>
                <div>
                  <label className="label">Email Address *</label>
                  <input className="input" type="email" value={form.contact_email}
                    onChange={e => setForm(f => ({ ...f, contact_email: e.target.value }))}
                    placeholder="you@company.com" required />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input className="input" type="tel" value={form.contact_phone}
                    onChange={e => setForm(f => ({ ...f, contact_phone: e.target.value }))}
                    placeholder="+44 7700 900000" />
                </div>
              </div>

              <div className="border-t border-[#DDD8CF] pt-5">
                <h2 className="font-display font-bold text-navy text-base mb-4">Event Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="label">Region *</label>
                    <div className="flex gap-2">
                      {regions.map(r => (
                        <button key={r} type="button"
                          onClick={() => { setForm(f => ({ ...f, region: r })); setRegion(r) }}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded border-[1.5px] text-sm font-medium transition-all ${
                            form.region === r ? 'bg-navy text-white border-navy' : 'bg-white text-[#1A1A1A] border-[#DDD8CF] hover:border-navy'
                          }`}>
                          <span>{REGION_FLAGS[r]}</span>
                          <span className="hidden sm:inline">{REGION_LABELS[r]}</span>
                          <span className="sm:hidden">{r}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label">Show / Event Name</label>
                    <input className="input" value={form.event_name}
                      onChange={e => setForm(f => ({ ...f, event_name: e.target.value }))}
                      placeholder="e.g. Hannover Messe 2026, India Pharma Expo" />
                  </div>
                  <div>
                    <label className="label">Expected Event Date</label>
                    <input className="input" type="date" value={form.event_date}
                      onChange={e => setForm(f => ({ ...f, event_date: e.target.value }))} />
                  </div>
                  <div>
                    <label className="label">Describe Your Requirements *</label>
                    <textarea className="input min-h-[120px] resize-y" value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell us about your booth size, number of items, specific products needed, venue name, budget range..."
                      required />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={submitting} className="btn-primary w-full py-3.5 text-base disabled:opacity-60">
                {submitting ? 'Submitting...' : 'Submit Quote Request'}
              </button>
              <p className="text-[11.5px] text-[#6B6B6B] text-center">
                We respond within 24 business hours. Your data is handled per our{' '}
                <a href="/privacy" className="text-gold hover:underline">Privacy Policy</a> &amp; GDPR.
              </p>
            </form>

            {/* Sidebar info */}
            <div className="space-y-4">
              <div className="card p-5">
                <h3 className="font-display font-semibold text-navy mb-3 text-sm">Why request a quote?</h3>
                <ul className="space-y-2.5">
                  {[
                    'Multi-booth orders (5+ items)',
                    'Cross-regional packages',
                    'Custom booth sizes',
                    'Long-term exhibition contracts',
                    'Last-minute availability checks',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-[13px] text-[#6B6B6B]">
                      <svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card p-5">
                <h3 className="font-display font-semibold text-navy mb-3 text-sm">What we'll send you</h3>
                <ul className="space-y-2.5">
                  {[
                    'Itemised pricing in EUR, GBP or INR',
                    'Availability confirmation',
                    'Delivery & setup schedule',
                    'Tax-compliant quote document',
                    'Dedicated account manager',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-[13px] text-[#6B6B6B]">
                      <svg className="w-4 h-4 text-navy mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-navy rounded-xl p-5 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gold-light mb-2">Need it urgently?</p>
                <p className="text-sm text-white/70 mb-3">Call our regional teams directly:</p>
                <div className="space-y-1.5 text-[12.5px]">
                  <p><span className="text-white/40">🇪🇺 EU:</span> <span className="text-white">+49 69 0000 0000</span></p>
                  <p><span className="text-white/40">🇬🇧 UK:</span> <span className="text-white">+44 20 0000 0000</span></p>
                  <p><span className="text-white/40">🇮🇳 IN:</span> <span className="text-white">+91 98765 43210</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
