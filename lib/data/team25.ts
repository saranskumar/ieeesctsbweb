// Shared interface for team members
export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image?: string;
    linkedin?: string;
    email?: string;
    bio?: string;
}

export const execom25: TeamMember[] = [
    // Faculty Advisors
    {
        id: "branch-counselor-25",
        name: "Deepa A K",
        role: "Branch Counselor (PES, SIGHT)",
        image: "/team/placeholder.jpg",
    },
    {
        id: "ras-advisor-25",
        name: "Sandhya L",
        role: "RAS Advisor",
        image: "/team/placeholder.jpg",
    },
    {
        id: "wie-comsoc-advisor-25",
        name: "Dr. Lakshmi V S",
        role: "WIE & ComSoc Advisor",
        image: "/team/placeholder.jpg",
    },
    {
        id: "cs-advisor-25",
        name: "Rejimol Robinson R R",
        role: "CS Advisor",
        image: "/team/placeholder.jpg",
    },
    {
        id: "ias-advisor-25",
        name: "Sajith Sethu",
        role: "IAS Advisor",
        image: "/team/placeholder.jpg",
    },
    {
        id: "embs-advisor-25",
        name: "Baji K",
        role: "EMBS Advisor",
        image: "/team/placeholder.jpg",
    },

    // Core SB
    {
        id: "chair-25",
        name: "Alfy Joseph Kunjumon",
        role: "Chairperson",
        image: "/team/placeholder.jpg",
    },
    {
        id: "vice-chair-25",
        name: "Sneha Bijee",
        role: "Vice Chairperson",
        image: "/team/placeholder.jpg",
    },
    {
        id: "sec-25",
        name: "Niyatha Suresh",
        role: "Secretary",
        image: "/team/placeholder.jpg",
    },
    {
        id: "link-25",
        name: "Janani C M",
        role: "Link Representative",
        image: "/team/placeholder.jpg",
    },
    {
        id: "treasurer-25",
        name: "Revathy P S",
        role: "Treasurer",
        image: "/team/placeholder.jpg",
    },
    {
        id: "sub-treasurer-25",
        name: "Diya Das S G",
        role: "Sub Treasurer",
        image: "/team/placeholder.jpg",
    },
    {
        id: "webmaster-25",
        name: "Dona Sebastian",
        role: "Webmaster",
        image: "/team/placeholder.jpg",
    },
    {
        id: "ac-25",
        name: "Aadhithya A G",
        role: "Activity Coordinator",
        image: "/team/placeholder.jpg",
    },

    // Extended Roles
    {
        id: "tech-lead-25",
        name: "Ciril Jose",
        role: "Tech Lead",
        image: "/team/placeholder.jpg",
    },
    {
        id: "ecc-1-25",
        name: "Abhijith P V",
        role: "ECC",
        image: "/team/placeholder.jpg",
    },
    {
        id: "ecc-2-25",
        name: "Harisankar Prasad",
        role: "ECC",
        image: "/team/placeholder.jpg",
    },
    {
        id: "pdc-25",
        name: "Anaswara Paul",
        role: "PDC Lead",
        image: "/team/placeholder.jpg",
    },
    {
        id: "content-25",
        name: "Adithya C J",
        role: "Content Lead",
        image: "/team/placeholder.jpg",
    },
    {
        id: "mdc-1-25",
        name: "Vishnudev R",
        role: "MD Coordinator",
        image: "/team/placeholder.jpg",
    },
    {
        id: "mdc-2-25",
        name: "Ron John Kurien",
        role: "MD Coordinator",
        image: "/team/placeholder.jpg",
    },
];

export const sbcTeams25: Record<string, TeamMember[]> = {
    "cs": [
        { id: "cs-chair-25", name: "Yohann Chandy", role: "Chairperson", image: "/team/placeholder.jpg" },
        { id: "cs-vice-25", name: "Athul Chacko", role: "Vice Chairperson", image: "/team/placeholder.jpg" },
        { id: "cs-sec-25", name: "Chinmayi B S", role: "Secretary", image: "/team/placeholder.jpg" },
        { id: "cs-wic-25", name: "Nandana Rajesh", role: "Women in Computing", image: "/team/placeholder.jpg" },
        { id: "cs-ai-25", name: "Saran S Kumar", role: "AI SIG Coordinator", image: "/team/placeholder.jpg" },
    ],
    "embs": [
        { id: "embs-chair-25", name: "Riya Mary Sajan", role: "Chairperson", image: "/team/placeholder.jpg" },
        { id: "embs-vice-25", name: "Adithya A S", role: "Vice Chairperson", image: "/team/placeholder.jpg" },
        { id: "embs-sec-25", name: "Sabari Nath", role: "Secretary", image: "/team/placeholder.jpg" },
    ],
    "ras": [
        { id: "ras-chair-25", name: "Arun Aravindakshan", role: "Chairperson", image: "/team/placeholder.jpg" },
        { id: "ras-vice-25", name: "Durgadas D K", role: "Vice Chairperson", image: "/team/placeholder.jpg" },
        { id: "ras-sec-25", name: "Fida Fathima Shine", role: "Secretary", image: "/team/placeholder.jpg" },
    ],
    "ias": [
        { id: "ias-chair-25", name: "Aqeel Hussain", role: "Chairperson", image: "/team/placeholder.jpg" },
        { id: "ias-vice-25", name: "Babitha B", role: "Vice Chairperson", image: "/team/placeholder.jpg" },
        { id: "ias-sec-25", name: "Parthasarathy A", role: "Secretary", image: "/team/placeholder.jpg" },
    ],
    "pes": [
        { id: "pes-chair-25", name: "Fisa Fathima Feroze", role: "Chairperson", image: "/team/placeholder.jpg" },
        { id: "pes-vice-25", name: "Devanarayan S", role: "Vice Chairperson", image: "/team/placeholder.jpg" },
        { id: "pes-sec-25", name: "Abhinand S Nath", role: "Secretary", image: "/team/placeholder.jpg" },
        { id: "pes-wip-25", name: "Archana R Sethu", role: "Women In Power", image: "/team/placeholder.jpg" },
    ],
    "comsoc": [
        { id: "comsoc-chair-25", name: "Meghna J Pai", role: "Chairperson", image: "/team/placeholder.jpg" },
        { id: "comsoc-vice-25", name: "Aakash Anand", role: "Vice Chairperson", image: "/team/placeholder.jpg" },
        { id: "comsoc-sec-25", name: "Mahreen Zuraiq", role: "Secretary", image: "/team/placeholder.jpg" },
        { id: "comsoc-wice-25", name: "Fathima Meera", role: "WICE", image: "/team/placeholder.jpg" },
    ],
    "sight": [
        { id: "sight-chair-25", name: "Rizan Amani", role: "SIGHT Chair", image: "/team/placeholder.jpg" },
        { id: "sight-vice-25", name: "Eswar Dev J D", role: "SIGHT Vice-Chair", image: "/team/placeholder.jpg" },
        { id: "sight-sec-25", name: "Shahnas M", role: "SIGHT Secretary", image: "/team/placeholder.jpg" },
        { id: "sight-project-25", name: "Basil Joy", role: "Project Head", image: "/team/placeholder.jpg" },
    ],
    "wie": [
        { id: "wie-chair-25", name: "Agraja S S", role: "WIE Chair", image: "/team/placeholder.jpg" },
        { id: "wie-vice-25", name: "Sonal Santhosh", role: "WIE Vice-Chair", image: "/team/placeholder.jpg" },
        { id: "wie-sec-25", name: "Bhagavathy A N", role: "Secretary", image: "/team/placeholder.jpg" },
    ],
};
