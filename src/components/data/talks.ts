import { Speaker, speakers } from "./speakers";

const ymd = (date: Date) => date.toISOString().split("T")[0];

// e.g. "Prof. Beyza Ermiş" on 2025-11-04 becomes "2025-11-04-beyza-ermis".
const talkSlug = (speaker: Speaker) => {
    const name = speaker.name
        .replace(/^(Prof\.|Dr\.)\s+/i, "")
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    return [ymd(speaker.date), name].filter(Boolean).join("-");
};

// Canceled talks and talks without any text or recording would only produce empty pages.
export const hasTalkPage = (speaker: Speaker) =>
    !speaker.canceled && Boolean(speaker.abstract || speaker.bio || speaker.videoId);

export const talkPath = (speaker: Speaker) => `/speaker-series/${talkSlug(speaker)}`;

export type Talk = {
    speaker: Speaker;
    slug: string;
    path: string;
    seriesNumber: number;
};

export const getTalks = (): Talk[] =>
    speakers
        .map((speaker, index) => ({
            speaker,
            slug: talkSlug(speaker),
            path: talkPath(speaker),
            seriesNumber: index + 1,
        }))
        .filter((talk) => hasTalkPage(talk.speaker))
        .sort((a, b) => a.speaker.date.getTime() - b.speaker.date.getTime());

export type TalkVenue = {
    // Short label, also used in the page's meta line.
    label: string;
    room?: string;
    streetAddress?: string;
    postalCode?: string;
};

const CHEMISTRY_BUILDING: TalkVenue = {
    label: "TU Berlin",
    room: "Room C130, Institute of Chemistry, TU Berlin",
    streetAddress: "Straße des 17. Juni 115",
    postalCode: "10623",
};

const MATHEMATICS_BUILDING: TalkVenue = {
    label: "TU Berlin",
    room: "Mathematics Building, TU Berlin",
    streetAddress: "Straße des 17. Juni 136",
    postalCode: "10623",
};

const isWinter2026 = (speaker: Speaker) =>
    speaker.date >= new Date("2026-10-01") && speaker.date < new Date("2027-04-01");

// Room and time are only recorded for winter 2026/27 (news entries and Meetup events). The series
// has been at TU Berlin since winter 2025/26, earlier venues are not recorded, so older talks only
// state the campus or the city. Extend this for each new semester.
export const talkVenue = (speaker: Speaker): TalkVenue => {
    if (isWinter2026(speaker)) {
        return ymd(speaker.date) === "2026-11-17" ? MATHEMATICS_BUILDING : CHEMISTRY_BUILDING;
    }
    return { label: speaker.date >= new Date("2025-10-01") ? "TU Berlin" : "Berlin" };
};

// ISO start for the Event markup. All winter 2026/27 talks start at 7 pm, in CET.
export const talkStart = (speaker: Speaker) =>
    isWinter2026(speaker)
        ? { iso: `${ymd(speaker.date)}T19:00:00+01:00`, timeLabel: "7:00 pm" }
        : { iso: ymd(speaker.date) };
