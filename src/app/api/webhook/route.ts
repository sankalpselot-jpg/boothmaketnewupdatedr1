import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// Called by Supabase database webhooks or internal triggers
// POST /api/webhook  { type: 'order.created' | 'quote.created', id: string }
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('x-webhook-secret')
  if (authHeader !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { type, id } = await req.json()
  const admin = createAdminClient()

  if (type === 'order.created') {
    // Trigger order confirmation edge function
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-order-confirmation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ order_id: id }),
      }
    )
    const data = await res.json()
    return NextResponse.json({ triggered: 'order-confirmation', ...data })
  }

  if (type === 'quote.created') {
    // Trigger quote notification edge function
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-quote-notification`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ quote_id: id }),
      }
    )
    const data = await res.json()
    return NextResponse.json({ triggered: 'quote-notification', ...data })
  }

  return NextResponse.json({ error: 'Unknown webhook type' }, { status: 400 })
}
