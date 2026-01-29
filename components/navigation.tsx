"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import Image from "next/image"

export function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Initial animation - animate the whole nav
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
    )

    // Scroll effect - hide on scroll down, show on scroll up
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY

          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down - hide navbar
            if (isVisible) {
              setIsVisible(false)
              gsap.to(navRef.current, {
                y: -80,
                opacity: 0,
                duration: 0.4,
                ease: "power2.inOut",
              })
            }
          } else if (currentScrollY < lastScrollY) {
            // Scrolling up - show navbar
            if (!isVisible) {
              setIsVisible(true)
              gsap.to(navRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
              })
            }
          }

          setLastScrollY(currentScrollY)
          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, isVisible])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <a
          href="#hero"
          className="relative transition-all duration-300 cursor-pointer group"
          style={{
            mixBlendMode: "difference"
          }}
        >
          <Image
            src="/logoFR.png"
            alt="FR"
            width={50}
            height={25}
            className="h-6 w-auto object-contain"
          />
        </a>
      </div>
    </nav>
  )
}
