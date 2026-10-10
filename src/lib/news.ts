import { getCollection, type CollectionEntry } from "astro:content";

export type NewsEntry = CollectionEntry<"news">;
export const newsVariants = ["feed", "newsroom", "spotlight"] as const;
export type NewsVariant = (typeof newsVariants)[number];
export const newsOptions = {
  feed: {
    name: "The feed",
    label: "01",
    description: "Short updates, in the moment.",
    tradeoff:
      "The lightest editorial workload. Complete updates live in one chronological stream; images are optional.",
  },
  newsroom: {
    name: "The newsroom",
    label: "02",
    description: "Everything, easy to find.",
    tradeoff:
      "Best as the archive grows. Search, topic and year filters make older announcements easy to find.",
  },
  spotlight: {
    name: "The spotlight",
    label: "03",
    description: "A little more room for big news.",
    tradeoff:
      "Best for partnerships and photo recaps. A featured story leads a visual grid; strong images help this layout most.",
  },
};

export async function getNews(preview = false) {
  const now = new Date();
  return (
    await getCollection(
      "news",
      ({ data }) => preview || (!data.draft && data.date <= now),
    )
  ).sort(
    (a, b) =>
      b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id),
  );
}

export function featuredNews(entries: NewsEntry[], limit = 3) {
  return [
    ...entries.filter((entry) => entry.data.featured),
    ...entries.filter((entry) => !entry.data.featured),
  ].slice(0, limit);
}

export const newsDate = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
