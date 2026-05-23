import { NextRequest, NextResponse } from 'next/server'
import { createClient }      from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const supabase = await createClient()

  let query = supabase
    .from('products')
    .select('*, categories(*)')
    .eq('is_active', true)

  const category = searchParams.get('category')
  const region   = searchParams.get('region')
  const q        = searchParams.get('q')
  const featured = searchParams.get('featured')
  const limit    = parseInt(searchParams.get('limit')  || '48')
  const offset   = parseInt(searchParams.get('offset') || '0')
  const sort     = searchParams.get('sort') || 'popular'

  if (category) query = query.eq('categories.slug', category)
  if (region)   query = query.contains('available_regions', [region.toUpperCase()])
  if (q)        query = query.ilike('name', `%${q}%`)
  if (featured === 'true') query = query.eq('is_featured', true)

  if (sort === 'price_asc')  query = query.order('price_eur', { ascending: true })
  else if (sort === 'price_desc') query = query.order('price_eur', { ascending: false })
  else query = query.order('is_featured', { ascending: false }).order('created_at', { ascending: false })

  query = query.range(offset, offset + limit - 1)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin')
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const admin = createAdminClient()
  const { data, error } = await admin.from('products').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
