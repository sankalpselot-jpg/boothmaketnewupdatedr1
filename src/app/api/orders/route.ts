import { NextRequest, NextResponse } from 'next/server'
import { createClient }      from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { TAX_RATES, REGION_CURRENCIES, getPriceForCurrency } from '@/lib/utils/currency'
import type { Region, Currency } from '@/types/database'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', user.id).single()

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const limit  = parseInt(searchParams.get('limit') || '20')

  let query = supabase
    .from('orders')
    .select('*, order_items(*, products(*)), venues(*)')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (profile?.role !== 'admin') query = query.eq('user_id', user.id)
  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { billing, event_name, event_date, venue_id, delivery_notes, region } = body

  if (!billing || !region)
    return NextResponse.json({ error: 'billing and region are required' }, { status: 400 })

  // Validate region
  const validRegions: Region[] = ['EU', 'UK', 'IN']
  if (!validRegions.includes(region))
    return NextResponse.json({ error: 'Invalid region' }, { status: 400 })

  // Fetch cart
  const { data: cartItems } = await supabase
    .from('cart_items')
    .select('*, products(*)')
    .eq('user_id', user.id)

  if (!cartItems?.length)
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })

  const currency: Currency = REGION_CURRENCIES[region as Region]
  const taxRate             = TAX_RATES[region as Region].rate

  const subtotal = cartItems.reduce((sum, item) => {
    const price = getPriceForCurrency(item.products as any, currency)
    return sum + price * item.quantity
  }, 0)
  const taxAmount = subtotal * taxRate
  const total     = subtotal + taxAmount

  const admin = createAdminClient()

  const { data: order, error: orderError } = await admin
    .from('orders')
    .insert({
      user_id:             user.id,
      region:              region as Region,
      currency,
      subtotal,
      tax_amount:          taxAmount,
      tax_rate:            taxRate,
      total,
      billing_name:        billing.name        ?? '',
      billing_company:     billing.company     ?? null,
      billing_email:       billing.email       ?? '',
      billing_phone:       billing.phone       ?? null,
      billing_vat_number:  billing.vat_number  ?? null,
      billing_gstin:       billing.gstin       ?? null,
      event_name:          event_name          ?? null,
      event_date:          event_date          ?? null,
      venue_id:            venue_id            ?? null,
      delivery_notes:      delivery_notes      ?? null,
    })
    .select()
    .single()

  if (orderError) return NextResponse.json({ error: orderError.message }, { status: 500 })

  // Create order items
  const orderItems = cartItems.map(item => ({
    order_id:     order.id,
    product_id:   item.product_id,
    product_name: (item.products as any).name as string,
    quantity:     item.quantity,
    unit_price:   getPriceForCurrency(item.products as any, currency),
    total_price:  getPriceForCurrency(item.products as any, currency) * item.quantity,
  }))

  await admin.from('order_items').insert(orderItems)

  // Clear cart
  await supabase.from('cart_items').delete().eq('user_id', user.id)

  return NextResponse.json({ data: order }, { status: 201 })
}
