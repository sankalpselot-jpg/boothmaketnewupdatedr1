'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { CartItemWithProduct } from '@/types/database'
import toast from 'react-hot-toast'

export function useCart(userId?: string) {
  const [items,   setItems]   = useState<CartItemWithProduct[]>([])
  const [loading, setLoading] = useState(false)

  // Stable Supabase instance
  const supabase = useMemo(() => createClient(), [])

  const fetchCart = useCallback(async () => {
    if (!userId) { setItems([]); return }
    setLoading(true)
    const { data } = await supabase
      .from('cart_items')
      .select('*, products(*, categories(*))')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    setItems((data as CartItemWithProduct[]) ?? [])
    setLoading(false)
  }, [userId, supabase])

  useEffect(() => { fetchCart() }, [fetchCart])

  const addItem = async (productId: string, qty = 1) => {
    if (!userId) { toast.error('Please sign in to add items'); return }
    const existing = items.find(i => i.product_id === productId)
    if (existing) {
      await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + qty })
        .eq('id', existing.id)
    } else {
      await supabase
        .from('cart_items')
        .insert({ user_id: userId, product_id: productId, quantity: qty })
    }
    toast.success('Added to cart')
    fetchCart()
  }

  const removeItem = async (itemId: string) => {
    await supabase.from('cart_items').delete().eq('id', itemId)
    fetchCart()
  }

  const updateQty = async (itemId: string, qty: number) => {
    if (qty < 1) { removeItem(itemId); return }
    await supabase.from('cart_items').update({ quantity: qty }).eq('id', itemId)
    fetchCart()
  }

  const clearCart = async () => {
    if (!userId) return
    await supabase.from('cart_items').delete().eq('user_id', userId)
    setItems([])
  }

  return { items, loading, addItem, removeItem, updateQty, clearCart, refetch: fetchCart }
}
