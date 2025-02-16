import sidair from "@/public/sidair/home.png";
import poros from "@/public/poros/home.png";
import braciate from "@/public/braciate/home.png";
import art from "@/public/artTimes/home.png";
import porto from "@/public/project/porto.png";
import waisely from "@/public/project/waisely.png";
import lapbooking from "@/public/project/lapbooking.png";
import parkeer from "@/public/project/parkeer.png";
import { StaticImageData } from "next/image";

export interface Project {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  url: string;
  repoUrl: string;
  imageUrl: StaticImageData | string;
  longDescription?: string;
  role: ("Tech Leader" | "Front End" | "Product Manager" | "Scrum Master")[];
  platforms: ("mobile" | "desktop")[];
}

export interface ProjectCardProps {
  project: {
    name: string;
    description: string;
    techStack: string[];
    repoUrl: string;
    url: string;
    imageUrl: StaticImageData | string;
    role: ("Tech Leader" | "Front End" | "Product Manager" | "Scrum Master")[];
    platforms: ("mobile" | "desktop")[];
  };
  onViewMore: () => void;
}

export interface ProjectModalProps {
  project: {
    name: string;
    description: string;
    techStack: string[];
    repoUrl: string;
    imageUrl: StaticImageData | string;
    longDescription?: string;
    role: ("Tech Leader" | "Front End" | "Product Manager" | "Scrum Master")[];
    platforms: ("mobile" | "desktop")[];
  } | null;
  onClose: () => void;
}

export const Projects: Project[] = [
  {
    id: 1,
    name: "Portfolio Website",
    description: "A personal portfolio showcasing my projects and skills",
    techStack: ["Next js", "TypeScript", "Tailwind", "Framer"],
    repoUrl: "https://myportofolio-website.vercel.app/",
    imageUrl: porto,
    longDescription:
      "A responsive portfolio website built with Next JS, TypeScript, and Tailwind CSS. It features a modern design, smooth animations, and showcases my projects and skills.",
    role: ["Front End"],
    platforms: ["mobile", "desktop"],
    url: "https://myportofolio-website.vercel.app/",
  },
  {
    id: 2,
    name: "Braciate: Brawijaya Appreciate",
    description: "bentar yh msh mikir kata-kata nya:))",
    techStack: [
      "Next js",
      "Tailwind",
      "TypeScript",
      "Framer",
      "NextAuth.js",
      "PostgreSQL",
      "Golang",
    ],
    repoUrl: "https://github.com/Xfhreall/braciate-fe",
    imageUrl: braciate,
    longDescription:
      "lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    role: ["Tech Leader", "Front End", "Scrum Master", "Product Manager"],
    platforms: ["desktop", "mobile"],
    url: "https://braciate-eight.vercel.app/",
  },
  {
    id: 3,
    name: "POROS Website",
    description: "bentar yh msh mikir kata-kata nya:))",
    techStack: ["Next js", "TypeScript", "Tailwind", "MySQL", "Framer"],
    repoUrl: "https://github.com/porosub/Poros-Web-Home-3.0",
    imageUrl: poros,
    longDescription:
      "lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    role: ["Front End"],
    platforms: ["mobile", "desktop"],
    url: "https://poros-web-home-3-0.vercel.app/",
  },
  {
    id: 4,
    name: "Waisely",
    description: "bentar yh msh mikir kata-kata nya:))",
    techStack: ["Next js", "TypeScript", "Tailwind", "Framer"],
    repoUrl: "https://github.com/Xfhreall/waisely",
    imageUrl: waisely,
    longDescription: "bentar yh msh mikir kata-kata nya:))",
    role: ["Front End"],
    platforms: ["desktop", "mobile"],
    url: "https://waisely.vercel.app/",
  },
  {
    id: 5,
    name: "Sidair",
    description: "bentar yh msh mikir kata-kata nya:))",
    techStack: ["Next js", "TypeScript", "Tailwind", "Framer", "React-Spring"],
    repoUrl: "https://github.com/Xfhreall/sidair-web",
    imageUrl: sidair,
    longDescription: "bentar yh msh mikir kata-kata nya:))",
    role: ["Front End"],
    platforms: ["mobile", "desktop"],
    url: "https://sidair.vercel.app/",
  },
  {
    id: 6,
    name: "Parkeer",
    description: "bentar yh msh mikir kata-kata nya:))",
    techStack: ["Next js", "TypeScript", "Tailwind", "Framer"],
    repoUrl: "https://github.com/Xfhreall/parkeer-mobile",
    imageUrl: parkeer,
    longDescription: "bentar yh msh mikir kata-kata nya:))",
    role: ["Front End"],
    platforms: ["mobile"],
    url: "https://parkeer-apps.vercel.app/",
  },
  {
    id: 7,
    name: "Lapbooking",
    description: "bentar yh msh mikir kata-kata nya:))",
    techStack: ["Next js", "TypeScript", "Tailwind", "Framer"],
    repoUrl: "https://github.com/Xfhreall/lapbooking-mobile",
    imageUrl: lapbooking,
    longDescription: "bentar yh msh mikir kata-kata nya:))",
    role: ["Front End"],
    platforms: ["mobile"],
    url: "https://lapbooking-mobile.vercel.app/lapangan/kelola",
  },
  {
    id: 8,
    name: "Art Times",
    description: "bentar yh msh mikir kata-kata nya:))",
    techStack: ["Vite", "Javascript", "Sass"],
    repoUrl: "https://github.com/Xfhreall/ArtTimes",
    imageUrl: art,
    longDescription: "bentar yh msh mikir kata-kata nya:))",
    role: ["Front End", "Product Manager"],
    platforms: ["desktop"],
    url: "https://xfhreall.github.io/project1/",
  },
];
