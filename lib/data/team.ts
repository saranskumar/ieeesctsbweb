export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image?: string;
    linkedin?: string;
    email?: string;
    bio?: string;
}

export const execom: TeamMember[] = [
    {
        id: "john-doe",
        name: "John Doe",
        role: "Chairperson",
        image: "/team/placeholder.jpg",
        email: "chair@ieeesctsb.org",
        bio: "John is a final year Computer Science student passionate about leadership and technology. He has been an active IEEE member since 2021."
    },
    {
        id: "jane-smith",
        name: "Jane Smith",
        role: "Vice Chairperson",
        image: "/team/placeholder.jpg",
        email: "vicechair@ieeesctsb.org",
        bio: "Jane is an Electronics student with a keen interest in robotics and automation. She leads the technical initiatives of the SB."
    },
    {
        id: "robert-johnson",
        name: "Robert Johnson",
        role: "Secretary",
        image: "/team/placeholder.jpg",
        email: "secretary@ieeesctsb.org",
        bio: "Robert manages the administrative operations of the SB. He is organized and detail-oriented."
    },
    {
        id: "emily-davis",
        name: "Emily Davis",
        role: "Treasurer",
        image: "/team/placeholder.jpg",
        email: "treasurer@ieeesctsb.org",
        bio: "Emily handles the financial aspects of the student branch. She ensures transparency and efficient fund management."
    },
    {
        id: "michael-brown",
        name: "Michael Brown",
        role: "Link Representative",
        image: "/team/placeholder.jpg",
        email: "linkrep@ieeesctsb.org",
        bio: "Michael acts as the bridge between the SB and other organizational units. He is excellent at networking and communication."
    },
    {
        id: "sarah-wilson",
        name: "Sarah Wilson",
        role: "Webmaster",
        image: "/team/placeholder.jpg",
        email: "webmaster@ieeesctsb.org",
        bio: "Sarah maintains the SB website and oversees digital presence. She loves coding and web design."
    }
    // ... existing execom data ...
];

export const sbcTeams: Record<string, TeamMember[]> = {
    "wie": [
        { id: "wie-chair", name: "WIE Chair", role: "Chairperson", image: "/team/placeholder.jpg", email: "wie.chair@ieeesctsb.org" },
        { id: "wie-vice", name: "WIE Vice Chair", role: "Vice Chairperson", image: "/team/placeholder.jpg" },
        { id: "wie-sec", name: "WIE Secretary", role: "Secretary", image: "/team/placeholder.jpg" },
    ],
    "ras": [
        { id: "ras-chair", name: "RAS Chair", role: "Chairperson", image: "/team/placeholder.jpg", email: "ras.chair@ieeesctsb.org" },
        { id: "ras-vice", name: "RAS Vice Chair", role: "Vice Chairperson", image: "/team/placeholder.jpg" },
        { id: "ras-sec", name: "RAS Secretary", role: "Secretary", image: "/team/placeholder.jpg" },
    ],
    "cs": [
        { id: "cs-chair", name: "CS Chair", role: "Chairperson", image: "/team/placeholder.jpg", email: "cs.chair@ieeesctsb.org" },
        { id: "cs-vice", name: "CS Vice Chair", role: "Vice Chairperson", image: "/team/placeholder.jpg" },
        { id: "cs-sec", name: "CS Secretary", role: "Secretary", image: "/team/placeholder.jpg" },
    ],
    "sight": [
        { id: "sight-chair", name: "SIGHT Chair", role: "Chairperson", image: "/team/placeholder.jpg", email: "sight.chair@ieeesctsb.org" },
        { id: "sight-vice", name: "SIGHT Vice Chair", role: "Vice Chairperson", image: "/team/placeholder.jpg" },
        { id: "sight-sec", name: "SIGHT Secretary", role: "Secretary", image: "/team/placeholder.jpg" },
    ],
    "ias": [
        { id: "ias-chair", name: "IAS Chair", role: "Chairperson", image: "/team/placeholder.jpg", email: "ias.chair@ieeesctsb.org" },
        { id: "ias-vice", name: "IAS Vice Chair", role: "Vice Chairperson", image: "/team/placeholder.jpg" },
        { id: "ias-sec", name: "IAS Secretary", role: "Secretary", image: "/team/placeholder.jpg" },
    ],
    "pes": [
        { id: "pes-chair", name: "PES Chair", role: "Chairperson", image: "/team/placeholder.jpg", email: "pes.chair@ieeesctsb.org" },
        { id: "pes-vice", name: "PES Vice Chair", role: "Vice Chairperson", image: "/team/placeholder.jpg" },
        { id: "pes-sec", name: "PES Secretary", role: "Secretary", image: "/team/placeholder.jpg" },
    ],
    "comsoc": [
        { id: "comsoc-chair", name: "ComSoc Chair", role: "Chairperson", image: "/team/placeholder.jpg", email: "comsoc.chair@ieeesctsb.org" },
        { id: "comsoc-vice", name: "ComSoc Vice Chair", role: "Vice Chairperson", image: "/team/placeholder.jpg" },
        { id: "comsoc-sec", name: "ComSoc Secretary", role: "Secretary", image: "/team/placeholder.jpg" },
    ],
    "embs": [
        { id: "embs-chair", name: "EMBS Chair", role: "Chairperson", image: "/team/placeholder.jpg", email: "embs.chair@ieeesctsb.org" },
        { id: "embs-vice", name: "EMBS Vice Chair", role: "Vice Chairperson", image: "/team/placeholder.jpg" },
        { id: "embs-sec", name: "EMBS Secretary", role: "Secretary", image: "/team/placeholder.jpg" },
    ],
};
