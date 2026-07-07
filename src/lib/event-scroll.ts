import type { BlissEvent } from "@components/data/events";

export type EventScrollRef = {
    id: string;
    date: string;
    seriesNumber?: number;
    kind?: BlissEvent["kind"];
    isCanceled?: boolean;
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
    origin = typeof window !== "undefined" ? window.location.origin : "https://bliss.berlin",
) =>
    `${origin}${getEventSharePath(event.kind)}?id=${encodeURIComponent(getEventShareId(event))}`;

export const toEventScrollRefs = (events: BlissEvent[]): EventScrollRef[] =>
    events.map((event) => ({
        id: event.id,
        date: event.date.toISOString(),
        kind: event.kind,
        isCanceled: event.isCanceled,
        ...(event.seriesNumber != null ? { seriesNumber: event.seriesNumber } : {}),
    }));

// Start of "today" in Europe/Berlin, expressed as UTC midnight to match how event
// dates are parsed (`new Date("YYYY-MM-DD")` yields UTC midnight). Using the runtime's
// local midnight instead would misclassify same-day events for visitors outside Berlin.
export const getBerlinStartOfToday = (now = new Date()): Date => {
    const ymd = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Berlin",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(now);
    return new Date(`${ymd}T00:00:00Z`);
};

export const resolveEventScrollTargetId = (
    events: EventScrollRef[],
    idParam: string | null,
    startOfToday: Date = getBerlinStartOfToday(),
): string | null => {
    if (events.length === 0) return null;

    if (idParam) {
        const match = events.find(
            (event) =>
                event.id === idParam ||
                event.seriesNumber?.toString() === idParam ||
                event.id.endsWith(`-${idParam}`),
        );
        return match?.id ?? null;
    }

    const parsed = events.map((event) => ({ ...event, date: new Date(event.date) }));

    const next = parsed
        .filter((event) => event.date >= startOfToday && !event.isCanceled)
        .sort((a, b) => a.date.getTime() - b.date.getTime())[0];

    if (next) return next.id;

    const last = parsed.sort((a, b) => b.date.getTime() - a.date.getTime())[0];
    return last.id;
};

export const getHeaderHeight = (): number =>
    document.getElementById("header")?.getBoundingClientRect().height ?? 0;

export const getStickySemesterHeaderHeight = (): number =>
    document
        .querySelector<HTMLElement>("[data-semester-header]")
        ?.getBoundingClientRect().height ?? 0;

const getTimelineEventScrollTop = (element: HTMLElement): number => {
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
