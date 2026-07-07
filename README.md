# The iWed Experience

> A premium, dual-themed digital wedding invitation built with **React 19**, **Vite 6**, **Tailwind CSS 4**, **GSAP**, and **Firebase Firestore**.

This is a reusable template you can rebrand for **any couple**. It ships with two complete invitation themes, a guestbook, RSVP, gift/wire-transfer cards, an analytics dashboard, and a personalized-link generator. All couple-specific content lives in a handful of clearly-marked files, so you can launch a polished wedding site without touching the animation or layout code.

---

## ✨ Features

- **Two full invitation themes** served from separate routes — a sleek dark/cinematic theme and a light Islamic/cream theme with Arabic typography and ornaments.
- **Themed landing page** that lets guests pick an experience, plus a built-in **personalized-URL generator** (`?name=Guest`) so each invitee sees their name on the page and share card.
- **GSAP scroll animations** via `@gsap/react` (`useGSAP`): reveal effects, parallax hero, scroll-triggered sections, and a custom cursor.
- **Preloading splash screen** that gates video autoplay (browser autoplay policy) and reveals the site on tap/click.
- **Real-time guestbook (Wishes)** powered by Firestore, with pagination and live updates.
- **RSVP form** writing to Firestore, with an attendee count surfaced in the dashboard.
- **Gift / wire-transfer cards** with one-tap copy of account numbers.
- **Share-card generator** — renders a 9:16 story image on a `<canvas>` (no extra deps) and shares via the Web Share API / download.
- **Analytics dashboard** (`/statistics`) showing visits, attendees, wishes, and RSVPs per theme, behind an env-configured password.
- **Responsive** desktop + mobile video backgrounds and image handling.
- **Performance**: asset preloading, lazy images, environment-driven asset hosting.

---

## 🛠️ Technology Stack

| Concern        | Choice |
|----------------|--------|
| Framework      | [React 19](https://react.dev) |
| Bundler        | [Vite 6](https://vitejs.dev) (multi-page / multi-HTML build) |
| Styling        | [Tailwind CSS 4](https://tailwindcss.com) (PostCSS) + runtime config in HTML `<head>` |
| Animation      | [GSAP 3](https://greensock.com/gsap/) + [@gsap/react](https://github.com/greensock/react) |
| Database       | [Firebase Firestore](https://firebase.google.com/docs/firestore) |
| Media host     | Any static host / CDN (configured via env) |
| Deployment     | Any static host (Firebase Hosting, Vercel, Netlify, Cloudflare Pages, …) |

> **Why two Tailwind setups?** The build uses Tailwind 4 through PostCSS (`@tailwindcss/postcss`), while each HTML entry also inlines a `tailwind.config` + CDN script in `<head>` so design tokens (custom colors, fonts) are available at runtime. You normally only edit your content in the TS/TSX files; you do **not** need to touch the inline configs unless you add new theme colors.

---

## 📁 Project Structure

This is a **multi-page Vite app** — each route is its own HTML entry point compiled into `dist/`.

```text
├── index.html              # Landing page (theme picker + link generator)
├── index.tsx               # → LandingPage.tsx
├── LandingPage.tsx         # Landing/router UI + personalized-link tool
│
├── a/                      # THEME A — dark / cinematic
│   ├── index.html          # Route entry for /a
│   ├── index.tsx
│   ├── App.tsx             # Composes all sections
│   ├── constants.ts        # ⭐ Wedding content for Theme A
│   ├── types.ts
│   ├── components/         # Hero, Couple, LoveStory, Quote, Countdown,
│   │                       #   Rundown, Venue, Gallery, Gift, Wishes,
│   │                       #   RSVPModal, Loader, Ornaments, FloatingCTA, Footer …
│   └── invite/             # Route /a/invite — message generator for Theme A
│
├── s/                      # THEME B (Islamic/cream) — mirrors a/
│   ├── index.html, index.tsx, App.tsx, constants.ts, types.ts
│   ├── components/         # (also includes MusicPlayer)
│   └── invite/             # Route /s/invite — message generator for Theme B
│
├── statistics/             # Route /statistics — analytics dashboard
│   ├── index.html, index.tsx, App.tsx
│
├── utils/
│   └── shareCard.ts        # ⭐ Canvas share-card generators (per theme)
│
├── firebase.ts             # Firebase init (reads env config)
├── tailwind.config.js      # Build-time Tailwind config
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts          # Multi-entry build + dev rewrite middleware
└── .env.local              # ⭐ Your secrets & asset URL (NOT committed)
```

### Routes

| Route           | Page |
|-----------------|------|
| `/`             | Landing page (theme picker + link generator) |
| `/a`            | Theme A invitation (dark) |
| `/s`            | Theme B invitation (cream / Islamic) |
| `/a/invite`     | Message-template generator for Theme A |
| `/s/invite`     | Message-template generator for Theme B |
| `/statistics`   | Analytics dashboard (password protected) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and **npm**
- A **Firebase project** (free Spark plan is enough)
- A place to host **media assets** (any static host/CDN, or Firebase Storage)

### 1. Clone & install

```bash
git clone <your-repo-url> the-iwed-experience
cd the-iwed-experience
npm install
```

### 2. Create a Firebase project

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a project.
2. In the left menu, open **Build → Firestore Database** and click **Create database** (start in **production** or **test** mode — see Security below).
3. Go to **Project settings → General → Your apps → Web app** and register a new web app.
4. Firebase shows you a `firebaseConfig` object. You need these values for `.env.local` (next step).

> No authentication is used — the app talks to Firestore directly from the browser, so your **security rules** (step 4) are what protect your data.

### 3. Configure environment variables

Create a file named **`.env.local`** in the project root (this file is git-ignored and must never be committed). Copy the block below and fill in your own Firebase values:

```env
# --- Firebase (from Project settings → Web app → firebaseConfig) ---
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# --- Where your media assets are hosted (must end with /) ---
VITE_ASSETS_BASE_URL=https://your-assets-host.example.com/

# --- Analytics dashboard login (set your own!) ---
VITE_STATISTICS_USERNAME=admin
VITE_STATISTICS_PASSWORD=change_me_strong_password

# --- Optional: Gemini API key (reserved for future features) ---
GEMINI_API_KEY=
```

| Variable | Purpose |
|----------|---------|
| `VITE_FIREBASE_*` | Firebase web-app credentials consumed by `firebase.ts` |
| `VITE_ASSETS_BASE_URL` | Base URL for all media (videos, photos, cover, favicon). **Must end with `/`** |
| `VITE_STATISTICS_USERNAME` / `VITE_STATISTICS_PASSWORD` | Login for the `/statistics` dashboard |
| `GEMINI_API_KEY` | Unused today; passed through `vite.config.ts` for future use |

### 4. Firestore Security Rules

Because the client writes directly to Firestore, restrict access. A reasonable starting point (put this in **Firestore → Rules**):

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public can create guestbook + RSVP entries, but not read/admin.
    match /wishes/{id}      { allow create: if true; allow read, update, delete: if false; }
    match /wishesv2/{id}    { allow create: if true; allow read, update, delete: if false; }
    match /rsvps/{id}       { allow create: if true; allow read, update, delete: if false; }
    match /rsvpv2/{id}      { allow create: if true; allow read, update, delete: if false; }
    match /visits_a/{id}    { allow create: if true; allow read: if false; }
    match /visits_s/{id}    { allow create: if true; allow read: if false; }
    // Templates + dashboard reads are admin-only; protect via rules or keep private.
    match /config_a/{doc}   { allow read, write: if false; }
    match /config_s/{doc}   { allow read, write: if false; }
  }
}
```

> The dashboard reads `wishes`, `wishesv2`, `rsvps`, `rsvpv2`, `visits_a`, `visits_s`. With the rules above, the dashboard won't load data unless you relax reads for authenticated/admin use or expose them. For a personal wedding site this is acceptable; for anything public, add Firebase Auth and gate reads accordingly.

### 5. Host your media assets

Upload the media your content files reference to wherever `VITE_ASSETS_BASE_URL` points. The code expects filenames like:

| Asset | Used by | Notes |
|-------|---------|-------|
| `bg.webm`, `bg_mobile.webm` | Hero video (both themes) | Desktop / mobile background video |
| `san.jpg`, `sh.jpg` | `a/components/Couple.tsx` | Couple portraits (theme A) |
| `cover.webp` | OG/Twitter image | Social share preview |
| `favicon.ico` | all `index.html` heads | Site icon |
| `552018_..._n.jpg` | Venue map image (theme B) | Replace with your venue photo |
| `IMG_*.jpg`, `DSC*.jpg`, `mycover.jpg`, `ft*.png` | `GALLERY_IMAGES` in `constants.ts` | Gallery photos — edit the list to match your files |

You can rename any of these; just update the matching reference in `constants.ts` / `Couple.tsx` / `Venue.tsx`.

### 6. Run the dev server

```bash
npm run dev
```

- Served on **https://localhost:3000** (the dev config uses a self-signed SSL cert via `@vitejs/plugin-basic-ssl` and binds to `0.0.0.0`).
- A small dev middleware rewrites `/a`, `/s`, `/statistics`, and the `/invite` routes so they work without file extensions.
- Accept the browser's self-signed-certificate warning on first load.

### 7. Build for production

```bash
npm run build      # outputs to dist/
npm run preview    # locally preview the production build
```

The build compiles these HTML entries: `main` (landing), `a`, `s`, `invite`, `invite_s`, `statistics`.

---

## 🎨 Customizing for a new couple

You **do not** need to edit layout or animation code. Change content in these files:

| What to change | File |
|----------------|-----|
| Couple names, date, calendar link, Quran verse, bank/gift details, gallery list, mock wishes, rundown, love-story steps | `a/constants.ts` and `s/constants.ts` |
| Bride/groom names + parent captions in the "Couple" section | `a/components/Couple.tsx`, `s/components/Couple.tsx` |
| Hero names, dates, location labels | `a/components/Hero.tsx`, `s/components/Hero.tsx` |
| Share-card text (names, date, city, footer URL) | `utils/shareCard.ts` |
| Landing page theme cards / labels | `LandingPage.tsx` |
| Default invitation message + placeholders `[Nama Penerima]`, `[invitation link]` | `a/invite/App.tsx`, `s/invite/App.tsx` (also editable at runtime and stored in Firestore) |

**Key content fields in `constants.ts`:**

- `WEDDING_DATE` — ISO date used by the countdown (`'YYYY-MM-DDTHH:mm:ss'`; add a timezone offset if needed).
- `GOOGLE_CALENDAR_LINK` — pre-filled "Add to Calendar" link.
- `BANK_DETAILS` — array of `{ bankName, accountNumber, accountName }` rendered as gift cards.
- `GALLERY_IMAGES` — array of `{ id, url, caption }`; `url` is built from `VITE_ASSETS_BASE_URL`.
- `RUNDOWN_ITEMS` / `STORY_STEPS` — timeline & love-story content (theme B).
- `MOCK_WISHES` — placeholder guestbook entries shown before live data arrives.

> The two themes share structure but may have slightly different content fields. Theme A's `constants.ts` is the most minimal; theme B (`s/`) includes `RUNDOWN_ITEMS`, `STORY_STEPS`, `BISMILLAH`, and an Indonesian translation on the verse.

---

## 🗄️ Firebase Data Model

| Collection | Written by | Read by | Shape |
|------------|-----------|---------|-------|
| `wishes` | Theme A `Wishes.tsx` | Theme A guestbook, dashboard | `{ name, message, timestamp (server), submittedAt (ISO) }` |
| `wishesv2` | Theme B `Wishes.tsx` | Theme B guestbook, dashboard | same |
| `rsvps` | Theme A `RSVPModal.tsx` | dashboard | `{ name, guests, timestamp, submittedAt }` |
| `rsvpv2` | Theme B `RSVPModal.tsx` | dashboard | same |
| `visits_a` | Theme A `Loader.tsx` | dashboard (`getCountFromServer`) | `{}` (one doc per visit) |
| `visits_s` | Theme B `Loader.tsx` | dashboard | `{}` |
| `config_a/template` | Theme A `invite` page | Theme A `invite` page | `{ content, updatedAt }` |
| `config_s/template` | Theme B `invite` page | Theme B `invite` page | `{ content, updatedAt }` |

The dashboard counts attendees by summing the `guests` field across `rsvps` / `rsvpv2`.

---

## 🌐 Deployment

This is a static site. After `npm run build`, deploy the **`dist/`** folder to any static host.

**SPA / clean-URL rewrites.** The app expects paths like `/a`, `/s`, `/statistics`. On a static host you must rewrite requests for those paths to their `index.html` files so deep links and refreshes work:

- **Firebase Hosting** — add a `rewrites` block in `firebase.json`:
  ```json
  {
    "hosting": {
      "public": "dist",
      "rewrites": [
        { "source": "/a{,/**}",        "destination": "/a/index.html" },
        { "source": "/s{,/**}",        "destination": "/s/index.html" },
        { "source": "/a/invite{,/**}", "destination": "/a/invite/index.html" },
        { "source": "/s/invite{,/**}", "destination": "/s/invite/index.html" },
        { "source": "/statistics{,/**}","destination": "/statistics/index.html" },
        { "source": "**",               "destination": "/index.html" }
      ]
    }
  }
  ```
- **Netlify / Vercel / Cloudflare Pages** — equivalent redirect/rewrite rules with the same destinations.

**Set environment variables on the host.** Copy your `.env.local` values into the host's build-environment variables (they are read at build time via `import.meta.env`).

**Crawlers.** The repo ships `public/robots.txt` with `Disallow: /` (blocks indexing). Delete or edit it before going public if you want search engines to index the site.

---

## 📝 Notes & Caveats

- **Dashboard auth is client-side only.** The `/statistics` username/password lives in `VITE_*` env vars and is shipped to the browser, so it is **not real security** — it just hides the page. Treat the dashboard as private/obscurity-only and rely on Firestore rules for data protection.
- **`GEMINI_API_KEY`** is wired through `vite.config.ts` but not used by any component yet; leave it blank unless you add a feature that needs it.
- The HTML `<head>` blocks inline a `tailwind.config` and load Tailwind from a CDN for runtime theming. The production build is still bundled by Vite + PostCSS; you rarely need to touch those inline blocks.
- `metadata.json` describes the project for the agent/extension environment and is not used at runtime.

---

<p align="center">
  A reusable digital-wedding template. Fork it, set your <code>.env.local</code>, edit <code>constants.ts</code>, and ship.
</p>
