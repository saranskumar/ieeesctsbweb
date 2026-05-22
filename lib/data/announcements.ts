export interface Announcement {
    id: string;
    title: string;
    description: string;
    date: string;
    imageUrl?: string;
    order: number;
}

export const announcements: Announcement[] = [
    {
        id: "exemplary-sb-award-2025",
        title: "IEEE Regional Exemplary Student Branch Award 2025",
        description: "We are thrilled to announce that IEEE SCT Student Branch has been awarded the prestigious IEEE Regional Exemplary Student Branch Award for 2025 by IEEE Region 10 (Asia-Pacific). This award recognizes our outstanding performance, member engagement, and technical activities throughout the year.",
        date: "April 15, 2025",
        imageUrl: "https://res.cloudinary.com/djsime0yn/image/upload/v1779484601/kla4bkjx0zr1dvdghtnb.jpg",
        order: 1,
    },
    {
        id: "execom-announcement-2026",
        title: "Announcement of the Executive Committee for 2026-27",
        description: "The leadership transition is complete. We are pleased to announce the newly appointed Executive Committee members for the 2026-27 term of IEEE SCT Student Branch. Congratulations to all the new officers, and we look forward to a year of unparalleled innovation and impact.",
        date: "May 20, 2026",
        imageUrl: "https://res.cloudinary.com/djsime0yn/image/upload/v1779484601/kla4bkjx0zr1dvdghtnb.jpg",
        order: 2,
    },
    {
        id: "membership-drive-2026",
        title: "IEEE Membership Drive 2026 Open",
        description: "Unlock global opportunities, build technical skills, and connect with a massive network of professionals. The IEEE SCT SB Membership Drive for 2026 is officially open! Join today and get access to exclusive workshops, seminars, and networking events.",
        date: "May 22, 2026",
        imageUrl: "https://res.cloudinary.com/djsime0yn/image/upload/v1779484601/kla4bkjx0zr1dvdghtnb.jpg",
        order: 3,
    }
];
