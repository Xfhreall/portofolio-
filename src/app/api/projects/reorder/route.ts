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
    const { projects } = body as { projects: { id: string; order: number }[] }
    
    // Update all project orders in a transaction
    await prisma.$transaction(
      projects.map((project) =>
        prisma.project.update({
          where: { id: project.id },
          data: { order: project.order }
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to reorder projects:', error)
    return NextResponse.json({ error: 'Failed to reorder' }, { status: 500 })
  }
}
