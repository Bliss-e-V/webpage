import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { BlissEvent } from "@components/data/events";
import { EventMediaSlideshow } from "@components/events/EventMediaSlideshow";
import { formatAuthorList } from "@utils/formatAuthorList";
import {
    getEventShareUrl,
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
    currentPath?: string;
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
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

const LinkIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M20 6 9 17l-5-5" />
    </svg>
);

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

const getDetailHref = (event: TimelineEvent, currentPath?: string) => {
    if (!event.href) return undefined;
    if (event.externalHref) return event.href;

    if (currentPath) {
        const [path] = event.href.split("#");
        if (path === currentPath) return undefined;
    }

    return event.href;
};

export const EventTimeline = ({
    events,
    emptyMessage = "No events scheduled. Stay tuned!",
    compact = false,
    autoScrollToNext = false,
    showDividers = true,
    expandLabel = "Preview",
    currentPath,
}: EventTimelineProps) => {
    const [expandedEvents, setExpandedEvents] = useState<string[]>([]);
    const [copiedEventId, setCopiedEventId] = useState<string | null>(null);
    const [showScrollToUpcoming, setShowScrollToUpcoming] = useState(false);
    const didPostExpandScroll = useRef(false);
    const userCollapsedEvents = useRef(new Set<string>());
    const copiedTimeoutRef = useRef<number | null>(null);
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

        if (!targetId || userCollapsedEvents.current.has(targetId)) return;

        setExpandedEvents((current) =>
            current.includes(targetId) ? current : [...current, targetId],
        );
    }, [autoScrollToNext, normalizedEvents, today]);

    useLayoutEffect(() => {
        if (!autoScrollToNext || normalizedEvents.length === 0) return;

        const idParam = new URLSearchParams(window.location.search).get("id");
        const targetId = resolveEventScrollTargetId(
            toEventScrollRefs(normalizedEvents),
            idParam,
            today,
        );

        if (
            !targetId ||
            didPostExpandScroll.current ||
            !expandedEvents.includes(targetId)
        ) {
            return;
        }

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

    useEffect(
        () => () => {
            if (copiedTimeoutRef.current != null) {
                window.clearTimeout(copiedTimeoutRef.current);
            }
        },
        [],
    );

    const copyEventLink = async (event: TimelineEvent) => {
        const url = getEventShareUrl(event);

        try {
            await navigator.clipboard.writeText(url);
        } catch {
            return;
        }

        setCopiedEventId(event.id);
        if (copiedTimeoutRef.current != null) {
            window.clearTimeout(copiedTimeoutRef.current);
        }
        copiedTimeoutRef.current = window.setTimeout(() => {
            setCopiedEventId((current) => (current === event.id ? null : current));
            copiedTimeoutRef.current = null;
        }, 2000);
    };

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
        setExpandedEvents((current) => {
            if (current.includes(eventId)) {
                userCollapsedEvents.current.add(eventId);
                return current.filter((id) => id !== eventId);
            }

            userCollapsedEvents.current.delete(eventId);
            return [...current, eventId];
        });
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
                    const readingGroupSessionInfo =
                        event.kind === "reading-group" ? event.details?.sessionInfo : undefined;
                    const hasPreview = Boolean(
                        event.kind === "reading-group"
                            ? readingGroupPapers.length > 1 || readingGroupSessionInfo
                            : event.description ||
                                  (event.details &&
                                      (event.details.abstract ||
                                          event.details.bio ||
                                          event.details.videoId ||
                                          event.details.images?.length)),
                    );
                    const detailHref = getDetailHref(event, currentPath);
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
                                        "group/card relative overflow-hidden rounded-lg text-left transition-colors duration-200",
                                        compact ? "px-3 py-2.5 sm:px-4" : "px-3 py-3 sm:px-4",
                                        isNext ? "bg-neutral-900/65" : "hover:bg-neutral-900/45",
                                        isPast && "opacity-70",
                                        event.isCanceled && "line-through",
                                    )}
                                >
                                    {autoScrollToNext && (
                                        <button
                                            type="button"
                                            onClick={() => copyEventLink(event)}
                                            className={classNames(
                                                "absolute right-2 top-2 z-10 rounded-md p-1.5 text-gray-400 transition-all",
                                                "opacity-0 focus-visible:opacity-100 group-hover/card:opacity-100",
                                                "hover:bg-neutral-800/80 hover:text-white",
                                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
                                                copiedEventId === event.id && "opacity-100 text-emerald-400",
                                            )}
                                            aria-label={
                                                copiedEventId === event.id
                                                    ? "Event link copied"
                                                    : "Copy link to this event"
                                            }
                                            title={
                                                copiedEventId === event.id
                                                    ? "Link copied"
                                                    : "Copy link to this event"
                                            }
                                        >
                                            {copiedEventId === event.id ? (
                                                <CheckIcon className="h-4 w-4" />
                                            ) : (
                                                <LinkIcon className="h-4 w-4" />
                                            )}
                                        </button>
                                    )}

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
                                                {detailHref && (
                                                    <a
                                                        href={detailHref}
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

                                            {event.description &&
                                                !event.details?.abstract &&
                                                !(event.kind === "reading-group" && readingGroupSessionInfo) && (
                                                <div className="mb-4">
                                                    <h3 className="mb-2 font-bold text-white">Description</h3>
                                                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300 sm:text-base">
                                                        {event.description}
                                                    </p>
                                                </div>
                                            )}

                                            {readingGroupSessionInfo && (
                                                <div className="mb-4">
                                                    <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                                                        {readingGroupSessionInfo.seasonIntro &&
                                                        readingGroupSessionInfo.semesterLabel ? (
                                                            <>
                                                                {readingGroupSessionInfo.seasonIntro}{" "}
                                                                <strong className="text-white">
                                                                    {readingGroupSessionInfo.semesterLabel}
                                                                </strong>{" "}
                                                                reading group.{" "}
                                                                {readingGroupSessionInfo.description}
                                                            </>
                                                        ) : (
                                                            readingGroupSessionInfo.description
                                                        )}
                                                    </p>
                                                    {readingGroupSessionInfo.location && (
                                                        <p className="mt-3 text-sm leading-relaxed text-gray-300 sm:text-base">
                                                            <span className="font-bold text-white">Location: </span>
                                                            <a
                                                                href={readingGroupSessionInfo.location.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="font-semibold text-primary underline hover:text-white"
                                                            >
                                                                {readingGroupSessionInfo.location.name}
                                                            </a>{" "}
                                                            ({readingGroupSessionInfo.location.address})
                                                        </p>
                                                    )}
                                                    {readingGroupSessionInfo.schedule && (
                                                        <p className="mt-3 text-sm leading-relaxed text-gray-300 sm:text-base">
                                                            <span className="font-bold text-white">Time: </span>
                                                            {readingGroupSessionInfo.schedule}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {event.details?.papers && !readingGroupSessionInfo && (
                                                <div className="space-y-4">
                                                    {event.details.papers.map((paper) => (
                                                        <div
                                                            key={paper.title}
                                                            className="rounded-lg bg-black/15 p-3"
                                                        >
                                                            <h3 className="font-bold text-white">{paper.title}</h3>
                                                            <p className="mt-1 text-sm text-gray-400">
                                                                {formatAuthorList(paper.authors)}
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
                className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 cursor-pointer rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/40 transition hover:bg-accent-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
                Scroll to upcoming
            </button>
        )}
        </>
    );
};
