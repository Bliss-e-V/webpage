import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
import react from "@astrojs/react";

// https://docs.astro.build/en/guides/integrations-guide/sitemap/
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/guides/integrations-guide/vercel/#web-analytics
import vercel from '@astrojs/vercel';

import { readdirSync } from 'node:fs';
import { talkVideoDates } from './src/components/data/talkVideoDates.ts';

// <lastmod> only where we know when the content really changed: a news item's publication date
// (folder name) and a talk page's video upload. Other pages stay without one, as Google ignores
// lastmod values it can't trust.
const lastmodByPath = Object.fromEntries([
  ...readdirSync('src/content/news').flatMap((folder) => {
    const match = folder.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
    return match ? [[`/news/${match[2]}`, match[1]]] : [];
  }),
  ...Object.entries(talkVideoDates).map(([slug, date]) => [`/speaker-series/${slug}`, date]),
]);

// https://astro.build/config
export default defineConfig({
  site: "https://bliss.berlin",
  build: {
    // Default `auto` only inlines CSS under Vite's assetsInlineLimit (~4kB); our chunks stay external.
    // Inlining removes extra render-blocking stylesheet requests on each page (small total CSS).
    inlineStylesheets: "always",
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/newsletter') && !page.includes('/404'),
      serialize: (item) => {
        const lastmod = lastmodByPath[new URL(item.url).pathname];
        return lastmod ? { ...item, lastmod: new Date(lastmod).toISOString() } : item;
      },
    })
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  trailingSlash: 'never',
});
