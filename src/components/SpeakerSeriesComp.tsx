import { useState, useEffect } from 'react';
import { speakers } from "./data/speakers";

export interface SpeakerSeriesCompProps {
    renderPastEvents?: boolean;
}

// Function to get semester string from a date (e.g., "WS25/26" or "SS25")
function getSemester(date: Date): string {
    const month = date.getMonth() + 1; // 1-12
    const year = date.getFullYear();
    const shortYear = year % 100; // Last 2 digits of year

    // Winter Semester: October (10) - March (3) of next year
    // Summer Semester: April (4) - September (9)
    if (month >= 10) {
        // October, November, December -> Winter Semester of current year/next year
        return `WS${shortYear}/${(shortYear + 1).toString().padStart(2, '0')}`;
    } else if (month >= 4) {
        // April - September -> Summer Semester of current year
        return `SS${shortYear}`;
    } else {
        // January - March -> Winter Semester of previous year/current year
        return `WS${shortYear - 1}/${shortYear.toString().padStart(2, '0')}`;
    }
}

export const SpeakerSeriesComp = (props: SpeakerSeriesCompProps) => {
    const renderPastEvents = props.renderPastEvents ?? true;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Separate into future and past
    const futureEvents = speakers.filter(s => s.date >= currentDate);
    const pastEvents = speakers.filter(s => s.date < currentDate);

    // Sort future events in reverse chronological order (newest first)
    const sortedFutureEvents = futureEvents.sort((a, b) => b.date.getTime() - a.date.getTime());

    // Sort past events in reverse chronological order (newest first)
    const sortedPastEvents = pastEvents.sort((a, b) => b.date.getTime() - a.date.getTime());

    // Combine: future first, then past
    const eventsToRender = renderPastEvents
        ? [...sortedFutureEvents, ...sortedPastEvents]
        : sortedFutureEvents;

    // Group by semester
    const eventsBySemester: { semester: string; events: typeof speakers }[] = [];
    let currentSemester: string | null = null;
    let currentGroup: typeof speakers = [];

    eventsToRender.forEach((event) => {
        const semester = getSemester(event.date);
        if (currentSemester === null || currentSemester !== semester) {
            // Save previous group if it exists
            if (currentSemester !== null && currentGroup.length > 0) {
                eventsBySemester.push({ semester: currentSemester, events: [...currentGroup] });
            }
            // Start new group
            currentSemester = semester;
            currentGroup = [event];
        } else {
            currentGroup.push(event);
        }
    });

    // Don't forget the last group
    if (currentSemester !== null && currentGroup.length > 0) {
        eventsBySemester.push({ semester: currentSemester, events: [...currentGroup] });
    }

    // State for expanded items
    const [expandedEvents, setExpandedEvents] = useState<string[]>([]);
    const [lightboxState, setLightboxState] = useState<{ images: string[], index: number } | null>(null);
    const [expandedDetails, setExpandedDetails] = useState<string[]>([]);
    // Notification state
    const [notification, setNotification] = useState<{ show: boolean, message: string, id: string | null }>({ show: false, message: '', id: null });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxState(null);
            if (lightboxState) {
                if (e.key === 'ArrowLeft') {
                    setLightboxState({ ...lightboxState, index: (lightboxState.index - 1 + lightboxState.images.length) % lightboxState.images.length });
                } else if (e.key === 'ArrowRight') {
                    setLightboxState({ ...lightboxState, index: (lightboxState.index + 1) % lightboxState.images.length });
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxState]);

    const toggleDetails = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setExpandedDetails(prev =>
            prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
        );
    };

    // Check for query param 'id' in URL to expand event on load
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);
            const id = searchParams.get('id');
            if (id) {
                // Try to match id to videoId, date (YYYY-MM-DD or ISO), or episode number (index + 1)
                const targetEvent = speakers.find((s, index) => 
                    s.videoId === id || 
                    s.date.toISOString() === id || 
                    s.date.toISOString().split("T")[0] === id ||
                    (index + 1).toString() === id
                );
                
                if (targetEvent) {
                    // Use the episode number as the unique ID for scrolling/expanding
                    const episodeNumber = speakers.indexOf(targetEvent) + 1;
                    const eventId = episodeNumber.toString();
                    
                    setExpandedEvents([eventId]);
                    
                    // Scroll to element after a short delay
                    setTimeout(() => {
                        const el = document.getElementById(eventId);
                        if (el) {
                            // Add scroll-margin-top logic via JS or use scrollIntoView options
                            // The header is roughly 160px (pt-40), so 'center' might be safer, or just rely on CSS scroll-margin if added.
                            // For now, let's try centering it which usually avoids the header issue.
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 500);
                }
            }
        }
    }, []);

    const toggleEvent = (id: string) => {
        setExpandedEvents(prev =>
            prev.includes(id)
                ? prev.filter(d => d !== id)
                : [...prev, id]
        );
    };

    const copyLink = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        // Construct URL from origin and pathname to ensure no potentially existing hash is included
        const url = new URL(window.location.origin + window.location.pathname);
        url.searchParams.set('id', id);
        navigator.clipboard.writeText(url.toString()).then(() => {
            setNotification({ show: true, message: 'Link copied!', id });
            setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 2000);
        });
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-secondary text-sm mb-8 bg-gray-900 border border-gray-700 px-4 py-2 rounded-full inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                </svg>
                <span>Pro tip: Click the link icon on any event to copy a direct link for sharing.</span>
            </div>

            <div className="text-center w-full max-w-4xl sm:ml-32">
                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                    {
                        eventsBySemester.map((semesterGroup, semesterIndex) => (
                            <div key={semesterGroup.semester}>
                                {/* Semester separator/label */}
                                <li className={`${semesterIndex > 0 ? "mt-8" : ""} mb-4`}>
                                    <div className="pl-4">
                                        <div className="text-secondary text-sm sm:text-base font-semibold uppercase tracking-wider">
                                            {semesterGroup.semester}
                                        </div>
                                    </div>
                                </li>

                                {/* Events in this semester */}
                                {semesterGroup.events.map((event) => {
                                    // Calculate episode number based on the original speakers array
                                    const episodeNumber = speakers.indexOf(event) + 1;
                                    // Use episode number as the ID for consistency
                                    const eventId = episodeNumber.toString();
                                    const isExpanded = expandedEvents.includes(eventId);

                                    return (
                                        <li
                                            key={eventId}
                                            id={eventId}
                                            onClick={() => toggleEvent(eventId)}
                                            className={`py-1 mt-6 rounded-md duration-200 relative cursor-pointer scroll-mt-48 ${event.past ? "" : "hover:bg-li"}`}
                                        >
                                            {/* Logo handling */}
                                            {event.logo && (
                                                <>
                                                    {/* Mobile: logo above content */}
                                                    <div className="sm:hidden mb-1 flex justify-start pl-4">
                                                        <div className="w-28">
                                                            <img
                                                                src={typeof event.logo === 'string' ? event.logo : event.logo.src}
                                                                alt={event.affiliation + " logo"}
                                                                className="w-full h-auto object-contain"
                                                                loading="lazy"
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* Desktop: logo to the left */}
                                                    <div className="hidden sm:block absolute -left-32 w-32 h-32 top-0 pr-4">
                                                        <img
                                                            src={typeof event.logo === 'string' ? event.logo : event.logo.src}
                                                            alt={event.affiliation + " logo"}
                                                            className="w-full h-full object-contain"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            <div
                                                className={`absolute -left-1.5 w-3 h-3 bg-gray-200 rounded-full mt-1.5 border ${event.next
                                                    ? "border-white"
                                                    : "border-gray-900 bg-gray-700"
                                                    }`}
                                            />
                                            <div className={"text-left pl-4 pr-8 border-left " + (event.canceled ? "line-through" : "")}>
                                                <p
                                                    className={`text-base sm:text-lg ${event.past
                                                        ? "text-gray-400"
                                                        : "text-gray-300"
                                                        }`}
                                                >
                                                    <span className="mr-2 font-mono text-lg sm:text-xl font-bold text-white">#{episodeNumber}</span>
                                                    {event.date.toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        },
                                                    )}
                                                </p>
                                                <div className="flex justify-between items-start group">
                                                    <div className="flex items-center gap-2">
                                                        <p
                                                            className={`text-xl sm:text-2xl font-bold ${event.past
                                                                ? "text-gray-300"
                                                                : "text-white"
                                                                }`}
                                                        >
                                                            {event.title}
                                                        </p>
                                                        {/* Link Icon for Copying URL */}
                                                        <div className="relative">
                                                            <button
                                                                className="opacity-60 hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-white"
                                                                title="Copy link to event"
                                                                onClick={(e) => copyLink(e, eventId)}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                                                                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                                                                </svg>
                                                            </button>
                                                            {/* Tooltip Notification */}
                                                            {notification.show && notification.id === eventId && (
                                                                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 z-10">
                                                                    Link copied!
                                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className="ml-2 text-gray-500 transform transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                                        ▼
                                                    </span>
                                                </div>

                                                {!event.undefinedEvent && (
                                                    <p
                                                        className={`text-lg sm:text-xl mt-2 font-normal ${event.past
                                                            ? "text-gray-300"
                                                            : "text-white"
                                                            }`}
                                                    >
                                                        {event.name} - {" "}
                                                        <span className="font-bold">{event.affiliation}</span>
                                                    </p>
                                                )}

                                                {/* Expanded Details */}
                                                {isExpanded && (
                                                    <div className="mt-4 pt-4 border-t border-gray-700 animate-in fade-in slide-in-from-top-2 cursor-default" onClick={(e) => e.stopPropagation()}>
                                                        {/* Media Gallery (Video & Images) */}
                                                        {(event.videoId || (event.images && event.images.length > 0)) && (
                                                            <div className="mb-6">
                                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                                    {/* Video Embed */}
                                                                    {event.videoId && (
                                                                        <div className="relative aspect-square bg-black rounded-md overflow-hidden">
                                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                                <div className="w-full aspect-video">
                                                                                    <iframe
                                                                                        className="w-full h-full"
                                                                                        src={`https://www.youtube.com/embed/${event.videoId}`}
                                                                                        title={event.title}
                                                                                        frameBorder="0"
                                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                                        allowFullScreen
                                                                                    ></iframe>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    {/* Images */}
                                                                    {event.images && event.images.map((imgSrc, idx) => (
                                                                        <div key={idx} className="relative aspect-square">
                                                                            <img
                                                                                src={imgSrc}
                                                                                alt={`Event photo ${idx + 1}`}
                                                                                className="absolute inset-0 w-full h-full object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    if (event.images) setLightboxState({ images: event.images, index: idx });
                                                                                }}
                                                                                loading="lazy"
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Expandable Abstract & Bio */}
                                                        {(event.abstract || event.bio) && (
                                                            <div className="mb-6">
                                                                <button
                                                                    onClick={(e) => toggleDetails(eventId, e)}
                                                                    className="text-primary hover:text-white font-bold flex items-center gap-2 focus:outline-none"
                                                                >
                                                                    <span>{expandedDetails.includes(eventId) ? "Hide Details" : "Read More (Abstract & Bio)"}</span>
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className={`transition-transform duration-200 ${expandedDetails.includes(eventId) ? 'rotate-180' : ''}`}
                                                                    >
                                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                                    </svg>
                                                                </button>

                                                                {expandedDetails.includes(eventId) && (
                                                                    <div className="mt-4 animate-in fade-in slide-in-from-top-1">
                                                                        {event.abstract && (
                                                                            <div className="mb-4">
                                                                                <h4 className="font-bold text-lg mb-2 text-white">Abstract</h4>
                                                                                <p className="text-gray-300 whitespace-pre-wrap">{event.abstract}</p>
                                                                            </div>
                                                                        )}
                                                                        {event.bio && (
                                                                            <div className="mb-4">
                                                                                <h4 className="font-bold text-lg mb-2 text-white">About the Speaker</h4>
                                                                                <p className="text-gray-300 whitespace-pre-wrap">{event.bio}</p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* Buttons */}
                                                        {event.url && (
                                                            <div className="mb-6">
                                                                <a
                                                                    href={event.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-block px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-black transition-colors rounded-md"
                                                                >
                                                                    Meetup Link
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </div>
                        ))
                    }
                </ol>
            </div>

            {/* Lightbox Overlay */}
            {lightboxState && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setLightboxState(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full transition-colors z-50"
                        onClick={() => setLightboxState(null)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    {lightboxState.images.length > 1 && (
                        <>
                            <button
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full transition-colors z-50"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxState(prev => prev ? ({ ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }) : null);
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full transition-colors z-50"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxState(prev => prev ? ({ ...prev, index: (prev.index + 1) % prev.images.length }) : null);
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </>
                    )}
                    <img
                        src={lightboxState.images[lightboxState.index]}
                        alt={`Full size view ${lightboxState.index + 1}`}
                        className="max-w-[95vw] max-h-[95vh] object-contain shadow-2xl rounded-sm"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
