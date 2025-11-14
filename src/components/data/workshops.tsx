import type { ImageMetadata } from "astro";
// Import partner logos - add logo files to src/images/partners/ as needed
import neo4jLogo from "../../images/partners/neo4j.png";
import instadeepLogo from "../../images/partners/instadeep.png";
import googleLogo from "../../images/partners/google-white.png";

class Workshop {
    public next = false
    public past = false

    constructor(public date: Date, public title: string, public name: string, public affiliation: string, public url: string, public description: string = "", public canceled: boolean = false, public undefinedEvent: boolean = false, public image?: ImageMetadata) {
    }
}

// --------------------------------------------------
// modify HERE to update workshops

const workshopsRaw = [
    // TODO: add other past workshops (maybe also flinta events or even hackathons?)
    new Workshop(new Date("2025-07-08"), "BLISS x Neo4j: Hands-On with GraphRAG - Powering GenAI with Knowledge Graphs", "Martin", "Neo4j", "https://luma.com/7j77q70m?tk=XSoFkG", "A hands-on workshop focused on integrating Knowledge Graphs and Retrieval Augmented Generation (RAG) to enhance Generative AI projects by reducing hallucinations and providing access to reliable data.", false, false, neo4jLogo),
    // new Workshop(new Date("2025-11-26"), "BLISS x Dida: tbd", "...", "Dida", "https://...", "More infos coming soon!", false, false, undefined),
    new Workshop(new Date("2025-12-11"), "BLISS x InstaDeep: Foundational Models for Genomics: Decoding Genomic Sequences", "Miguel Arbesú, Bernardo Almeida, Luis Herrmann", "InstaDeep", "https://luma.com/f3yb8zn2", "Genomics foundation models have emerged as powerful tools to decode the human genome and understand how genetic variants affect disease and traits. In this hands-on workshop, we will provide an overview of how these models learn the regulatory code of the genome, discuss specific models and applications, and get hands-on experience implementing them.", false, false, instadeepLogo),
    // new Workshop(new Date("2026-01-07"), "BLISS x Dida: tbd", "...", "Dida", "https://...", "More infos coming soon!", false, false, undefined),
    // new Workshop(new Date("2026-01-21"), "BLISS x Neo4J: tbd", "...", "Neo4J", "https://...", "More infos coming soon!", false, false, undefined),
    // new Workshop(new Date("2026-02-04"), "BLISS x Google: tbd", "...", "Google", "https://...", "More infos coming soon!", false, false, googleLogo),
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
