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

## Adding news

Each news item is one folder in `src/content/news/`, named `YYYY-MM-DD-short-title` (the URL becomes `/news/short-title`). The homepage shows the three newest items. No local setup is needed; the GitHub web interface is enough:

1. On GitHub, open `src/content/news/`, click **Add file → Create new file** and enter `2026-11-03-short-title/index.md` as the name.
2. Paste and fill in this template:

   ```md
   ---
   title: Jane Street joins BLISS as a sponsor
   date: 2026-11-03
   category: Partnership   # Announcement | Partnership | Event Recap | Community
   summary: One or two sentences. Shown in lists and on the homepage.
   image: ./cover.jpg      # optional, file in the same folder
   imageAlt: What is in the picture   # optional
   linkedin: https://www.linkedin.com/feed/update/...   # optional
   ---

   Optional full text in Markdown. If you leave it empty, the item has no own page and links to the LinkedIn post.
   ```

3. Click **Commit changes**, select **Create a new branch and start a pull request**.
4. Optional image: on the new branch, open the new folder, use **Add file → Upload files** (compress it, < 300 KB) and commit to the same branch.
5. Vercel posts a preview link in the pull request. Check it and merge.

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
