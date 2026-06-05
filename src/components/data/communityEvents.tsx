class CommunityEvent {
    constructor(
        public date: Date,
        public title: string,
        public subtitle: string,
        public url: string,
        public description: string = "",
    ) {}
}

// --------------------------------------------------
// modify HERE to update community events (AMAs, Discord events, etc.)

const communityEventsRaw = [
    new CommunityEvent(
        new Date("2026-06-09"),
        "Ask Me Anything – Doing a PhD in Berlin & ML for Cognitive Science and Medicine",
        "Tom Neuhäuser - BLISS President",
        "https://discord.gg/QrbZtHb3sK",
        `We're excited to invite you to our first official Discord event — an AMA with BLISS president Tom Neuhäuser!

If you're curious about his research in ML for Cognitive Science and Medicine, what it's like to do a PhD in Berlin, or anything BLISS-related, Tom will be happy to answer. No topic is off limits.

We welcome students, researchers, and curious minds alike.

When: June 9, 2026 at 7:00 PM (CEST)
Where: BLISS Discord Server

You can drop your questions in advance in our #❓│qanda channel or bring them live on the day.`,
    ),
];

// --------------------------------------------------

export const communityEvents = communityEventsRaw;
