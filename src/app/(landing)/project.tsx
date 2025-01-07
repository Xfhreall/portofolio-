"use client";

import React from "react";
import { Parallax } from "@/components/ui/project-parallax";
import { Projects } from "@/lib/project";

export function ProjekParallax() {
  return (
    <section id="project">
      <Parallax products={products} />
    </section>
  );
}
const items = Projects;
export const products = items.map((item) => ({
  title: item.name,
  link: item.url,
  thumbnail: item.imageUrl,
}));
