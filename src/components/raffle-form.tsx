'use client'

import { useRaffleContext } from '@/contexts/raffle-context'
import { queryClient } from '@/libs/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './button'
import { Check } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import Link from 'next/link'
import { WhatsAppLogo } from '@/assets/whats-app-logo'

const raffleFormSchema = z.object({
  name: z
    .string({ required_error: 'O nome completo é obrigatório.' })
    .min(3, { message: 'O nome deve conter no mínimo 3 caracteres.' }),
  phone: z
    .string({ required_error: 'O número de telefone é obrigatório.' })
    .min(15, { message: 'Informe um número de telefone válido.' }),
})

type RaffleFormSchemaType = z.infer<typeof raffleFormSchema>

export function RaffleForm() {
  const [openDialog, setOpenDialog] = useState(false)
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<RaffleFormSchemaType>({
    defaultValues: {
      name: '',
      phone: '',
    },
    resolver: zodResolver(raffleFormSchema),
  })

  const { chosenNumbers, resetRaffle } = useRaffleContext()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({
      name,
      phone,
      chosenNumbers,
    }: {
      name: string
      phone: string
      chosenNumbers: number[]
    }) => {
      await axios.post('/api/raffle', {
        name,
        phone,
        chosenNumbers,
      })
    },
    onSuccess() {
      setOpenDialog(true)

      queryClient.invalidateQueries({
        queryKey: ['raffle', 'selected-numbers'],
      })
    },
  })

  function maskPhoneInput(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value

    const maskedValue = value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(\d{4})(\d)/, '$1$2')

    setValue('phone', maskedValue)
  }

  async function handleSubmitRaffleForm(data: RaffleFormSchemaType) {
    try {
      await mutateAsync({
        name: data.name,
        phone: data.phone,
        chosenNumbers,
      })
    } catch (error) {
      console.log(error)
    }
  }

  function handleFinishForm() {
    resetRaffle()
    reset()
    setOpenDialog(false)
  }

  return (
    <>
      <form
        id="submit-selected-numbers"
        className="space-y-6"
        onSubmit={handleSubmit(handleSubmitRaffleForm)}
      >
        <div className="flex flex-col gap-3.5">
          <label className="text-sm">Nome completo *</label>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Eduardo Silveira de Almeida"
              className="p-4 text-sm rounded-md text-puce-950 bg-puce-50 border-puce-200 focus:outline-none border placeholder:text-puce-300 focus:ring-1 focus:ring-puce-900"
              disabled={isPending}
              {...register('name')}
            />
            {errors.name && (
              <span className="text-sm text-red-400 font-medium">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          <label className="text-sm">Telefone *</label>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="(99) 99999-9999"
              className="p-4 text-sm rounded-md text-puce-950 bg-puce-50 border-puce-200 focus:outline-none border placeholder:text-puce-300 focus:ring-1 focus:ring-puce-900"
              disabled={isPending}
              maxLength={15}
              {...register('phone', {
                required: true,
                onChange(event) {
                  maskPhoneInput(event)
                },
              })}
            />

            {errors.phone && (
              <span className="text-sm text-red-400 font-medium">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>

        <AlertDialog onOpenChange={setOpenDialog} open={openDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Uhuuuuuul! 🍼</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-4">
                  <span className="block text-left">
                    <span className="first-letter:uppercase font-bold">
                      {getValues('name').split(' ')[0]}
                    </span>{' '}
                    muito obrigado por fazer parte deste momento tão especial!
                    🥰❤️😘
                  </span>

                  <div className="flex flex-col items-center bg-puce-200 border border-puce-900 py-3 rounded-md space-y-2">
                    <span className="font-semibold">Número selecionado</span>

                    <span className="font-semibold text-xl">
                      {String(...chosenNumbers).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-0.5">
                      <span className="block text-left">
                        Lembramos que a data para a entrega é até o dia{' '}
                        <span className="font-bold">20/04/2024</span>.
                      </span>
                      <span className="block text-left">
                        O sorteio será realizado no dia{' '}
                        <span className="font-bold">24/04/2024</span>.
                      </span>
                    </div>

                    <div className="space-y-3">
                      <span className="text-left block">
                        Qualquer dúvida entrar em contato:
                      </span>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <Link
                            href={'https://wa.me/555491053841'}
                            target="_blank"
                            className="bg-green-400 py-3 flex items-center justify-center rounded-md gap-2"
                          >
                            <WhatsAppLogo width={18} height={18} />

                            <span className="tex-sm font-semibold text-white">
                              Aline
                            </span>
                          </Link>
                        </div>

                        <div className="flex flex-col gap-1">
                          <Link
                            href={'https://wa.me/5551982285447'}
                            target="_blank"
                            className="bg-green-400 py-3 flex items-center justify-center rounded-md gap-2"
                          >
                            <WhatsAppLogo width={18} height={18} />

                            <span className="tex-sm font-semibold text-white">
                              Bruno
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <span className="font-bold block text-lg text-center">
                    Boa sorte!
                  </span>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="pt-2">
              <Button onClick={handleFinishForm}>Continuar</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>

      <Button type="submit" form="submit-selected-numbers" disabled={isPending}>
        Confirmar <Check size={16} strokeWidth={2.5} />
      </Button>
    </>
  )
}
