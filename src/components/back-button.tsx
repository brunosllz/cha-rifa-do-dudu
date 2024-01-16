'use client'

import { useRaffleContext } from '@/contexts/raffle-context'
import { ArrowLeft } from 'lucide-react'
import { HTMLAttributes } from 'react'

type BackButtonProps = HTMLAttributes<HTMLButtonElement>

export function BackButton(props: BackButtonProps) {
  const { previousStep } = useRaffleContext()

  function handleBackPrev() {
    previousStep()
  }

  return (
    <button
      type="button"
      onClick={handleBackPrev}
      className="border-2 hover:bg-puce-900 transition-colors rounded-full p-3 border-puce-900 group"
      {...props}
    >
      <ArrowLeft
        size={18}
        className="group-hover:text-puce-50 transition-colors"
      />
    </button>
  )
}
