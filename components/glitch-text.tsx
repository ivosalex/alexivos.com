"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    // Initial glitch on load
    setTimeout(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 1000)
    }, 500)

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200 + Math.random() * 400)
      }
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className={cn("relative", className)}>
      <span className="relative z-10">{text}</span>

      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 text-cyan-500 z-0"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`,
              opacity: 0.8,
            }}
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 text-red-500 z-0"
            style={{
              clipPath: "polygon(0 45%, 100% 45%, 100% 100%, 0 100%)",
              transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`,
              opacity: 0.8,
            }}
          >
            {text}
          </span>
        </>
      )}
    </div>
  )
}
