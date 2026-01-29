"use client"

import { useState } from "react"
import { Preloader } from "@/components/preloader"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <CustomCursor />
      
      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}

      <main className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        {/* Noise overlay */}
        <div className="noise-overlay" />
        
        <Navigation />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
