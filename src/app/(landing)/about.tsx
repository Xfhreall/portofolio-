import React from "react";
import { FlipWords } from "@/components/ui/flip-words";

export function About() {
  const words = ["Sir!", "Miss!", "Friend!", "There!"];

  return (
    <div className="h-screen flex justify-center items-center px-4">
      <span className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-100">
        Hello
        <FlipWords
          words={words}
          className="border border-white bg-neutral-900 dark:bg-neutral-100 backdrop-blur-xl"
        />{" "}
        <br />
        I&apos;m a Front End Developer
      </span>
    </div>
  );
}
