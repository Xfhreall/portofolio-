import { getExperience, getProjects } from "@/lib/data";
import { HomeClient } from "./home-client";

export const revalidate = 120;

export default async function Home() {
  const [experiences, projects] = await Promise.all([
    getExperience(),
    getProjects({ limit: 3 }),
  ]);

  return <HomeClient experiences={experiences} projects={projects} />;
}
