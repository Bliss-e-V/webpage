import { defineConfig, passthroughImageService } from "astro/config";
import dotenv from 'dotenv';

import tailwindcss from "@tailwindcss/vite";

// https://docs.astro.build/en/guides/markdown-content/#modifying-frontmatter-programmatically
import { remarkReadingTime } from './remark-reading-time.mjs';

// https://astro.build/config
import react from "@astrojs/react";

// https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt#readme
import robotsTxt from 'astro-robots-txt';

// https://docs.astro.build/en/guides/integrations-guide/sitemap/
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/guides/integrations-guide/vercel/#web-analytics
import vercel from '@astrojs/vercel';

dotenv.config();

// https://astro.build/config
export default defineConfig({
  site: "https://bliss.berlin",
  integrations: [
    react(),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/newsletter', '/404'],
          crawlDelay: 10
        }
      ],
      sitemap: [
        'https://bliss.berlin/sitemap-index.xml'
      ]
    }),
    sitemap({
      filter: (page) => !page.includes('/newsletter') && !page.includes('/404'),
      customPages: [
        'https://bliss.berlin/',
        'https://bliss.berlin/blissathon',
        'https://bliss.berlin/reading-group',
        'https://bliss.berlin/media'
      ],
      lastmod: new Date(),
      changefreq: 'weekly',
      priority: 0.7
    })
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    },
    remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true
  },
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
    isr: {
      expiration: 60 * 60 * 24,
    },
  }),
  trailingSlash: 'never',
  image: {
    service: passthroughImageService()
  },
});
