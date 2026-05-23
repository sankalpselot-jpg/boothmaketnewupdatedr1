export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Region      = 'EU' | 'UK' | 'IN'
export type Currency    = 'EUR' | 'GBP' | 'INR'
export type OrderStatus = 'pending' | 'confirmed' | 'delivered' | 'completed' | 'cancelled'
export type QuoteStatus = 'pending' | 'sent' | 'accepted' | 'declined' | 'expired'
export type UserRole    = 'customer' | 'admin' | 'staff'

export interface Database {
  public: {
    Tables: {
      // ── profiles ──────────────────────────────────────────────────────
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          company_name: string | null
          company_vat: string | null
          company_gstin: string | null
          phone: string | null
          region: Region | null
          preferred_currency: Currency
          role: UserRole
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          company_name?: string | null
          company_vat?: string | null
          company_gstin?: string | null
          phone?: string | null
          region?: Region | null
          preferred_currency?: Currency
          role?: UserRole
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }

      // ── categories ────────────────────────────────────────────────────
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          sort_order?: number
        }
        Update: Partial<Database['public']['Tables']['categories']['Insert']>
      }

      // ── venues ────────────────────────────────────────────────────────
      venues: {
        Row: {
          id: string
          name: string
          city: string
          country: string
          region: Region
          address: string | null
          website: string | null
          created_at: string
        }
        Insert: {
          name: string
          city: string
          country: string
          region: Region
          address?: string | null
          website?: string | null
        }
        Update: Partial<Database['public']['Tables']['venues']['Insert']>
      }

      // ── products ──────────────────────────────────────────────────────
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          category_id: string | null
          price_eur: number
          price_gbp: number
          price_inr: number
          images: string[]
          available_regions: Region[]
          available_venues: string[]
          badge: string | null
          dimensions: string | null
          stock_status: 'available' | 'limited' | 'unavailable'
          is_featured: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          slug: string
          description?: string | null
          category_id?: string | null
          price_eur: number
          price_gbp: number
          price_inr: number
          images?: string[]
          available_regions?: Region[]
          available_venues?: string[]
          badge?: string | null
          dimensions?: string | null
          stock_status?: 'available' | 'limited' | 'unavailable'
          is_featured?: boolean
          is_active?: boolean
        }
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }

      // ── cart_items ────────────────────────────────────────────────────
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          quantity: number
          event_name: string | null
          event_date: string | null
          venue_id: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          user_id: string
          product_id: string
          quantity?: number
          event_name?: string | null
          event_date?: string | null
          venue_id?: string | null
          notes?: string | null
        }
        Update: Partial<Database['public']['Tables']['cart_items']['Insert']>
      }

      // ── orders ────────────────────────────────────────────────────────
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string | null
          status: OrderStatus
          region: Region
          currency: Currency
          subtotal: number
          tax_amount: number
          tax_rate: number
          total: number
          billing_name: string
          billing_company: string | null
          billing_email: string
          billing_phone: string | null
          billing_vat_number: string | null
          billing_gstin: string | null
          event_name: string | null
          event_date: string | null
          venue_id: string | null
          delivery_notes: string | null
          stripe_payment_intent: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id?: string | null
          status?: OrderStatus
          region: Region
          currency: Currency
          subtotal: number
          tax_amount: number
          tax_rate: number
          total: number
          billing_name: string
          billing_company?: string | null
          billing_email: string
          billing_phone?: string | null
          billing_vat_number?: string | null
          billing_gstin?: string | null
          event_name?: string | null
          event_date?: string | null
          venue_id?: string | null
          delivery_notes?: string | null
          stripe_payment_intent?: string | null
        }
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
      }

      // ── order_items ───────────────────────────────────────────────────
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          product_name: string
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          order_id: string
          product_id?: string | null
          product_name: string
          quantity: number
          unit_price: number
          total_price: number
        }
        Update: Partial<Database['public']['Tables']['order_items']['Insert']>
      }

      // ── quotes ────────────────────────────────────────────────────────
      quotes: {
        Row: {
          id: string
          quote_number: string
          user_id: string | null
          contact_name: string
          contact_email: string
          contact_company: string | null
          contact_phone: string | null
          region: Region
          event_name: string | null
          event_date: string | null
          venue_id: string | null
          message: string | null
          status: QuoteStatus
          quoted_amount: number | null
          currency: Currency
          expires_at: string | null
          admin_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id?: string | null
          contact_name: string
          contact_email: string
          contact_company?: string | null
          contact_phone?: string | null
          region: Region
          event_name?: string | null
          event_date?: string | null
          venue_id?: string | null
          message?: string | null
          status?: QuoteStatus
          quoted_amount?: number | null
          currency?: Currency
          expires_at?: string | null
          admin_notes?: string | null
        }
        Update: Partial<Database['public']['Tables']['quotes']['Insert']>
      }

      // ── quote_items ───────────────────────────────────────────────────
      quote_items: {
        Row: {
          id: string
          quote_id: string
          product_id: string | null
          description: string
          quantity: number
          unit_price: number | null
          created_at: string
        }
        Insert: {
          quote_id: string
          product_id?: string | null
          description: string
          quantity?: number
          unit_price?: number | null
        }
        Update: Partial<Database['public']['Tables']['quote_items']['Insert']>
      }
    }

    Views: {
      [_ in never]: never
    }

    Functions: {
      get_cart_total: {
        Args: { p_user_id: string; p_currency: Currency }
        Returns: number
      }
    }

    Enums: {
      region: Region
      currency: Currency
      order_status: OrderStatus
      quote_status: QuoteStatus
      user_role: UserRole
    }
  }
}

// ── Convenience Row types ─────────────────────────────────────────────────────
export type Profile   = Database['public']['Tables']['profiles']['Row']
export type Category  = Database['public']['Tables']['categories']['Row']
export type Venue     = Database['public']['Tables']['venues']['Row']
export type Product   = Database['public']['Tables']['products']['Row']
export type CartItem  = Database['public']['Tables']['cart_items']['Row']
export type Order     = Database['public']['Tables']['orders']['Row']
export type OrderItem = Database['public']['Tables']['order_items']['Row']
export type Quote     = Database['public']['Tables']['quotes']['Row']
export type QuoteItem = Database['public']['Tables']['quote_items']['Row']

// ── Extended types with joins ─────────────────────────────────────────────────
export type ProductWithCategory  = Product & { categories: Category }
export type CartItemWithProduct  = CartItem & { products: Product & { categories: Category } }
export type OrderWithItems       = Order & {
  order_items: (OrderItem & { products: Product })[]
  venues: Venue | null
}
