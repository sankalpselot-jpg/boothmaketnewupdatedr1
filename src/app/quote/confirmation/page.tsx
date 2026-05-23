import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RegionBar from '@/components/region/RegionBar'
import Topbar from '@/components/layout/Topbar'

export default async function QuoteConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const { ref } = await searchParams
  return (
    <>
      <RegionBar /><Topbar /><Header />
      <main className="min-h-screen bg-cream flex items-center justify-center px-10 py-20">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h1 className="font-display font-extrabold text-3xl text-navy mb-3">Quote Request Received</h1>
          {ref && <p className="text-sm text-[#6B6B6B] mb-2">Reference: <strong className="text-navy">{ref}</strong></p>}
          <p className="text-[#6B6B6B] mb-8">
            Thank you! Our team will review your requirements and send a detailed proposal to your email within 24 business hours.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/products" className="btn-primary px-6 py-3">Continue Browsing</Link>
            <Link href="/dashboard" className="btn-outline px-6 py-3">View Dashboard</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
