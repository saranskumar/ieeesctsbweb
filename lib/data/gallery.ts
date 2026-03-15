export interface GalleryItem {
    id: string;
    title: string;
    category?: "Event" | "Workshop" | "Seminar" | "Activity" | "Outreach" | "Exhibition" | "Other" | string;
    image: string;         // Path to the image, relative to /public
    date?: string;         // Optional: date of the event/moment
    eventId?: string;      // Optional: links back to an event in events.ts
    chapterId?: string;    // Optional: chapter that organized this
    description?: string;  // Optional: short caption
    order: number;         // Sorting order — higher = more recent
}

export const galleryItems: GalleryItem[] = [
    {
        "id": "gallery-new-1",
        "title": "",
        "category": "",
        "image": "/gallery/cs6.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 1
    },
    {
        "id": "gallery-new-2",
        "title": "",
        "category": "",
        "image": "/gallery/cs7.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 2
    },
    {
        "id": "gallery-new-3",
        "title": "",
        "category": "",
        "image": "/gallery/cs8.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 3
    },
    {
        "id": "gallery-new-4",
        "title": "",
        "category": "",
        "image": "/gallery/cyber2.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 4
    },
    {
        "id": "gallery-new-5",
        "title": "",
        "category": "",
        "image": "/gallery/cyber3.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 5
    },
    {
        "id": "gallery-new-6",
        "title": "",
        "category": "",
        "image": "/gallery/embs_inauguration_audience.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 6
    },
    {
        "id": "gallery-new-7",
        "title": "",
        "category": "",
        "image": "/gallery/gallery_com2.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 7
    },
    {
        "id": "gallery-new-8",
        "title": "",
        "category": "",
        "image": "/gallery/gallery_com3.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 8
    },
    {
        "id": "gallery-new-9",
        "title": "",
        "category": "",
        "image": "/gallery/ieee.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 9
    },
    {
        "id": "gallery-new-10",
        "title": "",
        "category": "",
        "image": "/gallery/IMG_9344.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 10
    },
    {
        "id": "gallery-new-11",
        "title": "",
        "category": "",
        "image": "/gallery/IMG_9356.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 11
    },
    {
        "id": "gallery-new-12",
        "title": "",
        "category": "",
        "image": "/gallery/IMG_9372.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 12
    },
    {
        "id": "gallery-new-13",
        "title": "",
        "category": "",
        "image": "/gallery/md_session_1.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 13
    },
    {
        "id": "gallery-new-14",
        "title": "",
        "category": "",
        "image": "/gallery/md_session_2.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 14
    },
    {
        "id": "gallery-new-15",
        "title": "",
        "category": "",
        "image": "/gallery/md_session_3.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 15
    },
    {
        "id": "gallery-new-16",
        "title": "",
        "category": "",
        "image": "/gallery/ras2.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 16
    },
    {
        "id": "gallery-new-17",
        "title": "",
        "category": "",
        "image": "/gallery/ras4.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 17
    },
    {
        "id": "gallery-new-18",
        "title": "",
        "category": "",
        "image": "/gallery/ras7.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 18
    },
    {
        "id": "gallery-new-19",
        "title": "",
        "category": "",
        "image": "/gallery/ras8.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 19
    },
    {
        "id": "gallery-new-20",
        "title": "",
        "category": "",
        "image": "/gallery/typ2.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 20
    },
    {
        "id": "gallery-new-21",
        "title": "",
        "category": "",
        "image": "/gallery/WhatsApp Image 2026-03-15 at 4.34.36 PM (1)_oth.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 21
    },
    {
        "id": "gallery-new-22",
        "title": "",
        "category": "",
        "image": "/gallery/WhatsApp Image 2026-03-15 at 4.34.36 PM (2)_oth.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 22
    },
    {
        "id": "gallery-new-23",
        "title": "",
        "category": "",
        "image": "/gallery/WhatsApp Image 2026-03-15 at 4.34.36 PM_oth.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 23
    },
    {
        "id": "gallery-new-24",
        "title": "",
        "category": "",
        "image": "/gallery/WhatsApp Image 2026-03-15 at 4.34.37 PM_oth.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 24
    },
    {
        "id": "gallery-new-25",
        "title": "",
        "category": "",
        "image": "/gallery/wie2.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 25
    },
    {
        "id": "gallery-new-26",
        "title": "",
        "category": "",
        "image": "/gallery/wie3.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 26
    },
    {
        "id": "gallery-new-27",
        "title": "",
        "category": "",
        "image": "/gallery/wie4.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 27
    },
    {
        "id": "gallery-new-28",
        "title": "",
        "category": "",
        "image": "/gallery/wiecon11_oth.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 28
    },
    {
        "id": "gallery-new-29",
        "title": "",
        "category": "",
        "image": "/gallery/wiecon15_oth.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 29
    },
    {
        "id": "gallery-new-30",
        "title": "",
        "category": "",
        "image": "/gallery/wiecon23_oth.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 30
    },
    {
        "id": "gallery-new-31",
        "title": "",
        "category": "",
        "image": "/gallery/wiecon24_oth.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 31
    },
    {
        "id": "gallery-new-32",
        "title": "",
        "category": "",
        "image": "/gallery/wiecon26_oth.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 32
    },
    {
        "id": "gallery-new-33",
        "title": "",
        "category": "",
        "image": "/gallery/wiecon28_oth.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 33
    },
    {
        "id": "gallery-new-34",
        "title": "",
        "category": "",
        "image": "/gallery/wiecon29_oth.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 34
    },
    {
        "id": "gallery-new-35",
        "title": "",
        "category": "",
        "image": "/gallery/wiecon30_oth.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 35
    },
    {
        "id": "gallery-new-36",
        "title": "",
        "category": "",
        "image": "/gallery/wiecon31_oth.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 36
    },
    {
        "id": "gallery-new-37",
        "title": "",
        "category": "",
        "image": "/gallery/wiecon32_oth.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 37
    },
    {
        "id": "gallery-new-38",
        "title": "",
        "category": "",
        "image": "/gallery/wiecon33_oth.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 38
    },
    {
        "id": "gallery-new-39",
        "title": "",
        "category": "",
        "image": "/gallery/wiecon8_oth.webp",
        "date": "",
        "eventId": "",
        "chapterId": "",
        "description": "",
        "order": 39
    }
];
