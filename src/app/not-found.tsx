import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-cream flex items-center justify-center px-10">
        <div className="text-center">
          <p className="font-display font-extrabold text-[120px] text-cream-dark leading-none mb-0">404</p>
          <h1 className="font-display font-extrabold text-3xl text-navy mb-3 -mt-4">Page not found</h1>
          <p className="text-[#6B6B6B] mb-8">The page you're looking for doesn't exist or has moved.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="btn-primary px-6 py-3">Go Home</Link>
            <Link href="/products" className="btn-outline px-6 py-3">Browse Products</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
