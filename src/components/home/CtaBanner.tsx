import Link from 'next/link'

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-16 px-10" style={{background:'linear-gradient(135deg,#0D1B2A 0%,#0F2840 100%)'}}>
      <div className="absolute right-[-80px] top-[-80px] w-[400px] h-[400px] rounded-full" style={{background:'radial-gradient(circle,rgba(201,136,42,0.15) 0%,transparent 70%)'}}/>
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-7 relative z-10">
        <div>
          <h2 className="font-display font-extrabold text-[32px] text-white tracking-tight mb-2.5">Exhibiting across Europe, UK or India?</h2>
          <p className="text-white/55 text-[15px]">Get a custom quote for multi-booth setups, cross-regional packages and priority scheduling.</p>
        </div>
        <div className="flex gap-3.5 flex-shrink-0">
          <Link href="/products" className="border-[1.5px] border-white/30 text-white px-5 py-3 rounded text-[13.5px] font-medium hover:bg-white/10 transition-colors">
            View Packages
          </Link>
          <Link href="/quote" className="bg-gold text-white px-5 py-3 rounded text-[13.5px] font-medium hover:bg-gold-light transition-colors">
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  )
}
