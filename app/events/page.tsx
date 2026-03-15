import Link from "next/link";
import { Calendar, MapPin, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

import { events } from "@/lib/data/events";

export default function EventsPage() {
  const sortedEvents = [...events].sort((a, b) => {
    return (b.order || 0) - (a.order || 0);
  });

  const liveEvents = sortedEvents.filter((e) => e.status === "Registration Open");
  const otherEvents = sortedEvents.filter((e) => e.status !== "Registration Open");

  const showLiveSection = liveEvents.length > 0;

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-background border-b border-border text-center md:text-left">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Events & Announcements
            </h1>
            <p className="text-xl text-muted-foreground font-body leading-relaxed">
              Explore our workshops, talk sessions, hackathons, and community announcements that drive innovation forward.
            </p>
          </div>
        </div>
      </section>

      {/* Events Sections */}
      <section className="section-padding bg-card min-h-[60vh]">
        <div className="section-container space-y-20">
          
          {/* Live Section - Only show if there are live events */}
          {showLiveSection && (
            <div>
              <div className="mb-10 flex items-center gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold tracking-widest text-sm mb-2 uppercase">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    Live Now
                  </div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                    Active & Ongoing
                  </h2>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {liveEvents.map((event) => (
                  <EventCard key={event.id} event={event} isLive />
                ))}
              </div>
            </div>
          )}

          {/* All Events Section */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                {showLiveSection ? "Recent & Past Activities" : "All Events & Announcements"}
              </h2>
              {!showLiveSection && (
                <p className="text-muted-foreground font-body">
                  Everything we've built and everything on the horizon.
                </p>
              )}
            </div>

            {sortedEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(showLiveSection ? otherEvents : sortedEvents).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-background rounded-xl border border-dashed border-border text-muted-foreground">
                <p className="text-lg">No events are currently listed.</p>
                <p className="text-sm mt-2">Check back soon for updates!</p>
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}

function EventCard({ event, isLive }: { event: any; isLive?: boolean }) {
  return (
    <div
      className={`bg-background rounded-xl overflow-hidden group flex flex-col h-full border border-border shadow-sm hover:shadow-xl transition-all duration-500 ${!isLive ? 'opacity-95' : 'border-primary/20 shadow-primary/5'}`}
    >
      <div className="aspect-[4/5] bg-muted relative overflow-hidden">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span
          className={`absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            event.status === "Registration Open"
              ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
              : event.status === "Completed" 
                ? "bg-secondary/90 text-secondary-foreground backdrop-blur-sm" 
                : "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          }`}
        >
          {event.status}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-heading font-bold text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        
        <div className="mt-auto space-y-6">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3 text-sm text-foreground/80">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-body font-medium">{event.date}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-foreground/80">
              {event.mode === "Online" ? (
                <Monitor className="w-4 h-4 text-primary" />
              ) : (
                <MapPin className="w-4 h-4 text-primary" />
              )}
              <span className="font-body font-medium">
                {event.mode}
                {event.venue && ` • ${event.venue}`}
              </span>
            </div>
          </div>
          <Button 
            asChild 
            className={`w-full font-bold group/btn ${isLive ? 'shadow-lg shadow-primary/20' : ''}`}
            variant={isLive ? "default" : "outline"}
          >
            <Link href={`/${event.id}`}>
              {event.status === "Registration Open" ? "Join Event" : "Explore Details"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
