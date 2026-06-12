# Gerda — Design System

A minimal, editorial, high-fashion design system for **Gerda**, a fashion model
based in Madrid. The system powers her single-page portfolio site and any
supporting assets (cards, lookbooks, decks). The mood is quiet luxury: a
near-black stage, one dusty-rose accent, an editorial serif set in wide tracking.

> **Sources.** This system was authored from a written brief (no external
> codebase or Figma). Imagery uses placeholder photography from Unsplash
> (`images.unsplash.com`) and should be swapped for Gerda's real book before
> any public use.

---

## Brand at a glance

- **Voice:** restrained, editorial, sensual-but-quiet. Lowercase confidence.
- **Canvas:** near-black `#0f0f0f`. Never pure white backgrounds.
- **Accent:** dusty rose `#c9a89a` — the *only* color that isn't grey. Used sparingly.
- **Type:** Cormorant Garamond (display) + DM Sans (body).
- **Signature:** the name set huge with very wide tracking; a vertical label
  along the left edge; slow, cinematic motion.

---

## Content fundamentals

How copy is written across the brand:

- **Tone:** editorial and understated. Short, declarative lines with a literary
  edge — e.g. *"A quiet kind of presence,"* *"Drawn to stillness and the spaces
  between movement."* Avoid hype, exclamation, and marketing verbs.
- **Person:** third person for bio/about ("Gerda is a Madrid-based model…"),
  first person for direct address in contact ("I'll be in touch").
- **Casing:** Title-like display headings in the serif; **UPPERCASE with wide
  tracking** for eyebrows, labels, nav, and buttons (`letter-spacing: 0.18–0.34em`).
  Body copy is sentence case.
- **Numerals:** stats are terse and typographic — `178 cm`, `84 · 61 · 89`,
  prices in euros with a thin nbsp grouping (`€1,400`). Use tabular figures.
- **Emoji:** never. No icons-as-emoji, no decorative symbols.
- **Punctuation flourishes:** em dashes and middots (`·`) carry rhythm;
  italics (in the serif) mark a single emphasised word, often in rose.

---

## Visual foundations

- **Color & vibe:** monochrome near-black neutrals (`--ink-*`) with warm off-white
  text (`--paper-*`) and a single dusty-rose accent (`--rose-*`). No second hue,
  ever. Imagery skews warm, soft-contrast, with a light grayscale wash
  (`grayscale(0.1–0.18)`) so photos feel like one editorial set.
- **Type:** display is Cormorant Garamond — large, light-to-medium weights,
  generous tracking, frequent italics. Body is DM Sans at calm sizes with
  relaxed line-height (1.6–1.85). Tracking is the signature gesture; lean into
  `--tracking-wider` / `--tracking-widest` for all labels.
- **Spacing:** very generous. Sections breathe with `--section-pad-y`
  (`clamp(5rem,12vw,11rem)`); a single `--gutter` governs horizontal inset.
- **Backgrounds:** full-bleed photography (triptych cover, masonry gallery) over
  flat near-black. No gradients as decoration — gradients appear *only* as
  legibility scrims over imagery, and as the radial/linear darkening on the cover.
  No textures, no patterns.
- **Motion:** slow and cinematic, never bouncy. Easing is
  `--ease-editorial: cubic-bezier(.22,1,.36,1)`. Entrances fade + rise
  (`gFadeUp`) or fade + scale; the hero photos use an 18–24s Ken Burns
  (scale 1.0 → ~1.06). Durations run long (0.7s–2.4s). Honors
  `prefers-reduced-motion`.
- **Hover states:** images scale up subtly (`scale(1.04)`) and shed their
  grayscale; text/links shift to rose or raise opacity. No color inversions.
- **Press / focus:** solid buttons darken to `--accent-hover`; focus shows a soft
  rose ring (`--focus-ring`) at 2px offset 3px. Nothing shrinks or bounces.
- **Borders:** 1px hairlines (`--border-hair`) and faint paper lines
  (`--border-soft`). A recurring motif: a thin inset rose/paper rule framing a
  portrait or painting (`inset 12–14px` 1px border).
- **Radii:** near-square. `--radius-xs: 2px` on most surfaces; pills reserved for
  nothing structural. Luxury reads flat.
- **Shadows:** used only on lifted media (lightbox image). Soft, deep, low-opacity
  (`--shadow-lift`). UI chrome is shadowless.
- **Cards:** no rounded, shadowed "app" cards. A "card" here is a framed image
  with an inset rule and text set below it (see Shop paintings).
- **Layout rules:** fixed top nav uses `mix-blend-mode: difference` so it reads
  over any photo. Cover is a fixed-height triptych; content sections are a
  centered editorial column with asymmetric two-column splits.

---

## Iconography

The brand is **deliberately icon-light** — editorial restraint means almost no
UI iconography. In place of icons:

- **Typographic marks** do the work: middots (`·`), em dashes (`—`), a thin
  vertical rule as a scroll cue, and the `×` glyph (set in the serif) as the
  lightbox close.
- **No icon font, no SVG icon set, no emoji.** If a future need arises (social
  links, etc.), use a thin-stroke line set — **Lucide** (`lucide.dev`, 1.5px
  stroke) is the closest match to the brand's hairline weight — at small sizes in
  `--text-muted`, never filled or colored. This is a *substitution recommendation*,
  not an in-use dependency.
- **Logo / wordmark:** the wordmark is purely typographic — "GERDA" in Cormorant
  Garamond, uppercase, `letter-spacing ≈ 0.18–0.34em`. There is no graphic mark.

---

## Index / manifest

Root:
- `styles.css` — global entry point (consumers link this). `@import`s only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing).
- `readme.md` — this file. `SKILL.md` — portable Agent Skill wrapper.

Components (`window.GerdaDesignSystem_228e1e.*`):
- `components/core/` — **Button** (line / solid / ghost), **Eyebrow**, **Stat**.
- `components/forms/` — **Input**, **Textarea** (underline editorial fields).

UI kits:
- `ui_kits/portfolio/` — the single-page portfolio site. Sections: triptych
  **Cover** (three full-screen photos, name overlay, cinematic entrance),
  **About** + model stats, **Portfolio** masonry gallery with lightbox,
  **Shop** (original paintings, mailto inquiry), **Contact** form, footer.
  Entry: `index.html`; sections are small JSX files composed by `App.jsx`.

> **Font hosting note:** webfonts load from Google Fonts via `@import` in
> `tokens/fonts.css`. If you need self-hosted binaries, replace those imports
> with local `@font-face` rules — the compiler will then ship the font files.
