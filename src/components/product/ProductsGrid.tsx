'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import ProductCard from './ProductCard'
import type { Product, Category, Venue } from '@/types/database'

type Props = {
  products: (Product & { categories: Category })[]
  categories: Category[]
  venues: Venue[]
  searchParams: { category?: string; region?: string; q?: string; sort?: string }
}

const REGIONS = [{ id: '', label: '🌍 All' }, { id: 'EU', label: '🇪🇺 Europe' }, { id: 'UK', label: '🇬🇧 UK' }, { id: 'IN', label: '🇮🇳 India' }]

export default function ProductsGrid({ products, categories, venues, searchParams }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [search, setSearch] = useState(searchParams.q || '')

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams as Record<string, string>)
    if (value) params.set(key, value); else params.delete(key)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="max-w-[1280px] mx-auto px-10">
      {/* Search Bar */}
      <div className="bg-white border-b border-[#DDD8CF] py-5 -mx-10 px-10 mb-6">
        <div className="flex gap-3">
          <div className="flex-1 flex bg-cream border-[1.5px] border-[#DDD8CF] rounded overflow-hidden">
            <input value={search} onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && updateParam('q', search)}
              placeholder="Search booths, furniture, A/V equipment..."
              className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none"/>
            <button onClick={() => updateParam('q', search)}
              className="bg-navy text-white px-5 text-sm font-medium hover:bg-navy-light transition-colors flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Search
            </button>
          </div>
          <select value={searchParams.region || ''} onChange={e => updateParam('region', e.target.value)}
            className="border-[1.5px] border-[#DDD8CF] bg-cream rounded px-3 py-2.5 text-sm outline-none cursor-pointer min-w-[160px]">
            {REGIONS.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
          <select value={searchParams.sort || ''} onChange={e => updateParam('sort', e.target.value)}
            className="border-[1.5px] border-[#DDD8CF] bg-cream rounded px-3 py-2.5 text-sm outline-none cursor-pointer">
            <option value="">Most Popular</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 flex-wrap mb-6">
        <span className="text-[12px] font-medium text-[#6B6B6B] uppercase tracking-[0.06em] mr-1 self-center">Browse:</span>
        <button onClick={() => updateParam('category', '')}
          className={`px-4 py-1.5 rounded-full text-[13px] border-[1.5px] transition-all ${!searchParams.category ? 'bg-navy text-white border-navy' : 'bg-white border-[#DDD8CF] text-[#1A1A1A] hover:border-navy'}`}>
          All Products
        </button>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => updateParam('category', cat.slug)}
            className={`px-4 py-1.5 rounded-full text-[13px] border-[1.5px] transition-all ${searchParams.category === cat.slug ? 'bg-navy text-white border-navy' : 'bg-white border-[#DDD8CF] text-[#1A1A1A] hover:border-navy'}`}>
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex gap-9 items-start">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 sticky top-24 space-y-4">
          <div className="card">
            <div className="px-5 py-4 border-b border-[#DDD8CF] font-display font-semibold text-navy text-sm">Region</div>
            <div className="p-4 flex flex-wrap gap-2">
              {REGIONS.map(r => (
                <button key={r.id} onClick={() => updateParam('region', r.id)}
                  className={`px-3 py-1.5 rounded-full border-[1.5px] text-[12.5px] transition-all ${(searchParams.region || '') === r.id ? 'bg-navy text-white border-navy' : 'border-[#DDD8CF] text-[#1A1A1A] hover:border-navy'}`}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="px-5 py-4 border-b border-[#DDD8CF] font-display font-semibold text-navy text-sm">Category</div>
            <div className="p-2">
              {categories.map(cat => (
                <button key={cat.id} onClick={() => updateParam('category', cat.slug)}
                  className={`w-full text-left px-3 py-2.5 rounded text-[13.5px] transition-colors ${searchParams.category === cat.slug ? 'bg-cream font-medium text-navy' : 'text-[#1A1A1A] hover:bg-cream'}`}>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-5">
            <h1 className="font-display font-bold text-xl text-navy">
              All Products <span className="text-[13px] text-[#6B6B6B] font-normal">— {products.length} items</span>
            </h1>
          </div>
          {products.length === 0 ? (
            <div className="text-center py-20 text-[#6B6B6B]">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <p className="text-lg font-medium text-navy mb-1">No products found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {products.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
