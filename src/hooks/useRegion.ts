'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Region, Currency } from '@/types/database'
import { REGION_CURRENCIES } from '@/lib/utils/currency'

interface RegionStore {
  region: Region
  currency: Currency
  setRegion: (region: Region) => void
  setCurrency: (currency: Currency) => void
}

export const useRegion = create<RegionStore>()(
  persist(
    (set) => ({
      region: 'EU',
      currency: 'EUR',
      setRegion: (region) => set({ region, currency: REGION_CURRENCIES[region] }),
      setCurrency: (currency) => set({ currency }),
    }),
    { name: 'boothmarket-region' }
  )
)
