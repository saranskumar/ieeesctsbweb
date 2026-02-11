export interface Achievement {
    id: number;
    title: string;
    year: string;
    level: string;
    description?: string;
    image?: string;
}

export const achievements: Achievement[] = [
    {
        id: 1,
        title: "Best Student Branch Award",
        year: "2025",
        level: "Kerala Section",
        description: "Awarded for overall excellence in student branch activities and member engagement.",
    },
    {
        id: 2,
        title: "Outstanding Technical Activity",
        year: "2024",
        level: "National Level",
        description: "Recognized for organizing high-impact technical workshops and seminars.",
    },
    {
        id: 3,
        title: "Membership Growth Excellence",
        year: "2024",
        level: "Region 10",
        description: "Acknowledged for significant growth in student membership and retention.",
    },
    {
        id: 4,
        title: "Best Project Award",
        year: "2023",
        level: "All India Level",
        description: "First prize in the national level project competition for humanitarian technology.",
    },
    {
        id: 5,
        title: "Emerging Student Branch",
        year: "2010",
        level: "Kerala Section",
        description: "Awarded shortly after the establishment of the student branch.",
    }
];
