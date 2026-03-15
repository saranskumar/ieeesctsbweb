import { galleryItems } from "@/lib/data/gallery";
import Link from "next/link";

const CATEGORIES = ["All", "Event", "Workshop", "Seminar", "Activity", "Outreach", "Exhibition", "Other"] as const;

export const metadata = {
  title: "Gallery | IEEE SCT SB",
  description: "Explore moments from our events, workshops, and activities throughout the years.",
};

export default function GalleryPage() {
  // Sort by order descending (newest first)
  const sorted = [...galleryItems].sort((a, b) => (b.order || 0) - (a.order || 0));

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-background border-b border-border">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Gallery
            </h1>
            <p className="text-xl text-muted-foreground font-body leading-relaxed">
              Explore moments from our events, workshops, and activities throughout the years.
            </p>
          </div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="section-padding bg-card">
        <div className="section-container">
          {/* CSS columns masonry — images render at their natural ratio */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-0">
            {sorted.map((item) => (
              <div
                key={item.id}
                className="group relative break-inside-avoid mb-4 bg-background rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/80 text-primary-foreground mb-2">
                      {item.category}
                    </span>
                    <p className="text-white font-heading font-semibold text-base leading-tight mb-1">
                      {item.title}
                    </p>
                    {item.date && (
                      <p className="text-white/70 text-xs font-secondary">{item.date}</p>
                    )}
                    {item.description && (
                      <p className="text-white/60 text-xs font-body mt-1 line-clamp-2">{item.description}</p>
                    )}
                    {item.eventId && (
                      <Link
                        href={`/${item.eventId}`}
                        className="inline-block mt-2 text-xs text-primary-foreground/80 hover:text-white underline underline-offset-2 font-secondary"
                      >
                        View event →
                      </Link>
                    )}
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
