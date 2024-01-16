'use client'

import { HTMLAttributes } from 'react'
import { Button } from './button'
import { useRaffleContext } from '@/contexts/raffle-context'

type ButtonProps = HTMLAttributes<HTMLButtonElement>

export function NavigateButton(props: ButtonProps) {
  const { nextStep, currentFormStep, chosenNumbers } = useRaffleContext()

  function handleNavigateForm() {
    return nextStep()
  }

  return (
    <Button
      onClick={handleNavigateForm}
      type="button"
      disabled={currentFormStep === 0 && chosenNumbers.length === 0}
      {...props}
    />
  )
}
