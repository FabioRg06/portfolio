"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Text paragraphs animation
      gsap.fromTo(
        textRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Image animation with parallax
      gsap.fromTo(
        imageRef.current,
        { scale: 1.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative h-screen flex items-center px-6 md:px-12 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section header */}
        <div className="mb-2 md:mb-3">
          <span className="text-primary font-mono text-xs tracking-widest">01.</span>
          <h2
            ref={titleRef}
            className="text-lg md:text-xl font-bold mt-1"
          >
            About <span className="text-gradient">Me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-3 md:gap-5 items-center">
          {/* Text content */}
          <div ref={textRef} className="space-y-1.5">
            <div>
              <p className="text-base md:text-lg font-bold text-foreground leading-tight">
                Fabio Romero
              </p>
              <p className="text-xs text-muted-foreground">
                Junior Software Developer & Systems Engineering Student
              </p>
            </div>

            <p className="text-xs text-muted-foreground leading-snug">
              Developer from <span className="text-primary font-medium">Riohacha, La Guajira, Colombia</span>. Passionate about building clean, scalable software with strong backend foundation and AI-powered workflows.
            </p>

            <p className="text-xs text-muted-foreground leading-snug">
              Focus on modern architecture, system design, and scalable solutions. Open to global remote opportunities.
            </p>

            <div className="pt-0">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-primary font-medium line-animation text-xs"
              >
                Let&apos;s work together
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[50vh] lg:h-[52vh]">
            <div
              ref={imageRef}
              className="relative h-full rounded-2xl overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-secondary/20" />

              {/* Profile image */}
              <img
                src="/fabio-muppet.png"
                alt="Fabio Romero"
                className="absolute inset-0 w-3/4 h-3/4 m-auto object-contain drop-shadow-2xl"
              />

              {/* Decorative frame */}
              <div className="absolute inset-4 border border-primary/30 rounded-xl" />

              {/* Profile info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-background to-transparent">
                <p className="font-mono text-xs text-primary mb-1">{'<Developer />'}</p>
                <h3 className="text-base md:text-lg font-bold text-foreground">Fabio Romero</h3>
                <p className="text-xs text-muted-foreground">Riohacha, La Guajira</p>
              </div>
            </div>

            {/* Floating decorations */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-primary/20 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/5 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
