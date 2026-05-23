import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Orders' }

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
  delivered: 'bg-purple-50 text-purple-700 border-purple-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
}

const CURRENCY_SYMBOLS: Record<string, string> = { EUR: '€', GBP: '£', INR: '₹' }

export default async function OrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: orders } = await supabase
    .from('orders')
    .select('*, venues(*)')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-[1280px] mx-auto px-10 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/dashboard" className="text-[13px] text-gold hover:text-gold-light mb-1 block">← Dashboard</Link>
          <h1 className="font-display font-extrabold text-3xl text-navy">My Orders</h1>
        </div>
        <Link href="/products" className="btn-primary px-5 py-2.5">+ New Order</Link>
      </div>

      {!orders?.length ? (
        <div className="card p-16 text-center">
          <svg className="w-14 h-14 mx-auto mb-4 text-[#DDD8CF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
          <h2 className="font-display font-bold text-xl text-navy mb-2">No orders yet</h2>
          <p className="text-[#6B6B6B] mb-6">Your placed orders will appear here.</p>
          <Link href="/products" className="btn-primary inline-block">Browse Products</Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#DDD8CF] bg-cream">
                <th className="text-left px-6 py-3.5 font-semibold text-navy">Order</th>
                <th className="text-left px-4 py-3.5 font-semibold text-navy">Event</th>
                <th className="text-left px-4 py-3.5 font-semibold text-navy">Venue</th>
                <th className="text-left px-4 py-3.5 font-semibold text-navy">Total</th>
                <th className="text-left px-4 py-3.5 font-semibold text-navy">Status</th>
                <th className="text-left px-4 py-3.5 font-semibold text-navy">Date</th>
                <th className="px-4 py-3.5"/>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-cream-dark hover:bg-cream/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono font-semibold text-navy text-[13px]">{order.order_number}</span>
                  </td>
                  <td className="px-4 py-4 text-[#6B6B6B]">{order.event_name || '—'}</td>
                  <td className="px-4 py-4 text-[#6B6B6B]">{(order.venues as any)?.name || '—'}</td>
                  <td className="px-4 py-4 font-semibold text-navy">
                    {CURRENCY_SYMBOLS[order.currency]}{order.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border capitalize ${STATUS_STYLES[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[#6B6B6B] text-[12.5px]">
                    {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-4">
                    <Link href={`/dashboard/orders/${order.id}`} className="text-gold hover:text-gold-light text-[12.5px] font-medium">View →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
