import sidair from "@/public/sidair/home.png";
import poros from "@/public/poros/home.png";
import braciate from "@/public/braciate/home.png";
import art from "@/public/artTimes/home.png";
import { StaticImageData } from "next/image";

export interface Project {
  id: number;
  name: string;
  description: string;
  techStack: string[];
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
    techStack: ["React", "TypeScript", "Tailwind"],
    repoUrl: "https://github.com/yourusername/portfolio",
    imageUrl: "/placeholder.svg?height=300&width=400",
    longDescription:
      "A responsive portfolio website built with Next JS, TypeScript, and Tailwind CSS. It features a modern design, smooth animations, and showcases my projects and skills.",
    role: ["Front End"],
    platforms: ["mobile", "desktop"],
  },
  {
    id: 2,
    name: "Braciate: Brawijaya Appreciate",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    techStack: ["Next js", "Tailwind", "TypeScript", "Postgresql", "Golang"],
    repoUrl: "https://github.com/yourusername/ecommerce",
    imageUrl: braciate,
    longDescription:
      "lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    role: ["Tech Leader", "Front End", "Scrum Master", "Product Manager"],
    platforms: ["desktop"],
  },
  {
    id: 3,
    name: "POROS Website",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    techStack: ["React", "TypeScript", "Tailwind"],
    repoUrl: "https://github.com/yourusername/portfolio",
    imageUrl: poros,
    longDescription:
      "lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    role: ["Front End"],
    platforms: ["mobile", "desktop"],
  },
  {
    id: 4,
    name: "Waisely",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    repoUrl: "https://github.com/yourusername/ecommerce",
    imageUrl: "/placeholder.svg?height=300&width=400",
    longDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    role: ["Tech Leader"],
    platforms: ["desktop"],
  },
  {
    id: 5,
    name: "Sidair",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    techStack: ["React", "TypeScript", "Tailwind"],
    repoUrl: "https://github.com/yourusername/portfolio",
    imageUrl: sidair,
    longDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    role: ["Front End"],
    platforms: ["mobile", "desktop"],
  },
  {
    id: 6,
    name: "Parkeer",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    repoUrl: "https://github.com/yourusername/ecommerce",
    imageUrl: "/placeholder.svg?height=300&width=400",
    longDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    role: ["Tech Leader"],
    platforms: ["desktop"],
  },
  {
    id: 7,
    name: "Lapbooking",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    techStack: ["React", "TypeScript", "Tailwind"],
    repoUrl: "https://github.com/yourusername/portfolio",
    imageUrl: "/placeholder.svg?height=300&width=400",
    longDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    role: ["Front End"],
    platforms: ["mobile", "desktop"],
  },
  {
    id: 8,
    name: "Art Times",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    repoUrl: "https://github.com/yourusername/ecommerce",
    imageUrl: art,
    longDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    role: ["Tech Leader"],
    platforms: ["desktop"],
  },
];
