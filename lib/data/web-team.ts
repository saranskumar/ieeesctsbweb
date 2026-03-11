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
        id: "saran-s-kumar",
        name: "Saran S Kumar",
        role: "Web Team",
        image: "/person.svg",
        github: "https://github.com/saran",
    },
    {
        id: "mahreen-zuraiq",
        name: "Mahreen Zuraiq",
        role: "Web Team",
        image: "/person.svg",
    },
    {
        id: "harisankar-prasad",
        name: "Harisankar Prasad",
        role: "Web Team",
        image: "/person.svg",
    },
];
