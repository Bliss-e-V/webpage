import { workshops } from "./data/workshops";

export interface WorkshopsCompProps {
    renderPastEvents?: boolean;
}

export const WorkshopsComp = (props: WorkshopsCompProps) => {
    const renderPastEvents = props.renderPastEvents === undefined ? true : props.renderPastEvents;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Separate workshops into future and past
    const futureWorkshops = workshops.filter(workshop => workshop.date >= currentDate);
    const pastWorkshops = workshops.filter(workshop => workshop.date < currentDate);

    // Sort future workshops in reverse chronological order (newest first)
    const sortedFutureWorkshops = futureWorkshops.sort((a, b) => b.date.getTime() - a.date.getTime());

    // Sort past workshops in reverse chronological order (newest first)
    const sortedPastWorkshops = pastWorkshops.sort((a, b) => b.date.getTime() - a.date.getTime());

    // Combine: future first, then past
    const workshopsToRender = renderPastEvents
        ? [...sortedFutureWorkshops, ...sortedPastWorkshops]
        : sortedFutureWorkshops;

    return (
        <div className="flex items-center flex-wrap justify-center">
            <div className="text-center w-full max-w-4xl ml-28 sm:ml-32">
                <div className="mt-6 text-center">
                </div>
                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                    {
                        workshopsToRender.map((workshop) => (
                                <a
                                    href={workshop.url}
                                    key={workshop.date.toISOString()}
                                    aria-label="Event details"
                                    className="no-underline"
                                >
                                    <li
                                        className={`py-1 mt-6 rounded-md duration-200 relative ${workshop.past ? "" : "hover:bg-li"
                                            }`}
                                    >
                                        {workshop.image && (
                                            <div className="absolute -left-28 sm:-left-32 w-28 h-28 sm:w-32 sm:h-32 top-0 pr-4">
                                                <img
                                                    src={workshop.image.src}
                                                    alt={workshop.affiliation + " logo"}
                                                    className="w-full h-full object-contain"
                                                    loading="lazy"
                                                />
                                            </div>
                                        )}
                                        <div
                                            className={`absolute -left-1.5 w-3 h-3 bg-gray-200 rounded-full mt-1.5 border ${workshop.next
                                                ? "border-white"
                                                : "border-gray-900 bg-gray-700"
                                                }`}
                                        />
                                        <div className={"text-left pl-4 pr-8 border-left " + (workshop.canceled ? "line-through" : "")}>
                                            <p
                                                className={`text-base sm:text-lg ${workshop.past
                                                    ? "text-gray-500"
                                                    : (workshop.next ? "text-white" : "text-secondary")
                                                    }`}
                                            >
                                                {workshop.date.toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    },
                                                )}
                                            </p>
                                            <p
                                                className={`text-xl sm:text-2xl font-bold ${workshop.past
                                                    ? "text-gray-500"
                                                    : "text-transparent bg-clip-text bg-red-right"
                                                    }`}
                                            >
                                                {workshop.title}
                                            </p>
                                            {workshop.description && (
                                                <p
                                                    className={`text-sm sm:text-base mt-2 ${workshop.past
                                                        ? "text-gray-400"
                                                        : "text-secondary"
                                                        }`}
                                                >
                                                    {workshop.description}
                                                </p>
                                            )}
                                            {!workshop.undefinedEvent && (
                                                <p
                                                    className={`text-lg sm:text-xl mt-2 ${workshop.past
                                                        ? "text-gray-500"
                                                        : "text-secondary"
                                                        }`}
                                                >
                                                    {workshop.name} - {" "}
                                                    <span className="font-bold">{workshop.affiliation}</span>
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                </a>
                            ))
                    }
                </ol>
            </div>
        </div>
    );
}

