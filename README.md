# AEGIS Landing Page

Marketing site for **AEGIS** (Auditable Eligibility Governance & Integrity Service) — client-side zero-knowledge compliance middleware for regulated platforms.

**Live site:** [https://aegis-proof.vercel.app](https://aegis-proof.vercel.app)

**Tagline:** Compliance without Compromise

Research partnership between the University of Manchester and the University of Sheffield, supported by the [CyberASAP programme](https://www.cyberasap.co.uk/).

---

## Stack

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Formspree](https://formspree.io/) (pilot contact form)
- [Vercel Analytics](https://vercel.com/docs/analytics)

---

## Getting started

### Prerequisites

- Node.js 20+
- npm 10+

### Install and run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Environment variables

Copy the example env file and set your Formspree form ID:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `VITE_FORMSPREE_FORM_ID` | Formspree form ID for the pilot request form |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run generate:og` | Regenerate `public/assets/og-image.png` (1200×630) |

---

## Project structure

```
website/
├── public/assets/     Static images (logo, team photos, OG image)
├── scripts/           OG image generator (sharp)
├── src/
│   ├── components/    UI sections and simulator
│   ├── lib/           Shared constants and utilities
│   ├── AegisLandingPage.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.ts
```

---

## Deploy to Vercel

1. Push this `website` folder to a GitHub repository.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Set **Root Directory** to `.` (repository root if this folder is the repo root).
4. Add `VITE_FORMSPREE_FORM_ID` in Project → Settings → Environment Variables.
5. Deploy.

From the CLI (with Vercel linked):

```bash
npx vercel --prod
```

After changing `index.html` OG meta tags or the OG image, redeploy and refresh social previews (caches can lag).

---

## Licence

© AEGIS research team. All rights reserved.
