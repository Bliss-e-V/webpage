import type { ImageMetadata } from "astro";
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

export type EventLink = {
    label: string;
    href: string;
    external?: boolean;
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
    imageSrc?: string;
    imageAlt?: string;
    badge: EventBadge;
    links: EventLink[];
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

const imageSrc = (image?: ImageMetadata | string) => {
    if (!image) return undefined;
    return typeof image === "string" ? image : image.src;
};

const slugify = (value: string) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

const withoutBorderClasses = (className?: string) =>
    className?.replace(/\bborder(?:-[^\s]+)?/g, "").replace(/\s+/g, " ").trim();

export const getSemester = (date: Date): string => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const shortYear = year % 100;

    if (month >= 10) {
        return `Winter Semester ${year}/${(shortYear + 1).toString().padStart(2, "0")}`;
    }

    if (month >= 4) {
        return `Summer Semester ${year}`;
    }

    return `Winter Semester ${year - 1}/${shortYear.toString().padStart(2, "0")}`;
};

const createSpeakerEvents = (): BlissEvent[] =>
    speakers.map((speaker, index) => {
        const seriesNumber = index + 1;

        return {
            id: `speaker-${seriesNumber}`,
            kind: "speaker",
            date: speaker.date,
            title: speaker.title,
            subtitle: speaker.undefinedEvent ? undefined : `${speaker.name} - ${speaker.affiliation}`,
            description: speaker.abstract,
            href: speaker.url || `/speaker-series?id=${seriesNumber}`,
            externalHref: Boolean(speaker.url),
            imageSrc: imageSrc(speaker.logo),
            imageAlt: speaker.affiliation ? `${speaker.affiliation} logo` : "Speaker logo",
            badge: {
                label: `Speaker Series #${seriesNumber}`,
                className: "bg-emerald-950/70 text-emerald-200",
                href: `/speaker-series?id=${seriesNumber}`,
            },
            links: speaker.url
                ? [{ label: "Meetup Event", href: speaker.url, external: true }]
                : [],
            isCanceled: speaker.canceled,
            seriesNumber,
            details: {
                abstract: speaker.abstract,
                bio: speaker.bio,
                videoId: speaker.videoId,
                images: speaker.images,
            },
        };
    });

const createWorkshopEvents = (): BlissEvent[] =>
    workshops.map((workshop) => {
        const id = `workshop-${workshop.date.toISOString().split("T")[0]}-${slugify(workshop.title)}`;
        return {
        id,
        kind: "workshop",
        date: workshop.date,
        title: workshop.title,
        subtitle: workshop.undefinedEvent
            ? undefined
            : workshop.name
              ? `${workshop.name} - ${workshop.affiliation}`
              : workshop.affiliation,
        description: workshop.description,
        href: workshop.url,
        externalHref: true,
        imageSrc: imageSrc(workshop.image),
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
        links: workshop.url
            ? [{ label: "Registration", href: workshop.url, external: true }]
            : [],
        isCanceled: workshop.canceled,
        };
    });

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
            href: event.url,
            externalHref: true,
            badge: {
                label: "AMA",
                className: "bg-indigo-950/60 text-indigo-200",
                href: event.url,
            },
            links: [{ label: "Join on Discord", href: event.url, external: true }],
            isCanceled: false,
        };
    });

const createReadingGroupEvents = (): BlissEvent[] =>
    Object.entries(dayToPapers).map(([dateString, papers]) => {
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
            imageSrc: imageSrc(primaryPaper?.image),
            imageAlt: primaryPaper ? `${primaryPaper.name} paper image` : "Reading group paper image",
            badge: {
                label: "Reading Group",
                className: "bg-purple-950/70 text-purple-200",
                href: `/reading-group?id=reading-group-${dateString}`,
            },
            links: [
                ...(firstRegistrationHref
                    ? [{ label: "Registration", href: firstRegistrationHref, external: true }]
                    : []),
                { label: "Reading Group", href: "/reading-group" },
            ],
            isCanceled: false,
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
    });

export const getAllEvents = () =>
    [
        ...createSpeakerEvents(),
        ...createWorkshopEvents(),
        ...createCommunityEvents(),
        ...createReadingGroupEvents(),
    ];

export const sortEventsNewestFirst = (events: BlissEvent[]) =>
    [...events].sort((a, b) => b.date.getTime() - a.date.getTime());

export const sortEventsSoonestFirst = (events: BlissEvent[]) =>
    [...events].sort((a, b) => a.date.getTime() - b.date.getTime());

export const filterEventsByKind = (
    events: BlissEvent[],
    kind: TimelineKindFilter,
) => (kind === "all" ? events : events.filter((event) => event.kind === kind));

export const getNextEvent = (events: BlissEvent[], today = currentDate()) =>
    sortEventsSoonestFirst(events.filter((event) => event.date >= today))[0];

export const getTimelineEvents = (kind: TimelineKindFilter = "all") =>
    sortEventsSoonestFirst(filterEventsByKind(getAllEvents(), kind));

export const getUpcomingEvents = (limit = 5) =>
    sortEventsSoonestFirst(
        getAllEvents().filter((event) => event.date >= currentDate()),
    ).slice(0, limit);
