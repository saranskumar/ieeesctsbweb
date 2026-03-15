const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'public', 'gallery');
const dataFile = path.join(__dirname, 'lib', 'data', 'gallery.ts');

const files = fs.readdirSync(galleryDir).filter(f => f.endsWith('.webp'));
const newItems = files.map((file, index) => ({
    id: 'gallery-new-' + (index + 1),
    title: '',
    category: '',
    image: '/gallery/' + file,
    date: '',
    eventId: '',
    chapterId: '',
    description: '',
    order: index + 1
}));

const tsContent = `export interface GalleryItem {
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

export const galleryItems: GalleryItem[] = ${JSON.stringify(newItems, null, 4)};
`;

fs.writeFileSync(dataFile, tsContent);
console.log(`Synchronized ${newItems.length} items with correct filenames.`);
