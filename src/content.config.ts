import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// One folder per news item: src/content/news/YYYY-MM-DD-some-slug/index.md (+ images).
// The URL is /news/some-slug (date prefix stripped).
const news = defineCollection({
    loader: glob({
        pattern: "*/index.md",
        base: "./src/content/news",
        generateId: ({ entry }) => entry.split("/")[0].replace(/^\d{4}-\d{2}-\d{2}-/, ""),
    }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            date: z.coerce.date(),
            summary: z.string(),
            category: z.enum(["Announcement", "Partnership", "Event Recap", "Community"]),
            image: image().optional(),
            imageAlt: z.string().optional(),
            // Path of an mp4 in public/, e.g. a semester trailer. `image` is then its poster.
            video: z.string().optional(),
            linkedin: z.string().url().optional(),
        }),
});

export const collections = { news };
