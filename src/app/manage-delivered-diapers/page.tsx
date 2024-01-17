import { DeliveredButton } from '@/components/delivered-button'
import dayjs from 'dayjs'

import { prisma } from '@/libs/prisma'

export const revalidate = 0

export default async function ManageDeliveredDiapers() {
  const query = await prisma.buyer.findMany({
    select: {
      id: true,
      name: true,
      phone: true,
      selectedNumbers: {
        select: {
          number: true,
          diaperSize: true,
          isDelivered: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const buyers = query.map((buyer) => ({
    id: buyer.id,
    name: buyer.name,
    phone: buyer.phone,
    ...buyer.selectedNumbers[0],
  }))

  return (
    <main className="w-full relative bg-shadow-green-300 flex items-center justify-center py-28 min-h-screen">
      <div className="grid grid-cols-1 gap-6">
        {buyers.map((buyer) => (
          <div
            className="bg-pearl-bush-100 p-6 rounded-lg space-y-4"
            key={buyer.id}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Nome: </span>
                <span>{buyer.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Telefone: </span>
                <span>{buyer.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Número: </span>
                <span>{buyer.number}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Tamanho: </span>
                <span>{buyer.diaperSize}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Entregue em: </span>
                <span>
                  {buyer.isDelivered
                    ? dayjs(buyer.isDelivered).format('DD/MM/YYYY')
                    : '-'}
                </span>
              </div>
            </div>

            <DeliveredButton
              chosenNumber={buyer.number}
              isDelivered={!!buyer.isDelivered}
            />
          </div>
        ))}
      </div>
    </main>
  )
}
