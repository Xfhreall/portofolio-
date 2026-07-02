import { getExperience } from "@/lib/data";
import { AboutClient } from "./about-client";

export const revalidate = 120;

export default async function AboutPage() {
  return <AboutClient experiences={await getExperience()} />;
}
