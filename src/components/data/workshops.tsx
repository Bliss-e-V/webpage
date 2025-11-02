class Workshop {
    public next = false
    public past = false

    constructor(public date: Date, public title: string, public name: string, public affiliation: string, public url: string, public description: string = "", public canceled: boolean = false, public undefinedEvent: boolean = false) {
    }
}

// --------------------------------------------------
// modify HERE to update workshops

const workshopsRaw = [
    new Workshop(new Date("2025-11-15"), "BLISS x Smth: Hands-On Diffusion fine-tuning", "John Doe", "Example Affiliation", "https://luma.com/", "Learn how to fine-tune diffusion models for your specific use case with hands-on examples. John Doe will give a short introduction to diffusion models and then we will dive into the hands-on fine-tuning.", false),
    new Workshop(new Date("2026-04-20"), "Never gonna let the loss go down", "Dr. Rick", "University of Example", "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "Explore advanced loss functions and optimization techniques in machine learning or something like that.", false),
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
