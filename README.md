# BLISS Webpage

This repository holds the source code for the [BLISS Website](https://bliss.berlin).

Big thanks to our befriended AI student organisation [AITU](https://aitu.group) team for open-sourcing their webpage code, which served as the foundation of this website.

## 🌟 Techstack

The project is built with [Astro](https://astro.build) and follows a minimal setup, using native HTML, CSS, and JS/TS (in `.astro` files) as much as possible. Key packages:

- [Tailwind CSS v4](https://tailwindcss.com) for styling, integrated via the `@tailwindcss/vite` plugin (see `astro.config.mjs`)
- [@astrojs/react](https://docs.astro.build/en/guides/integrations-guide/react/) for the interactive event-timeline components
- **WebGL 2** (custom shaders in `src/lib/background-webgl.ts`) for the homepage particle background
- [@fontsource/righteous](https://fontsource.org/fonts/righteous) for the landing display font
- [@astrojs/vercel](https://docs.astro.build/en/guides/integrations-guide/vercel/) as the deployment adapter (static output on Vercel)

## 🚀 Project Structure

```plain
/
├── public/            # static assets served as-is (favicons, /assets, webmanifest)
├── src/
│   ├── components/    # .astro / .tsx components (incl. events/ and newsletter/)
│   │   └── data/      # event, speaker, workshop, paper, and member data
│   ├── layouts/       # Layout.astro (site) and Newsletter.astro (email)
│   ├── lib/           # background-webgl.ts, event-scroll.ts
│   ├── pages/         # routes (index, speaker-series, reading-group, workshops, …)
│   └── global.css     # Tailwind entry + custom utilities
├── astro.config.mjs
└── package.json
```

Event content (speakers, workshops, reading-group papers, community events) lives in `src/components/data/` and is rendered into a shared timeline via `src/components/events/`. There is no blog.

## Updating team content

- Active members and alumni share `src/components/data/members.ts`; portraits live in `src/images/members/`. Update verified names there to change both the homepage and team page. Keep the German and English board lists in `impressum.astro` and `imprint.astro` in sync.

## 🧞 Local Development

Requires [Node.js](https://nodejs.org) 22.x (see `engines` in `package.json`). The project uses **yarn** (a `yarn.lock` is committed and used by Vercel).

```bash
git clone https://github.com/bliss-e-v/webpage
cd webpage
yarn install
yarn dev          # start the dev server at http://localhost:4321
```

Common scripts:

| Command | Description |
| --- | --- |
| `yarn dev` | Start the local dev server (http://localhost:4321) |
| `yarn build` | Build the static site into `dist/` (and `.vercel/output`) |
| `yarn preview` | Preview the production build locally |
| `yarn newsletter` | Build the site and generate `newsletter.html` from the `/newsletter` route (inlines CSS/SVGs via `generate_final_newsletter.cjs`) |

For changes, branch off `main` (`feat/<name>` or `fix/<name>`), commit with descriptive messages, and open a pull request. Deployment to Vercel happens automatically on merge; a daily GitHub Actions cron also redeploys to refresh time-sensitive event content.

New static images in `public/assets/` should be compressed (aim for < 150 KB); prefer `.webp`/`.jpg`.
