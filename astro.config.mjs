import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
import react from "@astrojs/react";

// https://docs.astro.build/en/guides/integrations-guide/sitemap/
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/guides/integrations-guide/vercel/#web-analytics
import vercel from '@astrojs/vercel';

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
      changefreq: 'weekly',
      priority: 0.7
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
