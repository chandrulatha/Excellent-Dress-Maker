# Animation Changelog — Excellent Dress Makers

High-class scroll animations implemented directly in this codebase using
**framer-motion, which was already a dependency in `package.json` (`^14.9.0`)
but previously unused**. No new animation dependency was added (no GSAP).
No business content, prices, phone numbers, or data values were changed —
`src/data/businessData.ts` is untouched, and all existing props, callbacks
(`onSelectServiceForBooking`, `openAppointmentModal`, `setActivePage`, …),
form behaviour, WhatsApp (`wa.me`) flows, filters, lightboxes, and
localStorage appointment saving work exactly as before.

Animation language: luxury bespoke tailor — slow and smooth
(ease `[0.22, 1, 0.36, 1]`, 0.6–0.9s), gold thread / measuring-tape motifs,
no bounce. `prefers-reduced-motion` is respected globally via
`MotionConfig reducedMotion="user"` in `App.tsx`, in the shared primitives,
and via CSS for the marquee/shimmer. Nothing pins or traps scroll on touch.

## New file

- `src/components/ui/motion.tsx` — shared primitives:
  - `Reveal` — fade + rise + slight de-blur on first scroll into view
    (`whileInView`, `once: true`).
  - `Stagger` / `StaggerItem` + `staggerContainerVariants` /
    `staggerItemVariants` / `fadeRiseVariants` for sequenced grids.
  - `AnimatedCounter` (alias `CountUp`) — counts numbers up on view while
    preserving prefixes, suffixes and comma grouping (`25+`, `50,000+`, `11+`).
  - `LUXURY_EASE` / `luxuryTransition` shared timing constants.

## Files changed (14 modified + 1 new)

| File | Animation added |
|---|---|
| `src/App.tsx` | Gold measuring-tape scroll-progress bar (framer-motion `useScroll` + `useSpring` on `scaleX`, tape-tick overlay, fixed above navbar, z-60) + `MotionConfig reducedMotion="user"` wrapper. |
| `src/components/ui/SectionHeader.tsx` | Whole header fades/rises/de-blurs into view; a gold divider line draws itself (`scaleX`) under every section title — consistent entrance for all sections from one place. |
| `src/components/HeroSection.tsx` | Parallax hero image (`useScroll` on the section + `useTransform`: image drifts and slowly zooms 1.06→1.18, content lifts/fades), word-by-word staggered headline reveal, staggered badge / subtitle / CTAs / pricing chips, gentle gold shimmer on “Our Craftsmanship.” |
| `src/components/StatisticsSection.tsx` | Stats count up with `AnimatedCounter` when scrolled into view (25+, 50,000+, 11+), staggered entrance. |
| `src/components/ProcessSection.tsx` | **Centrepiece — rebuilt as an animated vertical timeline.** A gold thread line down the centre (desktop) / left (mobile) whose `scaleY` is spring-driven by the section's own scroll progress; step cards slide in alternately from left/right on desktop (stacked on mobile); numbered step badges scale in on the thread. Works on both Home and Our Work pages. |
| `src/components/TrustedBySection.tsx` | Client list is now an elegant infinite marquee (CSS keyframes, list duplicated with `aria-hidden` on the duplicate, screen-reader list preserved, edge fade mask) that pauses on hover; falls back to a static wrapped layout under `prefers-reduced-motion`. |
| `src/components/ServicesSection.tsx` | Tariff banner `Reveal`; service cards stagger in and lift on hover (`whileHover`). Details modal, Enquire and WhatsApp logic untouched. |
| `src/components/WhyChooseUs.tsx` | 8 reason cards stagger in; hover lift moved to framer-motion `whileHover`. |
| `src/components/CorporateSection.tsx` | 4 category cards stagger in + hover lift; bulk-quote form container revealed on scroll. Form/WhatsApp logic untouched. |
| `src/components/PortfolioGallery.tsx` | Gallery cards stagger in + hover lift; portfolio images zoom more on hover (`scale-110`, 700ms, overflow hidden). Filter tabs and lightbox untouched. |
| `src/components/TestimonialsSection.tsx` | Testimonial cards stagger in + hover lift; “Share Your Experience” CTA revealed on scroll. Review modal untouched. |
| `src/components/ContactSection.tsx` | Address / phone / hours cards and map stagger in down the left column; enquiry form revealed on scroll. Form/WhatsApp logic untouched. |
| `src/components/IntroSection.tsx` | Showcase image revealed on scroll; the 4 pillar highlights stagger in; CTA row revealed on scroll. |
| `src/index.css` | Added only: marquee keyframes + pause-on-hover + reduced-motion fallback, `.edm-tape-ticks` measuring-tape ticks, stitch-dash utility, gold shimmer keyframes. No existing styles changed. |

Skipped: Navbar animation (only the global progress bar sits above it) —
the navbar already animates on scroll, and touching its mobile menu risked
regressing navigation for no visual gain.

## How to run

```bash
npm install     # or: npm ci
npm run dev     # local development (Vite)
npm run build   # production build: tsc -b && vite build  → dist/
npm run preview # preview the production build
```

Docker (unchanged): `docker build -t excellent-dress-makers .` then run the
container — the multi-stage Dockerfile builds the app and serves `dist/`
with Nginx as before.

## Verification

- `npm ci` — succeeded (115 packages).
- `npm run build` — **passed** (`tsc -b && vite build`, no TypeScript errors).
  One pre-existing-style Vite warning: a JS chunk over 500 kB (541.51 kB,
  gzip 161.20 kB) now that framer-motion is actually bundled — informational
  only; code-splitting can be added later if desired.
- `npm run lint` (oxlint) — 0 errors, 7 warnings (pre-existing warnings plus
  fast-refresh “only-export-components” notes for the shared variants exported
  from `ui/motion.tsx`).
- Production preview smoke-tested: HTTP 200 with the correct page title.

---

## V2 — Strong-Motion Upgrade

**Why:** user feedback on V1 was that the animations were *too subtle* —
"nothing unique, no visible animation." V1 was one-shot fade/rise at
y≈24–28px. V2 keeps the luxury pacing (same gold/navy palette, same
`[0.22, 1, 0.36, 1]` ease, no bounce, no scroll pinning/trapping) but makes
motion **big, visible, and continuously tied to scroll position** — most
effects are now scroll-*linked* (they progress as you scroll), not one-shot.
The measuring-tape bar the user liked from the prototype is kept and
upgraded into the site's signature element. Still framer-motion only —
no new dependencies; `businessData.ts`, `appointmentStorage.ts` and
`package.json` remain content-identical (verified with
`git diff --ignore-cr-at-eol`).

### What changed vs V1

| Area | V2 upgrade |
|---|---|
| **Measuring-tape bar** (`App.tsx`) | The 3px V1 line is now a full 24px gold tailor's tape across the very top (real tick marks, darker "stitched" portion growing with scroll, navy needle edge) with a **live readout: "NNN cm stitched" + %** and a "MEASURING YOUR SCROLL" pill (pill hidden on phones). The Navbar shifts down by the tape height (`top-6`, its only change). |
| **Floating stitch rail** (`App.tsx`) | New, desktop-only (xl+): a dashed gold thread down the right edge with a glowing scissors needle that travels with page progress. Hidden under reduced-motion. |
| **Shared primitives** (`ui/motion.tsx`) | Entrances roughly tripled: cards now travel **80px, scale from 0.92, de-blur, and settle out of an alternating ±1.6° tilt**, staggered at 0.12s. New: `Parallax`, `SectionBackdrop` (oversized outlined word drifting sideways + two gold orbs drifting at different speeds), `RevealImage` (photo un-clips from an inset window while de-zooming 1.35→1). |
| **Section headers** (`ui/SectionHeader.tsx`) | Headings now **slide in from −72px** with blur, the eyebrow pops in offset, the gold divider is wider with a glowing needle-diamond at its end, and the whole header drifts on scroll (parallax). |
| **Hero** | Cinematic load: backdrop **de-zooms 1.28→1 over 1.9s**, a gold light-sweep crosses the atelier, headline words **rise from behind masks** with a slight rotation, a **gold line draws itself** under the headline, CTAs rise in sequence, price chips **pop in one-by-one (scale 0.55→1)**, and an **animated scroll indicator** (travelling dot in a mouse outline + bouncing chevron) sits at the bottom. Scroll-away parallax is much stronger (image +150px/×1.16 zoom while copy lifts −90px and dissolves). |
| **Statistics** | Count-up kept; each stat now also gets a **gold ring that sweeps full around its icon** in sync with the count, a **gold bar that fills beneath it**, dramatic scale-in, and a "LEGACY" parallax backdrop. |
| **Process timeline** | Thread is thicker/glowing; a **glowing needle diamond travels along the thread** exactly with scroll progress; step badges **spring-pop with rotation** as the needle passes; oversized step numerals scale in; cards fly in **±80px on desktop** (±26px mobile). |
| **Portfolio** | New **scroll-linked filmstrip**: a band of work photos slides sideways (60px → −300px, spring-smoothed) as the section crosses the viewport — decorative duplicate, `aria-hidden`, md+ only, fully overflow-contained; the real filterable grid stays put below it. Grid photos also get the 1.3→1 de-zoom reveal. |
| **Every Home section** | Intro ("ATELIER"), Services ("BESPOKE"), Why Choose Us ("MASTERY"), Corporate ("UNIFORMS"), Trusted By ("TRUSTED"), Portfolio ("SHOWCASE"), Process ("BESPOKE"), Testimonials ("TRUST"), Contact ("VISIT"), Statistics ("LEGACY") each get a `SectionBackdrop` — parallax outlined word + drifting gold orbs — plus the stronger card entrances. Intro's photo uses the new clip/de-zoom `RevealImage` with a delayed-rise location badge; Services/Portfolio photos de-zoom on entry; testimonial stars pop in one-by-one with rotation. |
| **Safety** (`index.css`) | `overflow-x: clip` on `body`; all horizontal movers live inside `overflow-hidden` containers; transforms/opacity only. |

### Deliberately limited

- **Mobile:** tape readout keeps only "cm stitched" (pill hidden <sm);
  stitch rail hidden below xl; filmstrip hidden below md; process cards
  use ±26px (not ±80px) offsets; section backdrops scale with viewport.
- **Reduced motion:** `MotionConfig reducedMotion="user"` kept; hero
  parallax/sweep, backdrops, needle, filmstrip and rail collapse to
  simple fades or are removed. Marquee still falls back to a static wrap.
- Corporate has no photography, so its image treatment is the parallax
  backdrop + dramatic card entrances instead of a photo reveal.

### V2 verification

- `npm run build` — **passed** (`tsc -b && vite build`, no TypeScript
  errors). JS bundle 551.29 kB (gzip 163.80 kB); same pre-existing
  >500 kB informational warning as V1.
- `npm run lint` — 0 errors, 8 warnings (pre-existing + fast-refresh notes).
- Production preview smoke test: HTTP 200, correct title, and the built
  bundle contains the tape readout, stitch rail, and backdrop styles;
  `overflow-x: clip` confirmed in the built CSS.
