import { workshops } from "./data/workshops";

export interface WorkshopsCompProps {
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
        return `Winter Semester ${year}/${(shortYear + 1).toString().padStart(2, '0')}`;
    } else if (month >= 4) {
        // April - September -> Summer Semester of current year
        return `Summer Semester ${year}`;
    } else {
        // January - March -> Winter Semester of previous year/current year
        return `Winter Semester ${year - 1}/${shortYear.toString().padStart(2, '0')}`;
    }
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

    // Group workshops by semester
    const workshopsBySemester: { semester: string; workshops: typeof workshops }[] = [];
    let currentSemester: string | null = null;
    let currentGroup: typeof workshops = [];

    workshopsToRender.forEach((workshop) => {
        const semester = getSemester(workshop.date);
        if (currentSemester === null || currentSemester !== semester) {
            // Save previous group if it exists
            if (currentSemester !== null && currentGroup.length > 0) {
                workshopsBySemester.push({ semester: currentSemester, workshops: [...currentGroup] });
            }
            // Start new group
            currentSemester = semester;
            currentGroup = [workshop];
        } else {
            currentGroup.push(workshop);
        }
    });

    // Don't forget the last group
    if (currentSemester !== null && currentGroup.length > 0) {
        workshopsBySemester.push({ semester: currentSemester, workshops: [...currentGroup] });
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-center w-full max-w-5xl px-4 md:pl-48 md:pr-12">
                <div className="mt-6 text-center">
                </div>
                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                    {
                        workshopsBySemester.map((semesterGroup, semesterIndex) => (
                            <div key={semesterGroup.semester}>
                                {/* Semester separator/label */}
                                <li className={`${semesterIndex > 0 ? "mt-16" : ""} mb-6`}>
                                    <div className="pl-6 text-left">
                                        <div>
                                            <span className="text-sm sm:text-base font-semibold uppercase tracking-widest text-gray-400">
                                                {semesterGroup.semester}
                                            </span>
                                            <div className="h-[1px] w-full mt-1.5" style={{ backgroundImage: 'linear-gradient(to right, rgba(156,163,175,0.5), transparent)' }}></div>
                                        </div>
                                    </div>
                                </li>

                                {/* Workshops in this semester */}
                                {semesterGroup.workshops.map((workshop) => (
                                    <a
                                        href={workshop.url}
                                        key={workshop.date.toISOString()}
                                        aria-label="Event details"
                                        className="no-underline block"
                                    >
                                        <li
                                            className={`py-1 mt-10 rounded-md duration-200 relative cursor-pointer scroll-mt-48 hover:bg-gray-800/30`}
                                        >
                                            {workshop.image && (
                                                <>
                                                    {/* Mobile: logo above content */}
                                                    <div className="md:hidden mb-1 flex justify-start pl-4">
                                                        <div className="w-28">
                                                            <img
                                                                src={workshop.image.src}
                                                                alt={workshop.affiliation + " logo"}
                                                                className="w-full h-auto object-contain"
                                                                loading="lazy"
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* Desktop: logo to the left */}
                                                    <div className="hidden md:block absolute -left-32 w-32 h-32 top-0 pr-4">
                                                        <img
                                                            src={workshop.image.src}
                                                            alt={workshop.affiliation + " logo"}
                                                            className="w-full h-full object-contain"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </>
                                            )}
                                            {/* Timeline dot/circle */}
                                            <div
                                                className={`absolute left-[calc(-0.375rem-1px)] top-1.5 w-3 h-3 rounded-full border-2 z-10
                                                    ${workshop.next
                                                        ? "bg-accent border-accent shadow-[0_0_10px_rgba(255,107,107,0.7)]"
                                                        : "bg-gray-200 border-gray-900"
                                                    }
                                                    ${workshop.past ? "bg-gray-700 border-gray-900" : ""}
                                                `}
                                            />
                                            <div className={"text-left pl-4 pr-8 border-left " + (workshop.canceled ? "line-through" : "")}>
                                                <div className="flex items-center">
                                                    <p
                                                        className={`text-base sm:text-lg ${workshop.past
                                                            ? "text-gray-400"
                                                            : "text-gray-300"
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
                                                    {workshop.next && (
                                                        <span className="ml-3 px-2 py-0.5 text-xs font-bold text-white bg-accent rounded-full">
                                                            Next Up
                                                        </span>
                                                    )}
                                                </div>
                                                <p
                                                    className={`text-xl sm:text-2xl font-bold ${workshop.past
                                                        ? "text-gray-300"
                                                        : "text-white"
                                                        }`}
                                                >
                                                    {workshop.title}
                                                </p>
                                                {workshop.description && (
                                                    <p
                                                        className={`text-sm sm:text-base mt-2 ${workshop.past
                                                            ? "text-gray-400"
                                                            : "text-gray-200"
                                                            }`}
                                                    >
                                                        {workshop.description}
                                                    </p>
                                                )}
                                                {!workshop.undefinedEvent && (
                                                    <p
                                                        className={`text-base sm:text-lg mt-1 font-normal ${workshop.past
                                                            ? "text-gray-300"
                                                            : "text-white"
                                                            }`}
                                                    >
                                                        {workshop.name} - {workshop.affiliation}
                                                    </p>
                                                )}
                                            </div>
                                        </li>
                                    </a>
                                ))}
                            </div>
                        ))
                    }
                </ol>
            </div>
        </div>
    );
}

