import type { ImageMetadata } from "astro";
// Import partner logos - add logo files to src/images/partners/ as needed
import neo4jLogo from "../../images/logos/neo4j.png";
import instadeepLogo from "../../images/logos/instadeep.png";
import googleLogo from "../../images/logos/google-white.png";
import didaLogo from "../../images/logos/dida.png";
import semrushLogo from "../../images/logos/semrush.svg";
import quantcoLogo from "../../images/logos/quantco.png";
import jetbrainsLogo from "../../images/logos/jetbrains-white.svg";

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
    new Workshop(new Date("2025-07-08"), "BLISS x Neo4j: Hands-On with GraphRAG - Powering GenAI with Knowledge Graphs", "Martin", "Neo4j", "https://luma.com/7j77q70m?utm_source=blisswebsite", "A hands-on workshop focused on integrating Knowledge Graphs and Retrieval Augmented Generation (RAG) to enhance Generative AI projects by reducing hallucinations and providing access to reliable data.", false, false, neo4jLogo),
    new Workshop(new Date("2025-12-11"), "BLISS x InstaDeep: Foundational Models for Genomics: Decoding Genomic Sequences", "Miguel Arbesú, Bernardo Almeida, Jonas Hirsch", "InstaDeep", "https://luma.com/f3yb8zn2?utm_source=blisswebsite", "Genomics foundation models have emerged as powerful tools to decode the human genome and understand how genetic variants affect disease and traits. In this hands-on workshop, we will provide an overview of how these models learn the regulatory code of the genome, discuss specific models and applications, and get hands-on experience implementing them.", false, false, instadeepLogo),
    new Workshop(new Date("2026-01-07"), "BLISS x dida: Theory Meets Practice #1: Opening the Black Box: A Hands-On Guide to Explainable AI for LLMs", "Reduan Achtibat", "dida and Fraunhofer HHI", "https://luma.com/6n2o37qh?utm_source=blisswebsite", "While Large Language Models have demonstrated unprecedented capabilities in reasoning and retrieval, their internal decision-making processes remain largely opaque. As they grow in complexity, treating these models as 'black boxes' is no longer sufficient for building reliable, safe, and transparent systems.", false, false, didaLogo),
    new Workshop(new Date("2026-01-21"), "BLISS x dida: Theory Meets Practice #2: Giving Eyes to your AI: Engineering Multimodal Agents with Haystack", "Bilge Yücel", "dida and deepset", "https://luma.com/isat12k0?utm_source=blisswebsite", "Large Language Models are no longer limited to text - modern AI systems can see, reason across modalities, and act on rich, multimodal inputs. With these new capabilities comes increased complexity: how do we design multimodal agents that reliably understand visual information, integrate it with language, and remain controllable in real-world applications? We explore how to give your AI eyes by engineering powerful multimodal agents using Haystack", false, false, didaLogo),
    new Workshop(new Date("2026-02-03"), "BLISS x Google: Unleash the Power of Agentic AI", "Diana Nanova", "Google", "https://luma.com/sd7cl8ft?utm_source=blisswebsite", "Generative AI models have the potential to increase productivity and provide access to data, but they need good context to be truly useful. In this hands-on workshop, you will learn how Knowledge Graphs and Retrieval Augmented Generation (RAG) can help your GenAI projects avoid hallucination and provide access to reliable data.", false, false, googleLogo),
    new Workshop(new Date("2026-04-16"), "BLISS x Semrush: Operating Agentic AI in Production", "Saeid Nobakht", "Semrush", "https://luma.com/nklicoct?utm_source=blisswebsite", "Building reliable agentic systems requires more than evaluating individual LLM outputs — it demands a systems-level approach to testing, observability, and operations.", false, false, semrushLogo),
    new Workshop(new Date("2026-04-30"), "BLISS x JetBrains: Master LLMs for Code Gen", "Ivan Dolgov", "JetBrains", "https://luma.com/1rmr2buu?utm_source=blisswebsite", "For women and underrepresented genders in tech. An interactive session on code LLMs: model architecture, prompt engineering for developers, evaluating generated code, and how JetBrains IDEs integrate these models. Foundational Python recommended; bring your laptop.", false, false, jetbrainsLogo),
    // new Workshop(new Date("2026-04-29"), "BLISS x dida: To be announced", "TBA", "dida", "https://bliss.berlin/workshops?utm_source=blisswebsite", "", false, false, didaLogo),
    // new Workshop(new Date("2026-05-27"), "BLISS x dida: To be announced", "TBA", "dida", "https://bliss.berlin/workshops?utm_source=blisswebsite", "", false, false, didaLogo),
    // new Workshop(new Date("2026-06-10"), "BLISS x QuantCo: To be announced", "TBA", "QuantCo", "https://bliss.berlin/workshops?utm_source=blisswebsite", "", false, false, quantcoLogo),
    // new Workshop(new Date("2026-06-24"), "BLISS x dida: To be announced", "TBA", "dida", "https://bliss.berlin/workshops?utm_source=blisswebsite", "", false, false, didaLogo),
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
