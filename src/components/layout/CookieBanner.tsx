'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem('bm-cookies-accepted')) setVisible(true)
  }, [])
  const accept = () => { localStorage.setItem('bm-cookies-accepted', '1'); setVisible(false) }
  if (!visible) return null
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#F5F3ED] border-t border-[#DDD8CF] px-10 py-3.5">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-5 flex-wrap">
        <p className="text-[12px] text-[#6B6B6B]">
          <strong className="text-[#1A1A1A]">We use cookies</strong> in accordance with GDPR (EU/UK) and India's PDPB.
          {' '}<Link href="/privacy" className="text-gold hover:underline">Cookie Policy</Link>
          {' '}·{' '}<Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>
        </p>
        <div className="flex gap-2.5">
          <button onClick={() => setVisible(false)} className="text-[12px] px-3.5 py-1.5 border border-[#DDD8CF] bg-white rounded text-[#1A1A1A] hover:bg-cream-dark transition-colors">
            Manage Preferences
          </button>
          <button onClick={accept} className="text-[12px] px-3.5 py-1.5 bg-navy text-white rounded hover:bg-navy-light transition-colors">
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
