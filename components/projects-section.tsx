"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "Vendix",
    description: "E-commerce platform for modern businesses.",
    tags: ["Next.js", "TypeScript", "Stripe"],
    link: "https://vendix.online/",
    github: "https://vendix.online/",
    color: "#CF5C36",
    size: "large",
    image: "/vendix-preview.png",
  },
  {
    id: 2,
    title: "Wrapped Chat",
    description: "AI chat analytics inspired by Spotify Wrapped. Transforms conversations into beautiful interactive summaries with animated visualizations.",
    tags: ["React", "D3.js", "Node.js"],
    link: "https://wrapped-chat-beryl.vercel.app/",
    github: "https://github.com/FabioRg06/Wrapped-chat",
    color: "#EFC88B",
    size: "medium",
    image: "/wrapped-chat-preview.png",
  },
  {
    id: 3,
    title: "CV Analyzer",
    description: "AI-powered app that evaluates compatibility between resumes and job offers with insights.",
    tags: ["Python", "FastAPI", "OpenAI"],
    link: "https://cv-analyzer-iota.vercel.app/",
    github: "https://github.com/FabioRg06/cv-analyzer",
    color: "#CF5C36",
    size: "medium",
    image: "/cv-analyzer-preview.png",
  },
  {
    id: 4,
    title: "Respira",
    description: "Mental health app for journaling thoughts with empathetic AI-driven conversations and emotion analysis.",
    tags: ["Next.js", "AI", "Tailwind"],
    link: "https://github.com/FabioRg06/Respira",
    github: "https://github.com/FabioRg06/Respira",
    color: "#EFC88B",
    size: "small",
    image: "/respira-preview.png",
  },
  {
    id: 5,
    title: "YuApp",
    description: "Educational app preserving Wayuu language through interactive lessons and quizzes.",
    tags: ["React", "Firebase", "PWA"],
    link: "https://github.com/FabioRg06/yuApp",
    github: "https://github.com/FabioRg06/yuApp",
    color: "#CF5C36",
    size: "small",
    image: "/yuapp-preview.png",
  },
  {
    id: 6,
    title: "More Projects",
    description: "Check out my GitHub for more projects.",
    tags: ["GitHub", "Portfolio", "Code"],
    link: "https://github.com/FabioRg06?tab=repositories",
    github: "https://github.com/FabioRg06?tab=repositories",
    color: "#EFC88B",
    size: "small",
    image: null,
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      )

      // Projects stagger animation
      const projectCards = projectsRef.current?.querySelectorAll(".project-card")
      if (projectCards) {
        gsap.fromTo(
          projectCards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power3.out",
            delay: 0.2,
          }
        )
      }

      // Hover animations
      projectCards?.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -3,
            scale: 1.01,
            duration: 0.3,
            ease: "power2.out",
          })
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative h-screen flex flex-col justify-center px-6 md:px-12 bg-card/30 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Section header */}
        <div ref={titleRef} className="mb-6">
          <span className="text-primary font-mono text-xs tracking-widest">02.</span>
          <h2 className="text-xl md:text-2xl font-bold mt-1">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div
          ref={projectsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[120px] md:auto-rows-[140px]"
        >
          {projects.map((project) => {
            const gridClass =
              project.size === "large"
                ? "col-span-2 row-span-2"
                : project.size === "medium"
                ? "col-span-2 row-span-1"
                : "col-span-1 row-span-1"

            return (
              <article
                key={project.id}
                className={`project-card group relative bg-card border border-foreground/5 rounded-xl overflow-hidden cursor-pointer ${gridClass}`}
                data-cursor-hover
              >
                {/* Background gradient */}
                <div
                  className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${project.color}40 0%, transparent 60%)`,
                  }}
                />

                {/* Project image */}
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                  />
                )}

                {/* Project number */}
                <span
                  className="absolute top-2 left-2 text-3xl md:text-4xl font-bold opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ color: project.color }}
                >
                  {String(project.id).padStart(2, "0")}
                </span>

                {/* Links */}
                <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors"
                    aria-label="View GitHub repository"
                  >
                    <Github size={12} />
                  </a>
                  {project.link !== project.github && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors"
                      aria-label="View live project"
                    >
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                {/* Project info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-xs md:text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
                    {project.title}
                  </h3>
                  {project.size !== "small" && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.tags.slice(0, project.size === "small" ? 2 : 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono bg-foreground/5 text-muted-foreground rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: project.color }}
                />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
