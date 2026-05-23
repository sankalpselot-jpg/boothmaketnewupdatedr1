import { NextRequest, NextResponse } from 'next/server'
import { createClient }      from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Region } from '@/types/database'
import { REGION_CURRENCIES } from '@/lib/utils/currency'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', user.id).single()

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  let query = supabase
    .from('quotes')
    .select('*, quote_items(*, products(*)), venues(*)')
    .order('created_at', { ascending: false })

  if (profile?.role !== 'admin') query = query.eq('user_id', user.id)
  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const body = await req.json()
  const {
    contact_name, contact_email, contact_company, contact_phone,
    region, event_name, event_date, venue_id, message,
    items = [],
  } = body

  if (!contact_name || !contact_email || !region)
    return NextResponse.json(
      { error: 'contact_name, contact_email and region are required' },
      { status: 400 }
    )

  const validRegions: Region[] = ['EU', 'UK', 'IN']
  if (!validRegions.includes(region))
    return NextResponse.json({ error: 'Invalid region' }, { status: 400 })

  const admin    = createAdminClient()
  const currency = REGION_CURRENCIES[region as Region]

  const { data: quote, error: quoteError } = await admin
    .from('quotes')
    .insert({
      user_id:         user?.id ?? null,
      contact_name,
      contact_email,
      contact_company: contact_company ?? null,
      contact_phone:   contact_phone   ?? null,
      region:          region as Region,
      event_name:      event_name      ?? null,
      event_date:      event_date      ?? null,
      venue_id:        venue_id        ?? null,
      message:         message         ?? null,
      currency,
    })
    .select()
    .single()

  if (quoteError) return NextResponse.json({ error: quoteError.message }, { status: 500 })

  if (items.length > 0) {
    const quoteItems = (items as { product_id?: string; description: string; quantity?: number; unit_price?: number }[])
      .map(item => ({
        quote_id:    quote.id,
        product_id:  item.product_id  ?? null,
        description: item.description,
        quantity:    item.quantity    ?? 1,
        unit_price:  item.unit_price  ?? null,
      }))
    await admin.from('quote_items').insert(quoteItems)
  }

  return NextResponse.json({ data: quote }, { status: 201 })
}
