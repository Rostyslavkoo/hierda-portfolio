# Portfolio — UI kit

The single-page editorial portfolio site for Gerda. Recreates the full product
view; composes the design-system primitives rather than re-implementing them.

**Entry:** `index.html` (loads React + the compiled `_ds_bundle.js`, then the
section files below).

| File | Section |
|------|---------|
| `Nav.jsx` | Fixed top nav — Cover · Portfolio · Shop · Contact (mix-blend over photos) |
| `Cover.jsx` | Triptych hero: three full-screen photos, "GERDA" name overlay, cinematic staggered entrance |
| `About.jsx` | Framed portrait + editorial intro + model **Stat**s |
| `Gallery.jsx` | "Portfolio" — masonry grid with click-to-open **lightbox** (←/→/Esc) |
| `Shop.jsx` | "Original paintings" — 3 painting cards, price in €, mailto "Inquire to buy" |
| `Contact.jsx` | Editorial form (**Input**/**Textarea**/**Button**) + contact meta |
| `Footer.jsx` | Minimal footer |
| `App.jsx` | Composition root |
| `portfolio.css` | Page-level layout + the hero keyframe choreography |

**Motion:** entrances are CSS keyframes only — slow, cinematic, never bouncy.
The cover photos use an 18–24s Ken Burns (scale 1.0 → 1.06); name and tagline
fade up in sequence. Respects `prefers-reduced-motion`.

**Imagery:** Unsplash placeholders — swap for Gerda's real book before launch.
