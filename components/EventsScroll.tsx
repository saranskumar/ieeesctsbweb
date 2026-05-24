"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Monitor, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Event } from "@/lib/data/events";

interface EventsScrollProps {
  events: Event[];
}

export default function EventsScroll({ events }: EventsScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      checkScroll();
      window.addEventListener("resize", checkScroll, { passive: true });
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [events]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.75;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group/scroll">
      {/* Header controls */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            Events
          </h2>
          <p className="text-muted-foreground font-body">
            Join our latest workshops, talks, and competitions
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm" className="font-secondary hidden sm:inline-flex">
            <Link href="/events">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          {/* Navigation buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border-border hover:bg-muted/80 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border-border hover:bg-muted/80 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </Button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll container wrapper for touch indicator buttons */}
      <div className="relative">
        {/* Left Floating button for desktop hover */}
        {canScrollLeft && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:block opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-300">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll("left")}
              className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md shadow-lg border-border hover:bg-background transition-all hover:scale-110 active:scale-90"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </Button>
          </div>
        )}

        {/* Right Floating button for desktop hover */}
        {canScrollRight && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:block opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-300">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll("right")}
              className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md shadow-lg border-border hover:bg-background transition-all hover:scale-110 active:scale-90"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </Button>
          </div>
        )}

        {/* The scrollable feed */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:-mx-8 sm:px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="flex-none w-[290px] sm:w-[320px] md:w-[360px] snap-start bg-background rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-500 flex flex-col group"
            >
              {/* Poster Image */}
              <div className="aspect-[4/5] bg-muted relative overflow-hidden">
                <img
                  src={event.image || "https://res.cloudinary.com/djsime0yn/image/upload/v1779484601/kla4bkjx0zr1dvdghtnb.jpg"}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md ${
                  event.status === "Registration Open"
                    ? "bg-green-500 text-white shadow-green-500/20"
                    : "bg-secondary/90 text-secondary-foreground backdrop-blur-sm"
                }`}>
                  {event.status}
                </span>
              </div>

              {/* Info Body */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-heading font-bold text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {event.title}
                </h3>
                <div className="space-y-2 mb-4 flex-grow">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-body">
                      {event.date}
                      {event.time && ` • ${event.time}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {event.mode === "Online" ? (
                      <Monitor className="w-4 h-4 text-primary flex-shrink-0" />
                    ) : (
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    )}
                    <span className="font-body">
                      {event.mode} {event.venue ? `• ${event.venue}` : ""}
                    </span>
                  </div>
                </div>
                <Button asChild className="w-full font-secondary mt-auto" size="sm" variant={event.status === "Registration Open" ? "default" : "outline"}>
                  <Link href={`/${event.id}`}>
                    {event.status === "Registration Open" ? "Register Now" : "View Details"}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile view all button */}
      <div className="mt-4 sm:hidden flex justify-center">
        <Button asChild variant="outline" className="w-full font-secondary">
          <Link href="/events">
            View All Events
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
