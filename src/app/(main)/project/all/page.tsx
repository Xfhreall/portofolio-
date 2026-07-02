import { getProjects } from "@/lib/data";
import { AllProjectsClient } from "./all-projects-client";

export const revalidate = 120;

export default async function AllProjectsPage() {
  return <AllProjectsClient projects={await getProjects()} />;
}
