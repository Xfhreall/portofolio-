import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { cookies } from 'next/headers'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('cms-auth')
    
    if (!authCookie || authCookie.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    
    const project = await prisma.project.update({
      where: { id },
      data: { isFeatured: body.isFeatured }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Failed to update featured status:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
