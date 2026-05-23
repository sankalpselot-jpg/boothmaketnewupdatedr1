import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductForm from '@/components/admin/ProductForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Edit Product' }

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from('products').select('*').eq('id', id).single(),
    supabase.from('categories').select('*').order('sort_order'),
  ])
  if (!product) notFound()
  return (
    <div>
      <Link href="/admin/products" className="text-gold hover:text-gold-light text-[13px] block mb-5">← Products</Link>
      <h1 className="font-display font-extrabold text-2xl text-navy mb-7">Edit Product</h1>
      <ProductForm product={product} categories={categories || []} mode="edit" />
    </div>
  )
}
