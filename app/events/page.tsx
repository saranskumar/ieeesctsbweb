import Link from "next/link";
import { Calendar, MapPin, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

import { events } from "@/lib/data/events";

export default function EventsPage() {
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (!isNaN(dateA) && !isNaN(dateB) && dateA !== dateB) {
      return dateB - dateA; // Descending: latest date first
    }
    return (a.order || 0) - (b.order || 0);
  });

  const upcomingEvents = sortedEvents.filter(
    (e) => e.status === "Upcoming" || e.status === "Registration Open"
  );
  
  const pastEvents = sortedEvents.filter((e) => e.status === "Completed");

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-background border-b border-border">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Events & Activities
            </h1>
            <p className="text-xl text-muted-foreground font-body leading-relaxed">
              Join us for exciting technical events, workshops, hackathons, and networking opportunities
              throughout the year. Elevate your skills and connect with industry experts.
            </p>
          </div>
        </div>
      </section>

      {/* Events Sections */}
      <section className="section-padding bg-card">
        <div className="section-container space-y-24">
          
          {/* Upcoming Events */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Upcoming Events
              </h2>
              <p className="text-muted-foreground font-body text-lg">
                Mark your calendars for our upcoming sessions
              </p>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-background rounded-xl overflow-hidden group flex flex-col h-full border border-border shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span
                        className={`absolute top-4 left-4 badge-status ${
                          event.status === "Registration Open"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "badge-upcoming"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-3 line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground font-body text-base mb-6 line-clamp-3">
                        {event.description}
                      </p>
                      
                      {/* Flex filler to push the footer to the bottom */}
                      <div className="mt-auto space-y-6">
                        <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-3 text-sm text-foreground">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="font-body font-medium">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-foreground">
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
                          className="w-full font-secondary text-base py-6"
                          variant={event.status === "Registration Open" ? "default" : "secondary"}
                        >
                          <Link href={`/${event.id}`}>
                            {event.status === "Registration Open" ? "Register Now" : "View Details"}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-background rounded-xl border border-dashed border-border text-muted-foreground">
                <p className="text-lg">No upcoming events are scheduled right now.</p>
                <p className="text-sm mt-2">Check back later or join our community to get notified.</p>
              </div>
            )}
          </div>

          {/* Past Events (if any) */}
          {pastEvents.length > 0 && (
            <div>
              <div className="mb-10">
                <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                  Past Events
                </h2>
                <p className="text-muted-foreground font-body text-lg">
                  Explore what we've previously organized
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-80">
                {pastEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-background/50 rounded-xl overflow-hidden group flex flex-col h-full border border-border"
                  >
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                      <span className="absolute top-4 left-4 badge-status badge-completed">
                        {event.status}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2 line-clamp-2">
                        {event.title}
                      </h3>
                      
                      {/* Flex filler */}
                      <div className="mt-auto pt-6 space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span className="font-body">{event.date}</span>
                        </div>
                        <Button asChild variant="outline" className="w-full font-secondary">
                          <Link href={`/${event.id}`}>View Gallery & Details</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
