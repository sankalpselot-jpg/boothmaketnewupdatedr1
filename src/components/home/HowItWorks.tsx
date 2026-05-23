const steps = [
  { num: '01', icon: 'M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z', title: 'Browse & Select', desc: 'Filter by region, venue, show dates and booth size. Prices shown in EUR, GBP or INR.' },
  { num: '02', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title: 'Confirm & Pay', desc: 'Secure checkout. EU & UK orders include VAT invoices. India orders include GST invoices.' },
  { num: '03', icon: 'M1 3h15a2 2 0 012 2v11a2 2 0 01-2 2H1V3zM16 8h4l3 3v5h-7V8z M5.5 18.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 18.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z', title: 'We Deliver & Install', desc: 'Our regional crews deliver on schedule and handle full installation per local venue rules.' },
  { num: '04', icon: 'M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11', title: 'We Pack Up After', desc: 'When the show ends, our crew returns for full breakdown and collection. No hidden charges.' },
]

export default function HowItWorks() {
  return (
    <section className="bg-navy py-20 px-10">
      <div className="max-w-[1280px] mx-auto">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-gold-light mb-3">Simple Process</p>
        <h2 className="font-display font-extrabold text-[36px] text-white tracking-tight mb-12">From browse to booth in 4 steps</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              <div className="font-display font-extrabold text-[48px] text-white/5 leading-none mb-[-18px]">{s.num}</div>
              <div className="w-13 h-13 bg-gold/15 border border-gold/30 rounded-xl flex items-center justify-center mb-4" style={{width:52,height:52}}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F0A93A" strokeWidth="1.8"><path d={s.icon}/></svg>
              </div>
              <h4 className="font-display font-bold text-white text-base mb-2">{s.title}</h4>
              <p className="text-[13.5px] text-white/50 leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 right-[-18px] w-9 text-white/20 z-10">
                  <svg viewBox="0 0 36 24" fill="none"><path d="M0 12h28M22 6l10 6-10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
