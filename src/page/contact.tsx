'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, ArrowRight, Clock, MapPin, Send, MessageSquare } from 'lucide-react'
import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
} from '@radix-ui/react-icons'
import { RiWhatsappLine } from 'react-icons/ri'
import { BackgroundLines } from '@/components/background-lines'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [malangTime, setMalangTime] = useState('')

  // Live Clock for Malang, Indonesia (UTC+7 / Asia/Jakarta)
  useEffect(() => {
    const updateTime = () => {
      const timeStr = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setMalangTime(timeStr)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setIsFormValid(
      name.trim() !== '' && email.trim() !== '' && message.trim() !== ''
    )
  }, [name, email, message])

  const handleEmailSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    const subject = encodeURIComponent(`Message from ${name}`)
    const body = encodeURIComponent(
      `Hello Farel,\n\nI am ${name} (email: ${email}).\n\n${message}`
    )
    window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`
  }

  const handleWhatsAppSend = () => {
    if (!isFormValid) return
    window.open(
      `https://api.whatsapp.com/send?phone=6289643657149&text=Halo%20Farel!%0ASaya%20*${name}*%2C%20dengan%20email%20${email}%0A%0A${message}`,
      '_blank'
    )
  }

  const socialLinks = [
    {
      icon: GitHubLogoIcon,
      name: 'GitHub',
      username: '@Xfhreall',
      url: 'https://github.com/Xfhreall',
      color: 'hover:text-white hover:bg-neutral-900 hover:border-neutral-900 dark:hover:bg-neutral-800 dark:hover:border-neutral-800',
    },
    {
      icon: LinkedInLogoIcon,
      name: 'LinkedIn',
      username: 'Risqi Achmad Fahreal',
      url: 'https://www.linkedin.com/in/risqi-achmad-fahreal-a2b7a4289/',
      color: 'hover:text-white hover:bg-blue-600 hover:border-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500',
    },
    {
      icon: InstagramLogoIcon,
      name: 'Instagram',
      username: '@arfah.real_',
      url: 'https://www.instagram.com/arfah.real_',
      color: 'hover:text-white hover:bg-pink-600 hover:border-pink-600 dark:hover:bg-pink-500 dark:hover:border-pink-500',
    },
  ]

  return (
    <section className="min-h-screen w-full bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 relative py-28 overflow-hidden select-none transition-colors duration-500">
      {/* Background lines with cyan/blue accent for Contact */}
      <BackgroundLines accentColor="#00d8f6" />

      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        
        {/* Upper Header Row */}
        <div className="flex items-center gap-3 mb-10">
          <Mail className="w-4 h-4 text-[#00d8f6]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#00d8f6] font-bold">
            03 / CONTACT
          </span>
        </div>

        {/* Split Editorial Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Huge typography, live clock, info details */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-black font-bricolage tracking-tighter uppercase leading-none text-neutral-950 dark:text-white">
                SAY<br />
                HELLO<span className="text-[#00d8f6]">.</span>
              </h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium max-w-sm">
                Feel free to reach out. I am available for new job opportunities, freelance projects, or just to have a chat.
              </p>
            </div>

            {/* Live Clock Card */}
            <div className="border border-neutral-200 dark:border-white/5 bg-white/90 dark:bg-neutral-900/30 backdrop-blur-sm p-6 rounded-2xl space-y-4 relative overflow-hidden shadow-md dark:shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                  <Clock className="w-3.5 h-3.5 text-[#00d8f6]" />
                  <span>Local Time</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#06BA63]/10 text-[#06BA63] px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold tracking-wider animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#06BA63]" />
                  <span>Online</span>
                </div>
              </div>

              <div className="text-3xl md:text-4xl font-mono font-black text-neutral-900 dark:text-white tracking-wider">
                {malangTime || '00:00:00'}
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                <MapPin className="w-3 h-3" />
                <span>Malang, Indonesia (WIB)</span>
              </div>
            </div>

            {/* Social Channels List */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-bold">
                Social channels
              </h3>
              <div className="space-y-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-between p-4 rounded-xl border border-neutral-200 dark:border-white/5 bg-white/80 dark:bg-neutral-900/10 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md ${social.color}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                      <span className="text-sm font-semibold">{social.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider group-hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                        {social.username}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#00d8f6] -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (Sticky on scroll for desktop) */}
          <div className="lg:col-span-7 lg:sticky lg:top-32 lg:z-10">
            <form 
              onSubmit={handleEmailSend}
              className="border border-neutral-200 dark:border-white/5 bg-white/95 dark:bg-neutral-900/40 backdrop-blur-md p-8 md:p-10 rounded-3xl space-y-8 shadow-xl dark:shadow-2xl"
            >
              <div className="space-y-6">
                
                {/* Name Input */}
                <div className="space-y-2 relative group">
                  <Label 
                    htmlFor="name" 
                    className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-bold"
                  >
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 bg-neutral-100/50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 focus:border-[#00d8f6] dark:focus:border-[#00d8f6] focus:ring-0 rounded-xl px-4 text-sm transition-colors text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2 relative group">
                  <Label 
                    htmlFor="email" 
                    className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-bold"
                  >
                    Your Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-neutral-100/50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 focus:border-[#00d8f6] dark:focus:border-[#00d8f6] focus:ring-0 rounded-xl px-4 text-sm transition-colors text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-2 relative group">
                  <Label 
                    htmlFor="message" 
                    className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-bold"
                  >
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    required
                    placeholder="What would you like to discuss?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[160px] resize-none bg-neutral-100/50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 focus:border-[#00d8f6] dark:focus:border-[#00d8f6] focus:ring-0 rounded-xl p-4 text-sm transition-colors text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                  />
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {/* Email Send Button */}
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full sm:flex-1 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 h-14 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group shadow-lg active:scale-[0.98]"
                >
                  <span className="relative block overflow-hidden flex items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-2 transition-transform duration-500 ease-out group-hover:translate-y-[-100%]">
                      <Send className="w-3.5 h-3.5 text-[#00d8f6]" />
                      SEND EMAIL
                    </span>
                    <span className="absolute inline-flex items-center gap-2 transition-transform duration-500 ease-out translate-y-[100%] group-hover:translate-y-0 text-[#00d8f6]">
                      <Send className="w-3.5 h-3.5 text-[#00d8f6]" />
                      SEND EMAIL
                    </span>
                  </span>
                </Button>

                {/* WhatsApp Button */}
                <Button
                  type="button"
                  onClick={handleWhatsAppSend}
                  disabled={!isFormValid}
                  style={{ backgroundColor: '#06BA63' }}
                  className="w-full sm:flex-1 hover:brightness-110 text-white h-14 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group shadow-lg active:scale-[0.98]"
                >
                  <span className="relative block overflow-hidden flex items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-2 transition-transform duration-500 ease-out group-hover:translate-y-[-100%]">
                      <RiWhatsappLine className="w-4 h-4 scale-105" />
                      WHATSAPP
                    </span>
                    <span className="absolute inline-flex items-center gap-2 transition-transform duration-500 ease-out translate-y-[100%] group-hover:translate-y-0 text-white">
                      <MessageSquare className="w-3.5 h-3.5" />
                      OPEN CHAT
                    </span>
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
