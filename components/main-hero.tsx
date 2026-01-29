"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import Image from "next/image"

export function MainHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const fRef = useRef<HTMLSpanElement>(null)
  const rRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const fabioRef = useRef<HTMLSpanElement>(null)
  const romeroRef = useRef<HTMLSpanElement>(null)
  const separatorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.5,
    })

    // Initial state - F and R together in center
    gsap.set([fRef.current, rRef.current], {
      opacity: 1,
    })
    gsap.set(dotRef.current, {
      opacity: 1,
      scale: 1,
    })
    gsap.set([fabioRef.current, romeroRef.current, separatorRef.current], {
      opacity: 0,
      y: 50,
    })

    // Animate F to the left with spring
    tl.to(fRef.current, {
      x: "-10vw",
      duration: 1.2,
      ease: "elastic.out(1, 0.5)",
    })

    // Simultaneously animate R to the right with spring
    tl.to(rRef.current, {
      x: "10vw",
      duration: 1.2,
      ease: "elastic.out(1, 0.5)",
    }, "<")

    // Move dot with R
    tl.to(dotRef.current, {
      x: "10vw",
      duration: 1.2,
      ease: "elastic.out(1, 0.5)",
    }, "<")

    // Reveal ABIO after F (completing FABIO)
    tl.to(fabioRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.6")

    // Reveal separator dot
    tl.to(separatorRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.4")

    // Reveal OMERO after R (completing ROMERO)
    tl.to(romeroRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.6")

    // Subtle floating animation after reveal
    tl.to(containerRef.current, {
      y: "-=10",
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section className="relative min-h-screen bg-background flex flex-col">
      {/* Logo in top left */}
      <div ref={logoRef} className="absolute top-8 left-8 z-10">
        <Image
          src="/logo-fr.png"
          alt="FR Logo"
          width={80}
          height={80}
          className="w-16 md:w-20 h-auto"
        />
      </div>

      {/* Main content centered */}
      <div className="flex-1 flex items-center justify-center">
        <div
          ref={containerRef}
          className="relative flex items-center justify-center"
        >
          {/* FABIO */}
          <div className="flex items-baseline">
            <span
              ref={fRef}
              className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold text-[#EEE5E9] leading-none tracking-tighter select-none"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              F
            </span>
            <span
              ref={fabioRef}
              className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold text-[#EEE5E9] leading-none tracking-tighter select-none"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              ABIO
            </span>
          </div>

          {/* Separator dot */}
          <span
            ref={separatorRef}
            className="text-[8vw] md:text-[6vw] lg:text-[5vw] font-bold text-[#CF5C36] leading-none mx-2 select-none"
          >
            .
          </span>

          {/* ROMERO */}
          <div className="flex items-baseline">
            <span
              ref={rRef}
              className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold text-[#EEE5E9] leading-none tracking-tighter select-none"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              R
            </span>
            <span
              ref={romeroRef}
              className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold text-[#EEE5E9] leading-none tracking-tighter select-none"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              OMERO
            </span>
            <span
              ref={dotRef}
              className="text-[4vw] md:text-[3vw] lg:text-[2.5vw] font-bold text-[#CF5C36] leading-none ml-1 mb-[3vw] select-none"
            >
              .
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[#7C7C7C] text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#CF5C36] to-transparent animate-pulse" />
      </div>
    </section>
  )
}
