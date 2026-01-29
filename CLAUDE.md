# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio website for Fabio Romero, a Full Stack Developer. Built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4.

## Development Commands

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### App Structure
- **`app/`** - Next.js App Router directory. Contains `layout.tsx` (root layout with fonts and metadata), `globals.css` (global styles and theme), and `page.tsx` (main page composition).
- **`components/`** - All React components organized by section (hero, about, projects, skills, contact, navigation, footer, preloader, custom-cursor).
- **`lib/utils.ts`** - Utility functions including `cn()` for merging Tailwind classes.

### Theme System
The app uses a **dark-only theme** with a custom color palette defined in `app/globals.css`. CSS custom properties are used throughout:

| Token | Color | Usage |
|-------|-------|-------|
| `--primary` | #CF5C36 | Burnt orange (main accent) |
| `--secondary` | #EFC88B | Golden peach (secondary accent) |
| `--background` | #000000 | Black background |
| `--foreground` | #EEE5E9 | Off-white text |
| `--muted-foreground` | #7C7C7C | Gray text |

The theme is configured for **Tailwind CSS v4** using `@import 'tailwindcss'` and `@theme inline` blocks. Custom variants are defined with `@custom-variant dark (&:is(.dark *))`.

### Fonts
- **Space Grotesk** - Primary sans-serif font (`--font-space-grotesk`)
- **JetBrains Mono** - Monospace font (`--font-jetbrains-mono`)

Both are loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables.

### Animation System (GSAP)
The portfolio relies heavily on **GSAP** for animations:
- Preloader sequence with timeline-based choreography
- Scroll-triggered animations using `ScrollTrigger`
- Character-by-character text splitting animations
- Magnetic button effects
- Parallax effects

Animation patterns in components typically use `useRef` for DOM elements and `useEffect` to initialize GSAP timelines. All client-side components that use animations or browser APIs are marked with `"use client"`.

### Shadcn/ui Configuration
- Style: `new-york`
- RSC: enabled
- Base color: `neutral` (overridden by custom theme)
- Icon library: `lucide-react`
- Path aliases: `@/components`, `@/lib`, `@/lib/utils`, `@/hooks`

### Global Effects
- **Noise overlay** - Fixed SVG-based noise texture at 3% opacity (`.noise-overlay`)
- **Custom scrollbar** - 8px width with burnt orange thumb
- **Smooth scrolling** - `scroll-behavior: smooth` on html
- **Custom cursor** - Implemented via `CustomCursor` component

### Component Flow
The main page (`app/page.tsx`) manages the loading state and renders components in order:
1. `CustomCursor` - Always visible
2. `Preloader` - Only during initial load
3. `Navigation`, `HeroSection`, `AboutSection`, `ProjectsSection`, `SkillsSection`, `ContactSection`, `Footer` - Main content (hidden until preloader completes)

### Styling Patterns
- Use Tailwind utility classes
- Apply semantic color tokens (`bg-primary`, `text-foreground`, etc.)
- Gradient text via `.text-gradient` utility
- Use `cn()` from `lib/utils.ts` for conditional class merging
- Components use Radix UI primitives via shadcn/ui for accessible UI elements
