import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RegionBar from '@/components/region/RegionBar'
import Topbar from '@/components/layout/Topbar'

export const metadata: Metadata = { title: 'Privacy Policy' }

const sections = [
  {
    title: '1. Who We Are',
    content: `BoothMarket Ltd ("BoothMarket", "we", "us") operates the exhibition booth rental marketplace at boothmarket.com. We are registered in England and Wales, EU VAT registered, and India GSTIN registered. We act as the data controller for personal data collected through this platform.`,
  },
  {
    title: '2. What Data We Collect',
    content: `We collect: (a) Account information — name, email, company name, VAT/GSTIN number, phone number and region preference provided during registration. (b) Order and transaction data — billing details, order history, delivery instructions and event information. (c) Technical data — IP address, browser type, device identifiers and cookies necessary to operate the platform. (d) Communications — enquiries, quote requests and support messages.`,
  },
  {
    title: '3. Legal Basis for Processing (EU & UK)',
    content: `Under GDPR (EU Regulation 2016/679) and UK GDPR (UK GDPR), we process your data on the following legal bases: Contract performance — processing your orders and managing your account. Legitimate interests — fraud prevention, platform security, and service improvement. Consent — marketing communications (opt-in only). Legal obligation — tax record-keeping, VAT/GST compliance.`,
  },
  {
    title: '4. India — Personal Data Protection',
    content: `For customers in India, we process personal data in accordance with India's Information Technology Act 2000 and the Personal Data Protection Bill (PDPB). We collect only the minimum data necessary, maintain data localisation where required, and provide access and deletion rights on request.`,
  },
  {
    title: '5. How We Use Your Data',
    content: `We use your personal data to: process and fulfil rental orders; issue VAT (EU/UK) and GST (India) compliant invoices; coordinate delivery and installation at your venue; respond to support and quote enquiries; maintain security and prevent fraud; comply with applicable tax and legal obligations.`,
  },
  {
    title: '6. Data Retention',
    content: `Order and billing records are retained for 7 years for tax compliance purposes (EU/UK VAT and India GST requirements). Account data is retained while your account is active and for 2 years after closure. Quote enquiries are retained for 3 years. You may request deletion of non-tax data at any time.`,
  },
  {
    title: '7. Your Rights',
    content: `EU & UK customers have the right to: access, rectify, erase, restrict or port your data; object to processing; and lodge a complaint with your supervisory authority (ICO for UK; relevant national DPA for EU). India customers have the right to access, correct and delete personal data by contacting in@boothmarket.com. To exercise any right, email privacy@boothmarket.com.`,
  },
  {
    title: '8. Cookies',
    content: `We use strictly necessary cookies (authentication, CSRF protection), functional cookies (region and currency preferences) and optional analytics cookies. You can manage cookie preferences via the consent banner or your browser settings. We do not use advertising or tracking cookies.`,
  },
  {
    title: '9. International Transfers',
    content: `Your data is processed on Supabase infrastructure (hosted on AWS). For EU/UK customers, transfers outside the EEA/UK are covered by Standard Contractual Clauses (SCCs). For India customers, data may be processed on servers outside India with equivalent protection measures in place.`,
  },
  {
    title: '10. Contact',
    content: `Data Protection Officer: privacy@boothmarket.com. EU representative: eu@boothmarket.com. UK representative: uk@boothmarket.com. India representative: in@boothmarket.com. Last updated: 1 January 2026.`,
  },
]

export default function PrivacyPage() {
  return (
    <>
      <RegionBar /><Topbar /><Header />
      <main className="bg-cream py-14 px-10 min-h-screen">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="tag-eu">GDPR</span>
            <span className="tag-uk">UK GDPR</span>
            <span className="tag-in">PDPB (India)</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl text-navy mb-3">Privacy Policy</h1>
          <p className="text-[#6B6B6B] mb-10">Last updated 1 January 2026. Applies to all BoothMarket services across Europe, UK and India.</p>
          <div className="space-y-8">
            {sections.map(s => (
              <div key={s.title} className="card p-7">
                <h2 className="font-display font-bold text-navy text-lg mb-3">{s.title}</h2>
                <p className="text-[#6B6B6B] text-[14px] leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
