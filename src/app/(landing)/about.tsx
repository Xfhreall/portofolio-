"use client";

import React, { useRef } from "react";
import { FlipWords } from "@/components/ui/flip-words";
import Image from "next/image";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
} from "@radix-ui/react-icons";
import { RiTwitterXLine } from "react-icons/ri";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

type sosmedProps = {
  icon: React.ElementType;
  link: string;
  thumbnail: string;
};

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60% 0px" });

  const words = ["Sir!", "Miss!", "Friend!", "There!"];
  const sosmed: sosmedProps[] = [
    {
      icon: LinkedInLogoIcon,
      link: "https://www.linkedin.com/in/risqi-achmad-fahreal-a2b7a4289/",
      thumbnail: "linkedin",
    },
    {
      icon: RiTwitterXLine,
      link: "https://x.com/ursnctuary",
      thumbnail: "x",
    },
    {
      icon: InstagramLogoIcon,
      link: "https://www.instagram.com/arfah.real_",
      thumbnail: "instagram",
    },
    {
      icon: GitHubLogoIcon,
      link: "https://github.com/",
      thumbnail: "github",
    },
  ];

  return (
    <section className="min-h-screen" id="about">
      <div className="h-full w-full bg-inherit dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center space-y-4">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div
          ref={ref}
          className="flex justify-center flex-col md:flex-row items-center h-full max-w-screen-lg mx-auto px-4 bg-transparent backdrop-blur-[2px] py-14"
        >
          <div className="w-full sm:w-1/2 flex flex-col items-center mb-8 md:mb-0">
            <motion.div
              initial={{ filter: "blur(100px)", opacity: 0, scale: 2 }}
              animate={
                isInView ? { filter: "blur(0px)", opacity: 1, scale: 1 } : {}
              }
              transition={{ duration: 1 }}
            >
              <HoverBorderGradient
                containerClassName="rounded-full"
                className="dark:bg-black bg-white text-black dark:text-white cursor-default"
              >
                <Image
                  src="https://i.pinimg.com/originals/82/0a/31/820a31ebc7a75832858aed4f0db952fb.jpg"
                  className="rounded-full border-2 hover:brightness-75 transition-all h-48 md:h-60 w-auto"
                  alt="Profile picture"
                  width={400}
                  height={400}
                />
              </HoverBorderGradient>
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4"
            >
              <h2 className="text-xl md:text-3xl font-semibold">
                Risqi <br className="hidden md:block" />
                Achmad Fahreal
              </h2>
              <p className="font-mono tracking-wider dark:text-neutral-500 text-neutral-600 text-center md:text-start">
                Farel · he/him
              </p>
            </motion.div>
          </div>
          <motion.div
            className="w-full sm:w-1/2 space-y-8"
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text space-y-4">
              <div className="border-b-2 pb-2 border-neutral-500">
                <span className="text-2xl md:text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-100">
                  Hello
                  <FlipWords
                    words={words}
                    className="border border-white bg-neutral-900 dark:bg-neutral-100 backdrop-blur-xl"
                  />
                  <br />
                  Let&apos;s get started.
                </span>
              </div>
              <p className="text-justify leading-7 text-xs md:text-base">
                A software engineer based in Malang, Indonesia. I specialize in
                <strong> front end development</strong>. I use technologies such
                as React, Vite, Next js, Tailwind, and other technologies and
                tools to add attractiveness, integrate systems, deploy, and
                maintain applications. Additionally, I&apos;m a
                <strong>
                  {" "}
                  Computer Science student at Brawijaya University.
                </strong>
              </p>
            </div>
            <div className="icon flex gap-4">
              {sosmed.map((sosmed, index) => (
                <Link
                  key={index}
                  href={sosmed.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:text-primary-500"
                >
                  <sosmed.icon className="h-6 w-6 hover:scale-110 duration-300 transition ease-in-out" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
