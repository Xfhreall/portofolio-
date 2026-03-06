import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    })
    return NextResponse.json(experiences)
  } catch (error) {
    console.error('Failed to fetch experiences:', error)
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('cms-auth')

    if (!authCookie || authCookie.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const experience = await prisma.experience.create({
      data: {
        role: body.role,
        company: body.company,
        startDate: body.startDate,
        endDate: body.endDate || null,
        description: body.description || null,
        order: body.order ?? 0,
      },
    })

    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    console.error('Failed to create experience:', error)
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}
