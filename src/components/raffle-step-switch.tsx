'use client'

import { AnimatePresence, MotionProps, motion } from 'framer-motion'
import { useRaffleContext } from '@/contexts/raffle-context'
import { ReactNode } from 'react'

function RaffleStepWrapper(props: MotionProps & { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.1 }}
      className="bg-[#F1E3D3] w-full max-w-[686.38px] mx-auto p-8 space-y-6 rounded-lg overflow-hidden overflow-y-auto shadow-lg"
      {...props}
    />
  )
}

interface FormStepSwitchProps {
  oneStep: ReactNode
  secondStep: ReactNode
}

function RaffeStepSwitch(props: FormStepSwitchProps) {
  const { currentFormStep } = useRaffleContext()

  return (
    <AnimatePresence initial={false} mode="wait">
      {currentFormStep === 0 && (
        <RaffleStepWrapper key="step-one">{props.oneStep}</RaffleStepWrapper>
      )}

      {currentFormStep === 1 && (
        <RaffleStepWrapper key="step-second">
          {props.secondStep}
        </RaffleStepWrapper>
      )}
    </AnimatePresence>
  )
}

export { RaffeStepSwitch }
