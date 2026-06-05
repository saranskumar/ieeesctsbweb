import Link from "next/link";
import { Calendar, MapPin, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnnouncementsScroll from "@/components/AnnouncementsScroll";

import { supabase } from "@/lib/supabase";
import { events as staticEvents } from "@/lib/data/events";
import { announcements as staticAnnouncements } from "@/lib/data/announcements";

export const revalidate = 60; // Revalidate every minute

async function getEventsAndAnnouncements() {
  try {
    const { data: dbEvents, error: eventsError } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: false });

    const { data: dbAnnouncements, error: announcementsError } = await supabase
      .from("announcements")
      .select("*")
      .eq("is_published", true)
      .order("announcement_date", { ascending: false });

    if (eventsError || announcementsError) {
      console.error("Supabase error fetching events/announcements, falling back to static:", eventsError || announcementsError);
      return { events: staticEvents, announcements: staticAnnouncements };
    }

    if (!dbEvents || dbEvents.length === 0) {
      return { events: staticEvents, announcements: staticAnnouncements };
    }

    const mappedEvents = dbEvents.map((e: any) => {
      const statusVal = e.status === "open" ? "Open" : e.status === "closed" ? "Closed" : "Completed";
      
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
        mode: "Offline", // default
        venue: e.venue || "",
        status: statusVal,
        description: e.description,
        image: e.main_poster_url 
          ? (e.main_poster_url.includes("res.cloudinary.com") 
              ? e.main_poster_url.replace("/image/upload/", "/image/upload/f_auto,q_auto/") 
              : e.main_poster_url) 
          : "https://res.cloudinary.com/djsime0yn/image/upload/f_auto,q_auto/v1779484601/kla4bkjx0zr1dvdghtnb.jpg",
        order: 0,
      };
    });

    const mappedAnnouncements = (dbAnnouncements || []).map((a: any) => {
      let formattedDate = "";
      if (a.announcement_date) {
        const d = new Date(a.announcement_date);
        formattedDate = d.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      }

      return {
        id: a.slug,
        title: a.title,
        description: a.description,
        date: formattedDate,
        imageUrl: a.image_url 
          ? (a.image_url.includes("res.cloudinary.com") 
              ? a.image_url.replace("/image/upload/", "/image/upload/f_auto,q_auto/") 
              : a.image_url) 
          : "https://res.cloudinary.com/djsime0yn/image/upload/f_auto,q_auto/v1779484601/kla4bkjx0zr1dvdghtnb.jpg",
        order: 0,
      };
    });

    return { events: mappedEvents, announcements: mappedAnnouncements };
  } catch (error) {
    console.error("Exception fetching from Supabase, falling back to static:", error);
    return { events: staticEvents, announcements: staticAnnouncements };
  }
}

export default async function EventsPage() {
  const { events: fetchedEvents, announcements: fetchedAnnouncements } = await getEventsAndAnnouncements();

  const sortedEvents = [...fetchedEvents].sort((a, b) => {
    return (b.order || 0) - (a.order || 0);
  });

  const liveEvents = sortedEvents.filter((e) => e.status === "Open");
  const otherEvents = sortedEvents.filter((e) => e.status !== "Open");

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

      {/* Content Section */}
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

          {/* Announcements Section */}
          {fetchedAnnouncements && fetchedAnnouncements.length > 0 && (
            <AnnouncementsScroll announcements={fetchedAnnouncements} />
          )}

          {/* All Events Section */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                {showLiveSection ? "Recent & Past Activities" : "All Events"}
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
      className={`bg-background rounded-xl overflow-hidden group flex flex-col h-full border border-border shadow-sm hover:shadow-xl transition-all duration-500 ${!isLive ? "opacity-95" : "border-primary/20 shadow-primary/5"}`}
    >
      <div className="aspect-[4/5] bg-muted relative overflow-hidden">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {event.status === "Open" && (
          <span className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Open</span>
          </span>
        )}
        {event.status === "Closed" && (
          <span className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-600 border border-rose-500/20 backdrop-blur-md shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />
            <span>Closed</span>
          </span>
        )}
        {event.status === "Completed" && (
          <span className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-500/10 text-slate-600 border border-slate-500/20 backdrop-blur-md shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
            <span>Completed</span>
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-heading font-bold text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        
        <div className="mt-auto space-y-6">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3 text-sm text-foreground/80">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <span className="font-body font-medium">
                {event.date}
                {event.time && ` • ${event.time}`}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-foreground/80">
              {event.mode === "Online" ? (
                <Monitor className="w-4 h-4 text-primary shrink-0" />
              ) : (
                <MapPin className="w-4 h-4 text-primary shrink-0" />
              )}
              <span className="font-body font-medium truncate block max-w-[280px]">
                {event.mode}
                {event.venue && ` • ${event.venue}`}
              </span>
            </div>
          </div>
          <Button 
            asChild 
            className={`w-full font-bold group/btn ${isLive ? "shadow-lg shadow-primary/20" : ""}`}
            variant={isLive ? "default" : "outline"}
          >
            <Link href={`/${event.id}`}>
              {event.status === "Open" ? "Register Now" : "Explore Details"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
