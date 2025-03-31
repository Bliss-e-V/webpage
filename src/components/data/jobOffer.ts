import type { ComponentInstance } from 'astro';

export class JobOffer {
    constructor(
        public companyName: string,
        public companyImage: string,
        public teamImage: string,
        public description: string,
        public applyLink: string
    ) { }
} 