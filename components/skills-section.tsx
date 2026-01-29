"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const allTechs = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", category: "Languages" },
  { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg", category: "Languages" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", category: "Languages" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", category: "Languages" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", category: "Languages" },
  { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg", category: "Languages" },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg", category: "Backend" },
  { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg", category: "Backend" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", category: "Backend" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg", category: "Backend" },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg", category: "Backend" },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg", category: "Backend" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", category: "Frontend" },
  { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg", category: "Frontend" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", category: "Frontend" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", category: "Database" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", category: "Database" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg", category: "Database" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", category: "DevOps" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", category: "DevOps" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", category: "DevOps" },
  { name: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg", category: "DevOps" },
]

function TechOrb({
  tech,
  index,
  total,
  isActive,
  onClick,
  sphereRotation
}: {
  tech: typeof allTechs[0]
  index: number
  total: number
  isActive: boolean
  onClick: () => void
  sphereRotation: { x: number; y: number }
}) {
  const orbRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0, zIndex: 0 })

  // Calculate position in a sphere - useLayoutEffect for synchronous calculation
  useLayoutEffect(() => {
    const phi = Math.acos(-1 + (2 * index) / total)
    const theta = Math.sqrt(total * Math.PI) * phi
    const radius = 170

    const x = radius * Math.cos(theta) * Math.sin(phi)
    const y = radius * Math.sin(theta) * Math.sin(phi)
    const z = radius * Math.cos(phi)

    setPosition({ x, y, z, zIndex: Math.round(z + radius) })
  }, [index, total])

  useEffect(() => {
    if (!orbRef.current) return

    if (isActive) {
      gsap.to(orbRef.current, {
        scale: 1.5,
        zIndex: 100,
        duration: 0.5,
        ease: "back.out(1.7)",
      })
    } else {
      gsap.to(orbRef.current, {
        scale: 1,
        zIndex: position.zIndex,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }, [isActive, position.zIndex])

  // Billboarding: counter-rotate the content so it always faces the camera
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.transform = `rotateY(${-sphereRotation.y}deg) rotateX(${-sphereRotation.x}deg)`
    }
  }, [sphereRotation])

  return (
    <div
      ref={orbRef}
      className="tech-orb absolute cursor-pointer"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`,
        zIndex: position.zIndex,
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      data-cursor-hover
    >
      {/* This div counter-rotates to always face the camera (billboarding) */}
      <div 
        ref={contentRef}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className={`
            relative w-10 h-10 md:w-12 md:h-12 rounded-full
            flex items-center justify-center
            transition-all duration-300
            ${isHovered || isActive ? "bg-primary/20 shadow-[0_0_40px_rgba(207,92,54,0.5)]" : "bg-card/80"}
          `}
          style={{
            border: `2px solid ${isHovered || isActive ? "#CF5C36" : "rgba(238, 229, 233, 0.1)"}`,
            backdropFilter: "blur(10px)",
          }}
        >
          <img
            src={tech.icon || "/placeholder.svg"}
            alt={tech.name}
            className={`w-5 h-5 md:w-7 md:h-7 object-contain transition-all duration-300 ${isHovered || isActive ? "scale-110 drop-shadow-[0_0_10px_rgba(207,92,54,0.8)]" : ""}`}
            crossOrigin="anonymous"
          />
        </div>

        {/* Tooltip */}
        <div
          className={`
            absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap
            px-1.5 py-0.5 rounded-full text-[9px] font-medium
            bg-card border border-primary/30 text-foreground
            transition-all duration-300
            ${isHovered || isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
          `}
        >
          {tech.name}
        </div>
      </div>
    </div>
  )
}

function FloatingTech3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sphereRef = useRef<HTMLDivElement>(null)
  const [activeTech, setActiveTech] = useState<number | null>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const rotationRef = useRef(rotation)

  // Keep rotationRef in sync
  useEffect(() => {
    rotationRef.current = rotation
  }, [rotation])

  // Reset rotation when component mounts
  useEffect(() => {
    setRotation({ x: 0, y: 0 })
    setAutoRotate(true)
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (!sphereRef.current || !autoRotate) return

    let currentY = rotationRef.current.y
    const tl = gsap.timeline({ repeat: -1 })
    tl.to({}, {
      duration: 60,
      ease: "none",
      onUpdate: function () {
        if (sphereRef.current && autoRotate && !isDragging) {
          currentY += 0.1
          const newRotation = { x: rotationRef.current.x, y: currentY }
          rotationRef.current = newRotation
          setRotation(newRotation)
          sphereRef.current.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${currentY}deg)`
        }
      },
    })

    return () => {
      tl.kill()
    }
  }, [autoRotate, isDragging])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      setAutoRotate(false)
      lastMousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sphereRef.current) return

      const deltaX = e.clientX - lastMousePos.current.x
      const deltaY = e.clientY - lastMousePos.current.y

      const newRotation = {
        x: rotationRef.current.x - deltaY * 0.5,
        y: rotationRef.current.y + deltaX * 0.5,
      }
      rotationRef.current = newRotation
      setRotation(newRotation)

      sphereRef.current.style.transform = `rotateX(${newRotation.x}deg) rotateY(${newRotation.y}deg)`

      lastMousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setTimeout(() => setAutoRotate(true), 2000)
    }

    container.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      container.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[45vh] md:h-[50vh] flex items-center justify-center cursor-grab active:cursor-grabbing"
      style={{ perspective: "1000px" }}
    >
      {/* Center glow */}
      <div className="absolute w-32 h-32 rounded-full bg-primary/20 blur-3xl" />

      {/* 3D Sphere container */}
      <div
        ref={sphereRef}
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {allTechs.map((tech, index) => (
          <TechOrb
            key={tech.name}
            tech={tech}
            index={index}
            total={allTechs.length}
            isActive={activeTech === index}
            onClick={() => setActiveTech(activeTech === index ? null : index)}
            sphereRotation={rotation}
          />
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
        <p className="text-muted-foreground text-xs font-mono">
          <span className="text-primary">{"<"}</span> Drag to rotate <span className="text-primary">{"/>"}</span>
        </p>
      </div>
    </div>
  )
}

function TechCard3D({ tech }: { tech: typeof allTechs[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      gsap.to(card, {
        rotateX: -rotateX,
        rotateY: -rotateY,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.to(glow, {
        x: x - 50,
        y: y - 50,
        opacity: 1,
        duration: 0.3,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      })

      gsap.to(glow, {
        opacity: 0,
        duration: 0.3,
      })
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="tech-card-3d relative group cursor-pointer"
      style={{ 
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      data-cursor-hover
    >
      <div
        className="relative p-3 md:p-4 rounded-2xl border border-foreground/10 bg-card/30 backdrop-blur-md overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Moving glow */}
        <div
          ref={glowRef}
          className="absolute w-[100px] h-[100px] rounded-full opacity-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(207, 92, 54, 0.4) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* Card content */}
        <div
          className="relative flex flex-col items-center gap-2"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="relative">
            {/* Rotating ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-spin"
              style={{
                animationDuration: "8s",
                width: "50px",
                height: "50px",
                left: "-5px",
                top: "-5px",
              }}
            />
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src={tech.icon || "/placeholder.svg"}
                alt={tech.name}
                className="w-8 h-8 object-contain drop-shadow-[0_0_15px_rgba(207,92,54,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(207,92,54,0.6)] transition-all duration-300"
                crossOrigin="anonymous"
              />
            </div>
          </div>

          <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
            {tech.name}
          </span>

          <span className="text-[10px] text-muted-foreground font-mono">
            {tech.category}
          </span>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/50 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/50 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/50 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/50 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  )
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = useState<"sphere" | "grid">("sphere")
  const [sphereKey, setSphereKey] = useState(0)

  const handleViewModeChange = (mode: "sphere" | "grid") => {
    if (mode === "sphere") {
      setSphereKey(prev => prev + 1)
    }
    setViewMode(mode)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      if (viewMode === "grid" && cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".tech-card-3d")
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, rotateX: -15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.03,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [viewMode])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={titleRef} className="mb-4 text-center">
          <span className="text-primary font-mono text-xs tracking-widest">03.</span>
          <h2 className="text-lg md:text-xl font-bold mt-1">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>

          {/* View toggle */}
          <div className="flex items-center justify-center gap-2 md:gap-3 mt-3">
            <button
              onClick={() => handleViewModeChange("sphere")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                viewMode === "sphere"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-foreground/10 text-muted-foreground hover:text-foreground"
              }`}
              data-cursor-hover
            >
              3D View
            </button>
            <button
              onClick={() => handleViewModeChange("grid")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-foreground/10 text-muted-foreground hover:text-foreground"
              }`}
              data-cursor-hover
            >
              Grid View
            </button>
          </div>
        </div>

        {/* Content based on view mode */}
        {viewMode === "sphere" ? (
          <FloatingTech3D key={sphereKey} />
        ) : (
          <div
            ref={cardsRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3"
          >
            {allTechs.map((tech) => (
              <TechCard3D key={tech.name} tech={tech} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
