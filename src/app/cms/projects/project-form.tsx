"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeftIcon, Loader2Icon, PlusIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

export type ProjectFormValue = {
  name: string;
  description: string;
  longDescription: string;
  techStack: string[];
  url: string;
  repoUrl: string;
  imageUrl: string;
  role: string[];
  isFeatured?: boolean;
};

const emptyProject: ProjectFormValue = {
  name: "",
  description: "",
  longDescription: "",
  techStack: [],
  url: "",
  repoUrl: "",
  imageUrl: "",
  role: [],
  isFeatured: false,
};

const roles = ["Tech Leader", "Front End", "Fullstack", "Software Engineer"];

export function ProjectForm({
  title,
  submitLabel,
  initialValue = emptyProject,
  action,
  method,
  showFeatured = false,
}: {
  title: string;
  submitLabel: string;
  initialValue?: ProjectFormValue;
  action: string;
  method: "POST" | "PUT";
  showFeatured?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [form, setForm] = useState<ProjectFormValue>(initialValue);

  const addTech = () => {
    const tech = techInput.trim();
    if (!tech || form.techStack.includes(tech)) return;
    setForm({ ...form, techStack: [...form.techStack, tech] });
    setTechInput("");
  };

  const toggleRole = (role: string) => {
    setForm({
      ...form,
      role: form.role.includes(role)
        ? form.role.filter((item) => item !== role)
        : [...form.role, role],
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(action, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/cms");
        router.refresh();
      }
    } catch (error) {
      console.error(`Failed to save project:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/cms">
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <Field label="Project Name">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
              required
            />
          </Field>

          <Field label="Short Description">
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
              required
            />
          </Field>

          <Field label="Long Description (optional)">
            <RichTextEditor
              value={form.longDescription}
              onChange={(value) => setForm({ ...form, longDescription: value })}
            />
          </Field>

          <Field label="Image URL">
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              placeholder="https://..."
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Live URL">
              <input
                type="url"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="https://..."
                required
              />
            </Field>
            <Field label="Repository URL">
              <input
                type="url"
                value={form.repoUrl}
                onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="https://github.com/..."
                required
              />
            </Field>
          </div>

          <Field label="Tech Stack">
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                className="flex-1 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="React, Next.js, etc."
              />
              <Button type="button" onClick={addTech} variant="outline" className="border-neutral-700">
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.techStack.map((tech) => (
                <span key={tech} className="flex items-center gap-1 px-3 py-1 bg-neutral-800 text-neutral-300 rounded-full text-sm">
                  {tech}
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, techStack: form.techStack.filter((item) => item !== tech) })}
                  >
                    <XIcon className="w-3 h-3 text-neutral-500 hover:text-white" />
                  </button>
                </span>
              ))}
            </div>
          </Field>

          <Field label="Your Role">
            <div className="flex flex-wrap gap-3">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    form.role.includes(role)
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "bg-neutral-900 border-neutral-700 text-neutral-400 hover:border-neutral-600"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </Field>

          {showFeatured && (
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(form.isFeatured)}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                className="w-5 h-5 rounded border-neutral-700 bg-neutral-900 text-purple-600 focus:ring-purple-500/50"
              />
              <span className="text-sm font-medium text-neutral-300">Featured Project</span>
            </label>
          )}

          <Button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 py-6">
            {loading ? <Loader2Icon className="w-4 h-4 animate-spin" /> : submitLabel}
          </Button>
        </motion.form>
      </main>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-300 mb-2">{label}</label>
      {children}
    </div>
  );
}
