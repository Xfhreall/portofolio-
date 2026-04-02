import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const admin = searchParams.get('admin') === 'true'
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? Math.max(1, Math.min(50, Number(limitParam))) : undefined
    
    const projects = await prisma.project.findMany({
      where: featured === 'true' ? { isFeatured: true } : undefined,
      select: {
        id: true,
        name: true,
        description: true,
        techStack: true,
        url: true,
        repoUrl: true,
        imageUrl: true,
        role: true,
        isFeatured: true,
        order: true,
        createdAt: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
      take: Number.isFinite(limit) ? limit : undefined,
    })

    return NextResponse.json(projects, {
      headers: {
        'Cache-Control': admin
          ? 'no-store'
          : 'public, max-age=30, s-maxage=120, stale-while-revalidate=300',
      },
    })
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
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
        
    const project = await prisma.project.create({
      data: {
        name: body.name,
        description: body.description,
        longDescription: body.longDescription || null,
        techStack: body.techStack || [],
        url: body.url,
        repoUrl: body.repoUrl || "-",
        imageUrl: body.imageUrl,
        role: body.role || [],
        isFeatured: body.isFeatured || false,
        order: body.order || 0,
      }
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Full error object:', error)
    console.error('Failed to create project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
