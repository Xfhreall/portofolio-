"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";
import { Highlight } from "./hero-highlight";

export const TextGenerateEffect = ({
  className,
  filter = true,
  duration = 1,
}: {
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const words = `Welcome! Let's Turn Your Vision into Reality.`;
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration,
        delay: stagger(0.2),
      }
    );
  }, [animate, duration, filter]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          if (word === "into" || word === "Reality.") {
            return (
              <motion.span
                key={word + idx}
                className="dark:text-white text-black opacity-0 inline-block"
                style={{
                  filter: filter ? "blur(10px)" : "none",
                }}
              >
                {idx === wordsArray.indexOf("into") ? (
                  <>
                    <Highlight>
                      into Reality
                      <motion.span
                        className="inline-block"
                        style={{
                          filter: filter ? "blur(10px)" : "none",
                        }}
                      >
                        .
                      </motion.span>
                    </Highlight>{" "}
                  </>
                ) : null}{" "}
              </motion.span>
            );
          }
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-black opacity-0 inline-block pl-1"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="dark:text-white text-black text-3xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
