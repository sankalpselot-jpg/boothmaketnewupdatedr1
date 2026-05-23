const items = [
  { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title: 'Secure Payments', sub: 'SSL · SEPA, BACS & UPI accepted' },
  { icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z', title: '3-Region Coverage', sub: '85+ venues across EU, UK & India' },
  { icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z', title: 'Local Support Teams', sub: 'On-ground teams in EU, UK & India' },
  { icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8', title: 'Tax-Compliant Invoicing', sub: 'VAT (EU/UK) · GST (India) issued' },
]

export default function TrustBar() {
  return (
    <div className="bg-white border-t border-b border-[#DDD8CF] py-11 px-10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div key={item.title} className={`flex items-center gap-3.5 ${i > 0 ? 'lg:border-l border-[#DDD8CF] lg:pl-8' : ''}`}>
            <div className="w-11 h-11 flex-shrink-0 bg-cream-dark rounded-xl flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D1B2A" strokeWidth="1.8"><path d={item.icon}/></svg>
            </div>
            <div>
              <h4 className="text-[14px] font-medium text-navy">{item.title}</h4>
              <p className="text-[12.5px] text-[#6B6B6B]">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
