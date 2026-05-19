import { useState } from "react";

type Slide =
    | { kind: "video"; videoId: string }
    | { kind: "image"; src: string };

type EventMediaSlideshowProps = {
    videoId?: string;
    images?: string[];
    title: string;
};

const classNames = (...values: Array<string | false | undefined>) =>
    values.filter(Boolean).join(" ");

export const EventMediaSlideshow = ({
    videoId,
    images = [],
    title,
}: EventMediaSlideshowProps) => {
    const slides: Slide[] = [
        ...(videoId ? [{ kind: "video" as const, videoId }] : []),
        ...images.map((src) => ({ kind: "image" as const, src })),
    ];

    const [index, setIndex] = useState(0);

    if (slides.length === 0) return null;

    const slide = slides[index];
    const hasMultiple = slides.length > 1;

    const goTo = (nextIndex: number) => {
        setIndex((nextIndex + slides.length) % slides.length);
    };

    const slideKey =
        slide.kind === "video" ? `video-${slide.videoId}` : slide.src;

    return (
        <div
            className="mb-4 flex w-full flex-col items-center gap-2"
            aria-label="Event media"
        >
            <div className="relative aspect-video w-full max-w-lg overflow-hidden rounded-lg bg-black">
                <div
                    key={slideKey}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {slide.kind === "video" ? (
                        <iframe
                            className="h-full w-full"
                            src={`https://www.youtube-nocookie.com/embed/${slide.videoId}`}
                            title={`${title} recording`}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    ) : (
                        <img
                            src={slide.src}
                            alt={`${title} event photo`}
                            className="h-full w-full object-contain"
                            loading="lazy"
                        />
                    )}
                </div>
            </div>

            {hasMultiple && (
                <div className="flex flex-col items-center gap-1.5">
                    <div className="flex items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={() => goTo(index - 1)}
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gray-800/80 text-gray-200 transition-colors hover:bg-gray-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            aria-label="Previous slide"
                        >
                            <ChevronLeftIcon />
                        </button>

                        <div className="flex items-center gap-1.5">
                            {slides.map((item, slideIndex) => (
                                <button
                                    key={
                                        item.kind === "video"
                                            ? `dot-video-${item.videoId}`
                                            : `dot-${item.src}`
                                    }
                                    type="button"
                                    onClick={() => setIndex(slideIndex)}
                                    aria-label={
                                        item.kind === "video"
                                            ? `Show recording (${slideIndex + 1} of ${slides.length})`
                                            : `Show photo ${slideIndex + 1} of ${slides.length}`
                                    }
                                    aria-current={slideIndex === index ? "true" : undefined}
                                    className={classNames(
                                        "h-1.5 shrink-0 rounded-full transition-all",
                                        slideIndex === index
                                            ? "w-5 bg-accent"
                                            : "w-1.5 bg-gray-700 hover:bg-gray-500",
                                    )}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => goTo(index + 1)}
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gray-800/80 text-gray-200 transition-colors hover:bg-gray-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            aria-label="Next slide"
                        >
                            <ChevronRightIcon />
                        </button>
                    </div>

                    <span className="text-xs text-gray-400" aria-live="polite">
                        {index + 1} / {slides.length}
                        {slide.kind === "video" ? " · Recording" : " · Photo"}
                    </span>
                </div>
            )}
        </div>
    );
};

const ChevronLeftIcon = () => (
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
        aria-hidden
    >
        <path d="m15 18-6-6 6-6" />
    </svg>
);

const ChevronRightIcon = () => (
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
        aria-hidden
    >
        <path d="m9 18 6-6-6-6" />
    </svg>
);
