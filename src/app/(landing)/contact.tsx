"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
} from "@radix-ui/react-icons";
import { RiTwitterXLine, RiWhatsappLine } from "react-icons/ri";

export default function ImprovedContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setIsFormValid(
      name.trim() !== "" && email.trim() !== "" && message.trim() !== ""
    );
  }, [name, email, message]);

  const handleEmailSend = () => {
    if (!isFormValid) return;
    const subject = encodeURIComponent(`Pesan dari ${name}`);
    const body = encodeURIComponent(
      `Halo saya ${name}, dengan email ${email}\n\n${message}`
    );
    window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
  };

  const handleWhatsAppSend = () => {
    if (!isFormValid) return;
    const text = encodeURIComponent(
      `Halo saya ${name}, dengan email ${email}\n\n${message}`
    );
    window.open(`https://wa.me/+6289643657149?text=${text}`, "_blank");
  };

  const socialLinks = [
    {
      icon: GitHubLogoIcon,
      username: "Xfhreall",
      url: "https://github.com/yourusername",
    },
    {
      icon: LinkedInLogoIcon,
      username: "Risqi Achmad Fahreal",
      url: "https://www.linkedin.com/in/yourname",
    },
    {
      icon: InstagramLogoIcon,
      username: "arfah.real_",
      url: "https://www.instagram.com/yourusername",
    },
    {
      icon: RiTwitterXLine,
      username: "ursnctuary",
      url: "https://twitter.com/yourusername",
    },
  ];

  if (!mounted) return null;

  return (
    <section
      className="py-8 sm:py-16 bg-background text-foreground transition-colors duration-300"
      id="contact"
    >
      <div className="container mx-auto px-4 max-w-4xl py-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="flex flex-col w-full">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 underline underline-offset-4 text-center sm:text-left">
              Contact Me
            </h2>
            <div className="lg:w-1/2 space-y-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors text-sm sm:text-base"
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.username}</span>
                </a>
              ))}
            </div>
          </div>
          <form
            className="lg:w-1/2 space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm sm:text-base">
                Nama
              </Label>
              <Input
                id="name"
                placeholder="Masukkan nama Anda"
                value={name}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                className="text-sm sm:text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm sm:text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className="text-sm sm:text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm sm:text-base">
                Pesan
              </Label>
              <Textarea
                id="message"
                placeholder="Tulis pesan Anda di sini"
                value={message}
                required
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setMessage(e.target.value)
                }
                className="text-sm sm:text-base min-h-[100px]"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleEmailSend}
                className="w-full sm:w-1/2 text-sm sm:text-base py-2"
                disabled={!isFormValid}
              >
                <Mail className="mr-2 h-4 w-4" /> Kirim Email
              </Button>
              <Button
                onClick={handleWhatsAppSend}
                className="w-full sm:w-1/2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-sm sm:text-base py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isFormValid}
              >
                <RiWhatsappLine className="mr-2 h-5 w-5" /> Kirim WhatsApp
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
