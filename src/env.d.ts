/// <reference types="astro/client" />

interface Window {
    __blissEventScrollRefs?: Array<{
        id: string;
        date: string;
        seriesNumber?: number;
    }>;
    __blissEventScrollTargetId?: string;
}
