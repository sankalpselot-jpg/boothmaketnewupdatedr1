'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Lock } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { useRegion } from '@/hooks/useRegion'
import {
  formatPrice, getPriceForCurrency,
  TAX_RATES, TAX_LABELS, CURRENCY_SYMBOLS
} from '@/lib/utils/currency'
import { REGION_FLAGS, REGION_LABELS } from '@/lib/utils/regions'
import RegionBar from '@/components/region/RegionBar'
import Topbar from '@/components/layout/Topbar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import toast from 'react-hot-toast'
import type { Region } from '@/types/database'

type Step = 'details' | 'event' | 'review'

export default function CheckoutPage() {
  const { user, profile } = useAuth()
  const { items, clearCart } = useCart(user?.id)
  const { currency, region } = useRegion()
  const router = useRouter()
  const [step, setStep] = useState<Step>('details')
  const [submitting, setSubmitting] = useState(false)

  const [billing, setBilling] = useState({
    name: profile?.full_name || '',
    company: profile?.company_name || '',
    email: user?.email || '',
    phone: profile?.phone || '',
    vat_number: profile?.company_vat || '',
    gstin: profile?.company_gstin || '',
  })
  const [event, setEvent] = useState({
    event_name: '', event_date: '', venue_id: '', delivery_notes: ''
  })

  const taxInfo = TAX_RATES[region]
  const taxLabel = TAX_LABELS[region]
  const subtotal = items.reduce((s, i) => s + getPriceForCurrency(i.products, currency) * i.quantity, 0)
  const taxAmt = subtotal * taxInfo.rate
  const total = subtotal + taxAmt

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          billing,
          event_name: event.event_name,
          event_date: event.event_date || null,
          venue_id: event.venue_id || null,
          delivery_notes: event.delivery_notes,
          region,
        }),
      })
      const { data, error } = await res.json()
      if (error) { toast.error(error); return }
      toast.success('Order placed successfully!')
      router.push(`/dashboard/orders/${data.id}?success=true`)
    } finally {
      setSubmitting(false)
    }
  }

  const steps: { id: Step; label: string }[] = [
    { id: 'details', label: 'Billing Details' },
    { id: 'event', label: 'Event Info' },
    { id: 'review', label: 'Review & Place' },
  ]

  return (
    <>
      <RegionBar /><Topbar /><Header />
      <main className="min-h-screen bg-cream py-10 px-10">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-display font-extrabold text-3xl text-navy mb-2">Checkout</h1>
          <p className="text-[#6B6B6B] text-sm mb-8">
            {REGION_FLAGS[region]} {REGION_LABELS[region]} · Prices in {CURRENCY_SYMBOLS[currency]}
          </p>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-10">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                <button
                  onClick={() => { if (i < steps.findIndex(x => x.id === step)) setStep(s.id) }}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    s.id === step ? 'text-navy' : i < steps.findIndex(x => x.id === step) ? 'text-gold cursor-pointer' : 'text-[#6B6B6B]'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    s.id === step ? 'bg-navy text-white border-navy'
                    : i < steps.findIndex(x => x.id === step) ? 'bg-gold text-white border-gold'
                    : 'border-[#DDD8CF] text-[#6B6B6B]'
                  }`}>{i + 1}</span>
                  {s.label}
                </button>
                {i < steps.length - 1 && <ChevronRight size={16} className="text-[#DDD8CF]" />}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">

              {/* Step 1: Billing */}
              {step === 'details' && (
                <div className="card p-7">
                  <h2 className="font-display font-bold text-navy text-lg mb-6">Billing Details</h2>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="label">Full Name *</label>
                      <input className="input" value={billing.name}
                        onChange={e => setBilling(b => ({ ...b, name: e.target.value }))}
                        placeholder="Jane Smith" required />
                    </div>
                    <div>
                      <label className="label">Company</label>
                      <input className="input" value={billing.company}
                        onChange={e => setBilling(b => ({ ...b, company: e.target.value }))}
                        placeholder="Acme Ltd" />
                    </div>
                    <div>
                      <label className="label">Email Address *</label>
                      <input className="input" type="email" value={billing.email}
                        onChange={e => setBilling(b => ({ ...b, email: e.target.value }))}
                        placeholder="you@company.com" required />
                    </div>
                    <div>
                      <label className="label">Phone Number</label>
                      <input className="input" type="tel" value={billing.phone}
                        onChange={e => setBilling(b => ({ ...b, phone: e.target.value }))}
                        placeholder={region === 'IN' ? '+91 98765 43210' : '+44 7700 900000'} />
                    </div>
                    {(region === 'EU' || region === 'UK') && (
                      <div className="col-span-2">
                        <label className="label">VAT Number (optional)</label>
                        <input className="input" value={billing.vat_number}
                          onChange={e => setBilling(b => ({ ...b, vat_number: e.target.value }))}
                          placeholder={region === 'EU' ? 'DE123456789' : 'GB123456789'} />
                        <p className="text-[11.5px] text-[#6B6B6B] mt-1">Required for VAT-exempt B2B transactions</p>
                      </div>
                    )}
                    {region === 'IN' && (
                      <div className="col-span-2">
                        <label className="label">GSTIN (optional)</label>
                        <input className="input" value={billing.gstin}
                          onChange={e => setBilling(b => ({ ...b, gstin: e.target.value }))}
                          placeholder="29ABCDE1234F1Z5" />
                        <p className="text-[11.5px] text-[#6B6B6B] mt-1">Required for GST Input Tax Credit</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-7 flex justify-end">
                    <button onClick={() => setStep('event')}
                      disabled={!billing.name || !billing.email}
                      className="btn-primary px-8 py-3 disabled:opacity-60">
                      Continue to Event Info →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Event Info */}
              {step === 'event' && (
                <div className="card p-7">
                  <h2 className="font-display font-bold text-navy text-lg mb-6">Event Information</h2>
                  <div className="space-y-5">
                    <div>
                      <label className="label">Show / Event Name</label>
                      <input className="input" value={event.event_name}
                        onChange={e => setEvent(v => ({ ...v, event_name: e.target.value }))}
                        placeholder="e.g. Hannover Messe 2026" />
                    </div>
                    <div>
                      <label className="label">Event Start Date</label>
                      <input className="input" type="date" value={event.event_date}
                        onChange={e => setEvent(v => ({ ...v, event_date: e.target.value }))} />
                    </div>
                    <div>
                      <label className="label">Delivery / Special Instructions</label>
                      <textarea className="input min-h-[100px] resize-y" value={event.delivery_notes}
                        onChange={e => setEvent(v => ({ ...v, delivery_notes: e.target.value }))}
                        placeholder="Booth number, load-in time, special requirements..." />
                    </div>
                  </div>
                  <div className="mt-7 flex gap-3 justify-end">
                    <button onClick={() => setStep('details')} className="btn-outline px-6 py-3">← Back</button>
                    <button onClick={() => setStep('review')} className="btn-primary px-8 py-3">Review Order →</button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 'review' && (
                <div className="card p-7">
                  <h2 className="font-display font-bold text-navy text-lg mb-6">Review Your Order</h2>

                  {/* Billing summary */}
                  <div className="bg-cream rounded-lg p-4 mb-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[#6B6B6B] mb-2">Billing</p>
                    <p className="text-sm text-navy font-medium">{billing.name} {billing.company && `— ${billing.company}`}</p>
                    <p className="text-sm text-[#6B6B6B]">{billing.email} · {billing.phone}</p>
                    {billing.vat_number && <p className="text-sm text-[#6B6B6B]">VAT: {billing.vat_number}</p>}
                    {billing.gstin && <p className="text-sm text-[#6B6B6B]">GSTIN: {billing.gstin}</p>}
                  </div>

                  {/* Event summary */}
                  {event.event_name && (
                    <div className="bg-cream rounded-lg p-4 mb-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[#6B6B6B] mb-2">Event</p>
                      <p className="text-sm text-navy font-medium">{event.event_name}</p>
                      {event.event_date && <p className="text-sm text-[#6B6B6B]">{new Date(event.event_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>}
                      {event.delivery_notes && <p className="text-sm text-[#6B6B6B] mt-1">{event.delivery_notes}</p>}
                    </div>
                  )}

                  {/* Items */}
                  <div className="border border-[#DDD8CF] rounded-lg overflow-hidden mb-5">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center justify-between px-4 py-3 border-b border-cream-dark last:border-0 text-sm">
                        <div>
                          <span className="font-medium text-navy">{item.products.name}</span>
                          <span className="text-[#6B6B6B] ml-2">×{item.quantity}</span>
                        </div>
                        <span className="font-medium text-navy">
                          {formatPrice(getPriceForCurrency(item.products, currency) * item.quantity, currency)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                    <Lock size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-[12.5px] text-blue-800">
                      Your order is protected. Secure payment processing. {region === 'IN' ? 'GST invoice' : 'VAT invoice'} will be sent to {billing.email}.
                    </p>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button onClick={() => setStep('event')} className="btn-outline px-6 py-3">← Back</button>
                    <button onClick={handleSubmit} disabled={submitting}
                      className="btn-primary px-10 py-3 disabled:opacity-60 flex items-center gap-2">
                      <Lock size={15} />
                      {submitting ? 'Placing Order...' : 'Place Order'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order summary sidebar */}
            <div className="card p-6 h-fit sticky top-24">
              <h2 className="font-display font-bold text-navy mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5">
                {items.map(item => {
                  const price = getPriceForCurrency(item.products, currency)
                  return (
                    <div key={item.id} className="flex justify-between items-start text-sm gap-3">
                      <span className="text-[#6B6B6B] flex-1 leading-snug">{item.products.name} <span className="text-[11px]">×{item.quantity}</span></span>
                      <span className="font-medium text-navy whitespace-nowrap">{formatPrice(price * item.quantity, currency)}</span>
                    </div>
                  )
                })}
              </div>
              <div className="border-t border-[#DDD8CF] pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Subtotal ({taxLabel})</span>
                  <span className="text-navy font-medium">{formatPrice(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>{taxInfo.label}</span>
                  <span className="text-navy font-medium">+{formatPrice(taxAmt, currency)}</span>
                </div>
                <div className="flex justify-between font-bold text-navy text-base border-t border-[#DDD8CF] pt-2 mt-2">
                  <span>Total</span>
                  <span>{formatPrice(total, currency)}</span>
                </div>
              </div>
              <p className="text-[11.5px] text-[#6B6B6B] mt-4 leading-relaxed">
                Delivery, installation and breakdown are included. A {region === 'IN' ? 'GST' : 'VAT'} invoice will be issued on confirmation.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
