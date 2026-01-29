"use client"

import { useEffect, useRef, useCallback } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })

  const updateCursorElements = useCallback(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Get all interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button'], [tabindex]:not([tabindex='-1'])"
    )

    const onMouseEnterElement = () => {
      gsap.to(cursor, {
        scale: 2.5,
        mixBlendMode: "difference",
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const onMouseLeaveElement = () => {
      gsap.to(cursor, {
        scale: 1,
        mixBlendMode: "normal",
        duration: 0.3,
        ease: "power2.out",
      })
    }

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterElement)
      el.addEventListener("mouseleave", onMouseLeaveElement)
    })

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterElement)
        el.removeEventListener("mouseleave", onMouseLeaveElement)
      })
    }
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current

    if (!cursor) return

    // Hide default cursor
    document.body.style.cursor = "none"

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      })
    }

    const onMouseDown = () => {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.15,
      })
    }

    const onMouseUp = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.15,
      })
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)

    // Initial setup
    const cleanup = updateCursorElements()

    // Re-attach listeners when DOM changes
    const observer = new MutationObserver(() => {
      cleanup?.()
      updateCursorElements()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      observer.disconnect()
      document.body.style.cursor = "auto"
      cleanup?.()
    }
  }, [updateCursorElements])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 bg-[#CF5C36] rounded-full pointer-events-none z-[9999] hidden lg:block"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  )
}
