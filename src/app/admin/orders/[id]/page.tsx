'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

type Order = {
  id: string; order_number: string; status: string; region: string; currency: string
  subtotal: number; tax_amount: number; tax_rate: number; total: number
  billing_name: string; billing_company?: string; billing_email: string
  billing_phone?: string; billing_vat_number?: string; billing_gstin?: string
  event_name?: string; event_date?: string; delivery_notes?: string
  created_at: string
  order_items: { id: string; product_name: string; quantity: number; unit_price: number; total_price: number }[]
  venues?: { name: string; city: string; country: string }
}

const SYM: Record<string, string> = { EUR: '€', GBP: '£', INR: '₹' }
const STATUSES = ['pending', 'confirmed', 'delivered', 'completed', 'cancelled']

export default function AdminOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then(r => r.json())
      .then(({ data }) => { setOrder(data); setStatus(data?.status || '') })
  }, [params.id])

  const handleUpdateStatus = async () => {
    setSaving(true)
    const res = await fetch(`/api/orders/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    const { error } = await res.json()
    if (error) { toast.error(error); setSaving(false); return }
    toast.success('Order status updated')
    router.push('/admin/orders')
  }

  if (!order) return <div className="text-[#6B6B6B] text-sm">Loading...</div>

  const sym = SYM[order.currency] || '€'

  return (
    <div className="max-w-[960px]">
      <Link href="/admin/orders" className="text-gold hover:text-gold-light text-[13px] block mb-5">← All Orders</Link>
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-navy">{order.order_number}</h1>
          <p className="text-[#6B6B6B] text-[13px] mt-1">
            {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            {' · '}{order.region} · {order.currency}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="input text-sm py-2" value={status} onChange={e => setStatus(e.target.value)}>
            {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <button onClick={handleUpdateStatus} disabled={saving}
            className="btn-primary px-5 py-2 text-sm disabled:opacity-60">
            {saving ? 'Saving…' : 'Update Status'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Items */}
          <div className="card overflow-hidden">
            <div className="px-5 py-4 border-b border-[#DDD8CF] font-display font-bold text-navy text-sm">Order Items</div>
            <table className="w-full text-sm">
              <thead><tr className="bg-cream border-b border-[#DDD8CF]">
                <th className="text-left px-5 py-2.5 font-semibold text-navy">Item</th>
                <th className="text-right px-4 py-2.5 font-semibold text-navy">Qty</th>
                <th className="text-right px-4 py-2.5 font-semibold text-navy">Unit</th>
                <th className="text-right px-5 py-2.5 font-semibold text-navy">Total</th>
              </tr></thead>
              <tbody>
                {order.order_items.map(item => (
                  <tr key={item.id} className="border-b border-cream-dark">
                    <td className="px-5 py-3 font-medium text-navy">{item.product_name}</td>
                    <td className="px-4 py-3 text-right text-[#6B6B6B]">{item.quantity}</td>
                    <td className="px-4 py-3 text-right text-[#6B6B6B]">{sym}{item.unit_price.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right font-semibold text-navy">{sym}{item.total_price.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-4 bg-cream text-sm space-y-1.5">
              <div className="flex justify-between text-[#6B6B6B]"><span>Subtotal</span><span>{sym}{order.subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-[#6B6B6B]"><span>Tax ({(order.tax_rate * 100).toFixed(0)}%)</span><span>+{sym}{order.tax_amount.toLocaleString()}</span></div>
              <div className="flex justify-between font-bold text-navy border-t border-[#DDD8CF] pt-2 text-base"><span>Total</span><span>{sym}{order.total.toLocaleString()}</span></div>
            </div>
          </div>

          {/* Event */}
          {(order.event_name || order.venues) && (
            <div className="card p-5">
              <p className="font-display font-bold text-navy mb-3 text-sm">Event Details</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {order.event_name && <div><p className="text-[#6B6B6B]">Event</p><p className="font-medium text-navy">{order.event_name}</p></div>}
                {order.event_date && <div><p className="text-[#6B6B6B]">Date</p><p className="font-medium text-navy">{new Date(order.event_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div>}
                {order.venues && <div><p className="text-[#6B6B6B]">Venue</p><p className="font-medium text-navy">{order.venues.name}, {order.venues.city}</p></div>}
              </div>
              {order.delivery_notes && <div className="mt-3 pt-3 border-t border-[#DDD8CF] text-sm"><p className="text-[#6B6B6B] mb-1">Delivery Notes</p><p className="text-navy">{order.delivery_notes}</p></div>}
            </div>
          )}
        </div>

        {/* Billing */}
        <div className="card p-5 h-fit">
          <p className="font-display font-bold text-navy mb-4 text-sm">Billing Details</p>
          <div className="space-y-2 text-sm">
            <p className="font-medium text-navy">{order.billing_name}</p>
            {order.billing_company && <p className="text-[#6B6B6B]">{order.billing_company}</p>}
            <p className="text-[#6B6B6B]">{order.billing_email}</p>
            {order.billing_phone && <p className="text-[#6B6B6B]">{order.billing_phone}</p>}
            {order.billing_vat_number && <p className="text-[#6B6B6B]">VAT: {order.billing_vat_number}</p>}
            {order.billing_gstin && <p className="text-[#6B6B6B]">GSTIN: {order.billing_gstin}</p>}
            <div className="pt-3 mt-3 border-t border-[#DDD8CF] space-y-1">
              <div className="flex justify-between text-[12.5px]"><span className="text-[#6B6B6B]">Region</span><span className="font-medium text-navy">{order.region}</span></div>
              <div className="flex justify-between text-[12.5px]"><span className="text-[#6B6B6B]">Currency</span><span className="font-medium text-navy">{order.currency}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
