import { defineConfig } from "astro/config";
import dotenv from 'dotenv';

import tailwind from "@astrojs/tailwind";

// https://docs.astro.build/en/guides/markdown-content/#modifying-frontmatter-programmatically
import { remarkReadingTime } from './remark-reading-time.mjs';

// https://astro.build/config
import react from "@astrojs/react";

// https://docs.astro.build/en/guides/integrations-guide/vercel/

// https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt#readme
import robotsTxt from 'astro-robots-txt';

// https://docs.astro.build/en/guides/integrations-guide/sitemap/
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/guides/integrations-guide/vercel/#web-analytics
import vercel from '@astrojs/vercel/serverless';

dotenv.config();

// https://astro.build/config
export default defineConfig({
  site: "https://bliss.berlin",
  integrations: [tailwind(), react(), robotsTxt(), sitemap()],
  renderers: ['@astrojs/renderer-react'],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    },
    remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true
  },
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  trailingSlash: 'never',
});
