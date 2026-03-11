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
        title: "IEEE Regional Exemplary Student Branch Award",
        year: "2022",
        level: "Region 10",
    },
    {
        id: 2,
        title: "IEEE Student Activity Award (2)",
        year: "2022",
        level: "IEEE Kerala Section",
    },
    {
        id: 3,
        title: "IEEE Regional Exemplary Student Branch Award",
        year: "2021",
        level: "Region 10",
    },
    {
        id: 4,
        title: "IEEE Student Activity Award (2)",
        year: "2021",
        level: "IEEE Kerala Section",
    },
    {
        id: 5,
        title: "IEEE Outstanding Branch Chapter Advisor Award",
        year: "2021",
        level: "IEEE Kerala Section",
    },
    {
        id: 6,
        title: "Outstanding Student WIE Volunteer Award",
        year: "2021",
        level: "IEEE Kerala Section",
    },
    {
        id: 7,
        title: "Outstanding WIE Volunteer Award",
        year: "2021",
        level: "IEEE Kerala Section",
    },
    {
        id: 8,
        title: "Outstanding Student Volunteer Technical Contributions Award",
        year: "2021",
        level: "IEEE Kerala Section",
    },
    {
        id: 9,
        title: "Outstanding Student Branch Award",
        year: "2020",
        level: "IEEE Kerala Section",
    },
    {
        id: 10,
        title: "Bronze Plaque Award",
        year: "2020",
        level: "IEEE PES Kerala Chapter",
    },
    {
        id: 11,
        title: "Best Volunteer Award",
        year: "2020",
        level: "IEEE CS Kerala Chapter",
    },
    {
        id: 12,
        title: "Regional Exemplary Student Branch Award",
        year: "2022, 2023",
        level: "Region 10",
    }
];
