const galleryImages = [
  { id: 1, title: "TechFest 2025", category: "Events", image: "/placeholder.svg" },
  { id: 2, title: "Workshop Session", category: "Workshops", image: "/placeholder.svg" },
  { id: 3, title: "Team Building", category: "Activities", image: "/placeholder.svg" },
  { id: 4, title: "Hackathon Winners", category: "Events", image: "/placeholder.svg" },
  { id: 5, title: "Guest Lecture", category: "Seminars", image: "/placeholder.svg" },
  { id: 6, title: "Lab Session", category: "Workshops", image: "/placeholder.svg" },
  { id: 7, title: "Annual Meet", category: "Events", image: "/placeholder.svg" },
  { id: 8, title: "Project Expo", category: "Exhibitions", image: "/placeholder.svg" },
  { id: 9, title: "Cultural Event", category: "Activities", image: "/placeholder.svg" },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Gallery
            </h1>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              Explore moments from our events, workshops, and activities throughout the years.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-card">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square bg-background rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-heading font-semibold mb-1">
                      {item.title}
                    </p>
                    <p className="text-white/80 text-sm font-secondary">
                      {item.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
