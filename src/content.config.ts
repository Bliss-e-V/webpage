import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const news = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/news" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        date: z.coerce.date(),
        category: z.enum(["Partnerships", "Community", "Events", "Society"]),
        summary: z.string().min(1),
        image: image().optional(),
        imageAlt: z.string().min(1).optional(),
        featured: z.boolean().default(false),
        draft: z.boolean().default(true),
      })
      .refine((entry) => !entry.image || entry.imageAlt, {
        message: "An image needs descriptive imageAlt text.",
        path: ["imageAlt"],
      }),
});

export const collections = { news };
