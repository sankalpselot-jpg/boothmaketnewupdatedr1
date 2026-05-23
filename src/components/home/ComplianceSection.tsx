const regions = [
  {
    flag: '🇪🇺', title: 'European Union',
    desc: 'All equipment meets EU CE certification. VAT invoicing for all 27 EU member states. GDPR-compliant data handling.',
    tags: [{ label: 'CE Certified', cls: 'comp-tag-blue' }, { label: 'VAT Invoicing', cls: 'comp-tag-blue' }, { label: 'GDPR Ready', cls: 'comp-tag-blue' }, { label: 'EU Fire Safety', cls: 'comp-tag-blue' }],
  },
  {
    flag: '🇬🇧', title: 'United Kingdom',
    desc: 'UKCA-marked equipment. Full VAT invoicing. BS EN fire safety materials. Compliant with UK Health & Safety at Work Act.',
    tags: [{ label: 'UKCA Marked', cls: 'comp-tag-red' }, { label: 'UK VAT Invoice', cls: 'comp-tag-red' }, { label: 'BS EN Standards', cls: 'comp-tag-red' }, { label: 'UK GDPR', cls: 'comp-tag-red' }],
  },
  {
    flag: '🇮🇳', title: 'India',
    desc: 'ISI-marked electrical equipment. GST-compliant invoicing with GSTIN. BIS standards for electrical safety.',
    tags: [{ label: 'ISI Marked', cls: 'comp-tag-saffron' }, { label: 'GST Invoice', cls: 'comp-tag-saffron' }, { label: 'BIS Standards', cls: 'comp-tag-green' }, { label: 'FSSAI Compliant', cls: 'comp-tag-green' }],
  },
]

export default function ComplianceSection() {
  return (
    <section className="bg-white border-t border-[#DDD8CF] py-16 px-10">
      <div className="max-w-[1280px] mx-auto">
        <p className="section-label">Regional Compliance</p>
        <h2 className="section-title mb-9">Built for local regulations</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {regions.map(r => (
            <div key={r.title} className="bg-cream border border-[#DDD8CF] rounded-xl p-7">
              <span className="text-[32px] block mb-3.5">{r.flag}</span>
              <h4 className="font-display font-bold text-navy text-base mb-2">{r.title}</h4>
              <p className="text-[13px] text-[#6B6B6B] leading-relaxed mb-4">{r.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {r.tags.map(t => (
                  <span key={t.label} className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${t.cls}`}>{t.label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
