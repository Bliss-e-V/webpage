import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { BlissEvent } from "@components/data/events";
import { EventMediaSlideshow } from "@components/events/EventMediaSlideshow";
import {
    getHeaderHeight,
    resolveEventScrollTargetId,
    scrollTimelineEventIntoView,
    toEventScrollRefs,
} from "@lib/event-scroll";

type TimelineEvent = Omit<BlissEvent, "date"> & {
    date: Date | string;
};

type EventTimelineProps = {
    events: TimelineEvent[];
    emptyMessage?: string;
    compact?: boolean;
    autoScrollToNext?: boolean;
    showDividers?: boolean;
    expandLabel?: string;
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

const compactDateFormat = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
});

const classNames = (...values: Array<string | false | undefined>) =>
    values.filter(Boolean).join(" ");

const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
};

const getSemester = (date: Date): string => {
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

const normalizeEvents = (events: TimelineEvent[]) =>
    events.map((event) => ({
        ...event,
        date: event.date instanceof Date ? event.date : new Date(event.date),
    }));

const eventIsExternal = (event: TimelineEvent) =>
    event.externalHref || event.href?.startsWith("http");

export const EventTimeline = ({
    events,
    emptyMessage = "No events scheduled. Stay tuned!",
    compact = false,
    autoScrollToNext = false,
    showDividers = true,
    expandLabel = "Preview",
}: EventTimelineProps) => {
    const [expandedEvents, setExpandedEvents] = useState<string[]>([]);
    const [showScrollToUpcoming, setShowScrollToUpcoming] = useState(false);
    const didPostExpandScroll = useRef(false);
    const normalizedEvents = useMemo(() => normalizeEvents(events), [events]);
    const today = useMemo(() => getToday(), []);
    const nextEvent = useMemo(
        () =>
            [...normalizedEvents]
                .filter((event) => event.date >= today)
                .sort((a, b) => a.date.getTime() - b.date.getTime())[0],
        [normalizedEvents, today],
    );

    useLayoutEffect(() => {
        if (!autoScrollToNext || normalizedEvents.length === 0) return;

        const idParam = new URLSearchParams(window.location.search).get("id");
        const targetId = resolveEventScrollTargetId(
            toEventScrollRefs(normalizedEvents),
            idParam,
            today,
        );

        if (!targetId) return;

        setExpandedEvents((current) =>
            current.includes(targetId) ? current : [...current, targetId],
        );

        if (didPostExpandScroll.current || !expandedEvents.includes(targetId)) return;

        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        scrollTimelineEventIntoView(targetElement);
        requestAnimationFrame(() => {
            scrollTimelineEventIntoView(targetElement);
            didPostExpandScroll.current = true;
        });
    }, [autoScrollToNext, normalizedEvents, today, expandedEvents]);

    useEffect(() => {
        if (!autoScrollToNext || !nextEvent) {
            setShowScrollToUpcoming(false);
            return;
        }

        const element = document.getElementById(nextEvent.id);
        if (!element) return;

        let observer: IntersectionObserver | null = null;

        const observe = () => {
            observer?.disconnect();
            observer = new IntersectionObserver(
                ([entry]) => setShowScrollToUpcoming(!entry.isIntersecting),
                {
                    rootMargin: `-${getHeaderHeight()}px 0px 0px 0px`,
                    threshold: 0,
                },
            );
            observer.observe(element);
        };

        observe();
        window.addEventListener("resize", observe);
        document.addEventListener("bliss-header-sync", observe);

        return () => {
            observer?.disconnect();
            window.removeEventListener("resize", observe);
            document.removeEventListener("bliss-header-sync", observe);
        };
    }, [autoScrollToNext, nextEvent?.id]);

    const scrollToUpcoming = () => {
        if (!nextEvent) return;

        const element = document.getElementById(nextEvent.id);
        if (!element) return;

        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth";
        scrollTimelineEventIntoView(element, behavior);
    };

    const toggleExpanded = (eventId: string) => {
        setExpandedEvents((current) =>
            current.includes(eventId)
                ? current.filter((id) => id !== eventId)
                : [...current, eventId],
        );
    };

    if (normalizedEvents.length === 0) {
        return <p className="text-center text-secondary">{emptyMessage}</p>;
    }

    let previousDivider = "";

    return (
        <>
        <div className={classNames("relative w-full", !compact && "md:pl-40")}>
            <ol className="relative border-l border-gray-800/70">
                {normalizedEvents.map((event) => {
                    const isPast = event.date < today;
                    const isNext = nextEvent?.id === event.id;
                    const isExpanded = expandedEvents.includes(event.id);
                    const readingGroupPapers =
                        event.kind === "reading-group" ? event.details?.papers ?? [] : [];
                    const hasPreview = Boolean(
                        event.kind === "reading-group"
                            ? readingGroupPapers.length > 1
                            : event.description ||
                                  (event.details &&
                                      (event.details.abstract ||
                                          event.details.bio ||
                                          event.details.videoId ||
                                          event.details.images?.length)),
                    );
                    const divider = getSemester(event.date);
                    const shouldRenderDivider = showDividers && divider !== previousDivider;
                    previousDivider = divider;

                    return (
                        <div key={event.id}>
                            {shouldRenderDivider && (
                                <li className="mb-4 mt-10 first:mt-0">
                                    <div className="pl-5 text-left">
                                        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
                                            {divider}
                                        </span>
                                        <div className="mt-2 h-px w-full bg-gradient-to-r from-gray-700 to-transparent" />
                                    </div>
                                </li>
                            )}

                            <li
                                id={event.id}
                                className={classNames(
                                    "group relative mb-4 scroll-mt-36 pl-5",
                                    compact && "mb-3",
                                )}
                            >
                                {event.imageSrc && !compact && (
                                    <div className="absolute -left-40 top-0 hidden h-24 w-32 items-center justify-end pr-5 md:flex">
                                        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-black/15 p-2">
                                            <img
                                                src={event.imageSrc}
                                                alt={event.imageAlt ?? ""}
                                                className={classNames(
                                                    "max-h-full max-w-full",
                                                    event.kind === "reading-group"
                                                        ? "h-full w-full object-cover"
                                                        : "object-contain",
                                                )}
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div
                                    className={classNames(
                                        "absolute left-[calc(-0.3125rem-1px)] top-5 z-10 h-2.5 w-2.5 rounded-full border-2",
                                        isNext
                                            ? "border-accent bg-accent shadow-[0_0_12px_rgba(255,107,107,0.75)]"
                                            : isPast
                                              ? "border-neutral-950 bg-gray-700"
                                              : "border-neutral-950 bg-gray-200",
                                    )}
                                />

                                <div
                                    className={classNames(
                                        "relative overflow-hidden rounded-lg text-left transition-colors duration-200",
                                        compact ? "px-3 py-2.5 sm:px-4" : "px-3 py-3 sm:px-4",
                                        isNext ? "bg-neutral-900/65" : "hover:bg-neutral-900/45",
                                        isPast && "opacity-70",
                                        event.isCanceled && "line-through",
                                    )}
                                >
                                    {isNext && (
                                        <div className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-red-right" />
                                    )}

                                    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start">
                                        {event.imageSrc && !compact && (
                                            <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded bg-black/10 p-1.5 md:hidden">
                                                <img
                                                    src={event.imageSrc}
                                                    alt={event.imageAlt ?? ""}
                                                    className={classNames(
                                                        "max-h-full max-w-full",
                                                        event.kind === "reading-group"
                                                            ? "h-full w-full object-cover"
                                                            : "object-contain",
                                                    )}
                                                    loading="lazy"
                                                />
                                            </div>
                                        )}

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                                <time
                                                    dateTime={event.date.toISOString()}
                                                    className="text-sm font-normal text-gray-400"
                                                >
                                                    {(compact ? compactDateFormat : dateFormat).format(
                                                        event.date,
                                                    )}
                                                </time>
                                                {isNext && (
                                                    <span className="rounded-full bg-accent/90 px-2 py-0.5 text-xs font-bold text-white">
                                                        Next Up
                                                    </span>
                                                )}
                                                <span
                                                    className={classNames(
                                                        "rounded px-1.5 py-0.5 text-[11px] font-medium leading-none",
                                                        event.badge.className ??
                                                            "bg-gray-800 text-gray-300",
                                                    )}
                                                >
                                                    {event.badge.label}
                                                </span>
                                            </div>

                                            <div
                                                className={classNames(
                                                    "mt-1 font-bold leading-snug text-white",
                                                    compact ? "text-base sm:text-lg" : "text-lg",
                                                )}
                                            >
                                                {event.title}
                                            </div>

                                            {event.subtitle && (
                                                <p className="mt-1 text-sm text-gray-300">
                                                    {event.subtitle}
                                                </p>
                                            )}

                                            <div className="mt-2 flex flex-wrap items-center gap-3">
                                                {event.href && (
                                                    <a
                                                        href={event.href}
                                                        target={eventIsExternal(event) ? "_blank" : "_self"}
                                                        rel={eventIsExternal(event) ? "noopener noreferrer" : undefined}
                                                        className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-white hover:underline"
                                                    >
                                                        {event.externalHref ? "Register" : "Open Details"}
                                                    </a>
                                                )}

                                                {readingGroupPapers.length === 1 && (
                                                    <a
                                                        href={readingGroupPapers[0].paperHref}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center text-sm font-semibold text-gray-300 transition-colors hover:text-white hover:underline"
                                                    >
                                                        Paper
                                                    </a>
                                                )}

                                                {hasPreview && (
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleExpanded(event.id)}
                                                        className="inline-flex items-center text-sm font-semibold text-gray-300 transition-colors hover:text-white hover:underline"
                                                    >
                                                        {isExpanded ? `Hide ${expandLabel}` : expandLabel}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {isExpanded && hasPreview && (
                                        <div className="mt-3 border-t border-gray-800/70 pt-3">
                                            {event.details?.abstract && (
                                                <div className="mb-4">
                                                    <h3 className="mb-2 font-bold text-white">Abstract</h3>
                                                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300 sm:text-base">
                                                        {event.details.abstract}
                                                    </p>
                                                </div>
                                            )}

                                            {event.details?.bio && (
                                                <div className="mb-4">
                                                    <h3 className="mb-2 font-bold text-white">About</h3>
                                                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300 sm:text-base">
                                                        {event.details.bio}
                                                    </p>
                                                </div>
                                            )}

                                            {event.description && !event.details?.abstract && (
                                                <div className="mb-4">
                                                    <h3 className="mb-2 font-bold text-white">Description</h3>
                                                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300 sm:text-base">
                                                        {event.description}
                                                    </p>
                                                </div>
                                            )}

                                            {event.details?.papers && (
                                                <div className="space-y-4">
                                                    {event.details.papers.map((paper) => (
                                                        <div
                                                            key={paper.title}
                                                            className="rounded-lg bg-black/15 p-3"
                                                        >
                                                            <h3 className="font-bold text-white">{paper.title}</h3>
                                                            <p className="mt-1 text-sm text-gray-400">
                                                                {paper.authors.length >= 10
                                                                    ? `${paper.authors.slice(0, 8).join(", ")} et al.`
                                                                    : paper.authors.join(", ")}
                                                            </p>
                                                            <div className="mt-3 flex flex-wrap gap-3 text-sm">
                                                                <a
                                                                    href={paper.paperHref}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-primary underline hover:text-white"
                                                                >
                                                                    Paper
                                                                </a>
                                                                {paper.registrationHref && (
                                                                    <a
                                                                        href={paper.registrationHref}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-primary underline hover:text-white"
                                                                    >
                                                                        Registration
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {(event.details?.videoId ||
                                                (event.details?.images &&
                                                    event.details.images.length > 0)) && (
                                                <EventMediaSlideshow
                                                    videoId={event.details?.videoId}
                                                    images={event.details?.images}
                                                    title={event.title}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </li>
                        </div>
                    );
                })}
            </ol>
        </div>
        {autoScrollToNext && nextEvent && showScrollToUpcoming && (
            <button
                type="button"
                onClick={scrollToUpcoming}
                className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/40 transition hover:bg-accent-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
                Scroll to upcoming
            </button>
        )}
        </>
    );
};
