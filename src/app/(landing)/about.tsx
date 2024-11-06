import React from "react";
import { FlipWords } from "@/components/ui/flip-words";
import Image from "next/image";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

type sosmedProps = {
  icon: React.ElementType;
  link: string;
  thumbnail: string;
};

export function About() {
  const words = ["Sir!", "Miss!", "Friend!", "There!"];
  const sosmed: sosmedProps[] = [
    {
      icon: LinkedInLogoIcon,
      link: "https://www.linkedin.com/in/risqi-achmad-fahreal-a2b7a4289/",
      thumbnail: "linkedin",
    },
    {
      icon: TwitterLogoIcon,
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
    <section className="h-screen" id="about">
      <div className="h-full w-full bg-inherit dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center space-y-4">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="flex justify-center items-center h-full max-w-screen-lg mx-auto px-4 bg-transparent backdrop-blur-[2px]">
          <div className="w-1/2 flex flex-col items-center">
            <HoverBorderGradient
              containerClassName="rounded-full"
              className="dark:bg-black bg-white text-black dark:text-white"
            >
              <Image
                src="https://i.pinimg.com/originals/82/0a/31/820a31ebc7a75832858aed4f0db952fb.jpg"
                className="rounded-full border-2 hover:brightness-75 transition-all h-60 w-auto"
                alt="...."
                width={400}
                height={400}
              />
            </HoverBorderGradient>
            <div className="mt-4">
              <h2 className="text-3xl font-semibold">
                Risqi
                <br />
                Achmad Fahreal
              </h2>
              <p className="font-mono tracking-wider dark:text-neutral-500 text-neutral-600">
                Farel · he/him
              </p>
            </div>
          </div>
          <div className="w-1/2 space-y-8">
            <div className="text space-y-4">
              <div className="border-b-2 pb-2 border-neutral-500">
                <span className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-100">
                  Hello
                  <FlipWords
                    words={words}
                    className="border border-white bg-neutral-900 dark:bg-neutral-100 backdrop-blur-xl"
                  />
                  <br />
                  Let&apos;s get started.
                </span>
              </div>
              <p className="text-justify leading-7">
                A software engineer based in Malang, Indonesia. I specialize in
                <strong> front end development</strong>. I use technologies such
                as react, vite, next, tailwind, and other technologies and tools
                to add attractiveness, integrate systems, deploy, and maintain
                applications. Additionaly, i&apos;m an
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
          </div>
        </div>
      </div>
    </section>
  );
}
