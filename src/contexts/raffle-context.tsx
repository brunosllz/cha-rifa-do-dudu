'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

interface RaffleContextData {
  toggleSelectNumber: (props: { selectedNumber: number }) => void
  chosenNumbers: number[]
  currentFormStep: number
  nextStep: () => void
  previousStep: () => void
  resetRaffle: () => void
}

const RaffleContext = createContext({} as RaffleContextData)

function RaffleContextProvider({ children }: { children: ReactNode }) {
  const [chosenNumbers, setChosenNumbers] = useState<number[]>([])
  const [currentFormStep, setCurrentFormStep] = useState(0)

  function toggleSelectNumber({ selectedNumber }: { selectedNumber: number }) {
    setChosenNumbers((prevState) => {
      if (prevState.includes(selectedNumber)) {
        return prevState.filter((number) => number !== selectedNumber)
      }

      return [selectedNumber]
    })
  }

  function nextStep() {
    setCurrentFormStep((prevState) => prevState + 1)
  }

  function previousStep() {
    setCurrentFormStep((prevState) => prevState - 1)
  }

  function resetRaffle() {
    setChosenNumbers([])
    setCurrentFormStep(0)
  }

  return (
    <RaffleContext.Provider
      value={{
        toggleSelectNumber,
        chosenNumbers,
        nextStep,
        previousStep,
        resetRaffle,
        currentFormStep,
      }}
    >
      {children}
    </RaffleContext.Provider>
  )
}

const useRaffleContext = () => useContext(RaffleContext)

export { RaffleContext, RaffleContextProvider, useRaffleContext }
