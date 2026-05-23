'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import type { Region } from '@/types/database'
import { REGION_CURRENCIES } from '@/lib/utils/currency'

export default function RegisterPage() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', company: '', region: 'EU' as Region })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
          company_name: form.company,
          region: form.region,
          preferred_currency: REGION_CURRENCIES[form.region],
        }
      }
    })
    if (error) { toast.error(error.message); setLoading(false); return }
    toast.success('Account created! Check your email to verify.')
    router.push('/login')
  }

  return (
    <div className="w-full max-w-[420px]">
      <h1 className="font-display font-extrabold text-[28px] text-navy mb-1.5">Create account</h1>
      <p className="text-[#6B6B6B] text-sm mb-7">Join 1,200+ exhibitors renting with BoothMarket</p>
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Full name</label>
            <input value={form.fullName} onChange={e => setForm(f => ({...f, fullName: e.target.value}))} required className="input" placeholder="Jane Smith"/>
          </div>
          <div>
            <label className="label">Company</label>
            <input value={form.company} onChange={e => setForm(f => ({...f, company: e.target.value}))} className="input" placeholder="Acme Ltd"/>
          </div>
        </div>
        <div>
          <label className="label">Email address</label>
          <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} required className="input" placeholder="you@company.com"/>
        </div>
        <div>
          <label className="label">Password</label>
          <input type="password" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} required minLength={8} className="input" placeholder="Min 8 characters"/>
        </div>
        <div>
          <label className="label">Your primary region</label>
          <select value={form.region} onChange={e => setForm(f => ({...f, region: e.target.value as Region}))} className="input cursor-pointer">
            <option value="EU">🇪🇺 Europe</option>
            <option value="UK">🇬🇧 United Kingdom</option>
            <option value="IN">🇮🇳 India</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
        <p className="text-[11.5px] text-[#6B6B6B] text-center">By registering you agree to our <Link href="/terms" className="text-gold">Terms</Link> and <Link href="/privacy" className="text-gold">Privacy Policy</Link></p>
      </form>
      <p className="text-center text-sm text-[#6B6B6B] mt-5">
        Already have an account?{' '}<Link href="/login" className="text-gold hover:text-gold-light font-medium">Sign in</Link>
      </p>
    </div>
  )
}
