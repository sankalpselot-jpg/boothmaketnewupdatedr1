'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

type Quote = {
  id: string; quote_number: string; status: string
  contact_name: string; contact_email: string; contact_company?: string; contact_phone?: string
  region: string; currency: string; event_name?: string; event_date?: string
  message?: string; quoted_amount?: number; admin_notes?: string
  venues?: { name: string; city: string }
}

export default function AdminQuoteDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [quote, setQuote] = useState<Quote | null>(null)
  const [form, setForm] = useState({ status: '', quoted_amount: '', admin_notes: '' })
  const [saving, setSaving] = useState(false)
  const SYM: Record<string, string> = { EUR: '€', GBP: '£', INR: '₹' }

  useEffect(() => {
    fetch(`/api/quotes/${params.id}`)
      .then(r => r.json())
      .then(({ data }) => {
        setQuote(data)
        setForm({ status: data.status, quoted_amount: data.quoted_amount?.toString() || '', admin_notes: data.admin_notes || '' })
      })
  }, [params.id])

  const handleSave = async () => {
    setSaving(true)
    const res = await fetch(`/api/quotes/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: form.status,
        quoted_amount: form.quoted_amount ? parseFloat(form.quoted_amount) : null,
        admin_notes: form.admin_notes,
      })
    })
    const { error } = await res.json()
    if (error) { toast.error(error); setSaving(false); return }
    toast.success('Quote updated')
    router.push('/admin/quotes')
  }

  if (!quote) return <div className="text-[#6B6B6B] text-sm">Loading...</div>

  return (
    <div className="max-w-[900px]">
      <Link href="/admin/quotes" className="text-gold hover:text-gold-light text-[13px] block mb-5">← All Quotes</Link>
      <div className="flex items-start justify-between mb-6">
        <h1 className="font-display font-extrabold text-2xl text-navy">{quote.quote_number}</h1>
        <span className={`text-[11px] font-semibold px-3 py-1.5 rounded-full capitalize ${
          { pending: 'bg-yellow-50 text-yellow-700', sent: 'bg-blue-50 text-blue-700', accepted: 'bg-green-50 text-green-700', declined: 'bg-red-50 text-red-700', expired: 'bg-gray-100 text-gray-500' }[quote.status] || 'bg-gray-100 text-gray-600'
        }`}>{quote.status}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="card p-6">
          <h2 className="font-display font-bold text-navy mb-4 text-sm">Contact</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-[#6B6B6B]">Name: </span><strong className="text-navy">{quote.contact_name}</strong></p>
            <p><span className="text-[#6B6B6B]">Email: </span><span className="text-navy">{quote.contact_email}</span></p>
            {quote.contact_company && <p><span className="text-[#6B6B6B]">Company: </span><span className="text-navy">{quote.contact_company}</span></p>}
            {quote.contact_phone && <p><span className="text-[#6B6B6B]">Phone: </span><span className="text-navy">{quote.contact_phone}</span></p>}
          </div>
        </div>
        <div className="card p-6">
          <h2 className="font-display font-bold text-navy mb-4 text-sm">Event</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-[#6B6B6B]">Region: </span><strong className="text-navy">{quote.region}</strong></p>
            {quote.event_name && <p><span className="text-[#6B6B6B]">Event: </span><span className="text-navy">{quote.event_name}</span></p>}
            {quote.event_date && <p><span className="text-[#6B6B6B]">Date: </span><span className="text-navy">{new Date(quote.event_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>}
            {quote.venues && <p><span className="text-[#6B6B6B]">Venue: </span><span className="text-navy">{quote.venues.name}, {quote.venues.city}</span></p>}
          </div>
        </div>
      </div>

      {quote.message && (
        <div className="card p-6 mb-6">
          <h2 className="font-display font-bold text-navy mb-3 text-sm">Customer Message</h2>
          <p className="text-[13.5px] text-[#6B6B6B] leading-relaxed whitespace-pre-wrap">{quote.message}</p>
        </div>
      )}

      <div className="card p-6">
        <h2 className="font-display font-bold text-navy mb-5 text-sm">Respond to Quote</h2>
        <div className="space-y-4">
          <div>
            <label className="label">Update Status</label>
            <select className="input" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              {['pending', 'sent', 'accepted', 'declined', 'expired'].map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Quoted Amount ({SYM[quote.currency] || '€'})</label>
            <input className="input" type="number" step="0.01" value={form.quoted_amount}
              onChange={e => setForm(f => ({ ...f, quoted_amount: e.target.value }))}
              placeholder="e.g. 4500.00" />
          </div>
          <div>
            <label className="label">Internal Notes</label>
            <textarea className="input min-h-[80px] resize-y" value={form.admin_notes}
              onChange={e => setForm(f => ({ ...f, admin_notes: e.target.value }))}
              placeholder="Notes visible only to admin team..." />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Link href="/admin/quotes" className="btn-outline px-5 py-2.5 text-sm">Cancel</Link>
            <button onClick={handleSave} disabled={saving} className="btn-primary px-6 py-2.5 text-sm disabled:opacity-60">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
