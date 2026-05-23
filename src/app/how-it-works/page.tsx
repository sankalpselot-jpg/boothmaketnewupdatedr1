import type { Metadata } from 'next'
import Link from 'next/link'
import RegionBar from '@/components/region/RegionBar'
import Topbar from '@/components/layout/Topbar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = { title: 'How It Works' }

const steps = [
  {
    num: '01', title: 'Browse Our Catalogue',
    desc: 'Filter by region (EU, UK or India), city, venue, product category and budget. Switch between EUR, GBP and INR. Every product shows region availability, tax-exclusive pricing and venue compatibility.',
    detail: ['4,800+ items across 8 categories', 'Filter by EU / UK / India region', 'Prices in EUR, GBP or INR', 'Stock status visible on each item'],
  },
  {
    num: '02', title: 'Build Your Cart',
    desc: 'Add booth structures, furniture, A/V equipment, flooring and accessories to a single cart. Each item shows the correct price in your currency. You can specify event details, dates and venue notes per item.',
    detail: ['Mix items across categories', 'Set event date and venue per order', 'Specify delivery instructions', 'Saved cart persists across sessions'],
  },
  {
    num: '03', title: 'Checkout & Pay',
    desc: 'Our 3-step checkout collects billing details, event information and a final review. VAT invoices are generated automatically for EU and UK orders. GST-compliant invoices for India (GSTIN supported).',
    detail: ['Secure SSL checkout', 'VAT invoicing (EU/UK)', 'GST invoicing with GSTIN (India)', 'SEPA, BACS & UPI payment methods'],
  },
  {
    num: '04', title: 'We Deliver & Install',
    desc: 'Our regional logistics crews handle delivery to the venue, full professional installation per venue regulations, and pack-down and collection after your show ends. No storage, no transport — zero hassle.',
    detail: ['Delivery to all major venues', 'Professional installation crew', 'Venue regulation compliant', 'Full pack-down after show'],
  },
]

const faqs = [
  { q: 'Which countries do you serve?', a: 'We serve all major exhibition markets across the European Union (Germany, France, Netherlands, Spain, Italy and more), the United Kingdom (England, Scotland, Wales), and India (Delhi, Mumbai, Bengaluru, Hyderabad, Chennai and more).' },
  { q: 'How far in advance should I book?', a: 'We recommend booking at least 4 weeks before your show. For large orders (20+ items) or major shows like Hannover Messe or IITF, 8–12 weeks is ideal. Last-minute requests (under 2 weeks) may attract a surcharge — contact us to check availability.' },
  { q: 'Are delivery and installation included in the price?', a: 'Yes. All prices include delivery to the venue, professional installation, and full pack-down and collection after the event. There are no hidden logistics fees.' },
  { q: 'Can I get a VAT invoice for EU or UK orders?', a: 'Yes. All EU and UK orders come with a VAT-compliant invoice. If you are a VAT-registered B2B customer, please provide your VAT number at checkout for zero-rated treatment where applicable.' },
  { q: 'How does GST work for India orders?', a: 'India orders are invoiced with GST at 18%. If your business is GST-registered, enter your GSTIN at checkout and you will receive a GST-compliant tax invoice for Input Tax Credit claims.' },
  { q: 'Can I rent items across multiple cities or countries?', a: 'Yes — use our Quote Request form for cross-regional or multi-venue orders. Our team will prepare a consolidated quote with logistics coordinated across locations.' },
  { q: 'What if I need something not in the catalogue?', a: 'Use the Quote Request form to describe your requirements. We can source custom booth sizes, bespoke furniture sets, specialist A/V and branded elements that aren\'t listed in the standard catalogue.' },
]

export default function HowItWorksPage() {
  return (
    <>
      <RegionBar /><Topbar /><Header />
      <main className="bg-cream">
        {/* Hero */}
        <section className="bg-navy py-16 px-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="max-w-[860px] mx-auto text-center relative z-10">
            <p className="section-label text-gold-light">Simple Process</p>
            <h1 className="font-display font-extrabold text-5xl text-white tracking-tight mb-5">How BoothMarket Works</h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              From browsing to a fully installed exhibition booth — in four simple steps, across Europe, UK and India.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20 px-10 max-w-[1100px] mx-auto">
          <div className="space-y-16">
            {steps.map((step, i) => (
              <div key={step.num} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="font-display font-extrabold text-[72px] text-cream-dark leading-none mb-0">{step.num}</div>
                  <h2 className="font-display font-extrabold text-3xl text-navy tracking-tight mb-4 -mt-4">{step.title}</h2>
                  <p className="text-[#6B6B6B] text-[15px] leading-relaxed mb-6">{step.desc}</p>
                  <ul className="space-y-2.5">
                    {step.detail.map(d => (
                      <li key={d} className="flex items-center gap-2.5 text-[13.5px] text-navy">
                        <svg className="w-4 h-4 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`bg-white border border-[#DDD8CF] rounded-2xl p-10 flex items-center justify-center aspect-square max-w-sm mx-auto ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="text-center">
                    <div className="font-display font-extrabold text-[100px] text-cream-dark leading-none">{step.num}</div>
                    <p className="font-display font-bold text-navy text-xl -mt-4">{step.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white border-t border-[#DDD8CF] py-20 px-10">
          <div className="max-w-[800px] mx-auto">
            <p className="section-label">FAQ</p>
            <h2 className="section-title mb-10">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {faqs.map(faq => (
                <details key={faq.q} className="card group">
                  <summary className="px-6 py-4 cursor-pointer font-medium text-navy text-[15px] list-none flex justify-between items-center hover:bg-cream/50 transition-colors">
                    {faq.q}
                    <svg className="w-5 h-5 text-[#6B6B6B] group-open:rotate-180 transition-transform flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </summary>
                  <div className="px-6 pb-5 text-[#6B6B6B] text-[14px] leading-relaxed border-t border-[#DDD8CF] pt-4">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-10 text-center bg-cream">
          <h2 className="font-display font-extrabold text-3xl text-navy mb-4">Ready to get started?</h2>
          <p className="text-[#6B6B6B] mb-8">Browse 4,800+ items available across Europe, UK and India.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/products" className="btn-primary px-8 py-3.5 text-base">Browse Catalogue</Link>
            <Link href="/quote" className="btn-outline px-8 py-3.5 text-base">Request a Quote</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
