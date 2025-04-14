import ContactForm from "@/components/contact-form"
import DynamicStarfield from "@/components/dynamic-starfield"
import { GlitchText } from "@/components/glitch-text"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      <DynamicStarfield />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center z-10 mt-20 mb-16 animate-fade-in">
        <div className="relative w-40 h-40 mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-700"></div>
          <div className="relative w-40 h-40 overflow-hidden rounded-full border-2 border-white/20 glow-effect">
            <Image
              src="/pixelated-gaze.png"
              alt="Alex Ivos"
              width={160}
              height={160}
              className="filter contrast-125 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
        <GlitchText text="alex ivos" className="text-3xl font-mono tracking-wider mb-2" />
        <p className="text-gray-400 font-mono text-sm max-w-md text-center px-4 typing-animation">
          developer • designer • digital creator
        </p>
      </div>

      {/* Links Section */}
      <div className="flex space-x-8 mb-16 z-10">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Link href="https://github.com" className="social-icon-link" aria-label="GitHub">
              <Github className="w-6 h-6" />
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="bg-black/80 border border-white/20 text-white font-mono">
            Check out my code
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <Link href="https://twitter.com" className="social-icon-link" aria-label="Twitter">
              <Twitter className="w-6 h-6" />
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="bg-black/80 border border-white/20 text-white font-mono">
            Follow me on Twitter
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <Link href="https://linkedin.com" className="social-icon-link" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="bg-black/80 border border-white/20 text-white font-mono">
            Connect on LinkedIn
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <Link href="#contact" className="social-icon-link" aria-label="Contact">
              <Mail className="w-6 h-6" />
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="bg-black/80 border border-white/20 text-white font-mono">
            Send me a message
          </HoverCardContent>
        </HoverCard>
      </div>

      {/* Interactive Quote */}
      <div className="w-full max-w-2xl z-10 mb-24 px-4">
        <blockquote className="border-l-2 border-purple-500 pl-4 py-2 font-mono text-gray-300 italic hover:text-white transition-colors duration-300">
          "The universe is made of stories, not of atoms."
          <footer className="text-right text-sm text-gray-400 mt-2">— Muriel Rukeyser</footer>
        </blockquote>
      </div>

      {/* Contact Form Section */}
      <div id="contact" className="w-full max-w-md z-10 mb-20 px-4">
        <h2 className="text-2xl font-mono mb-8 text-center relative inline-block w-full">
          <span className="relative z-10">get in touch</span>
          <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></span>
        </h2>
        <ContactForm />
      </div>

      {/* Footer */}
      <footer className="w-full text-center pb-6 text-xs text-gray-500 font-mono z-10">
        <p>© {new Date().getFullYear()} Alex Ivos. All rights reserved.</p>
        <p className="mt-1">Made with ❤️ for Christian Elton</p>
      </footer>
    </main>
  )
}
