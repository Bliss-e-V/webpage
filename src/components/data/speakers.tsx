class Speaker {
    public next = false
    public past = false

    constructor(public date: Date, public title: string, public name: string, public affiliation: string, public url: string, public canceled: boolean = false, public undefinedEvent: boolean = false) {
    }
}

// --------------------------------------------------
// modify HERE to update speakers

const speakersRaw = [
    // === summersemester 2025, waiting for confirmation to have the events replaced with the real data===
    new Speaker(new Date("2025-04-22"), "to be announced soon", "", "", "", false, true),
    // new Speaker(new Date("2025-05-6"), "TBD", "Timothée Darcet", "INRIA France, Meta AI", "TBD", false),
    new Speaker(new Date("2025-05-6"), "to be announced soon", "", "", "", false, true),
    new Speaker(new Date("2025-05-20"), "to be announced soon", "", "", "", false, true),
    // new Speaker(new Date("2025-06-3"), "TBD", "Prof. Yu Xie", "Princeton University", "TBD", false),
    new Speaker(new Date("2025-06-3"), "to be announced soon", "", "", "", false, true),
    // new Speaker(new Date("2025-06-17"), "TBD", "Daniel Duckworth", "Google Deepmind", "TBD", false),
    new Speaker(new Date("2025-06-17"), "to be announced soon", "", "", "", false, true),
    // new Speaker(new Date("2025-07-1"), "TBD", "Jannik Kossen", "University of Oxford, Meta AI", "TBD", false),
    new Speaker(new Date("2025-07-1"), "to be announced soon", "", "", "", false, true),
    // new Speaker(new Date("2025-07-15"), "TBD", "Dr. Adel Bibi", "University of Oxford, Softserve", "TBD", false),
    new Speaker(new Date("2025-07-15"), "to be announced soon", "", "", "", false, true),
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
