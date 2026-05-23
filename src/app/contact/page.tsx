'use client'
import { useState } from 'react'
import RegionBar from '@/components/region/RegionBar'
import Topbar from '@/components/layout/Topbar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import toast from 'react-hot-toast'

const offices = [
  {
    region: 'EU', flag: '🇪🇺', title: 'Europe HQ',
    address: 'Messeallee 1, 60327 Frankfurt am Main, Germany',
    phone: '+49 69 0000 0000', email: 'eu@boothmarket.com',
    hours: 'Mon–Fri 08:00–18:00 CET',
  },
  {
    region: 'UK', flag: '🇬🇧', title: 'United Kingdom',
    address: 'One Canada Square, Canary Wharf, London E14 5AB',
    phone: '+44 20 0000 0000', email: 'uk@boothmarket.com',
    hours: 'Mon–Fri 09:00–18:00 GMT',
  },
  {
    region: 'IN', flag: '🇮🇳', title: 'India',
    address: 'Pragati Tower, Nehru Place, New Delhi 110 019',
    phone: '+91 98765 43210', email: 'in@boothmarket.com',
    hours: 'Mon–Sat 09:30–18:30 IST',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', region: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // In production wire this to your email provider / Supabase edge function
    await new Promise(r => setTimeout(r, 800))
    toast.success('Message sent! We\'ll respond within 1 business day.')
    setSent(true)
    setLoading(false)
  }

  return (
    <>
      <RegionBar /><Topbar /><Header />
      <main className="bg-cream">
        <section className="bg-navy py-16 px-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="max-w-[700px] mx-auto text-center relative z-10">
            <p className="section-label text-gold-light">Get in Touch</p>
            <h1 className="font-display font-extrabold text-5xl text-white tracking-tight mb-4">Contact Us</h1>
            <p className="text-white/60 text-lg">Regional teams in Europe, UK and India — ready to help with your exhibition needs.</p>
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-10 py-16">
          {/* Regional offices */}
          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {offices.map(o => (
              <div key={o.region} className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{o.flag}</span>
                  <div>
                    <h3 className="font-display font-bold text-navy">{o.title}</h3>
                    <span className={`text-[11px] font-medium ${o.region === 'EU' ? 'tag-eu' : o.region === 'UK' ? 'tag-uk' : 'tag-in'}`}>{o.region}</span>
                  </div>
                </div>
                <div className="space-y-2.5 text-[13.5px]">
                  <div className="flex items-start gap-2 text-[#6B6B6B]">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><circle cx="12" cy="11" r="3"/></svg>
                    {o.address}
                  </div>
                  <div className="flex items-center gap-2 text-[#6B6B6B]">
                    <svg className="w-4 h-4 flex-shrink-0 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.99 1.18 2 2 0 013 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
                    <a href={`tel:${o.phone}`} className="hover:text-gold transition-colors">{o.phone}</a>
                  </div>
                  <div className="flex items-center gap-2 text-[#6B6B6B]">
                    <svg className="w-4 h-4 flex-shrink-0 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <a href={`mailto:${o.email}`} className="hover:text-gold transition-colors">{o.email}</a>
                  </div>
                  <div className="flex items-center gap-2 text-[#6B6B6B]">
                    <svg className="w-4 h-4 flex-shrink-0 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {o.hours}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display font-extrabold text-3xl text-navy mb-3">Send a Message</h2>
              <p className="text-[#6B6B6B] mb-8">For general enquiries, partnership opportunities or media requests. For quote requests, please use the <a href="/quote" className="text-gold hover:underline">Quote page</a>.</p>

              {sent ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <svg className="w-10 h-10 text-green-500 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  <h3 className="font-display font-bold text-navy mb-1">Message received!</h3>
                  <p className="text-[13.5px] text-[#6B6B6B]">We'll respond within 1 business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">Full Name *</label>
                      <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label className="label">Company</label>
                      <input className="input" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Acme Ltd" />
                    </div>
                  </div>
                  <div>
                    <label className="label">Email Address *</label>
                    <input className="input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="label">Region</label>
                    <select className="input" value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))}>
                      <option value="">— Select region —</option>
                      <option value="EU">🇪🇺 Europe</option>
                      <option value="UK">🇬🇧 United Kingdom</option>
                      <option value="IN">🇮🇳 India</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Message *</label>
                    <textarea className="input min-h-[120px] resize-y" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required placeholder="How can we help?" />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 disabled:opacity-60">
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-5">
              <div className="bg-navy rounded-2xl p-8 text-white">
                <h3 className="font-display font-bold text-xl mb-4">Quick Links</h3>
                <div className="space-y-3">
                  {[
                    { href: '/quote', label: 'Request a custom quote', icon: '📋' },
                    { href: '/shows', label: 'View trade show calendar', icon: '📅' },
                    { href: '/how-it-works', label: 'How BoothMarket works', icon: '⚙️' },
                    { href: '/products', label: 'Browse all products', icon: '🏪' },
                  ].map(l => (
                    <a key={l.href} href={l.href} className="flex items-center gap-3 text-[13.5px] text-white/70 hover:text-gold-light transition-colors">
                      <span>{l.icon}</span>{l.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-display font-bold text-navy mb-3 text-sm">Compliance & Legal</h3>
                <div className="space-y-2">
                  {[
                    { href: '/privacy', label: 'Privacy Policy (GDPR / UK GDPR / PDPB)' },
                    { href: '/tax-faqs', label: 'VAT & GST Invoicing FAQs' },
                    { href: '/terms', label: 'Terms of Service' },
                    { href: '/cookie-policy', label: 'Cookie Policy' },
                  ].map(l => (
                    <a key={l.href} href={l.href} className="block text-[13px] text-[#6B6B6B] hover:text-gold transition-colors py-0.5">{l.label}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
