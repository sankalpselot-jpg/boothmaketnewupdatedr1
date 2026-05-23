'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { useRegion } from '@/hooks/useRegion'
import toast from 'react-hot-toast'
import type { Region, Currency } from '@/types/database'
import { REGION_CURRENCIES } from '@/lib/utils/currency'

export default function ProfilePage() {
  const { user, profile } = useAuth()
  const { setRegion } = useRegion()
  const supabase = createClient()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    full_name: '',
    company_name: '',
    phone: '',
    company_vat: '',
    company_gstin: '',
    region: 'EU' as Region,
    preferred_currency: 'EUR' as Currency,
  })

  useEffect(() => {
    if (profile) {
      setForm({
        full_name:          profile.full_name       ?? '',
        company_name:       profile.company_name    ?? '',
        phone:              profile.phone           ?? '',
        company_vat:        profile.company_vat     ?? '',
        company_gstin:      profile.company_gstin   ?? '',
        region:             (profile.region as Region) ?? 'EU',
        preferred_currency: profile.preferred_currency ?? 'EUR',
      })
    }
  }, [profile])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const { error } = await supabase.from('profiles').update(form).eq('id', user!.id)
    if (error) { toast.error(error.message); setSaving(false); return }
    setRegion(form.region)
    toast.success('Profile updated!')
    setSaving(false)
  }

  const handleRegionChange = (r: Region) => {
    setForm(f => ({ ...f, region: r, preferred_currency: REGION_CURRENCIES[r] }))
  }

  return (
    <div className="max-w-[860px] mx-auto px-10 py-10">
      <Link href="/dashboard" className="text-[13px] text-gold hover:text-gold-light mb-4 block">← Dashboard</Link>
      <h1 className="font-display font-extrabold text-3xl text-navy mb-8">Account Profile</h1>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal info */}
        <div className="card p-7">
          <h2 className="font-display font-bold text-navy mb-5">Personal Information</h2>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="label">Full Name</label>
              <input
                className="input"
                value={form.full_name}
                onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="label">Email Address</label>
              <input
                className="input opacity-60 cursor-not-allowed bg-cream-dark"
                value={user?.email ?? ''}
                disabled
                readOnly
              />
              <p className="text-[11px] text-[#6B6B6B] mt-1">Email cannot be changed here</p>
            </div>
            <div>
              <label className="label">Company Name</label>
              <input
                className="input"
                value={form.company_name}
                onChange={e => setForm(f => ({ ...f, company_name: e.target.value }))}
                placeholder="Acme Ltd"
              />
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input
                className="input"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+44 7700 900000"
              />
            </div>
          </div>
        </div>

        {/* Region & Tax */}
        <div className="card p-7">
          <h2 className="font-display font-bold text-navy mb-5">Region & Tax Details</h2>
          <div className="mb-5">
            <label className="label">Primary Region</label>
            <div className="flex gap-3">
              {(['EU', 'UK', 'IN'] as Region[]).map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRegionChange(r)}
                  className={`flex-1 py-3 rounded border-[1.5px] text-sm font-medium transition-all ${
                    form.region === r
                      ? 'bg-navy text-white border-navy'
                      : 'bg-white text-[#1A1A1A] border-[#DDD8CF] hover:border-navy'
                  }`}
                >
                  {r === 'EU' ? '🇪🇺 Europe' : r === 'UK' ? '🇬🇧 United Kingdom' : '🇮🇳 India'}
                </button>
              ))}
            </div>
          </div>

          {(form.region === 'EU' || form.region === 'UK') && (
            <div>
              <label className="label">VAT Number</label>
              <input
                className="input"
                value={form.company_vat}
                onChange={e => setForm(f => ({ ...f, company_vat: e.target.value }))}
                placeholder={form.region === 'EU' ? 'DE123456789' : 'GB123456789'}
              />
              <p className="text-[11.5px] text-[#6B6B6B] mt-1">Required for zero-rated B2B EU/UK transactions</p>
            </div>
          )}
          {form.region === 'IN' && (
            <div>
              <label className="label">GSTIN</label>
              <input
                className="input"
                value={form.company_gstin}
                onChange={e => setForm(f => ({ ...f, company_gstin: e.target.value }))}
                placeholder="29ABCDE1234F1Z5"
              />
              <p className="text-[11.5px] text-[#6B6B6B] mt-1">Required for GST Input Tax Credit claims</p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary px-8 py-3 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
