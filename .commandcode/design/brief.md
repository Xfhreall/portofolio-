# Design Brief

## Register

**Brand.** This is a personal portfolio. The interface is the experience. Every visual decision demonstrates craft and creative engineering capability. The portfolio's implicit job is to prove the author can build memorable interfaces.

## Name

Risqi Achmad Fahreal (Farel)

## Category

Developer portfolio / creative engineering showcase

## Users and Context

**Primary user:** Hiring managers, tech leads, and agency recruiters evaluating frontend engineering candidates. They are scanning quickly, under time pressure, comparing against dozens of other portfolios. They arrive on mobile or desktop, usually from a link shared in a DM or email.

**Secondary user:** Fellow developers and potential collaborators looking at project case studies and technical depth.

**User state at arrival:** Skeptical, fast-moving, looking for a reason to stay or leave within the first viewport.

## Purpose

Demonstrate that Risqi is a creative developer who bridges design thinking and technical execution. The portfolio must feel like proof of skill, not just a list of projects. Motion, typography, scroll behavior, and visual composition are the product.

## Artifact

**Project case studies.** Each project is a self-contained work sample with image, tech stack, role badges, and a detail page. The artifact is the project card and its surrounding context.

**Experience timeline.** Sticky scroll-stacked cards showing career progression with company, role, dates, and description.

## Voice

Bold, editorial, uppercase-driven. Technical precision meets visual confidence. Not playful or whimsical. Not corporate or safe. The tone is "I built this, and it speaks for itself."

Concretely: strong typographic weight, generous whitespace, restrained color usage, monospace for metadata and labels, grotesque display for headings.

## Anti-references

- Generic SaaS landing pages with gradient heroes, testimonials, and pricing tables
- Template developer portfolios with a grid of project cards and a boring about section
- Blue-violet CTA buttons and blue-purple gradient backgrounds
- AI-generated aesthetic: symmetric layouts, pill buttons, centered hero-card-pair repetitions
- Playful/cartoon illustrations or emoji-heavy copy
- Overly animated "wow factor" sites that sacrifice usability for spectacle

## Design Principles

1. **Typography is the hero.** Bricolage Grotesque for display, Sora for body. Uppercase, black weight, tight tracking for headings. Monospace for labels, metadata, and micro-copy. Type hierarchy through weight contrast, not size alone.

2. **Motion serves narrative.** Scroll-driven parallax, staggered entrances, spring-physics transitions. Every animation reveals or conceals content in service of the scroll story. No decorative motion that doesn't carry information.

3. **Section color identity.** Each major section owns a distinct accent color:
   - Hero: `#9c41f7` (purple)
   - Experience: `#06BA63` (green)
   - Contact: `#00d8f6` (cyan)
   - About: `#d97706` (amber)
   - Projects: `#FF8A00` (orange)
   These are not interchangeable. A section's color is its identity.

4. **Dark mode is primary.** Dark mode is the default and the intended experience. Light mode is supported but the design should be optimized for dark backgrounds. Neutral-950 as base, white as foreground.

5. **Sticky stacking as narrative device.** Experience cards and project pages use sticky positioning to stack and overlap on scroll. This is a core interaction pattern, not a decoration.

6. **Glass morphism for floating elements.** The bottom navbar uses backdrop-blur, translucent backgrounds, and subtle gradient overlays. Floating UI elements should feel like they exist on a higher plane.

7. **Text-shift hover effect.** Interactive text uses the Valentin Gassend-style vertical text shift on hover. This is a signature interaction pattern used on buttons and links throughout.

8. **Background grid lines.** Each section has subtle animated background grid/dot patterns tinted to the section's accent color. These provide visual texture without competing with content.

## Visual Foundation

**Typography scale:**
- Display hero: `font-bricolage font-black text-6xl md:text-8xl lg:text-[10vw] uppercase tracking-[-0.03em]`
- Section heading: `font-bricolage font-black text-4xl md:text-7xl uppercase tracking-tight`
- Card heading: `font-bricolage font-black text-2xl md:text-3xl uppercase tracking-tight`
- Body: `text-sm font-medium leading-relaxed`
- Label/metadata: `font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold`
- Badge/pill: `font-mono text-[10px] md:text-xs uppercase tracking-wider font-semibold`

**Spacing:** Uses a 4px base grid. Section padding: 24 (py-24). Card padding: 8-10 (p-8 md:p-10). Component gaps: 4-6.

**Border radius:** `rounded-3xl` for cards, `rounded-full` for buttons and pills, `rounded-xl` for inputs and small containers.

**Color tokens:** HSL CSS variables via shadcn/ui convention. Neutral-950/white as base pair. Section-specific accents as hardcoded hex values (not CSS variables).

**Background effects:** `BackgroundLines` component renders animated grid lines per section. `bg-grid`, `bg-grid-small`, `bg-dot` utility classes available via Tailwind plugin.

**Motion system:** Framer Motion with spring physics. Standard spring config: `{ stiffness: 90, damping: 22, mass: 0.4 }`. Page transitions via `PageTransition` component (horizontal bar wipe). Smooth scroll via Lenis.

## Component Rules

**Buttons:** Rounded-full, uppercase monospace, text-shift hover effect. Primary: dark bg on light / white bg on dark. Size: `h-14 px-6`. Always with icon.

**Cards:** `rounded-3xl`, subtle border (`border-neutral-200/80 dark:border-white/5`), backdrop-blur, shadow-xl. Hover: border tinted to section accent color. Large decorative index numbers in background.

**Navigation:** Bottom-floating pill navbar with glass morphism. Icon-only with active indicator (layoutId animation). Theme switcher included.

**Forms:** shadcn/ui base components. Rounded-xl inputs with neutral backgrounds. Focus ring in section accent color.

**Images:** next/image with `fill` and `object-cover`. Overlay on hover with action button.

**Badges/Tags:** Monospace, uppercase, rounded-full for role badges. Rounded-md for tech stack tags.

**Social links:** Rounded-full icons with border, hover scale and rotate animations.

## Accessibility

- Dark/light theme toggle always available in navbar
- `prefers-reduced-motion` should be respected (currently not fully implemented)
- Focus states via Tailwind ring utilities
- Semantic HTML: sections, headings, navigation landmarks
- Color contrast: white-on-neutral-950 passes WCAG AA. Accent colors on dark backgrounds need monitoring.

## CMS

The portfolio has a CMS admin panel at `/cms` for managing projects and experience entries. This is a product surface (not brand). Design follows standard CRUD patterns with shadcn/ui components.
