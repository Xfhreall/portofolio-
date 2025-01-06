import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiShadcnui,
  SiPostgresql,
} from "react-icons/si";
import { FaGolang } from "react-icons/fa6";

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
      return <SiPostgresql className={`${iconClass} text-[#336791]`} />;
    case "golang":
      return <FaGolang className={`${iconClass} text-[#00ADD8]`} />;
    default:
      return null;
  }
}
