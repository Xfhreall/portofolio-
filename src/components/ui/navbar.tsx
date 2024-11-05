"use client";
import React from "react";
import { FloatingNav } from "../ui/floating-navbar";
import { House, MessageCircle } from "lucide-react";
import { CodeIcon, PersonIcon } from "@radix-ui/react-icons";

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <House className="h-4 w-4 text-inherit dark:text-inherit" />,
    },
    {
      name: "About",
      link: "#about",
      icon: <PersonIcon className="h-4 w-4 text-inherit dark:text-inherit" />,
    },
    {
      name: "Project",
      link: "#project",
      icon: <CodeIcon className="h-4 w-4 text-inherit dark:text-inherit" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: (
        <MessageCircle className="h-4 w-4 text-inherit dark:text-inherit" />
      ),
    },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
