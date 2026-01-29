"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowDown, Github, Linkedin, Instagram as InstagramIcon } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const expandingDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mouse parallax effect on title
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX - window.innerWidth / 2) / 30
        const y = (e.clientY - window.innerHeight / 2) / 30

        gsap.to(titleRef.current, {
          x: x,
          y: y,
          duration: 0.5,
          ease: "power2.out"
        })
      }

      window.addEventListener("mousemove", handleMouseMove)

      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.8 }
      )

      // Social links animation
      gsap.fromTo(
        socialRef.current?.children || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 1.3 }
      )

      // Scroll indicator animation
      gsap.fromTo(
        scrollRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.5 }
      )

      gsap.to(scrollRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 2,
      })

      // Expanding dot animation on scroll - the expanding dot grows to cover screen
      gsap.to(expandingDotRef.current, {
        scale: 400,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=800",
          scrub: 1,
        }
      })

      // Hide scroll indicator and social links as dot expands
      gsap.to([scrollRef.current, socialRef.current], {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "20% top",
          end: "40% top",
          scrub: 1,
        }
      })

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 overflow-hidden"
    >
      {/* Background gradient circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      {/* Grid lines background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#CF5C36 1px, transparent 1px), linear-gradient(90deg, #CF5C36 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* Main Title */}
      <div className="relative z-10">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-[10rem] xl:text-[11rem] font-bold text-foreground tracking-tighter text-center"
          style={{ willChange: "transform" }}
        >
          FABIO<span ref={dotRef} className="text-primary inline-block">.</span>ROMERO
        </h1>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground tracking-widest">SCROLL</span>
        <ArrowDown size={20} className="text-primary" />
      </div>

      {/* Social Links - Bottom Left */}
      <div
        ref={socialRef}
        className="absolute bottom-12 left-16 md:left-24 flex items-center gap-4"
      >
        <a
          href="https://github.com/FabioRg06"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors duration-300"
          aria-label="GitHub"
        >
          <Github size={16} />
        </a>
        <div className="w-4 h-px bg-muted-foreground/30" />
        <a
          href="https://www.linkedin.com/in/fabio-de-jesús-romero-gómez-ab5745309"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <Linkedin size={16} />
        </a>
        <div className="w-4 h-px bg-muted-foreground/30" />
        <a
          href="https://www.instagram.com/is.fabior?igsh=Ym9ucjNxYjF6NTl2&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors duration-300"
          aria-label="Instagram"
        >
          <InstagramIcon size={16} />
        </a>
        <div className="w-4 h-px bg-muted-foreground/30" />
      </div>
    </section>
  )
}
