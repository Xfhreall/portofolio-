import { getProject, getProjects } from "@/lib/data";
import { ProjectDetailClient } from "./project-detail-client";

export const revalidate = 120;

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [project, projects] = await Promise.all([
    getProject(params.id),
    getProjects(),
  ]);

  return <ProjectDetailClient project={project} projects={projects} />;
}
