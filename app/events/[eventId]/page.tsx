"use client";

import Link from "next/link";
import { Calendar, MapPin, Monitor, Users, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

const allEvents = [
    {
        id: 1,
        title: "TechTalk: AI in Healthcare",
        date: "March 15, 2026",
        time: "3:00 PM - 5:00 PM",
        mode: "Online",
        status: "Registration Open",
        description: "Explore the transformative impact of artificial intelligence in modern healthcare systems. This session will cover machine learning applications in diagnostics, patient care optimization, and the future of AI-driven medical research.",
        image: "/placeholder.svg",
        speakers: ["Dr. Sarah Chen - AI Research Lead", "Prof. Michael Roberts - Healthcare Innovation"],
        eligibility: "Open to all IEEE members and students",
        rules: ["Registration required", "Certificate will be provided", "Q&A session at the end"],
    },
    {
        id: 2,
        title: "Workshop: IoT Fundamentals",
        date: "March 22, 2026",
        time: "10:00 AM - 4:00 PM",
        mode: "Offline",
        venue: "Main Auditorium",
        status: "Upcoming",
        description: "Hands-on workshop covering the basics of Internet of Things and sensor integration. Learn to build IoT projects from scratch with Arduino and Raspberry Pi.",
        image: "/placeholder.svg",
        speakers: ["Eng. David Park - IoT Specialist"],
        eligibility: "Basic programming knowledge required",
        rules: ["Bring your own laptop", "Materials will be provided", "Limited seats available"],
    },
    {
        id: 3,
        title: "Hackathon 2026",
        date: "April 5-6, 2026",
        time: "24 Hours",
        mode: "Hybrid",
        venue: "Innovation Lab",
        status: "Registration Open",
        description: "Annual 24-hour coding marathon with exciting prizes and industry mentorship. Build innovative solutions to real-world problems.",
        image: "/placeholder.svg",
        speakers: ["Industry Mentors from Top Tech Companies"],
        eligibility: "Teams of 2-4 members",
        rules: ["Original work only", "Use of AI tools allowed", "Judging based on innovation and execution"],
    },
    {
        id: 4,
        title: "Career Guidance Session",
        date: "April 15, 2026",
        time: "2:00 PM - 4:00 PM",
        mode: "Online",
        status: "Upcoming",
        description: "Industry experts share insights on career opportunities in technology. Get advice on resume building, interview preparation, and industry trends.",
        image: "/placeholder.svg",
        speakers: ["HR Leaders from Leading Tech Companies"],
        eligibility: "Open to all students",
        rules: ["Interactive session", "Networking opportunity"],
    },
];

export default function EventDetailPage({ params }: { params: { eventId: string } }) {
    const event = allEvents.find((e) => e.id === Number(params.eventId));

    if (!event) {
        notFound();
    }

    return (
        <>
            {/* Back Navigation */}
            <section className="py-4 bg-background">
                <div className="section-container">
                    <Button variant="ghost" asChild className="gap-2">
                        <Link href="/events">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Events
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Hero */}
            <section className="section-padding bg-background pt-0">
                <div className="section-container">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Event Image */}
                        <div className="aspect-video bg-card rounded-lg overflow-hidden">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Event Info */}
                        <div>
                            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-secondary rounded-full mb-4">
                                {event.status}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                                {event.title}
                            </h1>
                            <p className="text-muted-foreground font-body mb-6">
                                {event.description}
                            </p>

                            {/* Event Details */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-foreground">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    <span className="font-body">{event.date}</span>
                                </div>
                                <div className="flex items-center gap-3 text-foreground">
                                    <Clock className="w-5 h-5 text-primary" />
                                    <span className="font-body">{event.time}</span>
                                </div>
                                <div className="flex items-center gap-3 text-foreground">
                                    {event.mode === "Online" ? (
                                        <Monitor className="w-5 h-5 text-primary" />
                                    ) : (
                                        <MapPin className="w-5 h-5 text-primary" />
                                    )}
                                    <span className="font-body">
                                        {event.mode}
                                        {event.venue && ` • ${event.venue}`}
                                    </span>
                                </div>
                            </div>

                            {/* Register Button */}
                            {event.status === "Registration Open" && (
                                <Button asChild size="lg" className="w-full sm:w-auto font-secondary">
                                    <Link href={`/events/${event.id}/register`}>Register Now</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Info */}
            <section className="section-padding bg-card">
                <div className="section-container">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Speakers */}
                        <div className="bg-background rounded-lg p-6">
                            <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                                <Users className="w-5 h-5 text-primary" />
                                Speakers
                            </h3>
                            <ul className="space-y-2">
                                {event.speakers?.map((speaker, index) => (
                                    <li key={index} className="text-muted-foreground font-body text-sm">
                                        {speaker}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Eligibility */}
                        <div className="bg-background rounded-lg p-6">
                            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                                Eligibility
                            </h3>
                            <p className="text-muted-foreground font-body text-sm">
                                {event.eligibility}
                            </p>
                        </div>

                        {/* Rules */}
                        <div className="bg-background rounded-lg p-6">
                            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                                Rules & Guidelines
                            </h3>
                            <ul className="space-y-2">
                                {event.rules?.map((rule, index) => (
                                    <li key={index} className="text-muted-foreground font-body text-sm flex items-start gap-2">
                                        <span className="text-primary">•</span>
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
