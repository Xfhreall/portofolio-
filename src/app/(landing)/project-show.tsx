"use client";

import { useState, useEffect, useRef } from "react";
import { ProjectCard } from "@/components/ui/project-card";
import { ProjectModal } from "@/components/ui/project-modal";
import { Pagination } from "@/components/ui/pagination";
import { motion, useInView } from "framer-motion";
import { Projects, Project } from "@/lib/project";

export function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(6);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60% 0px" });

  const totalPages = Math.ceil(Projects.length / projectsPerPage);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = Projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const updateProjectsPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setProjectsPerPage(6);
    } else if (width >= 768) {
      setProjectsPerPage(4);
    } else {
      setProjectsPerPage(2);
    }
  };

  useEffect(() => {
    updateProjectsPerPage();
    window.addEventListener("resize", updateProjectsPerPage);

    return () => {
      window.removeEventListener("resize", updateProjectsPerPage);
    };
  }, []);

  return (
    <section className="py-8 sm:py-12 bg-background">
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col"
        ref={ref}
      >
        <motion.div
          className="flex mb-6 sm:mb-8"
          initial={{ x: -50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Projects
          </h2>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mb-8"
          initial={{ filter: "blur(100px)", opacity: 0, scale: 0 }}
          animate={
            isInView ? { filter: "blur(0px)", opacity: 1, scale: 1 } : {}
          }
          transition={{ duration: 1 }}
        >
          {currentProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewMore={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>
        <motion.div
          className="mt-auto flex justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </motion.div>
      </div>
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
