"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTheme } from "next-themes";
import { MoonIcon, Sun } from "lucide-react";

type navProps = {
  name: string;
  link: string;
  icon?: JSX.Element;
};

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.2) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-3xl  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] py-4 px-8  items-center justify-center space-x-4 backdrop-blur-lg",
          className
        )}
      >
        {navItems.map((navItem: navProps, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-800 dark:hover:text-neutral-800 hover:text-neutral-100 border-2 p-2 rounded-full border-black/30 dark:border-white/40 hover:bg-neutral-800 dark:hover:bg-white transition duration-300 ease-in-out"
            )}
          >
            <span className="block">{navItem.icon}</span>
          </Link>
        ))}
        <button
          className="relative dark:text-neutral-50 items-center flex text-neutral-800 dark:hover:text-neutral-800 hover:text-neutral-100 border-2 p-2 rounded-full border-black/30 dark:border-white/40 hover:bg-neutral-800 dark:hover:bg-white transition duration-300 ease-in-out"
          onClick={toggleTheme}
        >
          <span>
            {theme === "light" ? (
              <Sun className="h-4 w-4 text-inherit dark:text-inherit" />
            ) : (
              <MoonIcon className="h-4 w-4 text-inherit dark:text-inherit" />
            )}
          </span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
