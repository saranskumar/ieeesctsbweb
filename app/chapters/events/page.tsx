import Link from "next/link";
import { Calendar, MapPin, Monitor, ArrowLeft, ArrowUpRight, Cpu, Users, Code, Zap, Wifi, Heart, Settings, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { chapters } from "@/lib/data/chapters";
import type { Metadata } from "next";

export const revalidate = 60; // Revalidate every minute

export const metadata: Metadata = {
  title: "SBC Chapter Events",
  description: "Browse events organized by our specialized IEEE Student Branch Chapters and Affinity Groups.",
};

interface MappedEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  mode: "Online" | "Offline" | "Hybrid";
  venue: string;
  status: "Open" | "Closed" | "Completed" | null;
  description: string;
  image: string;
  sbc_id?: string | null;
  chapterId?: string | null;
  collaborators?: string[] | null;
}

async function getSbcEvents(): Promise<MappedEvent[]> {
  try {
    const { data: dbEvents, error } = await supabase
      .from("events")
      .select("id, title, slug, event_date, status, main_poster_url, venue, description, sbc_id, collaborators")
      .order("event_date", { ascending: false });

    if (error || !dbEvents || dbEvents.length === 0) {
      if (error) console.warn("Supabase fetch error for SBC events:", error);
      return [];
    }

    return dbEvents.map((e: any) => {
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

      const chapterId = e.sbc_id || (e as any).chapterId || null;
      const collaborators = Array.isArray(e.collaborators) ? e.collaborators : [];

      const posterUrl = (e.main_poster_url && !e.main_poster_url.includes("kla4bkjx0zr1dvdghtnb"))
        ? (e.main_poster_url.includes("res.cloudinary.com") 
            ? e.main_poster_url.replace("/image/upload/", "/image/upload/f_auto,q_auto/") 
            : e.main_poster_url) 
        : "";

      return {
        id: e.slug,
        title: e.title,
        date: formattedDate || "TBA",
        time: formattedTime || "",
        mode: "Offline",
        venue: e.venue || "",
        status: statusVal,
        description: e.description || "",
        image: posterUrl,
        sbc_id: chapterId,
        chapterId: chapterId,
        collaborators: collaborators,
      };
    });
  } catch (err) {
    console.error("Exception fetching SBC events:", err);
    return [];
  }
}

export default async function SbcEventsPage() {
  const allEvents = await getSbcEvents();

  // Map icons for chapters lookup
  const chapterIconMap: Record<string, any> = {
    wie: Users,
    ras: Cpu,
    cs: Code,
    sight: Heart,
    ias: Settings,
    pes: Zap,
    comsoc: Wifi,
    embs: Activity
  };

  // Group events by chapter
  const chaptersWithEvents = chapters.map((chapter) => {
    const chapterEvents = allEvents.filter((event) => {
      const primaryMatch =
        event.sbc_id?.toLowerCase() === chapter.id.toLowerCase() ||
        event.chapterId?.toLowerCase() === chapter.id.toLowerCase();
      const collabMatch =
        (event.collaborators ?? []).some((c) => c.toLowerCase() === chapter.id.toLowerCase());
      return primaryMatch || collabMatch;
    });

    // Annotate each event with whether this chapter is only a collaborator
    const annotated = chapterEvents.map((ev) => ({
      ...ev,
      isCollab:
        ev.sbc_id?.toLowerCase() !== chapter.id.toLowerCase() &&
        ev.chapterId?.toLowerCase() !== chapter.id.toLowerCase() &&
        (ev.collaborators ?? []).some((c) => c.toLowerCase() === chapter.id.toLowerCase()),
    }));

    return {
      ...chapter,
      events: annotated,
      IconComponent: chapterIconMap[chapter.id] || Code,
    };
  });

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-background relative overflow-hidden border-b border-border">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="section-container relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <Link 
                  href="/chapters" 
                  className="text-xs font-bold font-secondary uppercase tracking-widest text-primary hover:underline flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Chapters
                </Link>
                <span className="text-muted-foreground">•</span>
                <span className="text-xs font-bold font-secondary uppercase tracking-widest text-muted-foreground">
                  Events Directory
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                Chapter Events
              </h1>
              <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-2xl">
                Browse and view technical sessions, hackathons, and workshops hosted by our specialized IEEE Student Branch Chapters and Affinity Groups.
              </p>
            </div>
            
            {/* Quick stats / info card */}
            <div className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-between max-w-xs w-full shadow-sm">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Chapters Active</span>
              <div className="text-4xl font-heading font-bold text-primary mb-4">{chapters.length}</div>
              <p className="text-xs text-muted-foreground leading-normal">
                Each chapter hosts specialized tracks, technical bootcamps, and professional networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters Navigation and Event Feed */}
      <section className="py-12 bg-card min-h-[60vh]">
        <div className="section-container">
          {/* Quick jump anchor menu */}
          <div className="mb-12">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Quick Jump to Chapter
            </h2>
            <div className="flex flex-wrap gap-2">
              {chaptersWithEvents.map((ch) => (
                <a
                  key={ch.id}
                  href={`#chapter-${ch.id}`}
                  className="px-4 py-2 text-xs font-medium font-secondary rounded-full bg-background border border-border text-foreground hover:border-primary hover:text-primary transition-all flex items-center gap-1.5"
                >
                  <ch.IconComponent className="w-3.5 h-3.5" />
                  {ch.name}
                  <span className="bg-secondary text-secondary-foreground rounded-full px-1.5 py-0.5 text-[10px]">
                    {ch.events.length}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Chapters Events List */}
          <div className="space-y-20">
            {chaptersWithEvents.map((ch) => {
              const openEvents = ch.events.filter(e => e.status === "Open");
              const closedEvents = ch.events.filter(e => e.status !== "Open");
              const sortedEvents = [...openEvents, ...closedEvents];

              return (
                <div 
                  key={ch.id} 
                  id={`chapter-${ch.id}`}
                  className="scroll-mt-24 border-t border-border pt-12 first:border-none first:pt-0"
                >
                  {/* Chapter Section Title */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                        <ch.IconComponent className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground flex items-center gap-2">
                          {ch.fullName}
                          <span className="text-sm font-semibold font-secondary bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                            {ch.name}
                          </span>
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1 font-body">
                          Active Chapter Roster: {ch.events.length} Total Events
                        </p>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" asChild className="font-secondary">
                      <Link href={`/${ch.id}`} className="flex items-center gap-1">
                        View Chapter Info
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>

                  {/* Chapter's Event Cards Grid */}
                  {sortedEvents.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {sortedEvents.map((event) => {
                        const isLive = event.status === "Open";
                        return (
                          <div
                            key={event.id}
                            className={`bg-background rounded-xl overflow-hidden group flex flex-col h-full border border-border shadow-sm hover:shadow-xl transition-all duration-500 ${!isLive ? "opacity-95" : "border-primary/20 shadow-primary/5"}`}
                          >
                            {/* Poster Image */}
                            <div className="aspect-[4/5] bg-muted relative overflow-hidden flex items-center justify-center">
                              {event.image && event.image.trim() !== "" && !event.image.includes("kla4bkjx0zr1dvdghtnb") && event.image !== "/placeholder.svg" ? (
                                <>
                                  <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </>
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 flex flex-col items-center justify-center p-6 text-center group-hover:scale-105 transition-transform duration-700">
                                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 text-primary shadow-inner">
                                    <Calendar className="w-7 h-7" />
                                  </div>
                                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 font-heading">IEEE SCT SB</span>
                                </div>
                              )}
                              {/* Collab badge */}
                              {(event as any).isCollab && (
                                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-700 border border-amber-400/30 backdrop-blur-md">
                                  Collab
                                </span>
                              )}
                              
                              {/* Pulse badging for statuses */}
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

                            {/* Details */}
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
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-background rounded-2xl border border-dashed border-border text-muted-foreground">
                      <p className="text-sm font-medium">No events scheduled for {ch.name} chapter yet.</p>
                      <p className="text-xs mt-1">Check back later for updates!</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
