class Speaker {
    public next = false
    public past = false

    constructor(public date: Date, public title: string, public name: string, public affiliation: string, public url: string, public canceled: boolean = false, public undefinedEvent: boolean = false) {
    }
}

// --------------------------------------------------
// modify HERE to update speakers

const speakersRaw = [
    // === wintersemester 2025===
    new Speaker(new Date("2025-10-21"), "Why do LLMs struggle with Long Context?", "Federico Barbero", "DeepMind, University of Oxford", "https://www.meetup.com/bliss-speaker-series/events/310955905", false),
    new Speaker(new Date("2025-11-04"), "TBD", "Beyza Ermiş", "Cohere", "https://www.meetup.com/bliss-speaker-series/events/", false),
    new Speaker(new Date("2025-11-18"), "Generative World Models", "Ashley Edwards", "DeepMind", "https://www.meetup.com/bliss-speaker-series/events/", false),
    new Speaker(new Date("2025-12-02"), "TBD", "Ameya Prabhu", "Tübingen AI Center", "https://www.meetup.com/bliss-speaker-series/events/", false),
    new Speaker(new Date("2025-12-16"), "TBD", "Dilara Gökay", "DeepMind", "https://www.meetup.com/bliss-speaker-series/events/", false),
    new Speaker(new Date("2026-01-13"), "Test-Time Training Agents for Deep Exploration", "Jonas Hübotter", "ETH Zurich", "https://www.meetup.com/bliss-speaker-series/events/", false),
    new Speaker(new Date("2026-01-27"), "Can Humans Flourish in the Age of AI?", "David Watson", "King's College London", "https://www.meetup.com/bliss-speaker-series/events/", false),
    new Speaker(new Date("2026-02-10"), "The Price of Intelligence: Three Risks Inherent in LLMs", "Ahmed Salem", "Microsoft Security Response Center (MSRC)", "https://www.meetup.com/bliss-speaker-series/events/", false),
];


// --------------------------------------------------

const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

// Finding the closest event to the current date but not in the past
const closestEvent = speakersRaw.reduce((closest, event) => {
    // Check if this event is in the future and closer than the current closest event
    if (event.date >= currentDate && (!closest || event.date < closest.date)) {
        return event;
    }
    return closest;
}, null);

if (closestEvent) {
    closestEvent.next = true;
}

speakersRaw.forEach((event) => {
    if (event.date < currentDate) {
        event.past = true;
    }
});

export const speakers = speakersRaw;
