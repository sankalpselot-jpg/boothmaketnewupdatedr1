'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { toast.error(error.message); setLoading(false); return }
    toast.success('Welcome back!')
    router.push(searchParams.get('redirectTo') || '/dashboard')
  }

  return (
    <div className="w-full max-w-[400px]">
      <div className="lg:hidden flex items-center gap-2.5 justify-center mb-8">
        <div className="w-9 h-9 bg-navy rounded-lg flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/></svg>
        </div>
        <span className="font-display font-extrabold text-xl text-navy">Booth<span className="text-gold">Market</span></span>
      </div>
      <h1 className="font-display font-extrabold text-[28px] text-navy mb-1.5">Sign in</h1>
      <p className="text-[#6B6B6B] text-sm mb-7">Enter your credentials to access your account</p>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="label">Email address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input" placeholder="you@company.com"/>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="label mb-0">Password</label>
            <Link href="/forgot-password" className="text-[12.5px] text-gold hover:text-gold-light">Forgot password?</Link>
          </div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="input" placeholder="••••••••"/>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p className="text-center text-sm text-[#6B6B6B] mt-5">
        Don't have an account?{' '}
        <Link href="/register" className="text-gold hover:text-gold-light font-medium">Create one free</Link>
      </p>
    </div>
  )
}
