'use client'
import Link from 'next/link'
import { Heart, Plus } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { useRegion } from '@/hooks/useRegion'
import { formatPrice, getPriceForCurrency, TAX_LABELS } from '@/lib/utils/currency'
import { cn } from '@/lib/utils/helpers'
import type { Product, Category } from '@/types/database'

type Props = { product: Product & { categories?: Category } }

const BADGE_STYLES: Record<string, string> = {
  'Popular': 'badge badge-navy',
  'New': 'badge badge-gold',
  'Featured': 'badge bg-emerald-700 text-white',
  'Most Rented': 'badge badge-gold',
}

const REGION_TAG: Record<string, string> = {
  EU: 'tag-eu', UK: 'tag-uk', IN: 'tag-in',
}

export default function ProductCard({ product }: Props) {
  const { user } = useAuth()
  const { addItem } = useCart(user?.id)
  const { currency, region } = useRegion()

  const price = getPriceForCurrency(product, currency)
  const taxLabel = TAX_LABELS[region]
  const regionTags = product.available_regions

  return (
    <div className="card overflow-hidden group hover:-translate-y-0.5 hover:shadow-xl hover:border-[#B0A99A] transition-all duration-200 relative cursor-pointer">
      {/* Image */}
      <Link href={`/products/${product.slug}`}>
        <div className="bg-cream-dark flex items-center justify-center aspect-[4/3] w-full overflow-hidden">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <svg className="w-16 h-16 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-4 0v2M8 7V5a2 2 0 014 0v2"/>
            </svg>
          )}
        </div>
      </Link>

      {/* Badge */}
      {product.badge && (
        <span className={cn('absolute top-3 left-3', BADGE_STYLES[product.badge] || 'badge badge-navy')}>
          {product.badge}
        </span>
      )}

      {/* Wishlist */}
      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-[#DDD8CF] flex items-center justify-center hover:bg-cream transition-colors">
        <Heart size={15} className="text-[#6B6B6B]"/>
      </button>

      {/* Region tags */}
      <div className="absolute bottom-[88px] left-3 flex gap-1.5">
        {regionTags.length === 3
          ? <span className="tag-all">🌍 All Regions</span>
          : regionTags.map(r => (
            <span key={r} className={REGION_TAG[r]}>
              {r === 'EU' ? '🇪🇺' : r === 'UK' ? '🇬🇧' : '🇮🇳'} {r}
            </span>
          ))
        }
      </div>

      {/* Info */}
      <div className="p-4 pb-4.5">
        {product.categories && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-gold mb-1">
            {product.categories.name}
          </p>
        )}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display font-semibold text-navy text-[15px] leading-snug mb-1.5 hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-[12.5px] text-[#6B6B6B] leading-relaxed line-clamp-2 mb-3.5">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-cream-dark">
          <div>
            <span className="font-display font-bold text-navy text-lg">{formatPrice(price, currency)}</span>
            <span className="text-[12px] text-[#6B6B6B] ml-1">/ event</span>
            <span className="text-[10px] bg-cream-dark text-[#6B6B6B] px-1.5 py-0.5 rounded ml-1.5">{taxLabel}</span>
          </div>
          <button
            onClick={() => addItem(product.id)}
            className="flex items-center gap-1.5 bg-navy text-white text-[12.5px] font-medium px-3.5 py-2 rounded hover:bg-gold transition-colors">
            <Plus size={14}/>Add
          </button>
        </div>
      </div>
    </div>
  )
}
