import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const deliveredSchema = z.object({
  chosenNumber: z.coerce.number(),
})

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestBody = await request.json()

  const parse = deliveredSchema.safeParse(requestBody)

  if (!parse.success) {
    return NextResponse.json({ message: parse.error.format() }, { status: 400 })
  }

  const { chosenNumber } = parse.data

  try {
    await prisma.selectedNumber.update({
      where: {
        number: chosenNumber,
      },
      data: {
        isDelivered: new Date(),
      },
    })

    return new Response(null, { status: 201 })
  } catch (error) {
    console.error(error)

    return NextResponse.error()
  }
}
