import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { chapters } from "@/lib/data/chapters";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getEventsByChapter(): Promise<Record<string, any[]>> {
    const { data, error } = await supabase
        .from("events")
        .select("id, title, slug, event_date, status, main_poster_url, venue, sbc_id, collaborators")
        .neq("status", "draft")
        .order("event_date", { ascending: false });

    if (error || !data) return {};

    const grouped: Record<string, any[]> = {};

    for (const ev of data) {
        // Primary SBC
        if (ev.sbc_id) {
            if (!grouped[ev.sbc_id]) grouped[ev.sbc_id] = [];
            grouped[ev.sbc_id].push(ev);
        }
        // Collaborating SBCs
        if (Array.isArray(ev.collaborators)) {
            for (const collabId of ev.collaborators) {
                if (collabId === ev.sbc_id) continue;
                if (!grouped[collabId]) grouped[collabId] = [];
                grouped[collabId].push({ ...ev, isCollab: true });
            }
        }
    }

    return grouped;
}

function formatDate(iso: string) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function posterUrl(raw: string | null) {
    if (!raw) return null;
    if (raw.includes("res.cloudinary.com"))
        return raw.replace("/image/upload/", "/image/upload/f_auto,q_auto,w_600/");
    return raw;
}

export default async function ChaptersPage() {
    const eventsByChapter = await getEventsByChapter();

    return (
        <>
            {/* Hero */}
            <section className="section-padding bg-background">
                <div className="section-container">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                            Our Societies &amp; Chapters
                        </h1>
                        <p className="text-lg text-muted-foreground font-body leading-relaxed mb-8">
                            IEEE SCT Student Branch hosts multiple technical chapters and affinity groups,
                            each focusing on specific domains of engineering, technology, and community development.
                        </p>
                        <Button asChild className="font-secondary rounded-full px-6 py-5 shadow-lg shadow-primary/10">
                            <Link href="/chapters/events" className="flex items-center gap-2">
                                All Chapter Events
                                <ArrowRight className="w-4 h-4 text-primary-foreground" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Chapters with their events */}
            <section className="section-padding bg-card">
                <div className="section-container space-y-20">
                    {chapters.map((chapter) => {
                        const events = eventsByChapter[chapter.id] ?? [];
                        const openEvents = events.filter((e) => e.status === "open");
                        const otherEvents = events.filter((e) => e.status !== "open");
                        const sorted = [...openEvents, ...otherEvents];

                        return (
                            <div key={chapter.id} id={chapter.id} className="scroll-mt-24">
                                {/* Chapter header */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-border">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            {chapter.image ? (
                                                <img
                                                    src={chapter.image}
                                                    alt={chapter.name}
                                                    className="w-10 h-10 object-contain"
                                                />
                                            ) : (
                                                <chapter.icon className="w-7 h-7 text-primary" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h2 className="text-2xl font-heading font-bold text-foreground">
                                                    {chapter.name}
                                                </h2>
                                                <span className="text-xs font-semibold font-secondary bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                                                    {events.length} event{events.length !== 1 ? "s" : ""}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground font-body">{chapter.fullName}</p>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/${chapter.id}`}
                                        className="text-sm font-secondary text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors self-start md:self-auto"
                                    >
                                        About {chapter.name} →
                                    </Link>
                                </div>

                                {/* Events grid */}
                                {sorted.length > 0 ? (
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {sorted.map((ev) => {
                                            const imgSrc = posterUrl(ev.main_poster_url);
                                            const isOpen = ev.status === "open";
                                            return (
                                                <Link
                                                    key={ev.id}
                                                    href={`/${ev.slug}`}
                                                    className="group bg-background rounded-xl border border-border overflow-hidden flex flex-col hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                                                >
                                                    {/* Poster */}
                                                    {imgSrc && (
                                                        <div className="aspect-[3/2] overflow-hidden bg-muted relative">
                                                            <img
                                                                src={imgSrc}
                                                                alt={ev.title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                            {/* Status badge */}
                                                            <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${
                                                                isOpen
                                                                    ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/25"
                                                                    : ev.status === "closed"
                                                                    ? "bg-rose-500/15 text-rose-600 border border-rose-500/25"
                                                                    : "bg-slate-500/15 text-slate-500 border border-slate-500/25"
                                                            }`}>
                                                                {isOpen ? "● Open" : ev.status === "closed" ? "Closed" : "Completed"}
                                                            </span>
                                                            {ev.isCollab && (
                                                                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-700 border border-amber-400/30 backdrop-blur-sm">
                                                                    Collab
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Details */}
                                                    <div className="p-4 flex flex-col flex-grow gap-3">
                                                        {/* Status badge when no image */}
                                                        {!imgSrc && (
                                                            <div className="flex items-center gap-2">
                                                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                                    isOpen
                                                                        ? "bg-emerald-500/10 text-emerald-600"
                                                                        : "bg-muted text-muted-foreground"
                                                                }`}>
                                                                    {isOpen ? "● Open" : ev.status === "closed" ? "Closed" : "Completed"}
                                                                </span>
                                                                {ev.isCollab && (
                                                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700">
                                                                        Collab
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}
                                                        <h3 className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                                            {ev.title}
                                                        </h3>
                                                        <div className="mt-auto space-y-1.5 text-xs text-muted-foreground">
                                                            {ev.event_date && (
                                                                <div className="flex items-center gap-1.5">
                                                                    <Calendar className="w-3.5 h-3.5 shrink-0 text-primary" />
                                                                    <span>{formatDate(ev.event_date)}</span>
                                                                </div>
                                                            )}
                                                            {ev.venue && (
                                                                <div className="flex items-center gap-1.5">
                                                                    <MapPin className="w-3.5 h-3.5 shrink-0 text-primary" />
                                                                    <span className="truncate">{ev.venue}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground font-body italic">
                                        No events listed yet for {chapter.name}.
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
