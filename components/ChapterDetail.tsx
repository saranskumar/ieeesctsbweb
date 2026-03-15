import { chapters } from "@/lib/data/chapters";
import { sbcTeams } from "@/lib/data/team";
import { resolveEntry } from "@/lib/data/members";
import { events } from "@/lib/data/events";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Calendar, MapPin, Monitor } from "lucide-react";
import Link from "next/link";

interface ChapterDetailProps {
    chapterId: string;
}

export default function ChapterDetail({ chapterId }: ChapterDetailProps) {
    const chapter = chapters.find((c) => c.id === chapterId);
    const chapterEvents = events.filter((e) => e.chapterId === chapterId || e.collaborators?.includes(chapterId));

    if (!chapter) {
        notFound();
    }

    return (
        <>
            {/* Hero */}
            <section className="py-12 bg-background border-b border-border">
                <div className="section-container">
                    <div className="mb-6 flex justify-start">
                        <Button variant="ghost" asChild className="group pl-0 hover:bg-transparent hover:text-primary transition-colors">
                            <Link href="/chapters">
                                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                Back to Chapters
                            </Link>
                        </Button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0 flex items-center justify-center">
                            {chapter.image ? (
                                <img
                                    src={chapter.image}
                                    alt={chapter.name}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="w-full h-full rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <chapter.icon className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
                                    {chapter.name}
                                </h1>
                                {chapter.members && (
                                    <span className="bg-primary/10 text-primary text-sm font-semibold px-3 py-1.5 rounded-full mt-1">
                                        {chapter.members} Members
                                    </span>
                                )}
                            </div>
                            <p className="text-xl md:text-2xl text-muted-foreground font-body">
                                {chapter.fullName}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding bg-card">
                <div className="section-container">
                    <div className="grid lg:grid-cols-3 gap-12">

                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-12">

                            {/* About */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-heading font-bold text-foreground">About</h2>
                                <p className="text-muted-foreground font-body leading-relaxed text-lg">
                                    {chapter.description}
                                </p>
                            </div>

                            {/* Mission & Vision */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-background p-6 rounded-lg border border-border">
                                    <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Mission</h3>
                                    <p className="text-muted-foreground font-body">
                                        {chapter.mission}
                                    </p>
                                </div>
                                <div className="bg-background p-6 rounded-lg border border-border">
                                    <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Vision</h3>
                                    <p className="text-muted-foreground font-body">
                                        {chapter.vision}
                                    </p>
                                </div>
                            </div>

                            {/* Activities */}
                            <div>
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Key Activities</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {chapter.activities?.map((activity, index) => (
                                        <div key={index} className="flex items-center p-4 bg-background rounded-lg border border-border">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                                                <Calendar className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="font-body text-foreground">{activity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar / CTA */}
                        <div className="lg:col-span-1">
                            <div className="bg-background rounded-xl p-6 border border-border sticky top-24">
                                <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                                    Get Involved
                                </h3>
                                <p className="text-muted-foreground font-body mb-6">
                                    Interested in joining the {chapter.fullName}? Connect with us to learn more about upcoming events and membership benefits.
                                </p>

                                <div className="space-y-4">
                                    <Button className="w-full gap-2" asChild>
                                        <Link href={`/contact?subject=Enquiry%20regarding%20${encodeURIComponent(chapter.name)}`}>
                                            <Mail className="w-4 h-4" />
                                            Contact {chapter.name}
                                        </Link>
                                    </Button>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Events Section */}
            {chapterEvents.length > 0 && (() => {
                const sortedChapterEvents = [...chapterEvents].sort((a, b) => (b.order || 0) - (a.order || 0));
                return (
                    <section className="section-padding bg-background border-t border-border">
                        <div className="section-container">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-heading font-bold text-foreground">
                                    Events & Activities
                                </h2>
                                <Link href="/events" className="text-sm text-primary font-secondary font-medium hover:underline underline-offset-4">
                                    View all →
                                </Link>
                            </div>

                            {/* Horizontal scroll container */}
                            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth" style={{scrollbarWidth: "none", msOverflowStyle: "none"}}>
                                {sortedChapterEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex-none w-64 snap-start bg-card rounded-xl overflow-hidden border border-border group hover:shadow-xl transition-all duration-500 flex flex-col"
                                    >
                                        {/* Poster — 4:5 ratio */}
                                        <div className="aspect-[4/5] bg-muted relative overflow-hidden">
                                            <img
                                                src={event.image || "/placeholder.svg"}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <span
                                                className={`absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                                    event.status === "Registration Open"
                                                        ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
                                                        : "bg-secondary/90 text-secondary-foreground backdrop-blur-sm"
                                                }`}
                                            >
                                                {event.status}
                                            </span>
                                        </div>

                                        {/* Info */}
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h3 className="text-base font-heading font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                                {event.title}
                                            </h3>
                                            <div className="mt-auto space-y-2">
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Calendar className="w-3.5 h-3.5 text-primary" />
                                                    <span className="font-body">{event.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    {event.mode === "Online" ? (
                                                        <Monitor className="w-3.5 h-3.5 text-primary" />
                                                    ) : (
                                                        <MapPin className="w-3.5 h-3.5 text-primary" />
                                                    )}
                                                    <span className="font-body">
                                                        {event.mode}{event.venue && ` • ${event.venue}`}
                                                    </span>
                                                </div>
                                                <Button asChild variant={event.status === "Registration Open" ? "default" : "outline"} size="sm" className="w-full font-secondary mt-1">
                                                    <Link href={`/${event.id}`}>
                                                        {event.status === "Registration Open" ? "Join Event" : "Explore Details"}
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })()}


            {/* Execom Section */}
            <section className="section-padding bg-background border-t border-border">
                <div className="section-container">
                    <h2 className="text-3xl font-heading font-bold text-foreground mb-12 text-center">
                        Chapter Execom
                    </h2>

                    {sbcTeams[chapterId] ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {sbcTeams[chapterId].map(resolveEntry).map((member, index) => (
                                <div
                                    key={index}
                                    className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all hover:-translate-y-1 group relative"
                                >
                                    <div className="aspect-square w-full bg-muted relative overflow-hidden">
                                        {member.image ? (
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-heading font-bold text-4xl">
                                                {member.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-heading font-bold text-xl text-foreground mb-1">
                                            <Link href={`/members/${member.id}`} className="after:absolute after:inset-0">
                                                {member.name}
                                            </Link>
                                        </h3>
                                        <p className="text-sm font-secondary text-primary mb-4 font-medium">
                                            {member.role}
                                        </p>

                                        <div className="flex gap-4 relative z-10">
                                            {member.email && (
                                                <a
                                                    href={`mailto:${member.email}`}
                                                    className="text-muted-foreground hover:text-primary transition-colors"
                                                    aria-label={`Email ${member.name}`}
                                                >
                                                    <Mail className="w-5 h-5" />
                                                </a>
                                            )}
                                            {member.linkedin && (
                                                <a
                                                    href={member.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-muted-foreground hover:text-primary transition-colors"
                                                    aria-label={`LinkedIn profile of ${member.name}`}
                                                >
                                                    <span className="sr-only">LinkedIn</span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="w-5 h-5"
                                                    >
                                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                                        <rect width="4" height="12" x="2" y="9" />
                                                        <circle cx="4" cy="4" r="2" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground">
                            <p>Execom details coming soon.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
