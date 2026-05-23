'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import type { Product, Category } from '@/types/database'

type Props = {
  product?: Product
  categories: Category[]
  mode: 'create' | 'edit'
}

const ALL_REGIONS = ['EU', 'UK', 'IN']

export default function ProductForm({ product, categories, mode }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    description: product?.description || '',
    category_id: product?.category_id || '',
    price_eur: product?.price_eur?.toString() || '',
    price_gbp: product?.price_gbp?.toString() || '',
    price_inr: product?.price_inr?.toString() || '',
    available_regions: (product?.available_regions as string[]) || [],
    badge: product?.badge || '',
    dimensions: product?.dimensions || '',
    stock_status: product?.stock_status || 'available',
    is_featured: product?.is_featured || false,
    is_active: product?.is_active ?? true,
  })

  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const toggleRegion = (r: string) => {
    setForm(f => ({
      ...f,
      available_regions: f.available_regions.includes(r)
        ? f.available_regions.filter(x => x !== r)
        : [...f.available_regions, r],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const payload = {
      ...form,
      price_eur: parseFloat(form.price_eur),
      price_gbp: parseFloat(form.price_gbp),
      price_inr: parseFloat(form.price_inr),
    }
    const url = mode === 'edit' ? `/api/products/${product!.id}` : '/api/products'
    const method = mode === 'edit' ? 'PATCH' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const { error } = await res.json()
    if (error) { toast.error(error); setSaving(false); return }
    toast.success(mode === 'edit' ? 'Product updated!' : 'Product created!')
    router.push('/admin/products')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[860px] space-y-6">
      {/* Basic Info */}
      <div className="card p-7">
        <h2 className="font-display font-bold text-navy mb-5">Basic Information</h2>
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2">
            <label className="label">Product Name *</label>
            <input className="input" value={form.name} required
              onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: mode === 'create' ? slugify(e.target.value) : f.slug }))}
              placeholder="e.g. 6×6m Island Booth Package" />
          </div>
          <div>
            <label className="label">Slug *</label>
            <input className="input font-mono text-sm" value={form.slug} required
              onChange={e => setForm(f => ({ ...f, slug: slugify(e.target.value) }))}
              placeholder="6x6-island-booth" />
          </div>
          <div>
            <label className="label">Category</label>
            <select className="input" value={form.category_id}
              onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))}>
              <option value="">— Select category —</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className="label">Description</label>
            <textarea className="input min-h-[100px] resize-y" value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Describe the product, what's included, venue compatibility..." />
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="card p-7">
        <h2 className="font-display font-bold text-navy mb-5">Pricing (per event, ex-tax)</h2>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <label className="label">EUR (€) *</label>
            <input className="input" type="number" step="0.01" min="0" value={form.price_eur} required
              onChange={e => setForm(f => ({ ...f, price_eur: e.target.value }))} placeholder="0.00" />
          </div>
          <div>
            <label className="label">GBP (£) *</label>
            <input className="input" type="number" step="0.01" min="0" value={form.price_gbp} required
              onChange={e => setForm(f => ({ ...f, price_gbp: e.target.value }))} placeholder="0.00" />
          </div>
          <div>
            <label className="label">INR (₹) *</label>
            <input className="input" type="number" step="0.01" min="0" value={form.price_inr} required
              onChange={e => setForm(f => ({ ...f, price_inr: e.target.value }))} placeholder="0.00" />
          </div>
        </div>
        <p className="text-[11.5px] text-[#6B6B6B] mt-3">VAT / GST is added automatically at checkout based on customer region.</p>
      </div>

      {/* Availability */}
      <div className="card p-7">
        <h2 className="font-display font-bold text-navy mb-5">Availability & Metadata</h2>
        <div className="mb-5">
          <label className="label">Available Regions *</label>
          <div className="flex gap-3">
            {ALL_REGIONS.map(r => (
              <button key={r} type="button" onClick={() => toggleRegion(r)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded border-[1.5px] text-sm font-medium transition-all ${
                  form.available_regions.includes(r)
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white text-[#1A1A1A] border-[#DDD8CF] hover:border-navy'
                }`}>
                {r === 'EU' ? '🇪🇺 Europe' : r === 'UK' ? '🇬🇧 UK' : '🇮🇳 India'}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <label className="label">Badge</label>
            <select className="input" value={form.badge}
              onChange={e => setForm(f => ({ ...f, badge: e.target.value }))}>
              <option value="">— None —</option>
              {['Popular', 'New', 'Featured', 'Most Rented'].map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Stock Status</label>
            <select className="input" value={form.stock_status}
              onChange={e => setForm(f => ({ ...f, stock_status: e.target.value as any }))}>
              <option value="available">Available</option>
              <option value="limited">Limited</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <div>
            <label className="label">Dimensions</label>
            <input className="input" value={form.dimensions}
              onChange={e => setForm(f => ({ ...f, dimensions: e.target.value }))}
              placeholder="e.g. 6m × 6m × 3m H" />
          </div>
        </div>
        <div className="flex gap-6 mt-5">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={form.is_featured}
              onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))}
              className="w-4 h-4 accent-navy" />
            <span className="text-sm text-navy">Featured on homepage</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={form.is_active}
              onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))}
              className="w-4 h-4 accent-navy" />
            <span className="text-sm text-navy">Active (visible to customers)</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button type="button" onClick={() => router.back()}
          className="btn-outline px-6 py-2.5 text-sm">Cancel</button>
        <button type="submit" disabled={saving || form.available_regions.length === 0}
          className="btn-primary px-8 py-2.5 text-sm disabled:opacity-60">
          {saving ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Create Product'}
        </button>
      </div>
    </form>
  )
}
