import { Calendar, MapPin, ArrowRight, Monitor, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { events } from "@/lib/data/events";

const EventsSection = () => {
  // Sort events by date (this is a simple string sort for now, better to use real dates if available)
  // For now, we rely on the order in the events array or implement a basic filter
  
  const upcomingEvents = events
    .filter(e => e.status === "Upcoming" || e.status === "Registration Open")
    .slice(0, 3);
    
  // Since all events in dummy data are "Upcoming" or "Registration Open",
  // let's just create a fallback past events list to show the UI if there are no completed ones
  let pastEvents = events
    .filter(e => e.status === "Completed")
    .slice(0, 3);

  // Fallback for visual testing if no completed events exist in data yet
  if (pastEvents.length === 0) {
      pastEvents = [
        {
          id: "past-1",
          title: "Annual Tech Fest 2025",
          date: "December 2025",
          image: "/placeholder.svg",
          time: "", mode: "Offline", status: "Completed", description: ""
        },
        {
          id: "past-2",
          title: "Python Bootcamp",
          date: "November 2025",
          image: "/placeholder.svg",
          time: "", mode: "Offline", status: "Completed", description: ""
        },
        {
          id: "past-3",
          title: "Industry Connect",
          date: "October 2025",
          image: "/placeholder.svg",
          time: "", mode: "Offline", status: "Completed", description: ""
        },
      ];
  }

  return (
    <section className="section-padding bg-card">
      <div className="section-container">
        {/* Upcoming Events */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                Upcoming Events
              </h2>
              <p className="text-muted-foreground font-body">
                Join our latest workshops, talks, and competitions
              </p>
            </div>
            <Button asChild variant="outline" className="font-secondary self-start sm:self-auto">
              <Link href="/events">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {upcomingEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id}
                className="bg-background rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md border border-border"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/5] bg-muted relative">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <span className={`absolute top-3 left-3 badge-status ${event.status === 'Registration Open' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'badge-upcoming'}`}>
                    {event.status}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3 line-clamp-2">
                    {event.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-body">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {event.mode === "Online" ? (
                        <Monitor className="w-4 h-4 text-primary" />
                      ) : (
                        <MapPin className="w-4 h-4 text-primary" />
                      )}
                      <span className="font-body">{event.mode} {event.venue ? `• ${event.venue}` : ''}</span>
                    </div>
                  </div>
                  <Button asChild className="w-full font-secondary" size="sm" variant={event.status === 'Registration Open' ? 'default' : 'outline'}>
                    <Link href={`/events/${event.id}`}>
                      {event.status === 'Registration Open' ? 'Register Now' : 'View Details'}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          ) : (
            <div className="text-center py-12 bg-background rounded-lg border border-dashed border-border text-muted-foreground">
              No upcoming events right now. Check back later!
            </div>
          )}
        </div>

        {/* Past Events */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-2">
                Recently Concluded
              </h2>
              <p className="text-muted-foreground font-body">
                A glimpse of our recent activities
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="group relative aspect-[4/5] rounded-lg overflow-hidden bg-muted"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="font-heading font-medium text-primary-foreground text-sm md:text-base line-clamp-2">
                    {event.title}
                  </h4>
                  <p className="text-xs md:text-sm text-primary-foreground/70 font-body mt-1">
                    {event.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
