import { createAdminClient } from '@/lib/supabase/admin'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Users' }

export default async function AdminUsersPage() {
  const admin = createAdminClient()
  const { data: profiles } = await admin
    .from('profiles').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-extrabold text-2xl text-navy">Users</h1>
        <p className="text-[13px] text-[#6B6B6B]">{profiles?.length || 0} registered</p>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-cream border-b border-[#DDD8CF]">
              {['Name', 'Email', 'Company', 'Region', 'Currency', 'Role', 'Joined'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-semibold text-navy">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {profiles?.map(p => (
              <tr key={p.id} className="border-b border-cream-dark hover:bg-cream/40 transition-colors">
                <td className="px-4 py-3 font-medium text-navy text-[13px]">{p.full_name || '—'}</td>
                <td className="px-4 py-3 text-[#6B6B6B] text-[12.5px]">{p.email}</td>
                <td className="px-4 py-3 text-[#6B6B6B] text-[12.5px]">{p.company_name || '—'}</td>
                <td className="px-4 py-3">
                  {p.region && <span className={p.region === 'EU' ? 'tag-eu' : p.region === 'UK' ? 'tag-uk' : 'tag-in'}>{p.region}</span>}
                </td>
                <td className="px-4 py-3 text-[12.5px] text-[#6B6B6B]">{p.preferred_currency}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.role === 'admin' ? 'bg-navy text-white' : p.role === 'staff' ? 'bg-blue-50 text-blue-700' : 'bg-cream-dark text-[#6B6B6B]'}`}>
                    {p.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#6B6B6B] text-[12px]">
                  {new Date(p.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
