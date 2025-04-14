"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  twinkleSpeed: number
  twinklePhase: number
}

export default function DynamicStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let lastTime = 0

    // Set canvas dimensions to match window
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    // Initialize stars
    const initStars = () => {
      const stars: Star[] = []
      const starCount = Math.min(Math.max(window.innerWidth, window.innerHeight) / 3, 300)

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.05 + 0.01,
          twinkleSpeed: Math.random() * 0.01 + 0.003,
          twinklePhase: Math.random() * Math.PI * 2,
        })
      }

      starsRef.current = stars
    }

    // Track mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    // Animation loop
    const animate = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time

      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Calculate mouse influence (parallax effect)
      const mouseXRatio = mouseRef.current.x / canvas.width - 0.5
      const mouseYRatio = mouseRef.current.y / canvas.height - 0.5

      // Draw and update stars
      starsRef.current.forEach((star) => {
        // Update twinkle phase
        star.twinklePhase += star.twinkleSpeed * deltaTime

        // Calculate current opacity based on twinkle
        const twinkleEffect = Math.sin(star.twinklePhase) * 0.3 + 0.7
        const currentOpacity = star.opacity * twinkleEffect

        // Apply parallax effect based on mouse position
        const parallaxX = mouseXRatio * star.size * 15
        const parallaxY = mouseYRatio * star.size * 15

        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
        ctx.beginPath()
        ctx.arc(star.x + parallaxX, star.y + parallaxY, star.size, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect for larger stars
        if (star.size > 1.2) {
          ctx.beginPath()
          ctx.arc(star.x + parallaxX, star.y + parallaxY, star.size * 3, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(
            star.x + parallaxX,
            star.y + parallaxY,
            0,
            star.x + parallaxX,
            star.y + parallaxY,
            star.size * 3,
          )
          gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.3})`)
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Occasionally create a shooting star
        if (Math.random() < 0.00001 * deltaTime) {
          createShootingStar(ctx, canvas)
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    // Create a shooting star
    const createShootingStar = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const x = Math.random() * canvas.width
      const y = Math.random() * (canvas.height / 3) // Only in top third
      const length = Math.random() * 100 + 50
      const angle = Math.PI / 4 + Math.random() * (Math.PI / 4) // Angle between PI/4 and PI/2 (diagonal down)

      const shootingStar = {
        x,
        y,
        length,
        angle,
        progress: 0,
      }

      const shootingStarAnimation = () => {
        if (shootingStar.progress >= 1) return

        shootingStar.progress += 0.02

        const tailX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.length * shootingStar.progress
        const tailY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.length * shootingStar.progress

        const gradient = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY)

        const alpha = 1 - shootingStar.progress
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`)
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.beginPath()
        ctx.moveTo(shootingStar.x, shootingStar.y)
        ctx.lineTo(tailX, tailY)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()

        requestAnimationFrame(shootingStarAnimation)
      }

      shootingStarAnimation()
    }

    // Initialize
    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
}
