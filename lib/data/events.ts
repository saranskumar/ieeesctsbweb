export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    mode: "Online" | "Offline" | "Hybrid";
    venue?: string;
    status: "Open" | "Closed" | "Completed" | null;
    description: string;
    image: string;
    chapterId?: string; // Optional: if null/undefined, it could be a main SB event
    collaborators?: string[]; // Array of chapter IDs that co-hosted the event
    speakers?: string[];
    eligibility?: string;
    rules?: string[];
    guidelines?: string[];
    gallery?: string[]; // Array of poster images
    order: number; // Manual sorting order
    isAnnouncement?: boolean;
    redirectLinks?: { label: string; url: string }[];
}

export const events: Event[] = [];