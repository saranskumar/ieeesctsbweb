"use client";

import Link from "next/link";
import { Calendar, MapPin, Monitor, Users, Clock, ArrowLeft } from "lucide-react";
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

    return (
        <div className="min-h-screen bg-background">
            {/* Back Navigation */}
            <section className="py-4 border-b border-border sticky top-[72px] bg-background/80 backdrop-blur-md z-40">
                <div className="section-container">
                    <Button variant="ghost" asChild className="gap-2 hover:bg-muted font-secondary">
                        <Link href="/events">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Events
                        </Link>
                    </Button>
                </div>
            </section>

            <div className="section-container py-8">
                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Carousel/Images (Aspect Ratio 4:5) */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="rounded-xl overflow-hidden border border-border bg-card shadow-lg">
                            <Carousel className="w-full">
                                <CarouselContent>
                                    {images.map((img, index) => (
                                        <CarouselItem key={index}>
                                            <div className="aspect-[4/5] relative bg-muted flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={img}
                                                    alt={`${event.title} - Image ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                {images.length > 1 && (
                                    <>
                                        <CarouselPrevious className="left-2" />
                                        <CarouselNext className="right-2" />
                                    </>
                                )}
                            </Carousel>
                        </div>
                        {/* Status Badge mobile only */}
                        <div className="lg:hidden">
                            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-secondary rounded-full">
                                {event.status}
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="lg:col-span-7 space-y-8">
                        <div>
                            <div className="hidden lg:block mb-4">
                                <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-secondary rounded-full">
                                    {event.status}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
                                {event.title}
                            </h1>

                            {/* Key Details Grid */}
                            <div className="grid sm:grid-cols-2 gap-4 py-6 border-y border-border">
                                <div className="flex items-center gap-3 text-foreground">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase font-semibold">Date</p>
                                        <span className="font-body font-medium">{event.date}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-foreground">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase font-semibold">Time</p>
                                        <span className="font-body font-medium">{event.time}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-foreground sm:col-span-2">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        {event.mode === "Online" ? (
                                            <Monitor className="w-5 h-5" />
                                        ) : (
                                            <MapPin className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase font-semibold">Venue / Mode</p>
                                        <span className="font-body font-medium">
                                            {event.mode} {event.venue && `• ${event.venue}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-heading font-bold text-foreground mb-3">About the Event</h2>
                            <p className="text-muted-foreground font-body leading-relaxed text-lg">
                                {event.description}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {event.speakers && event.speakers.length > 0 && (
                                <div className="bg-card rounded-lg p-6 border border-border">
                                    <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                                        <Users className="w-5 h-5 text-primary" />
                                        Speakers
                                    </h3>
                                    <ul className="space-y-3">
                                        {event.speakers.map((speaker, index) => (
                                            <li key={index} className="text-foreground font-body text-sm flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                                {speaker}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="space-y-6">
                                {event.eligibility && (
                                    <div className="bg-card rounded-lg p-6 border border-border">
                                        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                                            Eligibility
                                        </h3>
                                        <p className="text-muted-foreground font-body text-sm">
                                            {event.eligibility}
                                        </p>
                                    </div>
                                )}

                                {event.rules && event.rules.length > 0 && (
                                    <div className="bg-card rounded-lg p-6 border border-border">
                                        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                                            Rules & Guidelines
                                        </h3>
                                        <ul className="space-y-2">
                                            {event.rules.map((rule, index) => (
                                                <li key={index} className="text-muted-foreground font-body text-sm flex items-start gap-2">
                                                    <span className="text-primary">•</span>
                                                    {rule}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CTA and Registration */}
                        {event.status === "Registration Open" && (
                            <div className="sticky bottom-4 z-30 bg-background/80 backdrop-blur-md p-4 rounded-xl border border-border shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-secondary text-muted-foreground font-medium">Don't miss out!</p>
                                    <p className="text-lg font-heading font-bold text-foreground">Register before passes run out.</p>
                                </div>
                                <Button asChild size="lg" className="w-full sm:w-auto font-secondary text-lg px-8 shadow-lg shadow-primary/20">
                                    <Link href={`/events/${event.id}/register`}>Register Now</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
