import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700',
  confirmed: 'bg-blue-50 text-blue-700',
  delivered: 'bg-purple-50 text-purple-700',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
}
const CURRENCY_SYMBOLS: Record<string, string> = { EUR: '€', GBP: '£', INR: '₹' }
const TAX_LABEL: Record<string, string> = { EU: 'VAT', UK: 'VAT', IN: 'GST' }

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: order } = await supabase
    .from('orders')
    .select('*, order_items(*, products(*)), venues(*)')
    .eq('id', id).single()

  if (!order) notFound()
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user!.id).single()
  if (order.user_id !== user!.id && profile?.role !== 'admin') notFound()

  const sym = CURRENCY_SYMBOLS[order.currency]

  return (
    <div className="max-w-[1280px] mx-auto px-10 py-10">
      <Link href="/dashboard/orders" className="text-[13px] text-gold hover:text-gold-light mb-4 block">← My Orders</Link>

      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-navy">{order.order_number}</h1>
          <p className="text-[#6B6B6B] text-sm mt-1">
            Placed {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <span className={`text-sm font-semibold px-4 py-2 rounded-full capitalize ${STATUS_STYLES[order.status]}`}>
          {order.status}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-[#DDD8CF] font-display font-bold text-navy">Order Items</div>
            {(order.order_items as any[]).map((item: any) => (
              <div key={item.id} className="flex items-center justify-between px-6 py-4 border-b border-cream-dark last:border-0">
                <div>
                  <p className="font-medium text-navy text-sm">{item.product_name}</p>
                  <p className="text-[12.5px] text-[#6B6B6B]">Qty: {item.quantity} × {sym}{item.unit_price.toLocaleString()}</p>
                </div>
                <span className="font-semibold text-navy">{sym}{item.total_price.toLocaleString()}</span>
              </div>
            ))}
            <div className="px-6 py-4 bg-cream space-y-2 text-sm">
              <div className="flex justify-between text-[#6B6B6B]">
                <span>Subtotal (ex-{TAX_LABEL[order.region]})</span>
                <span>{sym}{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#6B6B6B]">
                <span>{TAX_LABEL[order.region]} ({(order.tax_rate * 100).toFixed(0)}%)</span>
                <span>+{sym}{order.tax_amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-navy border-t border-[#DDD8CF] pt-2 text-base">
                <span>Total</span>
                <span>{sym}{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Event info */}
          {(order.event_name || (order.venues as any)?.name) && (
            <div className="card p-6">
              <h2 className="font-display font-bold text-navy mb-4">Event Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {order.event_name && <div><p className="text-[#6B6B6B]">Event</p><p className="font-medium text-navy">{order.event_name}</p></div>}
                {order.event_date && <div><p className="text-[#6B6B6B]">Date</p><p className="font-medium text-navy">{new Date(order.event_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div>}
                {(order.venues as any)?.name && <div><p className="text-[#6B6B6B]">Venue</p><p className="font-medium text-navy">{(order.venues as any).name}</p></div>}
                {(order.venues as any)?.city && <div><p className="text-[#6B6B6B]">City</p><p className="font-medium text-navy">{(order.venues as any).city}, {(order.venues as any).country}</p></div>}
              </div>
              {order.delivery_notes && (
                <div className="mt-4 pt-4 border-t border-[#DDD8CF]">
                  <p className="text-[#6B6B6B] text-sm mb-1">Delivery Notes</p>
                  <p className="text-sm text-navy">{order.delivery_notes}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Billing info */}
        <div className="space-y-5">
          <div className="card p-6">
            <h2 className="font-display font-bold text-navy mb-4">Billing</h2>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-navy">{order.billing_name}</p>
              {order.billing_company && <p className="text-[#6B6B6B]">{order.billing_company}</p>}
              <p className="text-[#6B6B6B]">{order.billing_email}</p>
              {order.billing_phone && <p className="text-[#6B6B6B]">{order.billing_phone}</p>}
              {order.billing_vat_number && <p className="text-[#6B6B6B]">VAT: {order.billing_vat_number}</p>}
              {order.billing_gstin && <p className="text-[#6B6B6B]">GSTIN: {order.billing_gstin}</p>}
            </div>
          </div>
          <div className="card p-6">
            <h2 className="font-display font-bold text-navy mb-4">Region & Currency</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-[#6B6B6B]">Region</span><span className="font-medium text-navy">{order.region}</span></div>
              <div className="flex justify-between"><span className="text-[#6B6B6B]">Currency</span><span className="font-medium text-navy">{order.currency}</span></div>
              <div className="flex justify-between"><span className="text-[#6B6B6B]">Tax Type</span><span className="font-medium text-navy">{TAX_LABEL[order.region]}</span></div>
            </div>
          </div>
          <Link href="/quote" className="block text-center border-[1.5px] border-navy text-navy px-5 py-3 rounded text-sm font-medium hover:bg-navy hover:text-white transition-colors">
            Request Similar Quote
          </Link>
        </div>
      </div>
    </div>
  )
}
