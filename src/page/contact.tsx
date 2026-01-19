"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, ArrowRightIcon } from "lucide-react";
import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
} from "@radix-ui/react-icons";
import { RiWhatsappLine } from "react-icons/ri";

export default function ContactPage() {
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
    window.open(
      `https://api.whatsapp.com/send?phone=6289643657149&text=Halo%20Farel!%0ASaya%20*${name}*%2C%20dengan%20email%20${email}%0A%0A${message}`,
      "_blank"
    );
  };

  const socialLinks = [
    {
      icon: GitHubLogoIcon,
      username: "Xfhreall",
      url: "https://github.com/Xfhreall",
      color: "hover:text-white hover:bg-neutral-800",
    },
    {
      icon: LinkedInLogoIcon,
      username: "Risqi Achmad Fahreal",
      url: "https://www.linkedin.com/in/risqi-achmad-fahreal-a2b7a4289/",
      color: "hover:text-white hover:bg-blue-600 dark:hover:bg-blue-500",
    },
    {
      icon: InstagramLogoIcon,
      username: "arfah.real_",
      url: "https://www.instagram.com/arfah.real_",
      color: "hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
    },
  ];

  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="min-h-screen w-full bg-inherit dark:bg-grid-white/[0.02] bg-grid-black/[0.02] relative py-20  overflow-hidden" id="contact">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
      </div>
      
      <div className="absolute min-h-screen pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="container relative z-10 mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Get In{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-neutral-500 dark:text-neutral-400">
            Have a project in mind? Let&apos;s create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Side - Social Links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">Connect With Me</h3>
            </motion.div>

            <div className="space-y-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 p-4 rounded-xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm transition-all duration-300 ${link.color}`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80 group-hover:bg-transparent transition-colors">
                    <link.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">{link.username}</span>
                  </div>
                  <ArrowRightIcon className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.a>
              ))}
            </div>

            {/* Quick Info */}
            <motion.div
              variants={itemVariants}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-neutral-100/80 to-neutral-100/40 dark:from-neutral-900/80 dark:to-neutral-900/40 border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm"
            >
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">Quick Response</h4>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                I typically respond within 24 hours. For urgent matters, please reach out via WhatsApp.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <form
              className="p-6 md:p-8 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-xl space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-neutral-600 dark:text-neutral-300">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="bg-neutral-200/50 dark:bg-neutral-800/50 border-neutral-300/50 dark:border-neutral-700/50 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-purple-500/50 focus:ring-purple-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-neutral-600 dark:text-neutral-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-neutral-200/50 dark:bg-neutral-800/50 border-neutral-300/50 dark:border-neutral-700/50 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-purple-500/50 focus:ring-purple-500/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-neutral-600 dark:text-neutral-300">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  value={message}
                  required
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-neutral-200/50 dark:bg-neutral-800/50 border-neutral-300/50 dark:border-neutral-700/50 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-purple-500/50 focus:ring-purple-500/20 min-h-[150px] resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  onClick={handleEmailSend}
                  disabled={!isFormValid}
                  className="w-full sm:flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 h-12 md:h-14 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-purple-500/20 active:scale-[0.98]"
                >
                  <Mail className="scale-110" />
                  Send Email
                </Button>
                <Button
                  onClick={handleWhatsAppSend}
                  disabled={!isFormValid}
                  className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-12 md:h-14 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
                >
                  <RiWhatsappLine className="scale-125" />
                  WhatsApp
                </Button>
              </div>

              <p className="text-center text-neutral-500 text-xs pt-2">
                Your message will be sent directly to my inbox
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
