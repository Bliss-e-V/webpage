import { getCollection, type CollectionEntry } from "astro:content";

export type NewsEntry = CollectionEntry<"news">;

export const NEWS_CATEGORIES = ["Announcement", "Partnership", "Event Recap", "Community"] as const;

// Newest first.
export async function getNews(limit?: number): Promise<NewsEntry[]> {
    const news = (await getCollection("news")).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
    return limit ? news.slice(0, limit) : news;
}

// Items without body text have no own page and link to the LinkedIn post instead.
export const hasPage = (entry: NewsEntry) => Boolean(entry.body?.trim());

export const newsHref = (entry: NewsEntry) => (hasPage(entry) ? `/news/${entry.id}` : entry.data.linkedin);

const dateFormat = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "long",
    day: "numeric",
});

export const formatNewsDate = (date: Date) => dateFormat.format(date);
