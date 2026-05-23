import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Quotes' }

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  sent: 'bg-blue-50 text-blue-700 border-blue-200',
  accepted: 'bg-green-50 text-green-700 border-green-200',
  declined: 'bg-red-50 text-red-700 border-red-200',
  expired: 'bg-gray-100 text-gray-600 border-gray-200',
}

export default async function QuotesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: quotes } = await supabase
    .from('quotes')
    .select('*, venues(*)')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-[1280px] mx-auto px-10 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/dashboard" className="text-[13px] text-gold hover:text-gold-light mb-1 block">← Dashboard</Link>
          <h1 className="font-display font-extrabold text-3xl text-navy">Quote Requests</h1>
        </div>
        <Link href="/quote" className="btn-primary px-5 py-2.5">+ New Quote</Link>
      </div>

      {!quotes?.length ? (
        <div className="card p-16 text-center">
          <svg className="w-14 h-14 mx-auto mb-4 text-[#DDD8CF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          <h2 className="font-display font-bold text-xl text-navy mb-2">No quote requests yet</h2>
          <p className="text-[#6B6B6B] mb-6">Need a custom price for a large or complex order?</p>
          <Link href="/quote" className="btn-primary inline-block">Request a Quote</Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#DDD8CF] bg-cream">
                <th className="text-left px-6 py-3.5 font-semibold text-navy">Reference</th>
                <th className="text-left px-4 py-3.5 font-semibold text-navy">Event</th>
                <th className="text-left px-4 py-3.5 font-semibold text-navy">Region</th>
                <th className="text-left px-4 py-3.5 font-semibold text-navy">Quoted Amount</th>
                <th className="text-left px-4 py-3.5 font-semibold text-navy">Status</th>
                <th className="text-left px-4 py-3.5 font-semibold text-navy">Submitted</th>
                <th className="px-4 py-3.5"/>
              </tr>
            </thead>
            <tbody>
              {quotes.map(q => (
                <tr key={q.id} className="border-b border-cream-dark hover:bg-cream/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-semibold text-navy text-[13px]">{q.quote_number}</td>
                  <td className="px-4 py-4 text-[#6B6B6B]">{q.event_name || '—'}</td>
                  <td className="px-4 py-4">
                    <span className={q.region === 'EU' ? 'tag-eu' : q.region === 'UK' ? 'tag-uk' : 'tag-in'}>
                      {q.region === 'EU' ? '🇪🇺 EU' : q.region === 'UK' ? '🇬🇧 UK' : '🇮🇳 IN'}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-semibold text-navy">
                    {q.quoted_amount ? `${q.currency === 'EUR' ? '€' : q.currency === 'GBP' ? '£' : '₹'}${q.quoted_amount.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border capitalize ${STATUS_STYLES[q.status]}`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[#6B6B6B] text-[12.5px]">
                    {new Date(q.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[#6B6B6B] text-[12.5px]">{q.status === 'pending' ? 'Under review' : 'See email'}</span>
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
