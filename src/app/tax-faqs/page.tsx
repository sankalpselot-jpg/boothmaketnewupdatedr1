import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RegionBar from '@/components/region/RegionBar'
import Topbar from '@/components/layout/Topbar'

export const metadata: Metadata = { title: 'VAT & GST FAQs' }

const faqs = {
  EU: [
    { q: 'What VAT rate applies?', a: 'Standard VAT at 20% is applied to all EU orders unless you provide a valid EU VAT number for zero-rated B2B treatment (reverse charge mechanism).' },
    { q: 'How do I provide my VAT number?', a: 'Enter your VAT number (e.g. DE123456789) at checkout under "VAT Number". It is validated against the EU VIES system. If valid, VAT is zero-rated on your invoice.' },
    { q: 'Can I claim VAT back?', a: 'Yes. VAT-registered EU businesses can reclaim input VAT through their normal VAT return. We issue a full tax invoice with our EU VAT number included.' },
  ],
  UK: [
    { q: 'What VAT rate applies in the UK?', a: 'UK VAT at 20% applies to all UK orders. If you are UK VAT-registered, provide your GB VAT number at checkout to receive an invoice suitable for VAT reclaim.' },
    { q: 'Are you UK VAT registered?', a: 'Yes. BoothMarket Ltd is registered for VAT in the United Kingdom. Our UK VAT registration number is shown on all invoices.' },
    { q: 'What about Making Tax Digital?', a: 'All our UK VAT invoices are MTD-compatible and include all required fields for digital VAT records.' },
  ],
  IN: [
    { q: 'What GST rate applies?', a: 'GST at 18% applies to all India orders under the standard Goods and Services Tax framework (SAC code applicable to rental services).' },
    { q: 'How do I claim Input Tax Credit (ITC)?', a: 'Enter your GSTIN at checkout. Your invoice will include our GSTIN, your GSTIN, HSN/SAC code, and GST breakdowns (CGST + SGST or IGST). Upload to GSTR-2A for ITC claims.' },
    { q: 'Do you issue e-invoices under IRP?', a: 'Yes. For orders above the mandatory threshold, we generate e-invoices through the Invoice Registration Portal (IRP) and share the IRN and QR code on your invoice.' },
    { q: 'Is TDS deductible on rental payments?', a: 'TDS under Section 194I (rent) may apply at 10% for individual/HUF customers or 2% for others. Please consult your CA for your specific situation.' },
  ],
}

export default function TaxFaqsPage() {
  return (
    <>
      <RegionBar /><Topbar /><Header />
      <main className="bg-cream py-14 px-10 min-h-screen">
        <div className="max-w-[900px] mx-auto">
          <p className="section-label">Billing & Tax</p>
          <h1 className="font-display font-extrabold text-4xl text-navy mb-4">VAT & GST FAQs</h1>
          <p className="text-[#6B6B6B] mb-12 text-[15px]">Everything you need to know about tax invoicing across our three regions.</p>

          <div className="space-y-10">
            {Object.entries(faqs).map(([region, items]) => (
              <div key={region}>
                <h2 className="font-display font-extrabold text-2xl text-navy mb-5 flex items-center gap-3">
                  <span>{region === 'EU' ? '🇪🇺 European Union' : region === 'UK' ? '🇬🇧 United Kingdom' : '🇮🇳 India'}</span>
                  <span className={region === 'EU' ? 'tag-eu' : region === 'UK' ? 'tag-uk' : 'tag-in'}>
                    {region === 'EU' ? 'VAT 20%' : region === 'UK' ? 'VAT 20%' : 'GST 18%'}
                  </span>
                </h2>
                <div className="space-y-3">
                  {items.map(f => (
                    <div key={f.q} className="card p-5">
                      <h3 className="font-medium text-navy mb-2 text-[14.5px]">{f.q}</h3>
                      <p className="text-[13.5px] text-[#6B6B6B] leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-navy rounded-xl p-6 text-center">
            <p className="text-white/70 text-sm mb-3">Still have tax questions?</p>
            <a href="/contact" className="btn-primary inline-block px-6 py-2.5 text-sm">Contact Our Finance Team</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
