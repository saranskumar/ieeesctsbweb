import { Calendar, MapPin, ArrowRight, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { events as staticEvents } from "@/lib/data/events";

async function getHomeEvents() {
  try {
    const { data: dbEvents, error } = await supabase
      .from("events")
      .select("*")
      .limit(20);

    if (error || !dbEvents || dbEvents.length === 0) {
      return staticEvents.slice(0, 6);
    }

    return dbEvents.map((e: any) => {
      const statusVal = e.status === "published" ? "Registration Open" : "Completed";
      
      let formattedDate = "";
      let formattedTime = "";
      if (e.event_date) {
        const d = new Date(e.event_date);
        formattedDate = d.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        formattedTime = d.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      }

      return {
        id: e.slug,
        title: e.title,
        date: formattedDate || "TBA",
        time: formattedTime,
        mode: "Offline" as const,
        venue: e.venue || "",
        status: statusVal,
        description: e.description,
        image: e.main_poster_url || "https://res.cloudinary.com/djsime0yn/image/upload/v1779484601/kla4bkjx0zr1dvdghtnb.jpg",
        order: 0,
      };
    }).slice(0, 6);
  } catch (err) {
    console.error("Error fetching home events from Supabase:", err);
    return staticEvents.slice(0, 6);
  }
}

const EventsSection = async () => {
  const sortedEvents = await getHomeEvents();

  return (
    <section className="section-padding bg-card">
      <div className="section-container">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                Events
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

          {sortedEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="bg-background rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md border border-border flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-[4/5] bg-muted relative">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <span className={`absolute top-3 left-3 badge-status ${
                      event.status === 'Registration Open' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                      event.status === 'Completed' ? 'bg-secondary text-secondary-foreground border border-border' : 'badge-upcoming'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-3 line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="space-y-2 mb-4 flex-grow">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="font-body">
                          {event.date}
                          {event.time && ` • ${event.time}`}
                        </span>
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
                    <Button asChild className="w-full font-secondary mt-auto" size="sm" variant={event.status === 'Registration Open' ? 'default' : 'outline'}>
                      <Link href={`/${event.id}`}>
                        {event.status === 'Registration Open' ? 'Register Now' : 'View Details'}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-background rounded-lg border border-dashed border-border text-muted-foreground">
              No events right now. Check back later!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
