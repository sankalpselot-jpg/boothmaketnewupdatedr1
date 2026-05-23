import Link from 'next/link'

const cols = [
  {
    heading: 'Products',
    links: [
      { label: 'Booth Structures', href: '/products?category=booth-structures' },
      { label: 'Lounge Furniture', href: '/products?category=lounge-furniture' },
      { label: 'A/V & Electronics', href: '/products?category=av-electronics' },
      { label: 'Flooring', href: '/products?category=flooring' },
      { label: 'Lighting', href: '/products?category=lighting' },
    ],
  },
  {
    heading: 'Regions',
    links: [
      { label: '🇪🇺 Europe Overview', href: '/regions/eu' },
      { label: '🇩🇪 Germany', href: '/regions/eu/de' },
      { label: '🇬🇧 United Kingdom', href: '/regions/uk' },
      { label: '🇫🇷 France', href: '/regions/eu/fr' },
      { label: '🇮🇳 India Overview', href: '/regions/in' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Trade Show Calendar', href: '/shows' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Centre', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Delivery Areas', href: '/delivery' },
      { label: 'VAT / GST FAQs', href: '/tax-faqs' },
      { label: 'GDPR & Privacy', href: '/privacy' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-navy pt-14 pb-8 px-10">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 bg-navy-light border border-white/10 rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-4 0v2M8 7V5a2 2 0 014 0v2"/></svg>
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">Booth<span className="text-gold">Market</span></span>
            </div>
            <p className="text-white/40 text-[13.5px] leading-relaxed max-w-[240px] mb-4">
              B2B exhibition booth rental marketplace for Europe, UK &amp; India.
            </p>
            <div className="flex flex-wrap gap-2">
              {['🇪🇺 Europe', '🇬🇧 United Kingdom', '🇮🇳 India'].map(r => (
                <span key={r} className="text-[11.5px] text-white/50 border border-white/12 px-2.5 py-1 rounded-full">{r}</span>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.heading}>
              <h4 className="font-display text-[12px] font-bold text-white/90 tracking-[0.07em] uppercase mb-4">{col.heading}</h4>
              <div className="space-y-1">
                {col.links.map(link => (
                  <Link key={link.href} href={link.href}
                    className="block text-[13.5px] text-white/40 py-1 hover:text-gold-light transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[12.5px] text-white/30">
            © 2026 BoothMarket Ltd. Registered in England &amp; Wales · EU VAT Registered · India GSTIN Registered
          </p>
          <div className="flex gap-4">
            {['Privacy Policy','Cookie Policy','Terms','GDPR Statement'].map(l => (
              <Link key={l} href={`/${l.toLowerCase().replace(/ /g,'-')}`}
                className="text-[12px] text-white/30 hover:text-white/60 transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
