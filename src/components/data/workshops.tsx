class Workshop {
    public next = false
    public past = false

    constructor(public date: Date, public title: string, public name: string, public affiliation: string, public url: string, public description: string = "", public canceled: boolean = false, public undefinedEvent: boolean = false) {
    }
}

// --------------------------------------------------
// modify HERE to update workshops

const workshopsRaw = [
    new Workshop(new Date("2025-11-26"), "BLISS x Dida: tbd", "...", "Dida", "https://...", "More infos coming soon!", false),
    new Workshop(new Date("2025-12-11"), "BLISS x InstaDeep: tbd", "...", "InstaDeep", "https://...", "More infos coming soon!", false),
    new Workshop(new Date("2026-01-07"), "BLISS x Dida: tbd", "...", "Dida", "https://...", "More infos coming soon!", false),
    new Workshop(new Date("2026-01-21"), "BLISS x Neo4J: tbd", "...", "Neo4J", "https://...", "More infos coming soon!", false),
    new Workshop(new Date("2026-02-04"), "BLISS x Google: tbd", "...", "Google", "https://...", "More infos coming soon!", false),
];


// --------------------------------------------------

const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

// Finding the closest event to the current date but not in the past
const closestEvent = workshopsRaw.reduce<Workshop | null>((closest, event) => {
    // Check if this event is in the future and closer than the current closest event
    if (event.date >= currentDate && (!closest || event.date < closest.date)) {
        return event;
    }
    return closest;
}, null);

if (closestEvent) {
    closestEvent.next = true;
}

workshopsRaw.forEach((event) => {
    if (event.date < currentDate) {
        event.past = true;
    }
});

export const workshops = workshopsRaw;
