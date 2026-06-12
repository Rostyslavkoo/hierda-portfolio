# CLAUDE.md — Hierda Karlson Portfolio

## Stack
- **Nuxt 4** (compatibilityDate: 2025-07-15), **Vue 3 Composition API**, **TypeScript**
- No UI library — custom components only
- CSS: scoped `<style>` per component + global design tokens in `assets/styles/`
- No Tailwind, no CSS modules suffix, no CSS-in-JS

## Project layout
```
app/
  assets/
    styles/
      tokens/         # copied from gerda-design-system (fonts, colors, typography, spacing)
      reset.css       # minimal reset
      global.css      # body defaults, scroll-bar, ::selection
    images/           # static originals referenced in content
  components/
    layout/
      TheNav.vue
      TheFooter.vue
    sections/
      CoverSection.vue
      ParametrySection.vue
      SnepiSection.vue
      GallerySection.vue
      AboutSection.vue
      ShopSection.vue
      ContactSection.vue
    ui/
      AppButton.vue
      AppEyebrow.vue
      AppStat.vue
      AppInput.vue
      AppTextarea.vue
      TheLightbox.vue
      SectionSep.vue
    admin/
      AdminNav.vue
      PhotoUploader.vue
      PhotoGrid.vue
      PaintingCard.vue
      StatsForm.vue
  composables/
    useScrollProgress.ts
    useLightbox.ts
    useContactForm.ts
    useSupabase.ts      # supabase client singleton
    useAuth.ts          # login / logout / session
    usePhotos.ts        # portfolio & digitals CRUD
    usePaintings.ts     # shop CRUD
    useStats.ts         # model stats CRUD
  middleware/
    auth.ts             # redirect to /admin/login if no session
  pages/
    index.vue
    admin/
      index.vue         # dashboard
      login.vue         # login form
      portfolio.vue     # manage gallery photos
      digitals.vue      # manage snaps/digitals
      shop.vue          # manage paintings
      stats.vue         # edit model comp card stats
  data/
    model.ts            # stats, bio, quote (fallback / SSG defaults)
    gallery.ts          # photo list with labels
    shop.ts             # painting list with prices
    nav.ts              # navigation links
  app.vue
public/
  HK_logo.svg           # handwritten HK monogram — use as <img> or inline
  photos/               # retouched model images (8I5A*.jpg)
  paintings/            # artwork images for shop
  favicon.ico
  robots.txt
```

## Supabase

### Environment variables (in .env.local — never commit)
```
SUPABASE_URL=<set-in-env>
SUPABASE_KEY=<set-in-env>
SUPABASE_SERVICE_KEY=<set-in-env>
```

### Database schema
```sql
-- Model comp card stats
create table stats (
  id uuid primary key default gen_random_uuid(),
  height text,
  bust text,
  waist text,
  hips text,
  shoes text,
  eyes text,
  hair text,
  location text default 'Madrid',
  updated_at timestamptz default now()
);

-- Portfolio / gallery photos
create table photos (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  category text check (category in ('editorial', 'commercial', 'portrait')),
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Digitals / snaps
create table digitals (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  label text,   -- 'face' | 'front' | '3/4' | 'crouching' | 'seated' | 'full'
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Paintings for shop
create table paintings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  price numeric(10,2),
  description text,
  url text not null,
  available boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);
```

### Storage buckets (all public read)
- `portfolio` — gallery photos
- `digitals` — snaps/digitals
- `paintings` — artwork images

### Auth
- Single user account (Hierda) — created manually in Supabase dashboard
- Email + password auth via `@supabase/supabase-js`
- Session persisted in cookie via `useAuth` composable
- `middleware/auth.ts` protects all `/admin/*` routes except `/admin/login`

### Data strategy
- Public site fetches live from Supabase at request time (SSR)
- Falls back to static `data/*.ts` files if Supabase is unreachable
- Admin panel fetches and mutates directly via composables

## Admin panel

Route: `/admin` — requires authenticated session.

### Features per page
| Page | Actions |
|---|---|
| `admin/portfolio` | Upload photos (drag & drop), delete, reorder (drag) |
| `admin/digitals` | Upload snaps, assign label, delete, reorder |
| `admin/shop` | Add painting (image + title + price + description), toggle available, delete |
| `admin/stats` | Edit comp card fields inline, save |

### Upload flow
1. User drops/selects file → preview shown instantly
2. On confirm → upload to Supabase Storage bucket
3. On success → insert row in corresponding table with public URL
4. Optimistic UI — show item immediately, rollback on error

## Design system — Gerda Design System
Token files in `app/assets/styles/tokens/`:
- `fonts.css` — Google Fonts (Bebas Neue, Caveat, Cormorant Garamond, DM Sans)
- `colors.css` — `--ink-*`, `--paper-*`, `--rose-*`, semantic aliases
- `typography.css` — `--font-*`, `--display-*`, `--text-*`, `--leading-*`, `--tracking-*`
- `spacing.css` — `--space-*`, `--section-pad-y`, `--gutter`, `--radius-*`, `--ease-*`, `--dur-*`

### Key tokens
| Token | Value | Use |
|---|---|---|
| `--bg-base` | `#f5f2ee` | page background |
| `--text-strong` | `#1a1a1a` | headlines, buttons |
| `--text-body` | `#3a3734` | body copy |
| `--text-muted` | `#7a7673` | captions, labels |
| `--text-accent` | `#b8978a` | rose accents |
| `--font-display` | Cormorant Garamond, serif | section titles |
| `--font-body` | DM Sans, sans-serif | body text |
| `--font-bleed` | Bebas Neue | oversized bleed titles |
| `--font-handwritten` | Caveat | HK monogram |
| `--ease-editorial` | `cubic-bezier(.22,1,.36,1)` | all transitions |
| `--dur-base` | `0.7s` | standard transition |
| `--section-pad-y` | `clamp(5rem,12vw,11rem)` | section vertical padding |
| `--gutter` | `clamp(1.5rem,5vw,5rem)` | horizontal inset |

## Component conventions

### Single-file components
- `<script setup lang="ts">` always
- Props typed with `defineProps<{...}>()`
- Emits typed with `defineEmits<{...}>()`
- No `export default`

### CSS in components
- Always `<style scoped>`
- Use design tokens (`var(--*)`) — never hardcode colors or spacing
- BEM-ish class names: `.section__element--modifier`
- Transitions always use `var(--ease-editorial)` and `var(--dur-*)` tokens
- `@media (prefers-reduced-motion: no-preference)` guard on all animations

### TypeScript
- `interface` over `type` for object shapes
- Explicit generics on `ref<T>` when non-obvious
- No `any` — use `unknown` + type narrowing

## Sections map

| Section | Component | Anchor | Notes |
|---|---|---|---|
| Cover | `CoverSection` | `#cover` | Three portrait photos, asymmetric star burger top-left, HK logo center |
| Parameters | `ParametrySection` | `#parametry` | Comp card: height, bust/waist/hips, clothing, shoes, eyes, hair |
| Digitals | `SnepiSection` | `#snepi` | 6 snaps in grid with labels |
| Gallery | `GallerySection` | `#portfolio` | Masonry grid, lightbox on click |
| About | `AboutSection` | `#about` | Polaroid photo + quote + bio |
| Shop | `ShopSection` | `#shop` | Painting cards, mailto inquiry |
| Contact | `ContactSection` | `#contact` | Links + form + flower SVG |

## Image handling
- Static photos: `public/photos/` → `/photos/filename.jpg`
- Static paintings: `public/paintings/`
- Admin-uploaded: served from Supabase Storage public URLs
- All `<img>` must have descriptive `alt`
- First cover photo: `loading="eager"`, rest: `loading="lazy"`

## Animation rules
- **Ken Burns** on cover photos: `scale(1.0→1.06)` over 18–24s
- **FadeUp** entrance: `opacity 0→1` + `translateY(20px→0)`, staggered
- **Image hover**: `scale(1.04)` + remove `grayscale(0.12)`, 1.1–1.3s
- **Nav**: transparent → `rgba(245,242,238,0.95)` + backdrop-blur on scroll >50px
- No raw `ms` values in CSS — always use duration tokens

## Brand rules (never break)
- Background: warm off-white `#f5f2ee` — never pure white or dark
- Accent: dusty rose `#c9a89a` — one color only, nowhere else
- No decorative gradients
- No rounded corners on structural elements (`--radius-xs: 2px` max)
- No emoji, no icon libraries
- No bouncy animations — slow and cinematic only
- Nav: `mix-blend-mode: difference` over photos
- Wide tracking on all labels, eyebrows, nav items

## Dev commands
```bash
npm run dev       # localhost:3000
npm run build     # production build
npm run generate  # static generation
npm run preview   # preview build
```
