---
name: web-design-sense
description: Apply strong visual design judgment for landing pages, marketing sites, and UI polish—composition, typography, color, hero layout, motion, spacing, accessibility, and anti-AI-slop aesthetics. Use when designing or redesigning pages, building heroes, improving visual hierarchy, choosing layout/type/color, reviewing UI taste, or when the user mentions web design, visual polish, landing page, or frontend design.
---

# Web Design Sense

Expert visual design judgment for web UI. Prefer taste and clarity over novelty. When this skill conflicts with an established design system in the repo, preserve the system.

## Design process

Before writing UI code:

1. **Intent** — One job for the page/section; who it is for; what action matters
2. **Composition** — Sketch hierarchy: brand → headline → support → CTA → visual anchor
3. **Atmosphere** — Background, type personality, color direction (not purple-default)
4. **Constraints** — Existing brand tokens, components, content, responsive breakpoints
5. **Implement** — Tailwind + project patterns; motion only where it clarifies hierarchy
6. **Critique** — Run the [critique checklist](critique-checklist.md) before finishing

Confirm the plan briefly, then implement fully—no placeholder visuals or “lorem” polish.

---

## Hard rules (landing & promotional surfaces)

### Composition
- **One composition**: The first viewport must read as one composition, not a dashboard (unless it is a dashboard)
- **One job per section**: One purpose, one headline, usually one short supporting sentence
- **Reduce clutter**: No pill clusters, stat strips, icon rows, boxed promos, schedule snippets, or competing text blocks in the hero

### Brand
- **Brand first**: Brand/product name is a hero-level signal—not only nav text or an eyebrow. No headline should overpower the brand
- **Brand test**: If the first viewport could belong to another brand after removing the nav, branding is too weak

### Hero
- **Full-bleed hero only**: Dominant edge-to-edge visual plane or background. Do not use inset hero images, side-panel heroes, rounded media cards, tiled collages, or floating image blocks unless the design system requires it
- **Hero budget**: First viewport usually contains only: brand, one headline, one short supporting sentence, one CTA group, one dominant image
- **No hero overlays**: No detached labels, floating badges, promo stickers, info chips, or callout boxes on top of hero media
- **No cards in the hero**

### Cards
- **Default: no cards.** Cards only when they contain a user interaction
- If removing border, shadow, background, or radius does not hurt interaction or understanding, it should not be a card

### Imagery & atmosphere
- **Real visual anchor**: Show product, place, atmosphere, or context. Decorative gradients alone are not the main visual idea
- **Background**: Do not rely on flat single-color fills; use gradients, images, or subtle patterns for atmosphere—without replacing the real visual anchor

---

## Typography

- Use expressive, purposeful fonts—avoid default stacks (Inter, Roboto, Arial, system) unless the project already mandates them
- Establish a clear type scale (e.g. display / title / body / label) with consistent line-height and measure (~45–75 characters for body)
- Hierarchy via size, weight, and spacing—not via extra boxes or colors
- Pairings: one display + one neutral text family is enough; avoid three+ families
- Prefer optical balance: headlines can be slightly tighter tracking; body stays readable

---

## Spacing & layout

- Use a consistent spacing rhythm (4/8-based Tailwind scale). Prefer fewer, larger gaps over many small ones
- Align to a simple grid; avoid one-off magic margins
- Group related items tightly; separate groups generously (proximity principle)
- Generous whitespace beats dense “feature walls”
- Sections: clear top/bottom breathing room; don’t stack competing focal points

---

## Color & look

Choose a clear visual direction; define CSS variables (or project tokens) early.

**Avoid AI-default looks:**
1. Purple-on-white or purple-to-indigo gradient themes
2. Warm cream background (~#F4F1EA) + high-contrast serif + terracotta accent
3. Broadsheet layout: hairline rules, zero radius, dense newspaper columns

**Also avoid defaulting to:** dark mode for its own sake, purple, glow effects, rounded-full pill clusters, multi-layer shadows, emojis as decoration.

Prefer: restrained palettes (1 dominant, 1 accent, neutrals), intentional contrast, surfaces that feel material (soft depth, not neon glow).

---

## Motion

Ship **2–3 intentional motions** for visually led work—presence and hierarchy, not noise.

| Use | Avoid |
|-----|--------|
| Fade/slide entrance for primary content | Stagger everything |
| Subtle hover on primary CTA | Bounce, endless loops on scroll |
| Scroll-linked reveal for next section | Parallax that harms readability |
| Shared-element / layout transitions sparingly | Motion that delays task completion |

Respect `prefers-reduced-motion`: provide reduced or no motion alternatives.

---

## Responsive design

- Design mobile and desktop as first-class; don’t shrink a desktop collage
- Hero must still pass brand test on small screens (brand + headline + CTA visible without hunting)
- Collapse complexity: fewer columns, full-bleed media, stacked CTAs with adequate tap targets (min ~44px)
- Type: fluid or stepped scales; don’t leave display sizes huge on mobile
- Test critical breakpoints used by the project (typically ~640 / 768 / 1024 / 1280)

---

## Accessibility (non-negotiable)

- Semantic HTML: landmark regions, heading order, lists for lists
- Contrast: text and interactive states meet WCAG AA where feasible
- Focus visible; keyboard operable; interactive elements have accessible names
- Don’t use color alone for meaning
- Images: meaningful `alt`; decorative images empty `alt`
- Motion: honor reduced-motion preferences

Implementation note: follow project a11y patterns (aria-label, keyboard handlers on custom controls, etc.).

---

## Implementation patterns (React / Tailwind)

- Prefer Tailwind utility classes aligned with project tokens; avoid one-off CSS unless needed for atmosphere (gradients, masks, keyframes)
- Extract repeated visual patterns into components only when reuse is real
- Keep class lists readable; group by layout → spacing → type → color → interaction
- Use project motion libraries already in the repo (e.g. Framer Motion, GSAP) consistently—don’t add a new animation stack casually
- Match existing React patterns in the codebase (Server/Client Components, etc.)

Coding style still follows `.cursor/rules/front-end-cursor-rules.mdc` (const handlers, early returns, no semicolons, etc.).

---

## When redesigning existing UI

1. Preserve brand tokens and component APIs unless asked to change them
2. Improve hierarchy and spacing before inventing new chrome
3. Remove cards, pills, and badges that don’t earn their place
4. Strengthen the visual anchor; weaken generic gradient-only backgrounds
5. Re-run brand test and hero budget on the first viewport

---

## Anti-patterns & checklist

- Detailed don’ts: [anti-patterns.md](anti-patterns.md)
- Pre-ship pass: [critique-checklist.md](critique-checklist.md)

---

## Output expectations

For design/UI tasks:
- Brief plan (composition, type/color direction, motion intents)
- Complete implementation—no TODO polish
- Short note on decisions only when tradeoffs matter
- Run critique checklist mentally (or explicitly for large visual changes)
