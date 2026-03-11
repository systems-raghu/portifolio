# portifolio
Official portfolio website for **raghu.systems** - an AI systems builder brand focused on automation, websites, and growth infrastructure.

## Snapshot
- Personal brand + agency-style portfolio built for high-conversion storytelling.
- Designed for founders, coaches, B2B service businesses, and SaaS teams.
- Showcases system-building capability (content engines, lead systems, automation, AI agents).
- Built with a modern frontend stack and production-ready SEO basics.

## Tech Stack
- React 18
- Vite 5
- Tailwind CSS v4
- CSS-driven interactions + scroll reveal effects
- SEO baseline files:
  - `robots.txt`
  - `sitemap.xml`
  - `site.webmanifest`
  - `favicon.svg`

## Local Development
```bash
npm install
npm run dev
```

Local app runs at:
`http://localhost:5173`

Production build:
```bash
npm run build
npm run preview
```

## Project Structure
```txt
.
|-- index.html
|-- robots.txt
|-- sitemap.xml
|-- site.webmanifest
|-- favicon.svg
`-- src
    |-- App.jsx
    |-- index.css
    `-- main.jsx
```

- `src/App.jsx`: page layout, content blocks, navigation behavior, scroll interactions.
- `src/index.css`: visual system, motion effects, glassmorphism, hover states.
- `index.html`: document metadata, SEO tags, schema markup.

## SEO and Deployment Notes
- This project includes Tier-1 style metadata: canonical, Open Graph, Twitter tags, and schema markup.
- If deployed first on a Vercel free domain, align canonical/OG/schema URLs to that live URL until custom domain is connected.
- Update these files when domain changes:
  - `index.html`
  - `robots.txt`
  - `sitemap.xml`

## Branding and Content Customization
Common edits:
- Hero headline/subheadline: `src/App.jsx`
- Portfolio/work card content and links: `src/App.jsx`
- Contact email (currently `systems.raghu@gmail.com`): `src/App.jsx`
- Theme styling, shadows, animation behavior: `src/index.css`

## GitHub and Vercel Workflow
```bash
git add .
git commit -m "Update website"
git push origin main
```

Then on Vercel:
1. Import/select this repo.
2. Keep build command as `npm run build`.
3. Redeploy automatically on new pushes to `main`.

## Usage
All brand assets, content, and design direction in this repository are for **raghu.systems** unless explicitly stated otherwise.
