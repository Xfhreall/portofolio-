import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Smartphone, Monitor } from "lucide-react";
import { getTechIcon } from "@/lib/icon/techIcon";
import { Badge } from "@/components/ui/badge";
import { ProjectModalProps } from "@/lib/project";
import { SiGithub } from "react-icons/si";

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;
  const rolesToShow = project.role;

  return (
    <Dialog open={!!project} onOpenChange={onClose}>
      <DialogContent className="bg-background text-foreground w-[90vw] max-w-lg sm:max-w-2xl lg:max-w-3xl p-4 sm:p-6 max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold">
            {project.name}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-muted-foreground">
            {project.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto space-y-4 pr-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {rolesToShow.map((role, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs sm:text-sm"
                >
                  {role}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              {project.platforms.includes("mobile") && (
                <Smartphone className="w-6 h-6" />
              )}
              {project.platforms.includes("desktop") && (
                <Monitor className="w-6 h-6" />
              )}
            </div>
          </div>
          <div className="relative h-48 sm:h-64 w-full">
            <Image
              src={project.imageUrl}
              alt={project.name}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-1 bg-muted rounded-full px-3 py-1"
              >
                {getTechIcon(tech)}
                <span className="text-sm">{tech}</span>
              </div>
            ))}
          </div>
          {project.longDescription && (
            <div className="max-h-40 overflow-y-auto">
              <p className="text-xs sm:text-sm text-muted-foreground">
                {project.longDescription}
              </p>
            </div>
          )}
        </div>
        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full text-xs sm:text-sm"
            onClick={() => window.open(project.repoUrl, "_blank")}
          >
            <SiGithub className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-foreground" />
            View Repository
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
