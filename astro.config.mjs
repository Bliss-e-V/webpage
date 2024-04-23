import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://docs.astro.build/en/guides/markdown-content/#modifying-frontmatter-programmatically
import { remarkReadingTime } from './remark-reading-time.mjs';

// https://astro.build/config
import react from "@astrojs/react";

// https://docs.astro.build/en/guides/integrations-guide/vercel/
import vercel from '@astrojs/vercel/static';

// https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt#readme
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: "https://bliss.berlin",
  integrations: [tailwind(), react(), robotsTxt()],
  renderers: ['@astrojs/renderer-react'],
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
    analytics: true
  })
});
