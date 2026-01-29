"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const fRef = useRef<HTMLSpanElement>(null)
  const rRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)
  const rocketRef = useRef<HTMLDivElement>(null)
  const contentWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Timeline for rocket + content reveal
        const exitTl = gsap.timeline({
          onComplete: onComplete,
        })

        // Rocket flies from center to top
        exitTl.to(rocketRef.current, {
          y: "-150vh",
          duration: 1.2,
          ease: "power2.in",
        })

        // At the same time, the preloader slides up
        exitTl.to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
        }, "-=1")
      },
    })

    // Start with F and R together, filling up like a loading bar
    gsap.set([fRef.current, rRef.current], { 
      x: 0,
      opacity: 1 
    })
    gsap.set(dotRef.current, { 
      scale: 0,
      opacity: 0 
    })
    gsap.set(maskRef.current, {
      scaleY: 1
    })
    // Rocket starts at bottom, off screen
    gsap.set(rocketRef.current, {
      y: "150vh",
      opacity: 0,
      rotate: -45,
    })

    // Loading animation - mask reveals letters from bottom to top
    tl.to(maskRef.current, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 2,
      ease: "power2.inOut",
    })

    // Dot appears with bounce
    tl.to(dotRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(2)",
    }, "-=0.3")

    // Show rocket - appears from bottom to center
    tl.to(rocketRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.2")

    // Small pause
    tl.to({}, { duration: 0.2 })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
    >
      {/* Rocket */}
      <div
        ref={rocketRef}
        className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          filter: "drop-shadow(0 0 30px rgba(207, 92, 54, 0.5))",
        }}
      >
        <img
          src="/rocket.png"
          alt="Rocket"
          className="w-full h-full object-contain"
        />
      </div>

      {/* FR Logo as loading indicator */}
      <div ref={contentWrapperRef} className="relative flex items-end">
        <div className="relative overflow-hidden">
          <span
            ref={fRef}
            className="text-[20vw] md:text-[15vw] font-bold text-[#EEE5E9] leading-none tracking-tighter"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            F
          </span>
        </div>
        <div className="relative overflow-hidden">
          <span
            ref={rRef}
            className="text-[20vw] md:text-[15vw] font-bold text-[#EEE5E9] leading-none tracking-tighter"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            R
          </span>
        </div>
        <span
          ref={dotRef}
          className="text-[5vw] md:text-[4vw] font-bold text-[#CF5C36] leading-none mb-[2vw]"
        >
          .
        </span>
        
        {/* Mask overlay for loading effect */}
        <div
          ref={maskRef}
          className="absolute inset-0 bg-background origin-bottom"
        />
      </div>
    </div>
  )
}
