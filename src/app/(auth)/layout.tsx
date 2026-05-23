export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream flex">
      <div className="hidden lg:flex lg:w-1/2 bg-navy relative overflow-hidden flex-col items-center justify-center p-16">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)',backgroundSize:'60px 60px'}}/>
        <div className="relative z-10 text-center">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="w-12 h-12 bg-navy-light border border-white/10 rounded-xl flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-4 0v2M8 7V5a2 2 0 014 0v2"/></svg>
            </div>
            <span className="font-display font-extrabold text-2xl text-white">Booth<span className="text-gold">Market</span></span>
          </div>
          <h2 className="font-display font-bold text-3xl text-white mb-4 leading-tight">Premium B2B Exhibition<br/>Booth Rentals</h2>
          <p className="text-white/50 text-base leading-relaxed max-w-xs mx-auto mb-10">Serving Europe, United Kingdom & India with professional booth logistics.</p>
          <div className="flex justify-center gap-4">
            {['🇪🇺 Europe', '🇬🇧 UK', '🇮🇳 India'].map(r => (
              <span key={r} className="text-[12px] text-white/50 border border-white/12 px-3 py-1.5 rounded-full">{r}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        {children}
      </div>
    </div>
  )
}
