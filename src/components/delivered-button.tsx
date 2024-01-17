'use client'

import { Check, Loader2 } from 'lucide-react'
import { Button } from './button'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

type DeliveredButtonProps = {
  isDelivered: boolean
  chosenNumber: number
}

export function DeliveredButton(props: DeliveredButtonProps) {
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ chosenNumber }: { chosenNumber: number }) => {
      await axios.post('/api/raffle/buyers/delivered', {
        chosenNumber,
      })
    },
    onSuccess: () => {
      router.refresh()
    },
  })

  async function handleIsDeliveredDiaper({
    chosenNumber,
  }: {
    chosenNumber: number
  }) {
    try {
      await mutateAsync({ chosenNumber })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Button
      data-is-delivered={!!props.isDelivered}
      className="data-[is-delivered=true]:bg-shadow-green-600"
      disabled={isPending || !!props.isDelivered}
      onClick={() => {
        console.log(props.chosenNumber)
        handleIsDeliveredDiaper({ chosenNumber: props.chosenNumber })
      }}
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <>
          {props.isDelivered ? (
            <>
              Entregue <Check size={18} />
            </>
          ) : (
            'Entregou'
          )}
        </>
      )}
    </Button>
  )
}
