import type { BlissEvent } from "@components/data/events";

export type EventScrollRef = {
    id: string;
    date: string;
    seriesNumber?: number;
    kind?: BlissEvent["kind"];
};

const EVENT_PAGE_PATHS: Record<BlissEvent["kind"], string> = {
    speaker: "/speaker-series",
    workshop: "/workshops",
    "reading-group": "/reading-group",
    community: "/",
};

export const getEventShareId = (event: Pick<BlissEvent, "id" | "kind" | "seriesNumber">) =>
    event.kind === "speaker" && event.seriesNumber != null
        ? String(event.seriesNumber)
        : event.id;

export const getEventSharePath = (kind: BlissEvent["kind"]) => EVENT_PAGE_PATHS[kind];

export const getEventShareUrl = (
    event: Pick<BlissEvent, "id" | "kind" | "seriesNumber">,
    origin = typeof window !== "undefined" ? window.location.origin : "https://www.bliss.berlin",
) =>
    `${origin}${getEventSharePath(event.kind)}?id=${encodeURIComponent(getEventShareId(event))}`;

export const toEventScrollRefs = (events: BlissEvent[]): EventScrollRef[] =>
    events.map((event) => ({
        id: event.id,
        date: event.date.toISOString(),
        kind: event.kind,
        ...(event.seriesNumber != null ? { seriesNumber: event.seriesNumber } : {}),
    }));

export const resolveEventScrollTargetId = (
    events: EventScrollRef[],
    idParam: string | null,
    today = new Date(),
): string | null => {
    if (events.length === 0) return null;

    const startOfToday = new Date(today);
    startOfToday.setHours(0, 0, 0, 0);

    if (idParam) {
        const match = events.find(
            (event) =>
                event.id === idParam ||
                event.seriesNumber?.toString() === idParam ||
                event.id.endsWith(`-${idParam}`),
        );
        return match?.id ?? null;
    }

    const next = [...events]
        .map((event) => ({ ...event, date: new Date(event.date) }))
        .filter((event) => event.date >= startOfToday)
        .sort((a, b) => a.date.getTime() - b.date.getTime())[0];

    return next?.id ?? null;
};

export const EVENT_TIMELINE_SCROLLED_CLASS = "event-timeline-scrolled";

export const getHeaderHeight = (): number =>
    document.getElementById("header")?.getBoundingClientRect().height ?? 0;

export const getStickySemesterHeaderHeight = (): number =>
    document
        .querySelector<HTMLElement>("[data-semester-header]")
        ?.getBoundingClientRect().height ?? 0;

export const getTimelineEventScrollTop = (element: HTMLElement): number => {
    const rect = element.getBoundingClientRect();

    return Math.max(
        0,
        window.scrollY +
            rect.top -
            getHeaderHeight() -
            getStickySemesterHeaderHeight(),
    );
};

export const scrollTimelineEventIntoView = (
    element: HTMLElement,
    behavior: ScrollBehavior = "instant",
): void => {
    window.scrollTo({ top: getTimelineEventScrollTop(element), left: 0, behavior });
};
