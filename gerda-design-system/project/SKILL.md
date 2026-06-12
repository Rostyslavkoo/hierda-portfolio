---
name: gerda-design
description: Use this skill to generate well-branded interfaces and assets for Gerda (minimal, editorial, high-fashion model portfolio brand — Madrid), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Quick reference:
- Foundations: `styles.css` (links `tokens/*.css`). Near-black `#0f0f0f`, one dusty-rose accent `#c9a89a`. Display: Cormorant Garamond; body: DM Sans. Wide tracking is the signature.
- Components: `components/core/` (Button, Eyebrow, Stat), `components/forms/` (Input, Textarea). Compose, don't reinvent.
- Full example: `ui_kits/portfolio/` — the editorial single-page site (triptych cover, gallery + lightbox, shop, contact).
- Motion is slow and cinematic — `cubic-bezier(.22,1,.36,1)`, long durations, never bouncy. No emoji, no icon set, near-square corners.
