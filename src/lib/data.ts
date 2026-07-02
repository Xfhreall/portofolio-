import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

const projectSelect = {
  id: true,
  name: true,
  description: true,
  longDescription: true,
  techStack: true,
  url: true,
  repoUrl: true,
  imageUrl: true,
  role: true,
  isFeatured: true,
  order: true,
  createdAt: true,
} as const;

const experienceSelect = {
  id: true,
  role: true,
  company: true,
  startDate: true,
  endDate: true,
  description: true,
  order: true,
} as const;

export type Project = {
  id: string;
  name: string;
  description: string;
  longDescription: string | null;
  techStack: string[];
  url: string;
  repoUrl: string | null;
  imageUrl: string;
  role: string[];
  isFeatured: boolean;
  order: number;
  createdAt: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string | null;
  order: number;
};

function serializeProject(project: Omit<Project, "createdAt"> & { createdAt: Date }): Project {
  return { ...project, createdAt: project.createdAt.toISOString() };
}

export async function getProjects(options: { featured?: boolean; limit?: number } = {}) {
  const projects = await prisma.project.findMany({
    where: options.featured ? { isFeatured: true } : undefined,
    select: projectSelect,
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: options.limit,
  });

  return projects.map(serializeProject);
}

export async function getExperience() {
  return prisma.experience.findMany({
    select: experienceSelect,
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
    select: projectSelect,
  });

  if (!project) notFound();
  return serializeProject(project);
}
