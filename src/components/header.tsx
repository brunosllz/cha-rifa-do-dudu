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

  const countNumbersSeller = await prisma.buyer.count()

  return (
    <header className="fixed z-50 flex w-full border-b border-shadow-green-200 py-6 saturate-150 backdrop-blur-lg">
      <div className="w-full max-w-[81rem] px-6 mx-auto">
        <div className="flex gap-10">
          <div>
            <div>
              <span className="text-sm font-bold">
                Quantidade de entregues:{' '}
              </span>
              <span className="font-medium text-sm">
                {String(countAmountOfDeliveredDiapers).padStart(2, '0')}
              </span>
            </div>
            <div>
              <span className="text-sm font-bold">Quantidade à entregar: </span>
              <span className="font-medium text-sm">
                {String(
                  countNumbersSeller - countAmountOfDeliveredDiapers,
                ).padStart(2, '0')}
              </span>
            </div>
          </div>
          <div>
            <span className="text-sm font-bold">
              Total de números vendidos:{' '}
            </span>
            <span className="font-medium text-sm">
              {String(countNumbersSeller).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
