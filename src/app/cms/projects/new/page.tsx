import { ProjectForm } from "../project-form";

export default function NewProjectPage() {
  return (
    <ProjectForm
      title="New Project"
      submitLabel="Create Project"
      action="/api/projects"
      method="POST"
      showFeatured
    />
  );
}
