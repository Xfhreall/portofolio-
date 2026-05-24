"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { TransitionLink as Link } from "@/components/transition-link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Award,
  Terminal,
  Briefcase,
} from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { ProjectDetailSkeleton } from "@/components/skeleton";
import { BackgroundLines } from "@/components/background-lines";

interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  url: string;
  repoUrl: string | null;
  imageUrl: string;
  role: string[];
  createdAt: string;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");

  // Fetch all projects to determine the "Next Project"
  const { projects } = useProjects();

  // References for right column sections to observe scroll intersections
  const sectionOverviewRef = useRef<HTMLDivElement>(null);
  const sectionRoleRef = useRef<HTMLDivElement>(null);
  const sectionHowRef = useRef<HTMLDivElement>(null);
  const sectionWhatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${params.id}`);
        if (!res.ok) {
          router.push("/project");
          return;
        }
        const data = await res.json();
        setProject(data);
      } catch (error) {
        console.error("Failed to fetch project:", error);
        router.push("/project");
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [params.id, router]);

  // Set up IntersectionObserver to track scroll location
  useEffect(() => {
    if (loading || !project) return;

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            setActiveSection(id.replace("section-", ""));
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    const sections = [
      sectionOverviewRef.current,
      sectionRoleRef.current,
      sectionHowRef.current,
      sectionWhatRef.current,
    ];

    sections.forEach((sec) => {
      if (sec) observer.observe(sec);
    });

    return () => {
      sections.forEach((sec) => {
        if (sec) observer.unobserve(sec);
      });
    };
  }, [loading, project]);

  if (loading) {
    return <ProjectDetailSkeleton />;
  }

  if (!project) {
    return null;
  }

  // Find the next project in the list for transition
  const currentIdx = projects.findIndex((p) => p.id === project.id);
  const nextProject =
    currentIdx !== -1 && projects.length > 1
      ? projects[(currentIdx + 1) % projects.length]
      : null;

  // Split descriptions into custom sections dynamically
  const longDescParagraphs = project.longDescription
    ? project.longDescription
        .split(/<p>|<\/p>|<br\s*\/?>|\n+/)
        .filter((p) => p.trim().length > 10)
    : [];

  const sectionContent = {
    overview: longDescParagraphs[0] || project.description,
    role:
      longDescParagraphs[1] ||
      "Existing solutions often rely on complex user dashboards or apps that exclude individuals looking for physical, simple, or offline solutions. The goal of this project was to respect clean accessibility rules while delivering high reliability and system connectivity.",
    how:
      longDescParagraphs[2] ||
      `Designed and built as a high-performance web experience. Combining modern web technologies to enforce fluid execution, layout accessibility, and layout performance under production guidelines.`,
    what:
      longDescParagraphs[3] ||
      `Drove the client integration, core layouts, and visual motion. Tested component rendering across device viewports to ensure seamless styling, typography consistency, and layout integrity.`,
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-neutral-950 relative overflow-visible select-none">
      {/* 1. PROJECT HERO LANDING (100vh) */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image with zoom */}
        <div className="absolute inset-0 z-0">
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            priority
            className="object-cover opacity-20 dark:opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 dark:via-neutral-950/40 to-white dark:to-neutral-950" />
        </div>

        {/* Hero Metadata Info */}
        <div className="relative z-10 text-center px-6 max-w-4xl flex flex-col items-center">
          <div className="flex gap-4 items-center mb-6 font-mono text-xs uppercase font-bold text-[#333896] dark:text-blue-400 tracking-widest">
            <span>
              {new Date(project.createdAt || Date.now()).getFullYear()}
            </span>
            <span>•</span>
            <span>{project.role.join(" / ")}</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black font-bricolage uppercase tracking-tighter leading-none text-neutral-900 dark:text-white mb-8">
            {project.name}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] md:text-xs uppercase tracking-wider bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-neutral-700 dark:text-white px-3 py-1 rounded-full font-bold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[10px] font-mono tracking-widest text-neutral-400 dark:text-neutral-600">
          <span>SCROLL DETAILS</span>
          <span className="mt-2 text-sm font-bold text-[#333896] dark:text-blue-400 animate-bounce">
            ↓
          </span>
        </div>
      </section>

      {/* 2. SPLIT SCREEN SCROLLYTELLING BODY */}
      <div className="relative w-full flex flex-col lg:flex-row border-t border-black/10 dark:border-white/10">
        {/* Left Column: Sticky Gallery (100vh) */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen lg:sticky lg:top-0 bg-neutral-100 dark:bg-neutral-900 overflow-hidden border-b lg:border-b-0 lg:border-r border-black/10 dark:border-white/10">
          <div className="relative w-full h-full flex items-center justify-center p-8 md:p-16">
            {/* Background Lines in gallery */}
            <BackgroundLines accentColor="#333896" />

            <AnimatePresence mode="wait">
              {activeSection === "overview" && (
                <motion.div
                  key="overview-img"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10"
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </motion.div>
              )}

              {activeSection === "role" && (
                <motion.div
                  key="role-img"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full rounded-2xl bg-neutral-950 border border-white/10 p-8 flex flex-col justify-between shadow-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-15">
                    <Image
                      src={project.imageUrl}
                      alt={project.name}
                      fill
                      className="object-cover filter grayscale"
                    />
                  </div>
                  <Briefcase className="w-12 h-12 text-blue-400 z-10" />
                  <div className="space-y-4 z-10">
                    <span className="font-mono text-[10px] tracking-widest text-blue-400 font-bold uppercase">
                      MY ROLE
                    </span>
                    <h3 className="font-bricolage text-2xl md:text-3xl font-black text-white uppercase leading-none">
                      {project.role.join(" / ")}
                    </h3>
                  </div>
                </motion.div>
              )}

              {activeSection === "how" && (
                <motion.div
                  key="how-img"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full rounded-2xl bg-[#333896] p-8 flex flex-col justify-between shadow-2xl text-white overflow-hidden"
                >
                  <Terminal className="w-12 h-12 text-white/80" />
                  <div className="space-y-6">
                    <span className="font-mono text-[10px] tracking-widest text-white/75 font-bold uppercase">
                      TECH & METHOD
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] uppercase tracking-wider bg-white/15 border border-white/10 text-white px-3 py-1.5 rounded-full font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "what" && (
                <motion.div
                  key="what-img"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full rounded-2xl bg-neutral-950 border border-white/10 p-8 flex flex-col justify-between shadow-2xl text-white"
                >
                  <Award className="w-12 h-12 text-emerald-400" />
                  <div className="space-y-4">
                    <span className="font-mono text-[10px] tracking-widest text-emerald-400 font-bold uppercase">
                      PROJECT OUTCOME
                    </span>
                    <h4 className="font-bricolage text-2xl font-black uppercase text-white tracking-tight">
                      Success & Delivery
                    </h4>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Scrollable Sections */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white dark:bg-neutral-950 relative">
          {/* Scroll Navigation Overlay (Section progress indicator) */}
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 hidden md:flex flex-col space-y-4 z-20 font-mono text-[10px] font-bold text-neutral-400 tracking-wider">
            {["overview", "role", "how", "what"].map((sec) => (
              <Link
                key={sec}
                href={`#section-${sec}`}
                className={`transition-colors duration-300 uppercase hover:text-black dark:hover:text-white ${
                  activeSection === sec
                    ? "text-[#333896] dark:text-blue-400 font-black"
                    : ""
                }`}
              >
                {sec}
              </Link>
            ))}
          </div>

          {/* Section: Overview */}
          <div
            ref={sectionOverviewRef}
            id="section-overview"
            className="w-full min-h-[75vh] flex items-center p-8 md:p-16 border-b border-black/5 dark:border-white/5"
          >
            <div className="max-w-md space-y-6">
              <span className="font-mono text-[10px] tracking-widest text-[#333896] dark:text-blue-400 font-black uppercase">
                01 / Background
              </span>
              <h2 className="font-bricolage font-black text-4xl uppercase tracking-tight text-neutral-900 dark:text-white">
                HISTORY
              </h2>
              <div
                className="text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed text-sm md:text-base space-y-4"
                dangerouslySetInnerHTML={{ __html: sectionContent.overview }}
              />
            </div>
          </div>

          {/* Section: Role */}
          <div
            ref={sectionRoleRef}
            id="section-role"
            className="w-full min-h-[75vh] flex items-center p-8 md:p-16 border-b border-black/5 dark:border-white/5"
          >
            <div className="max-w-md space-y-6">
              <span className="font-mono text-[10px] tracking-widest text-[#333896] dark:text-blue-400 font-black uppercase">
                02 / Role
              </span>
              <h2 className="font-bricolage font-black text-4xl uppercase tracking-tight text-neutral-900 dark:text-white">
                WHAT I DID
              </h2>
              <div
                className="text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed text-sm md:text-base space-y-4"
                dangerouslySetInnerHTML={{ __html: sectionContent.role }}
              />
            </div>
          </div>

          {/* Section: How */}
          <div
            ref={sectionHowRef}
            id="section-how"
            className="w-full min-h-[75vh] flex items-center p-8 md:p-16 border-b border-black/5 dark:border-white/5"
          >
            <div className="max-w-md space-y-6">
              <span className="font-mono text-[10px] tracking-widest text-[#333896] dark:text-blue-400 font-black uppercase">
                03 / WORKFLOW
              </span>
              <h2 className="font-bricolage font-black text-4xl uppercase tracking-tight text-neutral-900 dark:text-white">
                HOW
              </h2>
              <div
                className="text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed text-sm md:text-base space-y-4"
                dangerouslySetInnerHTML={{ __html: sectionContent.how }}
              />
            </div>
          </div>

          {/* Section: What */}
          <div
            ref={sectionWhatRef}
            id="section-what"
            className="w-full min-h-[75vh] flex items-center p-8 md:p-16"
          >
            <div className="max-w-md space-y-6">
              <span className="font-mono text-[10px] tracking-widest text-[#333896] dark:text-blue-400 font-black uppercase">
                04 / OUTCOME
              </span>
              <h2 className="font-bricolage font-black text-4xl uppercase tracking-tight text-neutral-900 dark:text-white">
                WHAT
              </h2>
              <div
                className="text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed text-sm md:text-base space-y-4"
                dangerouslySetInnerHTML={{ __html: sectionContent.what }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. CREDIT & NEXT PROJECT TRANSITION FOOTER */}
      <section className="relative w-full border-t border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900 py-16 md:py-24">
        <BackgroundLines accentColor="#333896" />

        <div className="relative z-10 container mx-auto px-6 max-w-5xl">
          {/* Credits Row */}
          <div className="grid md:grid-cols-2 gap-12 pb-16 border-b border-black/10 dark:border-white/10">
            <div>
              <h4 className="font-bricolage font-black text-sm uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-6">
                Credits
              </h4>
              <p className="font-mono text-xs font-bold uppercase text-neutral-800 dark:text-neutral-300">
                Risqi Achmad Fahreal — Software Engineering & Design
              </p>
            </div>
            {project.repoUrl && (
              <div>
                <h4 className="font-bricolage font-black text-sm uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-6">
                  Repository
                </h4>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-bold uppercase text-neutral-800 dark:text-neutral-300 hover:text-[#333896] dark:hover:text-blue-400 flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  View GitHub repository
                </a>
              </div>
            )}
          </div>

          {/* Next Project & Back Links */}
          <div className="pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            {nextProject ? (
              <Link
                href={`/project/${nextProject.id}`}
                className="group flex flex-col items-start text-left focus:outline-none"
              >
                <span className="font-mono text-[10px] tracking-widest text-[#333896] dark:text-blue-400 font-bold uppercase mb-2">
                  NEXT PROJECT
                </span>
                <h2 className="font-bricolage font-black text-3xl md:text-5xl uppercase tracking-tighter text-neutral-900 dark:text-white flex items-center gap-4">
                  <span className="relative block overflow-hidden">
                    <span className="block transition-transform duration-500 ease-out group-hover:translate-y-[-100%]">
                      {nextProject.name}
                    </span>
                    <span className="absolute inset-0 block transition-transform duration-500 ease-out translate-y-[100%] group-hover:translate-y-0 text-[#333896] dark:text-blue-400">
                      {nextProject.name}
                    </span>
                  </span>
                  <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" />
                </h2>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/project"
              className="font-mono text-xs uppercase tracking-widest font-bold text-neutral-500 hover:text-black dark:hover:text-white flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FLOATING CTA ACTIONS MENU */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 pointer-events-auto flex gap-3">
        <Link href={project.url} target="_blank" rel="noopener noreferrer">
          <Button
            style={{ backgroundColor: "#333896" }}
            className="hover:brightness-110 text-white rounded-full px-6 h-12 shadow-2xl font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </Button>
        </Link>
      </div>
    </div>
  );
}
