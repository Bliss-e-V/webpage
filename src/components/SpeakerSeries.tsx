import BigButton from "./BigButton";
import { Headline } from "./Headline";
import { speakers } from "./data/speakers";

export interface SpeakerSeriesProps {
    renderPastEvents?: boolean;
    largeMargins?: boolean;
}

export const SpeakerSeries = (props: SpeakerSeriesProps) => {
    const renderPastEvents = props.renderPastEvents === undefined ? true : props.renderPastEvents;
    const speakersToRender = renderPastEvents ? speakers : speakers.filter(speaker => speaker.date > new Date());
    const renderWithLargeMargins = props.largeMargins === undefined ? true : props.largeMargins;

    return <div className="flex items-center flex-wrap justify-center" >
        <div id="speaker Series" className={"text-center " + (renderWithLargeMargins ? " pt-32 sm:my-40" : "")}>
            <Headline level={2}>Speaker Series</Headline>
            <div className="relative flex justify-center mt-16">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none"></div>
                <div className="relative w-full max-w-3xl h-auto rounded-md">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-transparent pointer-events-none z-20"></div>
                    <video
                        className="w-full h-auto rounded-md relative z-10"
                        autoPlay
                        muted
                        loop
                    >
                        <source src="/images/media/ws2526/teaser_min.mp4" type="video/mp4" />
                        Teaser for the BLISS AI Speaker Series Winter 2025/26
                    </video>
                </div>
            </div>
            <p
                className="mt-4 font-light leading-relaxed text-secondary text-md sm:text-xl"
            >
                Get your <strong className="text-primary">Free</strong> Tickets for the
                Speaker Series Winter 2025/26 now!
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center my-2 gap-4 md:gap-10">
                <div className="flex items-center hover:cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 mr-2"
                        fill="currentColor"
                    ><path
                        d="M18,4.48a8.45,8.45,0,0,0-12,12l5.27,5.28a1,1,0,0,0,1.42,0L18,16.43A8.45,8.45,0,0,0,18,4.48ZM16.57,15,12,19.59,7.43,15a6.46,6.46,0,1,1,9.14,0ZM9,7.41a4.32,4.32,0,0,0,0,6.1,4.31,4.31,0,0,0,7.36-3,4.24,4.24,0,0,0-1.26-3.05A4.3,4.3,0,0,0,9,7.41Zm4.69,4.68a2.33,2.33,0,1,1,.67-1.63A2.33,2.33,0,0,1,13.64,12.09Z"
                    ></path></svg>
                    <a
                        href="https://maps.app.goo.gl/egMjQNHmntJGw4JQ8"
                        target="_blank">TU Berlin Chemistry Building C130</a>
                </div>

                <div className="flex items-center">
                    <img
                        src="/assets/clock.svg"
                        className="w-6 h-6 mr-2 stroke-white fill-white"
                        alt="clock"
                    />
                    <p>7:00pm</p>
                </div>
            </div>

            <BigButton id="speaker-series" hover={true} className="ml-auto mr-auto my-10">
                <a
                    className="no-underline"
                    href="https://www.meetup.com/bliss-speaker-series/"
                >Get Your Ticket</a>
            </BigButton>
            <div className="mt-6 text-center">
            </div>

            <ol className="relative border-l border-gray-200 dark:border-gray-700">
                {
                    speakersToRender
                        .sort((a, b) => a.date - b.date)
                        .map((speaker) => (
                            <a
                                href={speaker.url}
                                key={speaker.date.toISOString()}
                                aria-label="Event details"
                                className="no-underline"
                            >
                                <li
                                    className={`py-1 mt-6 rounded-md duration-200 ${speaker.past ? "" : "hover:bg-li"
                                        }`}
                                >
                                    <div
                                        className={`absolute -left-1.5 w-3 h-3 bg-gray-200 rounded-full mt-1.5 border ${speaker.next
                                            ? "border-white"
                                            : "border-gray-900 bg-gray-700"
                                            }`}
                                    />
                                    <div className={"text-left pl-4 border-left " + (speaker.canceled ? "line-through" : "")}>
                                        <p
                                            className={`text-base sm:text-lg ${speaker.past
                                                ? "text-gray-500"
                                                : (speaker.next ? "text-white" : "text-secondary")
                                                }`}
                                        >
                                            {speaker.date.toLocaleDateString(
                                                "en-US",
                                                {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                },
                                            )}
                                        </p>
                                        <p
                                            className={`text-xl sm:text-2xl font-bold ${speaker.past
                                                ? "text-gray-500"
                                                : "text-transparent bg-clip-text bg-red-right"
                                                }`}
                                        >
                                            {speaker.title}
                                        </p>
                                        {!speaker.undefinedEvent && (
                                            <p
                                                className={`text-lg sm:text-xl ${speaker.past
                                                    ? "text-gray-500"
                                                    : "text-secondary"
                                                    }`}
                                            >
                                                {speaker.name},{" "}
                                                <span className="font-bold">{speaker.affiliation}</span>
                                            </p>
                                        )}
                                    </div>
                                </li>
                            </a>
                        ))
                }
            </ol>
        </div>
    </div >
}
