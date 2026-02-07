export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    mode: "Online" | "Offline" | "Hybrid";
    venue?: string;
    status: "Upcoming" | "Completed" | "Registration Open";
    description: string;
    image: string;
    chapterId?: string; // Optional: if null/undefined, it could be a main SB event
    speakers?: string[];
    eligibility?: string;
    rules?: string[];
    gallery?: string[]; // Array of poster images
}

export const events: Event[] = [
    {
        id: "ev-1",
        title: "TechTalk: AI in Healthcare",
        date: "March 15, 2026",
        time: "3:00 PM - 5:00 PM",
        mode: "Online",
        status: "Registration Open",
        description: "Explore the transformative impact of artificial intelligence in modern healthcare systems. This session will cover machine learning applications in diagnostics, patient care optimization, and the future of AI-driven medical research.",
        image: "/placeholder.svg",
        chapterId: "cs",
        speakers: ["Dr. Sarah Chen - AI Research Lead", "Prof. Michael Roberts - Healthcare Innovation"],
        eligibility: "Open to all IEEE members and students",
        rules: ["Registration required", "Certificate will be provided", "Q&A session at the end"],
        gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
    },
    {
        id: "ev-2",
        title: "IoT Workshop",
        date: "March 22, 2026",
        time: "10:00 AM - 4:00 PM",
        mode: "Offline",
        venue: "IoT Lab",
        status: "Upcoming",
        description: "Hands-on workshop covering the basics of Internet of Things and sensor integration. Learn to build IoT projects from scratch with Arduino and Raspberry Pi.",
        image: "/placeholder.svg",
        chapterId: "ras",
        speakers: ["Eng. David Park - IoT Specialist"],
        eligibility: "Basic programming knowledge required",
        rules: ["Bring your own laptop", "Materials will be provided", "Limited seats available"],
        gallery: ["/placeholder.svg", "/placeholder.svg"]
    },
    {
        id: "ev-3",
        title: "Renewable Energy Seminar",
        date: "April 5, 2026",
        time: "10:00 AM - 1:00 PM",
        mode: "Offline",
        venue: "Seminar Hall",
        status: "Registration Open",
        description: "A seminar on the latest trends and technologies in renewable energy sources. Topics include solar power efficiency, wind energy advancements, and grid integration.",
        image: "/placeholder.svg",
        chapterId: "pes",
        speakers: ["Dr. Emily White - Renewable Energy Expert"],
        eligibility: "Open to all students",
        rules: ["Registration required", "Certificate will be provided"],
    },
    {
        id: "ev-4",
        title: "Women in Tech Summit",
        date: "April 15, 2026",
        time: "9:00 AM - 5:00 PM",
        mode: "Hybrid",
        venue: "Main Auditorium",
        status: "Upcoming",
        description: "Celebrating women in technology with inspiring talks and networking sessions. Join us to hear from industry leaders and participate in panel discussions.",
        image: "/placeholder.svg",
        chapterId: "wie",
        speakers: ["Jane Doe - CTO at Tech Corp", "Alice Smith - Founder of StartUp"],
        eligibility: "Open to all",
        rules: ["Registration required", "Networking session included"],
        gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
    },
    {
        id: "ev-5",
        title: "Industrial Automation Expo",
        date: "May 10, 2026",
        time: "10:00 AM - 6:00 PM",
        mode: "Offline",
        venue: "Exhibition Center",
        status: "Upcoming",
        description: "Showcasing the latest advancements in industrial automation and control systems. Experience live demos and interact with industry professionals.",
        image: "/placeholder.svg",
        chapterId: "ias",
        eligibility: "Open to all engineering students",
        rules: ["ID card mandatory", "Formal dress code"],
    },
    {
        id: "ev-6",
        title: "5G & Beyond",
        date: "May 20, 2026",
        time: "4:00 PM - 6:00 PM",
        mode: "Online",
        status: "Upcoming",
        description: "Deep dive into the future of communication technologies. Understanding the architecture and potential applications of 6G.",
        image: "/placeholder.svg",
        chapterId: "comsoc",
        speakers: ["Dr. Alan Turing (AI Persona)"],
        eligibility: "Open to IEEE Members",
        rules: ["Webinar link will be shared via email"],
    },
    {
        id: "ev-7",
        title: "Biomedical Engineering Trends",
        date: "June 1, 2026",
        time: "2:00 PM - 4:00 PM",
        mode: "Offline",
        venue: "Bio Lab",
        status: "Upcoming",
        description: "Discussing current trends and future directions in biomedical engineering.",
        image: "/placeholder.svg",
        chapterId: "embs",
        speakers: ["Dr. House"],
        eligibility: "Biomedical students preferred",
    },
    {
        id: "ev-8",
        title: "Community Outreach",
        date: "June 15, 2026",
        time: "9:00 AM - 12:00 PM",
        mode: "Offline",
        venue: "Community Center",
        status: "Upcoming",
        description: "Technology workshop for local students. Teaching basic computer skills and coding logic.",
        image: "/placeholder.svg",
        chapterId: "sight",
        eligibility: "Volunteers restricted to IEEE members",
        rules: ["Volunteers must attend briefing session"],
    },
];
