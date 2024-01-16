import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const selectedNumbers = await prisma.selectedNumber.findMany({
      select: {
        number: true,
      },
    })

    return NextResponse.json(selectedNumbers.map((value) => value.number))
  } catch (error) {
    return NextResponse.error()
  }
}
