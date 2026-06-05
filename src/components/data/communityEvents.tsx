class CommunityEvent {
    constructor(
        public date: Date,
        public title: string,
        public subtitle: string,
        public url: string,
    ) {}
}

// --------------------------------------------------
// modify HERE to update community events (AMAs, Discord events, etc.)

const communityEventsRaw = [
    new CommunityEvent(
        new Date("2026-06-09"),
        "Ask Me Anything – Doing a PhD in Berlin & ML for Cognitive Science and Medicine",
        "Tom Neuhäuser - BLISS President",
        "https://discord.com/channels/1451591186535157820/1451592852659376139/1511693488679550976",
    ),
];

// --------------------------------------------------

export const communityEvents = communityEventsRaw;
