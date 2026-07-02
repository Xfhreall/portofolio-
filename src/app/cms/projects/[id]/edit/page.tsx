"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { ProjectForm, ProjectFormValue } from "../../project-form";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<ProjectFormValue | null>(null);

  useEffect(() => {
    async function fetchProject() {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();
      setForm({
        name: data.name,
        description: data.description,
        longDescription: data.longDescription || "",
        techStack: data.techStack,
        url: data.url,
        repoUrl: data.repoUrl || "",
        imageUrl: data.imageUrl,
        role: data.role,
      });
    }

    fetchProject().catch((error) => console.error("Failed to fetch project:", error));
  }, [id]);

  if (!form) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2Icon className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <ProjectForm
      title="Edit Project"
      submitLabel="Update Project"
      initialValue={form}
      action={`/api/projects/${id}`}
      method="PUT"
    />
  );
}
