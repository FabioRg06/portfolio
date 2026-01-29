"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUp, Heart } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const bigTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Big text animation
      gsap.fromTo(
        bigTextRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bigTextRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer ref={footerRef} className="relative py-16 px-6 md:px-12 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto">
        {/* Big text */}
        <div ref={bigTextRef} className="mb-16 overflow-hidden">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground/5 tracking-tighter text-center">
            FABIO<span className="text-primary/20">.</span>ROMERO
          </h2>
        </div>

        {/* Footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Hecho con</span>
            <Heart size={16} className="text-primary animate-pulse" />
            <span>por Fabio Romero</span>
            <span className="mx-2">•</span>
            <span>{new Date().getFullYear()}</span>
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            Volver arriba
            <ArrowUp
              size={18}
              className="group-hover:-translate-y-1 transition-transform"
            />
          </button>
        </div>

        {/* Legal links */}
        <div className="flex justify-center gap-8 mt-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">
            Política de privacidad
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Términos de servicio
          </a>
        </div>
      </div>
    </footer>
  )
}
