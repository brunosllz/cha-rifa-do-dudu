'use client'

import { useRaffleContext } from '@/contexts/raffle-context'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { PawPrint } from 'lucide-react'

export function TableNumbers() {
  const { chosenNumbers, toggleSelectNumber } = useRaffleContext()
  const { data: selectedNumbers, isPending } = useQuery<number[]>({
    queryKey: ['raffle', 'selected-numbers'],
    queryFn: async () => {
      const { data } = await axios.get('/api/raffle/selected-numbers')
      return data
    },
  })

  function handleSelectNumber({ selectedNumber }: { selectedNumber: number }) {
    toggleSelectNumber({ selectedNumber })
  }

  return (
    <div className="mx-auto bg-puce-50 p-6 grid grid-cols-5 sm:grid-cols-10 rounded-lg overflow-hidden gap-1 max-w-max">
      {Array.from({ length: 100 }).map((_, index) => {
        const isSelected = chosenNumbers.includes(index + 1)
        const isDisabled = selectedNumbers?.includes(index + 1)
        // const isDisabled = NUMBERS_DISABLED.includes(index + 1)

        return (
          <button
            data-is-selected={isSelected}
            data-is-disabled={isDisabled}
            disabled={isDisabled || isPending}
            onClick={() => handleSelectNumber({ selectedNumber: index + 1 })}
            type="button"
            key={index}
            className="p-3 relative border border-puce-100 rounded-md overflow-hidden flex justify-center items-center data-[is-disabled=true]:border-puce-900 data-[is-disabled=true]:bg-puce-400 data-[is-selected=true]:bg-puce-400 data-[is-selected=true]:border-puce-700 group transition-colors focus:outline-none hover:bg-puce-200"
          >
            {isDisabled ? (
              <PawPrint size={14} strokeWidth={2.5} className="text-puce-900" />
            ) : (
              <span className="leading-none transition-colors font-medium group-data-[is-selected=true]:text-puce-50">
                {String(index + 1).padStart(2, '0')}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
