import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Analytics } from '@vercel/analytics/react'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chá rifa do Dudu',
  description: 'Venha participar do chá rifa do Dudu! 🍼',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt_BR" className={inter.className}>
      <body className="w-full min-h-screen">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
