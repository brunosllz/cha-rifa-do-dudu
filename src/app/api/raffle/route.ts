import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const raffleFormSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(15).max(15),
  chosenNumbers: z.array(z.number().min(1).max(100)),
})

export async function POST(request: Request) {
  const requestBody = await request.json()

  const parse = raffleFormSchema.safeParse(requestBody)

  if (!parse.success) {
    return NextResponse.json({ message: parse.error.format() }, { status: 400 })
  }

  const { chosenNumbers, name, phone } = parse.data

  const number = await prisma.selectedNumber.findUnique({
    where: {
      number: chosenNumbers[0],
    },
  })

  if (number) {
    return NextResponse.json(
      { message: 'number already taken' },
      { status: 409 },
    )
  }

  const selectedNumber = chosenNumbers[0]
  let diaperSize: string

  switch (true) {
    case selectedNumber >= 1 && selectedNumber <= 15:
      diaperSize = 'P'
      break
    case selectedNumber >= 16 && selectedNumber <= 51:
      diaperSize = 'M'
      break
    case selectedNumber >= 52 && selectedNumber <= 87:
      diaperSize = 'G'
      break
    case selectedNumber >= 88 && selectedNumber <= 100:
      diaperSize = 'GG'
      break
    default:
      diaperSize = ''
      break
  }

  try {
    await prisma.buyer.create({
      data: {
        name,
        phone,
        selectedNumbers: {
          createMany: {
            data: chosenNumbers.map((number) => ({ number, diaperSize })),
          },
        },
      },
    })

    return new Response(null, { status: 201 })
  } catch (error) {
    console.error(error)

    return NextResponse.error()
  }
}
