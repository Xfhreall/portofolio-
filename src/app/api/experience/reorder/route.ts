import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { cookies } from 'next/headers'

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('cms-auth')

    if (!authCookie || authCookie.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { experiences } = body as { experiences: { id: string; order: number }[] }

    await prisma.$transaction(
      experiences.map(({ id, order }) =>
        prisma.experience.update({ where: { id }, data: { order } })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to reorder experiences:', error)
    return NextResponse.json({ error: 'Failed to reorder experiences' }, { status: 500 })
  }
}
