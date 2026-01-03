import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate())

const projects = [
  {
    name: 'Go Reserve',
    description: 'A modern hotel reservation system with real-time availability and booking management.',
    longDescription: 'Go Reserve is a comprehensive hotel reservation platform built with Next.js and PostgreSQL. Features include room management, real-time availability checking, payment integration, and admin dashboard.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    url: 'https://go-reserve.vercel.app',
    repoUrl: 'https://github.com/Xfhreall/go-reserve',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    role: ['Tech Leader', 'Front End'],
  },
  {
    name: 'Portfolio Website',
    description: 'A personal portfolio website showcasing projects and skills with stunning animations.',
    longDescription: 'Modern portfolio website built with Next.js 14, featuring Framer Motion animations, dark mode support, and a CMS for content management.',
    techStack: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
    url: 'https://xfhreall.vercel.app',
    repoUrl: 'https://github.com/Xfhreall/portfolio',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    role: ['Front End'],
  },
  {
    name: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with cart, checkout, and payment integration.',
    longDescription: 'A complete e-commerce platform with product catalog, shopping cart, user authentication, order management, and Stripe payment integration.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    url: 'https://ecommerce-demo.vercel.app',
    repoUrl: 'https://github.com/Xfhreall/ecommerce',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    role: ['Tech Leader', 'Front End'],
  },
  {
    name: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates and team features.',
    longDescription: 'Kanban-style task management application with drag-and-drop functionality, team collaboration, notifications, and project analytics.',
    techStack: ['Next.js', 'Socket.io', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    url: 'https://taskify-app.vercel.app',
    repoUrl: 'https://github.com/Xfhreall/taskify',
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    role: ['Front End'],
  },
  {
    name: 'Weather Dashboard',
    description: 'Beautiful weather application with location-based forecasts and animated visuals.',
    longDescription: 'Weather dashboard featuring animated weather conditions, 7-day forecasts, air quality index, and location-based automatic updates.',
    techStack: ['React', 'OpenWeather API', 'Framer Motion', 'CSS Modules'],
    url: 'https://weather-dash.vercel.app',
    repoUrl: 'https://github.com/Xfhreall/weather',
    imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80',
    role: ['Front End'],
  },
  {
    name: 'Blog Platform',
    description: 'Modern blogging platform with markdown support and SEO optimization.',
    longDescription: 'A full-featured blog platform with markdown editor, syntax highlighting, SEO optimization, RSS feed, and social sharing capabilities.',
    techStack: ['Next.js', 'MDX', 'Contentlayer', 'Tailwind CSS', 'Vercel'],
    url: 'https://blog-platform.vercel.app',
    repoUrl: 'https://github.com/Xfhreall/blog',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    role: ['Tech Leader', 'Front End'],
  },
]

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing projects
  await prisma.project.deleteMany()
  console.log('🗑️  Cleared existing projects')

  // Insert seed data
  for (const project of projects) {
    await prisma.project.create({
      data: project,
    })
    console.log(`✅ Created project: ${project.name}`)
  }

  console.log(`\n🎉 Seeding complete! Created ${projects.length} projects.`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
