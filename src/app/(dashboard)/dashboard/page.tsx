import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Package, FileText, User, ShoppingCart } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()
  const { data: orders } = await supabase.from('orders').select('id,order_number,status,total,currency,created_at').eq('user_id', user!.id).order('created_at', { ascending: false }).limit(5)
  const { data: quotes } = await supabase.from('quotes').select('id,quote_number,status,created_at').eq('user_id', user!.id).order('created_at', { ascending: false }).limit(5)

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-700',
    confirmed: 'bg-blue-50 text-blue-700',
    delivered: 'bg-purple-50 text-purple-700',
    completed: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-700',
  }

  return (
    <div className="max-w-[1280px] mx-auto px-10 py-10">
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-3xl text-navy">Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}!</h1>
        <p className="text-[#6B6B6B] mt-1">{profile?.company_name || 'Your BoothMarket account'}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {[
          { icon: Package, label: 'Total Orders', value: orders?.length || 0, href: '/dashboard/orders' },
          { icon: FileText, label: 'Quote Requests', value: quotes?.length || 0, href: '/dashboard/quotes' },
          { icon: ShoppingCart, label: 'Browse Products', value: '4,800+', href: '/products' },
          { icon: User, label: 'Profile', value: profile?.region || 'Set region', href: '/dashboard/profile' },
        ].map(s => (
          <Link key={s.label} href={s.href} className="card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <s.icon className="w-5 h-5 text-gold mb-3"/>
            <div className="font-display font-bold text-2xl text-navy mb-0.5">{s.value}</div>
            <div className="text-[13px] text-[#6B6B6B]">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-[#DDD8CF] flex justify-between items-center">
            <h2 className="font-display font-bold text-navy">Recent Orders</h2>
            <Link href="/dashboard/orders" className="text-[13px] text-gold hover:text-gold-light">View all</Link>
          </div>
          {!orders?.length ? (
            <div className="p-8 text-center text-[#6B6B6B] text-sm">No orders yet. <Link href="/products" className="text-gold">Browse products →</Link></div>
          ) : (
            <div>
              {orders.map(o => (
                <div key={o.id} className="px-6 py-3.5 border-b border-cream-dark flex justify-between items-center text-sm last:border-0">
                  <div>
                    <span className="font-medium text-navy">{o.order_number}</span>
                    <span className={`ml-2 text-[11px] px-2 py-0.5 rounded-full font-medium ${statusColors[o.status]}`}>{o.status}</span>
                  </div>
                  <span className="text-[#6B6B6B] text-[12.5px]">{new Date(o.created_at).toLocaleDateString('en-GB')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Quotes */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-[#DDD8CF] flex justify-between items-center">
            <h2 className="font-display font-bold text-navy">Quote Requests</h2>
            <Link href="/dashboard/quotes" className="text-[13px] text-gold hover:text-gold-light">View all</Link>
          </div>
          {!quotes?.length ? (
            <div className="p-8 text-center text-[#6B6B6B] text-sm">No quotes yet. <Link href="/quote" className="text-gold">Request one →</Link></div>
          ) : (
            <div>
              {quotes.map(q => (
                <div key={q.id} className="px-6 py-3.5 border-b border-cream-dark flex justify-between items-center text-sm last:border-0">
                  <div>
                    <span className="font-medium text-navy">{q.quote_number}</span>
                    <span className={`ml-2 text-[11px] px-2 py-0.5 rounded-full font-medium ${statusColors[q.status]}`}>{q.status}</span>
                  </div>
                  <span className="text-[#6B6B6B] text-[12.5px]">{new Date(q.created_at).toLocaleDateString('en-GB')}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
