'use client'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-navy relative overflow-hidden py-[90px] px-10">
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)',backgroundSize:'60px 60px'}}/>
      <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 60% 80% at 80% 50%,rgba(201,136,42,0.12) 0%,transparent 70%)'}}/>

      <div className="max-w-[1280px] mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold-light text-[12px] font-medium tracking-[0.1em] uppercase px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-gold-light"/>B2B Exhibition Rental — Europe · UK · India
          </div>

          <h1 className="font-display font-extrabold text-[50px] leading-[1.1] text-white tracking-tight mb-5">
            Rent Premium<br/>Exhibition<br/><em className="not-italic text-gold-light">Booths & Furniture</em>
          </h1>

          {/* Region chips */}
          <div className="flex flex-wrap gap-2.5 mb-7">
            {[
              { flag: '🇪🇺', label: 'Europe', sub: 'DE · FR · NL · ES · IT' },
              { flag: '🇬🇧', label: 'United Kingdom', sub: 'LON · BHM · MAN' },
              { flag: '🇮🇳', label: 'India', sub: 'DEL · MUM · BLR · CHN' },
            ].map(r => (
              <div key={r.label} className="flex items-center gap-2 bg-white/7 border border-white/12 rounded-full px-3.5 py-1.5 text-[12.5px] text-white/70">
                <span className="text-base">{r.flag}</span>
                <strong className="text-white font-medium">{r.label}</strong>
                <span className="text-white/40">{r.sub}</span>
              </div>
            ))}
          </div>

          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-[480px]">
            Everything you need for your next European, UK or Indian trade show — turnkey booth structures, furniture, A/V, and flooring. Delivered, installed, and broken down at the world's leading exhibition venues.
          </p>

          <div className="flex items-center gap-4 mb-10">
            <Link href="/products" className="btn-primary text-base px-7 py-3.5">Browse Catalogue</Link>
            <Link href="/how-it-works" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-[15px]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
              How it works
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-8 pt-9 border-t border-white/10">
            {[
              { num: '4,800+', label: 'Items Available' },
              { num: '85+', label: 'Venues Covered' },
              { num: '3 Regions', label: 'EU · UK · India' },
              { num: '98%', label: 'On-time Delivery' },
            ].map(s => (
              <div key={s.label}>
                <div className="font-display font-bold text-[28px] text-white">{s.num}</div>
                <div className="text-[12px] text-white/45 uppercase tracking-[0.04em] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual cards */}
        <div className="hidden lg:grid grid-cols-2 gap-3.5">
          <div className="col-span-2 bg-gold/8 border border-gold/25 rounded-xl p-5 flex items-center gap-5">
            <div className="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F0A93A" strokeWidth="1.8"><rect x="2" y="7" width="20" height="13" rx="2"/><path d="M16 7V5a2 2 0 00-4 0v2M8 7V5a2 2 0 014 0v2"/></svg>
            </div>
            <div>
              <div className="text-[10px] font-semibold bg-gold text-white px-2 py-0.5 rounded uppercase tracking-wide mb-2 inline-block">Most Rented</div>
              <h4 className="font-display font-semibold text-white text-sm mb-1">6×6m Island Booth Package</h4>
              <p className="text-[12px] text-white/45">Complete setup with flooring, lighting and counters included</p>
            </div>
          </div>
          {[
            { icon: 'M3 3h18v12H3z M8 21h8 M12 17v4', title: 'LED Video Walls', sub: 'Available at all UK & EU venues' },
            { icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', title: 'Shell Scheme Upgrades', sub: 'GST invoicing for India' },
          ].map(card => (
            <div key={card.title} className="bg-white/6 border border-white/10 rounded-xl p-4 hover:border-gold/40 transition-colors">
              <div className="w-10 h-10 bg-white/8 rounded-lg flex items-center justify-center mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8"><path d={card.icon}/></svg>
              </div>
              <h4 className="font-display font-semibold text-white text-sm mb-1">{card.title}</h4>
              <p className="text-[12px] text-white/45">{card.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
