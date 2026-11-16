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
    new CommunityEvent(
        new Date("2026-07-07"),
        "Ask Me Anything – AI for History & Doing a PhD at Oxford",
        "Lorenz Hufe - ELLIS PhD Candidate",
        "https://discord.gg/B3ZY8tTY?event=1518721281279660186",
        `We're excited to invite you to our 3rd Edition of "Ask Me Anything". Our next guest is Lorenz Hufe, a good friend and one of our founding members here at BLISS.

Lorenz is an ELLIS PhD candidate at Fraunhofer Heinrich Hertz Institute, with a secondary affiliation at the University of Oxford, where he spent the past semester. He works on AI for history with the aim of building machine-learning systems that help historians read, connect, and reason about historical sources at scale.

If you're curious about how Lorenz was admitted to the ELLIS Program, what studying at Oxford is like, or how BLISS came about, he'll be happy to answer. Any question about none of the above? Don't worry, no topic is off limits.

We welcome students, researchers, and curious minds alike.

When: July 7, 2026 at 5:00 PM (CEST)
Where: BLISS Discord Server

You can drop your questions in advance in our #❓│ask-me-anything channel or bring them live on the day.`,
    ),
    new CommunityEvent(
        new Date("2026-11-18"),
        "Ask Me Anything with Thorben Frank",
        "Thorben Frank - Microsoft AI4Science",
        "https://luma.com/fxh2rpxa",
        `Join Thorben Frank, a machine learning researcher in a senior role at Microsoft AI4Science, for an hour of career questions and discussion.

Ask about research careers, industry internships and PhD applications.

When: November 18, 2026, 6:00–7:00 PM (CET)
Where: BLISS Discord Server

Register on Luma. Once we approve your participation, you get an email with further info and an invite to the BLISS Discord.`,
    ),
];

// --------------------------------------------------

export const communityEvents = communityEventsRaw;
