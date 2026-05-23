'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?next=/reset-password`,
    })
    if (error) { toast.error(error.message); setLoading(false); return }
    setSent(true)
  }

  return (
    <div className="w-full max-w-[380px]">
      <h1 className="font-display font-extrabold text-[28px] text-navy mb-1.5">Reset password</h1>
      {sent ? (
        <div className="mt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800 mb-5">
            ✓ Reset link sent to <strong>{email}</strong>. Check your inbox.
          </div>
          <Link href="/login" className="btn-primary block text-center py-3">Back to Sign In</Link>
        </div>
      ) : (
        <>
          <p className="text-[#6B6B6B] text-sm mb-7">Enter your email and we'll send a reset link.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input" placeholder="you@company.com" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          <p className="text-center text-sm text-[#6B6B6B] mt-5">
            <Link href="/login" className="text-gold hover:text-gold-light">← Back to Sign In</Link>
          </p>
        </>
      )}
    </div>
  )
}
