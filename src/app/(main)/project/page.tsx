import { getProjects } from "@/lib/data";
import { ProjectClient } from "./project-client";

export const revalidate = 120;

export default async function ProjectPage() {
  return <ProjectClient projects={await getProjects()} />;
}
