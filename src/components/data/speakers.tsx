class Speaker {
    public next = false
    public past = false

    constructor(public date: Date, public title: string, public name: string, public affiliation: string, public url: string, public canceled: boolean = false, public undefinedEvent: boolean = false) {
    }
}

// --------------------------------------------------
// modify HERE to update speakers

const speakersRaw = [
    // === summersemester 2025===
    new Speaker(new Date("2025-04-22"), "Can Compressing Foundation Models be as Easy as Image Compression?", "Dr. Martin Genzel", "Merantix Momentum", "https://www.meetup.com/de-DE/bliss-speaker-series/events/306121089", false),
    new Speaker(new Date("2025-05-06"), "CAPI: Cluster and Predict Latent Patches for Improved Masked Image Modeling", "Timothée Darcet", "Meta AI, Inria", "https://www.meetup.com/de-DE/bliss-speaker-series/events/306121112", false),
    new Speaker(new Date("2025-05-20"), "Scalable Emulation of Protein Equilibrium Ensembles with Generative Deep Learning", "Dr. Yu Xie", "Microsoft AI4Science", "https://www.meetup.com/de-DE/bliss-speaker-series/events/306121117", false),
    new Speaker(new Date("2025-06-03"), "Watermark Anything with Localized Messages", "Dr. Pierre Fernandez", "Meta AI", "https://www.meetup.com/de-DE/bliss-speaker-series/events/306121121", false),
    new Speaker(new Date("2025-06-17"), "Radiance Fields are Dead (and why that’s OK)", "Daniel Duckworth", "Google DeepMind", "https://www.meetup.com/de-DE/bliss-speaker-series/events/306121124", false),
    new Speaker(new Date("2025-07-01"), "Progress in AI Safety and Security", "Dr. Adel Bibi", "University of Oxford", "https://www.meetup.com/de-DE/bliss-speaker-series/events/306121127", false),
    new Speaker(new Date("2025-07-15"), "Detecting Hallucinations in Large Language Models Using Semantic Entropy", "Jannik Kossen", "Meta AI, University of Oxford", "https://www.meetup.com/de-DE/bliss-speaker-series/events/306121141", false),
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
