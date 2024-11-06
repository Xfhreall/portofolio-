"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Link from "next/link";
import { motion } from "framer-motion";

type NavHero = {
  title: string;
  link: string;
};

const nav: NavHero[] = [
  { title: "About", link: "#about" },
  { title: "Project", link: "#project" },
  { title: "Contact", link: "#contact" },
];

export function Hero() {
  return (
    <>
      <div className="h-full w-full bg-inherit dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center space-y-4">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <TextGenerateEffect />
      </div>
      <motion.div
        initial={{ filter: "blur(4px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute nav bottom-4 z-10 flex space-x-4"
      >
        {nav.map((prop, index) => (
          <div key={prop.title}>
            <Link
              href={prop.link}
              className="z-50 transition-all duration-100 ease-in-out hover:border-b-2 dark:border-neutral-300 border-neutral-800"
            >
              {prop.title}
            </Link>
            {index < nav.length - 1 && <span className="ml-4">|</span>}
          </div>
        ))}
      </motion.div>
    </>
  );
}
