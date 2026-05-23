'use client'
import Link from 'next/link'
import ProductCard from '@/components/product/ProductCard'
import type { Product, Category } from '@/types/database'

type Props = { products: (Product & { categories: Category })[] }

export default function ProductsSection({ products }: Props) {
  return (
    <section className="py-16 px-10 max-w-[1280px] mx-auto">
      <div className="flex items-end justify-between mb-9">
        <div>
          <p className="section-label">Featured Products</p>
          <h2 className="section-title">Popular Rental Items</h2>
        </div>
        <Link href="/products" className="text-gold hover:text-gold-light text-[13.5px] font-medium flex items-center gap-1.5 transition-colors">
          View all products
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map(p => <ProductCard key={p.id} product={p}/>)}
      </div>
    </section>
  )
}
