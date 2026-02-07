export interface WebTeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
}

export const webTeam: WebTeamMember[] = [
    {
        id: "dev-1",
        name: "Jane Doe",
        role: "Lead Developer",
        image: "/placeholder.svg",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
    },
    {
        id: "dev-2",
        name: "John Smith",
        role: "UI/UX Designer",
        image: "/placeholder.svg",
        linkedin: "https://linkedin.com",
        portfolio: "https://dribbble.com",
    },
    {
        id: "dev-3",
        name: "Alice Johnson",
        role: "Frontend Developer",
        image: "/placeholder.svg",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
    },
    {
        id: "dev-4",
        name: "Bob Wilson",
        role: "Backend Developer",
        image: "/placeholder.svg",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
    },
    {
        id: "dev-5",
        name: "Eva Brown",
        role: "Content Strategist",
        image: "/placeholder.svg",
        linkedin: "https://linkedin.com",
    },
];
