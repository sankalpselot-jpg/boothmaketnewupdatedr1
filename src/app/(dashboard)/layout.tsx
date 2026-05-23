import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RegionBar from '@/components/region/RegionBar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?redirectTo=/dashboard')
  return (
    <><RegionBar/>
    <Header/>
    <div className="min-h-screen bg-cream">
      {children}
    </div>
    <Footer/></>
  )
}
