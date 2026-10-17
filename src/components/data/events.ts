import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";
import { formatAuthorList } from "@utils/formatAuthorList";
import { dayToPapers, getReadingGroupSectionForDate, type Paper } from "./papers";
import type { ReadingGroupSessionInfo } from "./papers";
import { communityEvents } from "./communityEvents";
import { speakers } from "./speakers";
import { workshops } from "./workshops";

export type BlissEventKind = "speaker" | "workshop" | "reading-group" | "community";

export type EventBadge = {
    label: string;
    className?: string;
    href?: string;
};

export type ReadingGroupPaperSummary = {
    title: string;
    authors: string[];
    paperHref: string;
    registrationHref?: string;
};

export type BlissEvent = {
    id: string;
    kind: BlissEventKind;
    date: Date;
    title: string;
    subtitle?: string;
    description?: string;
    href?: string;
    externalHref?: boolean;
    // Several registration platforms for the same event, shown instead of the single "Register" link.
    registrationLinks?: { label: string; href: string }[];
    imageSrc?: string;
    imageWidth?: number;
    imageHeight?: number;
    imageAlt?: string;
    badge: EventBadge;
    isCanceled: boolean;
    seriesNumber?: number;
    details?: {
        abstract?: string;
        bio?: string;
        videoId?: string;
        images?: string[];
        papers?: ReadingGroupPaperSummary[];
        sessionInfo?: ReadingGroupSessionInfo;
    };
};

export type TimelineKindFilter = BlissEventKind | "all";

const currentDate = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
};

const thumbnail = async (image?: ImageMetadata | string) => {
    if (!image) return {};
    if (typeof image === "string") return { imageSrc: image };

    // Timeline images fit within 128 × 96 CSS pixels; keep enough detail for 2× displays.
    const scale = Math.min(1, 256 / image.width, 192 / image.height);
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));
    const src = image.format === "svg"
        ? image.src
        : (await getImage({ src: image, width, height, format: "webp" })).src;
    return { imageSrc: src, imageWidth: width, imageHeight: height };
};

const slugify = (value: string) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

const withoutBorderClasses = (className?: string) =>
    className?.replace(/\bborder(?:-[^\s]+)?/g, "").replace(/\s+/g, " ").trim();

const createSpeakerEvents = (): Promise<BlissEvent[]> =>
    Promise.all(speakers.map(async (speaker, index): Promise<BlissEvent> => {
        const seriesNumber = index + 1;

        return {
            id: `speaker-${seriesNumber}`,
            kind: "speaker",
            date: speaker.date,
            title: speaker.title,
            subtitle: `${speaker.name} - ${speaker.affiliation}`,
            description: speaker.abstract,
            href: speaker.url || `/speaker-series?id=${seriesNumber}`,
            externalHref: Boolean(speaker.url),
            registrationLinks:
                speaker.url && speaker.lumaUrl
                    ? [
                          { label: "Meetup", href: speaker.url },
                          { label: "Luma", href: speaker.lumaUrl },
                      ]
                    : undefined,
            ...await thumbnail(speaker.logo),
            imageAlt: speaker.affiliation ? `${speaker.affiliation} logo` : "Speaker logo",
            badge: {
                label: `Speaker Series #${seriesNumber}`,
                className: "bg-emerald-950/70 text-emerald-200",
                href: `/speaker-series?id=${seriesNumber}`,
            },
            isCanceled: speaker.canceled,
            seriesNumber,
            details: {
                abstract: speaker.abstract,
                bio: speaker.bio,
                videoId: speaker.videoId,
                images: speaker.images,
            },
        };
    }));

const createWorkshopEvents = (): Promise<BlissEvent[]> =>
    Promise.all(workshops.map(async (workshop): Promise<BlissEvent> => {
        const id = `workshop-${workshop.date.toISOString().split("T")[0]}-${slugify(workshop.title)}`;
        return {
        id,
        kind: "workshop",
        date: workshop.date,
        title: workshop.title,
        subtitle: workshop.name
            ? `${workshop.name} - ${workshop.affiliation}`
            : workshop.affiliation,
        description: workshop.description,
        href: workshop.url,
        externalHref: true,
        ...await thumbnail(workshop.image),
        imageAlt: workshop.affiliation ? `${workshop.affiliation} logo` : "Workshop logo",
        badge: workshop.tag
            ? {
                  ...workshop.tag,
                  className: withoutBorderClasses(workshop.tag.className),
                  href: `/workshops?id=${encodeURIComponent(id)}`,
              }
            : {
                  label: "Workshop",
                  className: "bg-sky-950/70 text-sky-200",
                  href: `/workshops?id=${encodeURIComponent(id)}`,
              },
        isCanceled: workshop.canceled,
        details: {
            videoId: workshop.videoId,
        },
        };
    }));

const readingGroupTitle = (papers: Paper[]) => {
    if (papers.length === 1) return papers[0].name;
    return `${papers.length} papers: ${papers.map((paper) => paper.name).join(", ")}`;
};

const createCommunityEvents = (): BlissEvent[] =>
    communityEvents.map((event) => {
        const id = `community-${event.date.toISOString().split("T")[0]}-${slugify(event.title)}`;
        return {
            id,
            kind: "community",
            date: event.date,
            title: event.title,
            subtitle: event.subtitle,
            description: event.description,
            href: event.url,
            externalHref: true,
            badge: {
                label: "AMA",
                className: "bg-indigo-950/60 text-indigo-200",
                href: event.url,
            },
            isCanceled: false,
        };
    });

const createReadingGroupEvents = (): Promise<BlissEvent[]> =>
    Promise.all(Object.entries(dayToPapers).map(async ([dateString, papers]): Promise<BlissEvent> => {
        const date = new Date(dateString);
        const primaryPaper = papers[0];
        const firstRegistrationHref = papers.find((paper) => paper.eventLink)?.eventLink;
        const section = getReadingGroupSectionForDate(date);
        const sessionInfo = section?.sessionInfo;

        return {
            id: `reading-group-${dateString}`,
            kind: "reading-group",
            date,
            title: readingGroupTitle(papers),
            subtitle:
                papers.length === 1
                    ? formatAuthorList(papers[0].authors)
                    : "Reading group session",
            description: sessionInfo
                ? undefined
                : papers.length === 1
                  ? `Discussion of ${papers[0].name}`
                  : `Discussion of ${papers.length} papers`,
            href: firstRegistrationHref ?? `/reading-group#reading-group-${dateString}`,
            externalHref: Boolean(firstRegistrationHref),
            ...await thumbnail(primaryPaper?.image),
            imageAlt: primaryPaper ? `${primaryPaper.name} paper image` : "Reading group paper image",
            badge: {
                label: "Reading Group",
                className: "bg-purple-950/70 text-purple-200",
                href: `/reading-group?id=reading-group-${dateString}`,
            },
            isCanceled: papers.some((paper) => paper.canceled),
            details: {
                papers: papers.map((paper) => ({
                    title: paper.name,
                    authors: paper.authors,
                    paperHref: paper.link,
                    registrationHref: paper.eventLink,
                })),
                sessionInfo,
            },
        };
    }));

export const getAllEvents = async (): Promise<BlissEvent[]> =>
    (await Promise.all([
        createSpeakerEvents(),
        createWorkshopEvents(),
        createCommunityEvents(),
        createReadingGroupEvents(),
    ])).flat();

export const sortEventsSoonestFirst = (events: BlissEvent[]) =>
    [...events].sort((a, b) => a.date.getTime() - b.date.getTime());

export const filterEventsByKind = (
    events: BlissEvent[],
    kind: TimelineKindFilter,
) => (kind === "all" ? events : events.filter((event) => event.kind === kind));

export const getTimelineEvents = async (kind: TimelineKindFilter = "all") =>
    sortEventsSoonestFirst(filterEventsByKind(await getAllEvents(), kind));

export const getUpcomingEvents = async (limit = 5) =>
    sortEventsSoonestFirst(
        (await getAllEvents()).filter(
            (event) => event.date >= currentDate() && !event.isCanceled,
        ),
    ).slice(0, limit);
