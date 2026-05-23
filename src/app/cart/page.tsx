'use client'
import Link from 'next/link'
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { useRegion } from '@/hooks/useRegion'
import {
  formatPrice,
  getPriceForCurrency,
  TAX_RATES,
  TAX_LABELS,
} from '@/lib/utils/currency'
import RegionBar from '@/components/region/RegionBar'
import Topbar from '@/components/layout/Topbar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function CartPage() {
  const { user }                          = useAuth()
  const { items, loading, removeItem, updateQty } = useCart(user?.id)
  const { currency, region }              = useRegion()
  const taxInfo  = TAX_RATES[region]
  const taxLabel = TAX_LABELS[region]

  const subtotal = items.reduce((sum, item) =>
    sum + getPriceForCurrency(item.products as any, currency) * item.quantity, 0)
  const tax   = subtotal * taxInfo.rate
  const total = subtotal + tax

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center text-[#6B6B6B]">
        Loading cart…
      </div>
    )
  }

  return (
    <>
      <RegionBar /><Topbar /><Header />
      <main className="min-h-screen bg-cream py-10 px-10">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-display font-extrabold text-3xl text-navy mb-8">Your Cart</h1>

          {items.length === 0 ? (
            <div className="card p-16 text-center">
              <ShoppingCart className="w-14 h-14 mx-auto mb-4 text-[#DDD8CF]" />
              <h2 className="font-display font-bold text-xl text-navy mb-2">Your cart is empty</h2>
              <p className="text-[#6B6B6B] mb-6">Browse our catalogue to find exhibition items.</p>
              <Link href="/products" className="btn-primary inline-block">Browse Products</Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Items list */}
              <div className="lg:col-span-2 space-y-4">
                {items.map(item => {
                  const prod  = item.products as any
                  const price = getPriceForCurrency(prod, currency)
                  return (
                    <div key={item.id} className="card p-5 flex items-start gap-5">
                      <div className="w-20 h-20 bg-cream-dark rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                        {prod.images?.[0]
                          ? <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                          : <svg className="w-8 h-8 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="7" width="20" height="14" rx="2" /></svg>
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-navy text-[15px] mb-0.5 truncate">{prod.name}</h3>
                        <p className="text-[12.5px] text-[#6B6B6B] mb-3">{prod.categories?.name}</p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center border border-[#DDD8CF] rounded bg-cream">
                            <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-2.5 py-1.5 hover:bg-cream-dark transition-colors"><Minus size={12} /></button>
                            <span className="px-3 text-sm font-medium select-none">{item.quantity}</span>
                            <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-2.5 py-1.5 hover:bg-cream-dark transition-colors"><Plus size={12} /></button>
                          </div>
                          <span className="font-display font-bold text-navy">{formatPrice(price * item.quantity, currency)}</span>
                          <span className="text-[11px] text-[#6B6B6B]">{taxLabel}</span>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="p-2 text-[#6B6B6B] hover:text-red-500 transition-colors flex-shrink-0">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )
                })}
              </div>

              {/* Summary */}
              <div className="card p-6 h-fit sticky top-24">
                <h2 className="font-display font-bold text-navy text-lg mb-5">Order Summary</h2>
                <div className="space-y-3 text-sm mb-5">
                  <div className="flex justify-between text-[#6B6B6B]">
                    <span>Subtotal ({taxLabel})</span>
                    <span className="text-navy font-medium">{formatPrice(subtotal, currency)}</span>
                  </div>
                  <div className="flex justify-between text-[#6B6B6B]">
                    <span>{taxInfo.label}</span>
                    <span className="text-navy font-medium">+{formatPrice(tax, currency)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-navy text-base border-t border-[#DDD8CF] pt-3">
                    <span>Total</span>
                    <span>{formatPrice(total, currency)}</span>
                  </div>
                </div>
                <Link href="/checkout" className="btn-primary w-full text-center block mb-3">
                  Proceed to Checkout
                </Link>
                <Link href="/quote"
                  className="block text-center border-[1.5px] border-navy text-navy px-5 py-2.5 rounded text-sm font-medium hover:bg-navy hover:text-white transition-colors">
                  Request a Quote Instead
                </Link>
                <p className="text-[11.5px] text-[#6B6B6B] mt-4 text-center">Delivery and installation included</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
