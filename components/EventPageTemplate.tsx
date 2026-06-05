"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Calendar, MapPin, Monitor, Users, Clock, ArrowLeft, BookOpen, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Event } from "@/lib/data/events";

interface EventPageTemplateProps {
    event: Event;
}

export default function EventPageTemplate({ event }: EventPageTemplateProps) {
    const images = event.gallery && event.gallery.length > 0 ? [event.image, ...event.gallery] : [event.image];
    const activeGuidelines = event.guidelines?.filter((g) => g && g.trim() !== "") || [];
    const activeRules = event.rules?.filter((r) => r && r.trim() !== "") || [];

    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        try {
            const regs = JSON.parse(localStorage.getItem("sctsb_registrations") || "[]");
            const match = regs.some((r: any) => r.eventId === event.id);
            if (match) {
                setIsRegistered(true);
            }
        } catch (e) {
            console.error("Failed to read localStorage registrations:", e);
        }
    }, [event.id]);

    return (
        <div className="min-h-screen bg-background">
            <div className="section-container py-12 md:py-16">
                {/* Back Navigation */}
                <div className="mb-8 pl-1">
                    <Button variant="ghost" asChild className="gap-2 hover:bg-muted font-secondary text-muted-foreground hover:text-foreground pl-2">
                        <Link href="/events">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Events
                        </Link>
                    </Button>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Carousel/Images (Aspect Ratio 4:5) */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="rounded-2xl overflow-hidden bg-transparent">
                            <Carousel className="w-full">
                                <CarouselContent>
                                    {images.map((img, index) => (
                                        <CarouselItem key={index}>
                                            <div className="relative bg-transparent flex items-center justify-center w-full">
                                                <img
                                                    src={img || "/placeholder.svg"}
                                                    alt={`${event.title} - Image ${index + 1}`}
                                                    className="w-full h-auto rounded-3xl border border-border/70 shadow-md bg-card/10 object-contain"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                {images.length > 1 && (
                                    <>
                                        <CarouselPrevious className="left-4 bg-background/50 hover:bg-background/90 border-none text-foreground" />
                                        <CarouselNext className="right-4 bg-background/50 hover:bg-background/90 border-none text-foreground" />
                                    </>
                                )}
                            </Carousel>
                        </div>
                        {/* Status Badge mobile only */}
                        {!event.isAnnouncement && event.status && (
                            <div className="lg:hidden">
                                <span className={`inline-block px-4 py-1.5 text-sm font-secondary font-medium rounded-full ${
                                    event.status === "Registration Open" 
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : "badge-upcoming"
                                }`}>
                                    {event.status}
                                </span>
                            </div>
                        )}
                    </div>
 
                    {/* Right Column: Details */}
                    <div className="lg:col-span-7 flex flex-col pt-2 lg:pt-0">
                        {!event.isAnnouncement && event.status && (
                            <div className="hidden lg:block mb-6">
                                <span className={`inline-block px-4 py-1.5 text-sm font-secondary font-medium rounded-full ${
                                    event.status === "Registration Open" 
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : event.status === "Completed"
                                    ? "badge-completed"
                                    : "badge-upcoming"
                                }`}>
                                    {event.status}
                                </span>
                            </div>
                        )}
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-8 leading-tight">
                            {event.title}
                        </h1>
 
                        {/* Key Details Grid */}
                        <div className="grid sm:grid-cols-2 gap-6 py-8 border-y border-border mb-8 bg-card/50 px-6 rounded-t-2xl">
                            {/* Date */}
                            <div className="flex items-center gap-4 text-foreground">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Date</p>
                                    <span className="font-body font-medium text-lg">{event.date}</span>
                                </div>
                            </div>

                            {/* Time (for events only) */}
                            {!event.isAnnouncement && event.time && (
                                <div className="flex items-center gap-4 text-foreground">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Time</p>
                                        <span className="font-body font-medium text-lg">{event.time}</span>
                                    </div>
                                </div>
                            )}

                            {/* Venue / Mode (for events only) */}
                            {!event.isAnnouncement && event.mode && (
                                <div className="flex items-center gap-4 text-foreground pt-2 sm:pt-4 border-t border-border/50 sm:border-none sm:pt-0">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                        {event.mode === "Online" ? (
                                            <Monitor className="w-5 h-5" />
                                        ) : (
                                            <MapPin className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Venue / Mode</p>
                                        <span className="font-body font-medium text-lg">
                                            {event.mode} {event.venue && <span className="text-muted-foreground ml-1">• {event.venue}</span>}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Status (for events only) */}
                            {!event.isAnnouncement && event.status && (
                                <div className="flex items-center gap-4 text-foreground pt-2 sm:pt-4 border-t border-border/50 sm:border-none sm:pt-0">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                                        event.status === "Registration Open" 
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                        : event.status === "Completed"
                                        ? "bg-muted text-muted-foreground"
                                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                    }`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Status</p>
                                        <span className="font-body font-medium text-lg">{event.status}</span>
                                    </div>
                                </div>
                            )}
                        </div>
 
                        {/* CTA / Action Button directly below grid (for events only) */}
                        {!event.isAnnouncement && event.status && (
                            <div className="mb-12 space-y-4">
                                {isRegistered && (
                                    <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-start space-x-3 shadow-sm animate-in fade-in duration-300">
                                        <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0 mt-1 animate-pulse" />
                                        <div className="text-xs font-semibold leading-relaxed">
                                            You are registered for this event! Your verification audit is active and ticket details will be dispatched to your email inbox upon approval.
                                        </div>
                                    </div>
                                )}

                                {isRegistered ? (
                                    <Button disabled variant="outline" size="lg" className="w-full sm:w-auto font-secondary text-lg px-12 py-6 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 opacity-100 cursor-not-allowed select-none">
                                        ✓ Already Registered
                                    </Button>
                                ) : (
                                    event.status === "Registration Open" && (
                                        <Button asChild size="lg" className="w-full sm:w-auto font-secondary text-lg px-12 py-6 shadow-lg shadow-primary/20">
                                            <Link href={`/${event.id}/register`}>Register Now</Link>
                                        </Button>
                                    )
                                )}
                                
                                {event.status === "Completed" && (
                                    <Button disabled variant="outline" size="lg" className="w-full sm:w-auto font-secondary text-lg px-12 py-6 opacity-70">
                                        Event Concluded
                                    </Button>
                                )}
                            </div>
                        )}

                        {/* Custom Redirect buttons for Events and Announcements */}
                        {event.redirectLinks && event.redirectLinks.length > 0 && (
                            <div className="mb-12 flex flex-wrap gap-4">
                                {event.redirectLinks.map((link, index) => (
                                    <Button key={index} asChild size="lg" className="w-full sm:w-auto font-secondary text-lg px-8 py-6 shadow-md shadow-primary/10">
                                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                                            {link.label}
                                        </a>
                                    </Button>
                                ))}
                            </div>
                        )}
 
                    </div>
                </div>

                {/* Additional Details (About, Speakers, Eligibility, Rules) */}
                <div className="mt-16 lg:max-w-4xl mx-auto space-y-12">
                    <div className="mb-12">
                        <h2 className="text-3xl font-heading font-bold text-foreground mb-6">About the Event</h2>
                        <p className="text-muted-foreground font-body leading-relaxed text-lg whitespace-pre-line">
                            {event.description}
                        </p>
                    </div>

                    <div className="space-y-12 mb-12">
                        {event.speakers && event.speakers.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-6 flex items-center gap-3">
                                    <Users className="w-6 h-6 text-primary" />
                                    Speakers
                                </h2>
                                <ul className="space-y-4 list-none m-0 p-0 text-lg text-muted-foreground font-body">
                                    {event.speakers.map((speaker, index) => (
                                        <li key={index} className="flex items-center gap-4">
                                            <span className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0"></span>
                                            {speaker}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {event.eligibility && (
                            <div>
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                                    Eligibility
                                </h2>
                                <p className="text-lg text-muted-foreground font-body leading-relaxed">
                                    {event.eligibility}
                                </p>
                            </div>
                        )}

                        {activeGuidelines.length > 0 && (
                            <div className="bg-card/30 border border-border/80 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    Guidelines
                                </h2>
                                <ul className="space-y-4 list-none m-0 p-0 text-muted-foreground font-body">
                                    {activeGuidelines.map((guideline, index) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold mt-0.5">
                                                {index + 1}
                                            </span>
                                            <span className="leading-relaxed text-foreground/90 text-base md:text-lg">{guideline}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {activeRules.length > 0 && (
                            <div className="bg-card/30 border border-border/80 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    Rules
                                </h2>
                                <ul className="space-y-4 list-none m-0 p-0 text-muted-foreground font-body">
                                    {activeRules.map((rule, index) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2.5"></span>
                                            <span className="leading-relaxed text-foreground/90 text-base md:text-lg">{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
