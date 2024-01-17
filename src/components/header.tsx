import { prisma } from '@/libs/prisma'

export async function Header() {
  const countAmountOfDeliveredDiapers = await prisma.buyer.count({
    where: {
      selectedNumbers: {
        some: {
          isDelivered: {
            not: null,
          },
        },
      },
    },
  })

  return (
    <header className="fixed z-50 flex w-full border-b border-shadow-green-200 py-6 saturate-150 backdrop-blur-lg">
      <div className="w-full max-w-[81rem] px-6 mx-auto">
        <div>
          <span className="text-sm font-bold">Quantidade de entregues: </span>
          <span className="font-medium text-sm">
            {String(countAmountOfDeliveredDiapers).padStart(2, '0')}
          </span>
        </div>
        <div>
          <span className="text-sm font-bold">Quantidade à entregar: </span>
          <span className="font-medium text-sm">
            {String(100 - countAmountOfDeliveredDiapers).padStart(2, '0')}
          </span>
        </div>
      </div>
    </header>
  )
}
