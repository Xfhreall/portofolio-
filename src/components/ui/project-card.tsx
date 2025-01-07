import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getTechIcon } from "@/lib/icon/techIcon";
import { Smartphone, Monitor } from "lucide-react";
import { TbExternalLink } from "react-icons/tb";
import { Badge } from "@/components/ui/badge";
import { ProjectCardProps } from "@/lib/project";

export function ProjectCard({ project, onViewMore }: ProjectCardProps) {
  const maxRolesToShow = 2;
  const rolesToShow = project.role.slice(0, maxRolesToShow);
  const remainingRolesCount = project.role.length - maxRolesToShow;

  return (
    <Card className="overflow-hidden border-border hover:bg-accent transition-colors flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image
          src={project.imageUrl}
          alt={project.name}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          {project.name}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {project.description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-4 p-4 bg-muted/50">
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
          {remainingRolesCount > 0 && (
            <Badge variant="secondary" className="text-xs sm:text-sm">
              {`+${remainingRolesCount}`}
            </Badge>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {project.techStack.map((tech) => (
              <div key={tech} className="transition-transform hover:scale-110">
                {getTechIcon(tech)}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {project.platforms.includes("mobile") && (
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
            {project.platforms.includes("desktop") && (
              <Monitor className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 text-xs sm:text-sm"
            onClick={() => window.open(project.url, "_blank")}
          >
            <TbExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            Visit
          </Button>
          <Button
            variant="default"
            className="flex-1 text-xs sm:text-sm"
            onClick={onViewMore}
          >
            View More
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
