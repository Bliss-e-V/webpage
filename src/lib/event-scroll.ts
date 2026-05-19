import type { BlissEvent } from "@components/data/events";

export type EventScrollRef = {
    id: string;
    date: string;
    seriesNumber?: number;
};

export const toEventScrollRefs = (events: BlissEvent[]): EventScrollRef[] =>
    events.map((event) => ({
        id: event.id,
        date: event.date.toISOString(),
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

/** Viewport height fraction where the event center should land (upper half). */
export const TIMELINE_EVENT_SCROLL_CENTER_RATIO = 0.3;

export const getTimelineEventScrollTop = (element: HTMLElement): number => {
    const rect = element.getBoundingClientRect();
    const elementCenterY = rect.top + rect.height / 2;
    const targetCenterY = window.innerHeight * TIMELINE_EVENT_SCROLL_CENTER_RATIO;

    return Math.max(0, window.scrollY + elementCenterY - targetCenterY);
};

export const scrollTimelineEventIntoView = (element: HTMLElement): void => {
    window.scrollTo({ top: getTimelineEventScrollTop(element), left: 0, behavior: "instant" });
};
