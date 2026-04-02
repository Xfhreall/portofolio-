"use client";

import React, { useRef } from "react";
import { FlipWords } from "@/components/ui/flip-words";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
} from "@radix-ui/react-icons";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { PixelatedCanvas } from "@/components/ui/pixel-canvas";

type sosmedProps = {
  icon: React.ElementType;
  link: string;
  thumbnail: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as number[] },
  },
};

const socialIconVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as number[],
    },
  }),
};
export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30% 0px" });

  const words = ["Sir!", "Miss!", "Friend!", "There!"];
  const sosmed: sosmedProps[] = [
    {
      icon: LinkedInLogoIcon,
      link: "https://www.linkedin.com/in/risqi-achmad-fahreal-a2b7a4289/",
      thumbnail: "linkedin",
    },
    {
      icon: InstagramLogoIcon,
      link: "https://www.instagram.com/arfah.real_",
      thumbnail: "instagram",
    },
    {
      icon: GitHubLogoIcon,
      link: "https://github.com/Xfhreall",
      thumbnail: "github",
    },
  ];

  // Image parallax
  const { scrollYProgress: imageScrollProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useSpring(
    useTransform(imageScrollProgress, [0, 1], [-20, 20]),
    { stiffness: 300, damping: 30 }
  );
  const imageScale = useTransform(
    imageScrollProgress,
    [0, 0.5, 1],
    [1.05, 1, 1.05]
  );


  return (
    <div
      className="min-h-screen w-full bg-inherit dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center space-y-4"
      id="about"
    >
      <div className="absolute min-h-screen pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div
        ref={ref}
        className="flex justify-center flex-col md:flex-row items-center min-h-screen max-w-screen-lg mx-auto px-4 bg-transparent backdrop-blur-[2px] py-14"
      >
        {/* Left Column - Image */}
        <div
          ref={imageRef}
          className="w-full sm:w-1/2 flex flex-col items-center mb-8 md:mb-0"
        >
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            initial={{ filter: "blur(100px)", opacity: 0 }}
            animate={
              isInView ? { filter: "blur(0px)", opacity: 1 } : {}
            }
            transition={{ duration: 1 }}
          >
            <HoverBorderGradient
              containerClassName="rounded-full overflow-hidden isolate"
              className="dark:bg-black bg-white text-black size-[298px] dark:text-white cursor-default aspect-square border border-black"
            >
              <PixelatedCanvas
                src="https://i.ibb.co.com/Fkzd1dG9/Screenshot-from-2026-01-04-21-30-07-removebg-preview.png"
                width={290}
                height={290}
                cellSize={3}
                dotScale={0.9}
                shape="square"
                backgroundColor="#000000"
                dropoutStrength={0}
                interactive
                distortionStrength={3}
                distortionRadius={80}
                distortionMode="swirl"
                followSpeed={0.2}
                jitterStrength={5}
                jitterSpeed={5}
                sampleAverage
                tintColor="#FFFFFF"
                tintStrength={0.12}
                className="rounded-full brightness-110 block"
              />
            </HoverBorderGradient>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-center md:text-left"
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

        {/* Right Column - Text */}
        <motion.div
          className="w-full sm:w-1/2 space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {/* Greeting */}
          <motion.div
            variants={itemVariants}
            className="text space-y-4"
          >
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
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-justify leading-8 text-xs md:text-base"
          >
            A software engineer based in Malang, Indonesia. I specialize in
            <strong> front end development</strong>. I use technologies such
            as React, Laravel, Next js, Tanstack Start, Expo, Kotlin, and other technologies and
            tools to add attractiveness, integrate systems, deploy, and
            maintain applications. Additionally, I&apos;m a
            <strong>
              {" "}
              Informatics Engineering student at Brawijaya University.
            </strong>
          </motion.p>

          {/* Resume + Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 items-center"
          >
            <HoverBorderGradient
              as="a"
              containerClassName="rounded-full"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center gap-2 px-4 py-2"
              {...{ href: "/CV_Risqi Achmad Fahreal.pdf", download: true }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Resume
            </HoverBorderGradient>

            {sosmed.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                custom={index}
                variants={socialIconVariants}
                whileHover={{ scale: 1.15, rotate: 8 }}
                whileTap={{ scale: 0.9 }}
                className="dark:text-neutral-400 text-neutral-600 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300"
              >
                <item.icon className="h-6 w-6" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
