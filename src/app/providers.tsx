'use client'

import { RaffleContextProvider } from '@/contexts/raffle-context'
import { queryClient } from '@/libs/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RaffleContextProvider>{children}</RaffleContextProvider>
    </QueryClientProvider>
  )
}
