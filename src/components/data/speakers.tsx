class Speaker {
    public next = false
    public past = false

    constructor(public date: Date, public title: string, public name: string, public affiliation: string, public url: string, public canceled: boolean = false, public undefinedEvent: boolean = false) {
    }
}

// --------------------------------------------------
// modify HERE to update speakers

const speakersRaw = [
    new Speaker(new Date(2024, 9, 22), "The Role of AI in Disinformation Resilience", "Dr. Veronika Solopova", "TU Berlin, Mantis Analytics", "https://www.meetup.com/bliss-speaker-series/events/303354404/?eventOrigin=bliss_website", false),
    new Speaker(new Date(2024, 10, 5), "The AI Scientist: Towards Fully Automated Open-Ended Scientific Discovery", "Robert Lange", "TU Berlin, SakanaAI", "https://www.meetup.com/bliss-speaker-series/events/303354498/?eventOrigin=bliss_website", false),
    new Speaker(new Date(2024, 10, 19), "Planning in the Age of Learning", "Prof. Marc Toussaint", "TU Berlin", "https://www.meetup.com/bliss-speaker-series/events/303354520/?eventOrigin=bliss_website", false),
    new Speaker(new Date(2025, 0, 21), "Learning Physical Laws from Data", "Prof. Sven Wang", "HU Berlin", "https://www.meetup.com/bliss-speaker-series/events/303354565/?eventOrigin=bliss_website", false),
    new Speaker(new Date(2024, 11, 17), "Combining Reinforcement Learning and Generative Models for de novo Drug Design", "Dr. Nima Siboni & Dr. Miguel Arbesü Andrés", "InstaDeep", "https://www.meetup.com/bliss-speaker-series/events/303354547/?eventOrigin=bliss_website", false),
    new Speaker(new Date(2025, 0, 7), "Making AI fit for the Life Sciences: Informing ML and Explaining Uncertainty", "Prof. Katharina Baum", "FU Berlin", "https://www.meetup.com/bliss-speaker-series/events/303354557/?eventOrigin=bliss_website", false),
    new Speaker(new Date(2024, 11, 3), "Sequential and Active Decision Making: Bandit Theory", "Prof. Alexandra Carpentier", "University of Potsdam", "https://www.meetup.com/bliss-speaker-series/events/303354531/?eventOrigin=bliss_website", false),
    new Speaker(new Date(2025, 1, 4), "The Science of Decision-Making", "Prof. Sanaz Mostaghim", "University of Magdeburg", "https://www.meetup.com/bliss-speaker-series/events/303354572/?eventOrigin=bliss_website", false),
    // === summersemester 2025, waiting for confirmation to have the events replaced with the real data===
    new Speaker(new Date(2025, 4, 22), "to be announced soon", "", "", "", false, true),
    // new Speaker(new Date(2025, 5, 6), "TBD", "Timothée Darcet", "INRIA France, Meta AI", "TBD", false),
    new Speaker(new Date(2025, 5, 6), "to be announced soon", "", "", "", false, true),
    new Speaker(new Date(2025, 5, 20), "to be announced soon", "", "", "", false, true),
    // new Speaker(new Date(2025, 6, 3), "TBD", "Prof. Yu Xie", "Princeton University", "TBD", false),
    new Speaker(new Date(2025, 6, 3), "to be announced soon", "", "", "", false, true),
    // new Speaker(new Date(2025, 6, 17), "TBD", "Daniel Duckworth", "Google Deepmind", "TBD", false),
    new Speaker(new Date(2025, 6, 17), "to be announced soon", "", "", "", false, true),
    // new Speaker(new Date(2025, 7, 1), "TBD", "Jannik Kossen", "University of Oxford, Meta AI", "TBD", false),
    new Speaker(new Date(2025, 7, 1), "to be announced soon", "", "", "", false, true),
    // new Speaker(new Date(2025, 7, 15), "TBD", "Dr. Adel Bibi", "University of Oxford, Softserve", "TBD", false),
    new Speaker(new Date(2025, 7, 15), "to be announced soon", "", "", "", false, true),
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
