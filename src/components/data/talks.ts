import { Speaker, speakers } from "./speakers";

// YouTube upload dates per video id. schema.org VideoObject requires an upload date and the
// talk date would be wrong, as recordings go online weeks later. Add a line for each new
// recording; a video without an entry is still embedded, just without VideoObject markup.
const videoUploadDates: Record<string, string> = {
    pR1Zi6Klv44: "2024-07-23T12:28:39-07:00",
    gmcXvck692k: "2024-08-05T00:12:29-07:00",
    iXtMgk9nfxI: "2024-08-20T10:53:14-07:00",
    hMjQWJC6Ed8: "2024-09-07T10:49:47-07:00",
    IjICh0Vh8vk: "2024-09-25T04:43:05-07:00",
    IEeL9HbzAm8: "2024-11-15T00:58:42-08:00",
    dRDemw05XQM: "2024-11-15T00:58:59-08:00",
    "hECYh6Pov-s": "2024-11-24T00:35:31-08:00",
    J_SI67Muq3w: "2025-01-11T01:49:47-08:00",
    qLb2JKhtswU: "2025-01-31T05:20:53-08:00",
    xP1q9puc5hk: "2025-05-09T02:19:42-07:00",
    s8fH9Xbau7o: "2025-05-09T02:19:35-07:00",
    UvWHCsjjEBY: "2025-06-18T02:46:15-07:00",
    gwnYmoVzJCo: "2025-06-11T01:45:07-07:00",
    FtaC5lh8hxs: "2025-07-02T02:03:36-07:00",
    pyTLoOqtA0k: "2025-09-08T01:05:24-07:00",
    eiL6egIX4ms: "2025-09-22T07:36:11-07:00",
    Dsl2bD6akkM: "2025-11-02T05:49:36-08:00",
    ECS0Rez1AeA: "2025-11-17T04:32:19-08:00",
    e6echhvqxhM: "2026-01-09T10:27:05-08:00",
    "2Bfvmi4ySBs": "2025-12-22T08:48:46-08:00",
    qJVkC47kWnc: "2026-01-15T22:00:50-08:00",
    "7EsrcXXPBRU": "2026-01-20T08:22:38-08:00",
    nwPhpFjQqAE: "2026-03-17T00:00:44-07:00",
    FbaaKi1cgWg: "2026-03-27T01:00:00-07:00",
    _Ig6_gAgFaQ: "2026-05-20T18:36:43-07:00",
    wYPbBevUIaM: "2026-05-29T09:36:16-07:00",
    q0ltChkpoYo: "2026-07-24T08:29:18-07:00",
    m4EK4R3IiBU: "2026-08-11T17:46:01-07:00",
    v_XmNHNsYfs: "2026-07-14T05:15:57-07:00",
    "739jopKW5Ug": "2026-08-23T10:45:19-07:00",
    "87enX60HTRo": "2026-09-08T08:59:07-07:00",
};

export const getVideoUploadDate = (videoId: string) => videoUploadDates[videoId];

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

// The series has been at TU Berlin since winter 2025/26 (see the news entries). Earlier venues
// are not recorded in the repo, so those talks only state the city.
export const talkVenue = (speaker: Speaker) =>
    speaker.date >= new Date("2025-10-01") ? "TU Berlin" : "Berlin";
