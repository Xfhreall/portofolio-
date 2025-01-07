import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiShadcnui,
  SiMysql,
} from "react-icons/si";
import { FaSass } from "react-icons/fa6";
import React from "react";
import {
  ViteIcon,
  GoIcon,
  PostgresIcon,
  NextAuthIcon,
  FramerIcon,
  SpringIcon,
} from "./SvgIcon";

export function getTechIcon(tech: string) {
  const iconClass = "w-5 h-5 sm:w-6 sm:h-6";

  switch (tech.toLowerCase()) {
    case "html":
      return <SiHtml5 className={`${iconClass} text-[#E34F26]`} />;
    case "css":
      return <SiCss3 className={`${iconClass} text-[#1572B6]`} />;
    case "javascript":
      return <SiJavascript className={`${iconClass} text-[#F7DF1E]`} />;
    case "react":
      return <SiReact className={`${iconClass} text-[#61DAFB]`} />;
    case "tailwind":
      return <SiTailwindcss className={`${iconClass} text-[#38B2AC]`} />;
    case "typescript":
      return <SiTypescript className={`${iconClass} text-[#3178C6]`} />;
    case "next js":
      return <SiNextdotjs className={`${iconClass} text-foreground`} />;
    case "shadcn ui":
      return <SiShadcnui className={`${iconClass} text-foreground`} />;
    case "postgresql":
      return <PostgresIcon className={iconClass} />;
    case "golang":
      return <GoIcon className={iconClass} />;
    case "mysql":
      return <SiMysql className={`${iconClass} text-[#4479A1]`} />;
    case "nextauth.js":
      return <NextAuthIcon className={iconClass} />;
    case "vite":
      return <ViteIcon className={iconClass} />;
    case "sass":
      return <FaSass className={`${iconClass} text-[#CC6699]`} />;
    case "framer":
      return <FramerIcon className={iconClass} />;
    case "react-spring":
      return <SpringIcon className={iconClass} />;

    default:
      return null;
  }
}
