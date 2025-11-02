import { workshops } from "./data/workshops";

export interface WorkshopsCompProps {
    renderPastEvents?: boolean;
}

export const WorkshopsComp = (props: WorkshopsCompProps) => {
    const renderPastEvents = props.renderPastEvents === undefined ? true : props.renderPastEvents;
    const workshopsToRender = renderPastEvents ? workshops : workshops.filter(workshop => workshop.date > new Date());

    return (
        <div className="flex items-center flex-wrap justify-center">
            <div className="text-center w-full max-w-4xl">
                <div className="mt-6 text-center">
                </div>
                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                    {
                        workshopsToRender
                            .sort((a, b) => a.date.getTime() - b.date.getTime())
                            .map((workshop) => (
                                <a
                                    href={workshop.url}
                                    key={workshop.date.toISOString()}
                                    aria-label="Event details"
                                    className="no-underline"
                                >
                                    <li
                                        className={`py-1 mt-6 rounded-md duration-200 ${workshop.past ? "" : "hover:bg-li"
                                            }`}
                                    >
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
                                                    {workshop.name},{" "}
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

