import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import ProductForm from '@/components/admin/ProductForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — New Product' }

export default async function NewProductPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from('categories').select('*').order('sort_order')
  return (
    <div>
      <Link href="/admin/products" className="text-gold hover:text-gold-light text-[13px] block mb-5">← Products</Link>
      <h1 className="font-display font-extrabold text-2xl text-navy mb-7">Add New Product</h1>
      <ProductForm categories={categories || []} mode="create" />
    </div>
  )
}
