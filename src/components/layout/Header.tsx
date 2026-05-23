'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'

const navItems = [
  {
    label: 'Booth Structures', href: '/products?category=booth-structures',
    children: [
      { label: '3×3m Inline Booths', href: '/products?category=booth-structures&size=3x3' },
      { label: '6×6m Island Booths', href: '/products?category=booth-structures&size=6x6' },
      { label: 'Modular / Shell Scheme', href: '/products?category=booth-structures&size=modular' },
      { label: 'Double-Deck Structures', href: '/products?category=booth-structures&size=double-deck' },
    ],
  },
  {
    label: 'Furniture', href: '/products?category=lounge-furniture',
    children: [
      { label: 'Lounge Furniture', href: '/products?category=lounge-furniture' },
      { label: 'Tables & Chairs', href: '/products?category=tables-chairs' },
      { label: 'Reception Counters', href: '/products?category=reception-counters' },
    ],
  },
  {
    label: 'A/V & Tech', href: '/products?category=av-electronics',
    children: [
      { label: 'LED Video Walls', href: '/products?category=av-electronics&type=led-wall' },
      { label: 'Monitors & Displays', href: '/products?category=av-electronics&type=monitor' },
      { label: 'Audio & PA Systems', href: '/products?category=av-electronics&type=audio' },
      { label: 'Kiosk Displays', href: '/products?category=av-electronics&type=kiosk' },
    ],
  },
  { label: 'Flooring', href: '/products?category=flooring', children: [] },
  { label: 'Lighting', href: '/products?category=lighting', children: [] },
]

export default function Header() {
  const { user } = useAuth()
  const { items } = useCart(user?.id)
  const [mobileOpen, setMobileOpen] = useState(false)
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <header className="bg-white border-b border-[#DDD8CF] sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-10 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-[38px] h-[38px] bg-navy rounded-lg flex items-center justify-center flex-shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 7V5a2 2 0 00-4 0v2M8 7V5a2 2 0 014 0v2"/>
              <line x1="12" y1="12" x2="12" y2="17"/>
              <line x1="9" y1="14.5" x2="15" y2="14.5"/>
            </svg>
          </div>
          <span className="font-display font-extrabold text-xl text-navy tracking-tight">
            Booth<span className="text-gold">Market</span>
          </span>
          <span className="text-[10px] font-semibold tracking-[0.06em] uppercase bg-cream-dark text-[#6B6B6B] px-2 py-0.5 rounded-full ml-1">
            EU · UK · IN
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => (
            <div key={item.label} className="relative group">
              <Link href={item.href}
                className="flex items-center gap-1 text-sm text-[#1A1A1A] px-3.5 py-2 rounded hover:bg-cream transition-colors">
                {item.label}
                {item.children.length > 0 && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                )}
              </Link>
              {item.children.length > 0 && (
                <div className="absolute top-full left-0 pt-1 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 translate-y-[-4px] group-hover:translate-y-0">
                  <div className="bg-white border border-[#DDD8CF] rounded-xl shadow-lg p-2 min-w-[220px]">
                    {item.children.map(child => (
                      <Link key={child.href} href={child.href}
                        className="block px-3.5 py-2.5 text-[13.5px] text-[#1A1A1A] rounded-lg hover:bg-cream transition-colors">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link href="/dashboard" className="hidden sm:flex items-center gap-1.5 text-sm text-navy border-[1.5px] border-navy px-4 py-2 rounded hover:bg-navy hover:text-white transition-colors">
              <User size={15}/> Account
            </Link>
          ) : (
            <Link href="/login" className="hidden sm:block text-sm text-navy border-[1.5px] border-navy px-4 py-2 rounded hover:bg-navy hover:text-white transition-colors">
              Sign In
            </Link>
          )}
          <Link href="/cart" className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded text-sm font-medium hover:bg-navy-light transition-colors">
            <ShoppingCart size={16}/>
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-gold rounded-full w-[18px] h-[18px] text-[11px] flex items-center justify-center font-semibold">{cartCount}</span>
            )}
          </Link>
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#DDD8CF] px-6 py-4 space-y-1">
          {navItems.map(item => (
            <Link key={item.label} href={item.href}
              className="block py-2.5 text-sm text-[#1A1A1A] border-b border-cream-dark"
              onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}
          {!user && (
            <Link href="/login" className="block mt-3 text-center btn-primary">Sign In</Link>
          )}
        </div>
      )}
    </header>
  )
}
