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

## News and design review

Run `yarn dev` and open <http://localhost:4321/news-preview> to compare three working designs: **feed** (short updates), **newsroom** (searchable archive), and **spotlight** (featured story and visual cards). Each includes the same draft content and a preview of the actual homepage with its matching news section. The comparison page also shows all three homepage sections together.

Review pages are available in development only, unless explicitly built with `NEWS_PREVIEW=true yarn build`. They carry `noindex` and are excluded from the sitemap. Do not enable that flag for production. The five supplied entries are illustrative drafts, including dates and proposed wording; review them before publishing.

The public `/news` page currently uses the feed design. The homepage automatically shows up to three updates, prioritizing entries marked `featured`, then filling with the latest entries. With no published entries, the homepage news section is omitted and `/news` shows an empty state. Once a design is chosen, set the same `variant` on `NewsFeed` in `src/pages/news.astro` and `Home` in `src/pages/index.astro`; the options are `feed`, `newsroom`, and `spotlight`.

### Add an update

1. Create a uniquely named `.md` file in `src/content/news/`, using the example below. Contributors can do this with GitHub's **Add file → Create new file** and propose a pull request directly in the browser.
2. Write a short summary and, optionally, a few paragraphs of Markdown underneath. Images are optional. For an image, add it under `src/images/news/`, set `image` to its relative path from the Markdown file, and provide `imageAlt`. Astro creates optimized images automatically.
3. Keep `draft: true` until the wording, date and any image permissions have been checked. Set it to `false` in the publishing PR. Multiple contributors can submit updates independently; a reviewer approves and merges them.
4. Run `yarn build` before merging. Invalid metadata or missing image alt text fails the build. Merging deploys through the existing workflow.

```markdown
---
title: "A short announcement title"
date: 2026-10-10
category: Community
summary: "One or two sentences with the actual news."
featured: false
draft: true
# image: ../../images/news/example.jpg
# imageAlt: "Describe the people or scene in the image"
---
Optional extra detail, with a [useful link](https://bliss.berlin/join).
```

Categories: `Partnerships`, `Community`, `Events`, `Society`. Dates are interpreted in UTC; future-dated entries are excluded until a build on or after that date (the existing daily redeploy refreshes this). File names become stable link anchors, e.g. `/news#jane-street`; do not rename published files without considering incoming links. Updates render as HTML and remain readable without JavaScript; JavaScript only enhances search, filtering and opening linked updates. There is no social-media dependency, CMS subscription, or separate article-writing requirement.

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
