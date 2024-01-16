import { BackButton } from '@/components/back-button'
import { NavigateButton } from '@/components/navigate-button'
import { RaffleForm } from '@/components/raffle-form'
import { RaffeStepSwitch } from '@/components/raffle-step-switch'
import { TableNumbers } from '@/components/table-numbers'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const INFO_PAINEL = [
  {
    rangeAmount: '01 ao 15',
    size: 'P',
  },
  {
    rangeAmount: '16 ao 51',
    size: 'M',
  },
  {
    rangeAmount: '52 ao 87',
    size: 'G',
  },
  {
    rangeAmount: '88 ao 100',
    size: 'GG',
  },
]

export default function Home() {
  return (
    <main className="w-full relative bg-shadow-green-300 flex items-center justify-center py-20 min-h-screen">
      <RaffeStepSwitch
        oneStep={
          <div className="space-y-8">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-4 pt-2.5">
              {INFO_PAINEL.map(({ rangeAmount, size }) => (
                <div
                  className="p-4 bg-lavender-purple-600 rounded-lg shadow-md shadow-black/20 flex flex-col"
                  key={size}
                >
                  <span className="text-sm text-puce-50 font-medium leading-tight">
                    {rangeAmount}
                  </span>

                  <span className="text-puce-50 gap-1 font-bold">
                    Fraldas {size}
                  </span>
                </div>
              ))}
            </div>

            <TableNumbers />

            <NavigateButton>
              Continuar <ArrowRight size={16} strokeWidth={2.5} />
            </NavigateButton>
          </div>
        }
        secondStep={
          <div className="w-full space-y-8">
            <header className="space-y-16">
              <BackButton />

              <div className="space-y-2">
                <span className="text-xl font-semibold block leading-none">
                  Quase lá
                </span>
                <span className="block">
                  Informe os seus dados e boa sorte!
                </span>
              </div>
            </header>

            <RaffleForm />
          </div>
        }
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <span className="text-sm font-medium">
          Feito com 💜 por{' '}
          <Link
            href="https://www.linkedin.com/in/bruno-silveira-luiz/"
            target="_blank"
            className="text-sm font-medium underline"
          >
            Bruno Luiz
          </Link>
        </span>
      </div>
    </main>
  )
}
