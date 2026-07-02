import { getExperience } from "@/lib/data";
import { ExperienceClient } from "./experience-client";

export const revalidate = 120;

export default async function ExperiencePage() {
  return <ExperienceClient experiences={await getExperience()} />;
}
