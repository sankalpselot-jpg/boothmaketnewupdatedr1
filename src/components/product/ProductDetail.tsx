'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Minus, Plus, ShoppingCart, Heart } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { useRegion } from '@/hooks/useRegion'
import { formatPrice, getPriceForCurrency, TAX_RATES, TAX_LABELS } from '@/lib/utils/currency'
import { REGION_FLAGS } from '@/lib/utils/regions'
import ProductCard from './ProductCard'
import type { Product, Category, Venue } from '@/types/database'

type Props = {
  product: Product & { categories?: Category }
  related: (Product & { categories: Category })[]
  venues: Venue[]
}

export default function ProductDetail({ product, related, venues }: Props) {
  const { user } = useAuth()
  const { addItem } = useCart(user?.id)
  const { currency, region } = useRegion()
  const [qty, setQty] = useState(1)

  const price      = getPriceForCurrency(product, currency)
  const taxInfo    = TAX_RATES[region]
  const taxLabel   = TAX_LABELS[region]
  const totalExTax = price * qty
  const taxAmt     = totalExTax * taxInfo.rate
  const total      = totalExTax + taxAmt

  return (
    <div className="max-w-[1280px] mx-auto px-10 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] text-[#6B6B6B] mb-8 flex-wrap">
        <Link href="/" className="hover:text-navy transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-navy transition-colors">Products</Link>
        {product.categories && (
          <>
            <span>/</span>
            <Link href={`/products?category=${product.categories.slug}`} className="hover:text-navy transition-colors">
              {product.categories.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-navy font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div>
          <div className="bg-cream-dark rounded-xl aspect-square flex items-center justify-center overflow-hidden">
            {product.images?.[0] ? (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <svg className="w-24 h-24 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 00-4 0v2M8 7V5a2 2 0 014 0v2" />
              </svg>
            )}
          </div>
          {(product.images?.length ?? 0) > 1 && (
            <div className="grid grid-cols-4 gap-2.5 mt-3">
              {product.images!.slice(1).map((img, i) => (
                <div key={i} className="bg-cream-dark rounded-lg aspect-square overflow-hidden">
                  <img src={img} alt={`${product.name} ${i + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.badge && (
            <span className={`inline-block text-xs font-semibold px-2 py-1 rounded uppercase tracking-wide mb-3 ${
              product.badge === 'New' || product.badge === 'Most Rented' ? 'bg-gold text-white' : 'bg-navy text-white'
            }`}>
              {product.badge}
            </span>
          )}
          {product.categories && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-gold mb-2">{product.categories.name}</p>
          )}
          <h1 className="font-display font-extrabold text-3xl text-navy tracking-tight mb-4">{product.name}</h1>
          <p className="text-[#6B6B6B] text-[15px] leading-relaxed mb-6">{product.description}</p>

          {product.dimensions && (
            <div className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              </svg>
              <span>Dimensions: <strong className="text-navy">{product.dimensions}</strong></span>
            </div>
          )}

          {/* Region tags */}
          <div className="flex gap-2 flex-wrap mb-6">
            {product.available_regions.map(r => (
              <span key={r} className={r === 'EU' ? 'tag-eu' : r === 'UK' ? 'tag-uk' : 'tag-in'}>
                {REGION_FLAGS[r]} {r === 'EU' ? 'Europe' : r === 'UK' ? 'United Kingdom' : 'India'}
              </span>
            ))}
          </div>

          {/* Pricing card */}
          <div className="bg-cream rounded-xl p-5 mb-6 border border-[#DDD8CF]">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-display font-bold text-[32px] text-navy">{formatPrice(price, currency)}</span>
              <span className="text-[#6B6B6B] text-sm">/ event</span>
              <span className="text-[10px] bg-cream-dark text-[#6B6B6B] px-1.5 py-0.5 rounded">{taxLabel}</span>
            </div>
            <p className="text-[12px] text-[#6B6B6B] mb-4">{taxInfo.label} will be added at checkout</p>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border border-[#DDD8CF] rounded bg-white">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2.5 hover:bg-cream transition-colors rounded-l">
                  <Minus size={14} />
                </button>
                <span className="px-4 text-sm font-medium text-navy select-none">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-3 py-2.5 hover:bg-cream transition-colors rounded-r">
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => addItem(product.id, qty)}
                className="flex-1 flex items-center justify-center gap-2 bg-navy text-white py-3 rounded font-medium hover:bg-gold transition-colors text-sm"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <button className="p-3 border border-[#DDD8CF] rounded hover:bg-cream transition-colors">
                <Heart size={18} className="text-[#6B6B6B]" />
              </button>
            </div>

            {/* Price summary */}
            <div className="text-[12.5px] text-[#6B6B6B] space-y-1 border-t border-[#DDD8CF] pt-3">
              <div className="flex justify-between">
                <span>Subtotal ×{qty} ({taxLabel})</span>
                <span>{formatPrice(totalExTax, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span>{taxInfo.label}</span>
                <span>+{formatPrice(taxAmt, currency)}</span>
              </div>
              <div className="flex justify-between font-semibold text-navy text-sm pt-1 border-t border-[#DDD8CF]">
                <span>Total</span>
                <span>{formatPrice(total, currency)}</span>
              </div>
            </div>
          </div>

          {/* Venue availability */}
          {venues.length > 0 && (
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.07em] text-[#6B6B6B] mb-2">Available at</p>
              <div className="flex flex-wrap gap-2">
                {venues.map(v => (
                  <span key={v.id} className="text-[12.5px] text-navy bg-cream border border-[#DDD8CF] px-3 py-1 rounded-full">
                    {v.name}, {v.city}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="font-display font-bold text-2xl text-navy mb-6">Related Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
