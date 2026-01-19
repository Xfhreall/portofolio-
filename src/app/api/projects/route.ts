import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    
    const projects = await prisma.project.findMany({
      where: featured === 'true' ? { isFeatured: true } : undefined,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })
    return NextResponse.json(projects)
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
    
    console.log('Creating project with data:', JSON.stringify(body, null, 2))
    
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
