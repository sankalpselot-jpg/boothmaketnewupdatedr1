import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'BoothMarket — B2B Exhibition Booth Rental',
    template: '%s | BoothMarket',
  },
  description:
    'Premium B2B exhibition booth rental marketplace serving Europe, UK and India. Booths, furniture, A/V, flooring — delivered and installed.',
  keywords: [
    'exhibition booth rental',
    'trade show furniture rental',
    'booth rental Europe',
    'exhibition stand UK',
    'trade show India',
    'booth rental Frankfurt',
    'ExCeL booth rental',
    'Pragati Maidan booth rental',
  ],
  openGraph: {
    title: 'BoothMarket — B2B Exhibition Booth Rental',
    description: 'Premium booth rentals across Europe, UK & India',
    type: 'website',
    locale: 'en_GB',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: { fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '14px' },
          }}
        />
      </body>
    </html>
  )
}
