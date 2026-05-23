import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'
import RegionBar from '@/components/region/RegionBar'
import Topbar from '@/components/layout/Topbar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductsGrid from '@/components/product/ProductsGrid'

export const metadata: Metadata = { title: 'Browse Products' }

interface SearchParams { category?: string; region?: string; q?: string; sort?: string }

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase.from('products').select('*, categories(*)').eq('is_active', true)
  if (params.category) query = query.eq('categories.slug', params.category)
  if (params.region) query = query.contains('available_regions', [params.region.toUpperCase()])
  if (params.q) query = query.ilike('name', `%${params.q}%`)
  if (params.sort === 'price_asc') query = query.order('price_eur', { ascending: true })
  else if (params.sort === 'price_desc') query = query.order('price_eur', { ascending: false })
  else query = query.order('is_featured', { ascending: false }).order('created_at', { ascending: false })

  const { data: products } = await query.limit(48)
  const { data: categories } = await supabase.from('categories').select('*').order('sort_order')
  const { data: venues } = await supabase.from('venues').select('*').order('region').order('name')

  return (
    <>
      <RegionBar/>
      <Topbar/>
      <Header/>
      <main className="min-h-screen bg-cream">
        <ProductsGrid products={products || []} categories={categories || []} venues={venues || []} searchParams={params}/>
      </main>
      <Footer/>
    </>
  )
}
