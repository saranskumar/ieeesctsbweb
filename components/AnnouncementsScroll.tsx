"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Announcement {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  date: string;
}

interface AnnouncementsScrollProps {
  announcements: Announcement[];
}

export default function AnnouncementsScroll({ announcements }: AnnouncementsScrollProps) {
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
  }, [announcements]);

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
      {/* Header controls (above the scroll list) */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
            Announcements
          </h2>
          <p className="text-muted-foreground font-body">
            Latest updates, honors, and official news from IEEE SCT SB.
          </p>
        </div>
        
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
          {announcements.map((ann) => (
            <Link
              key={ann.id}
              href={`/${ann.id}`}
              className="flex-none w-[290px] sm:w-[320px] md:w-[360px] snap-start bg-background rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-500 flex flex-col group cursor-pointer"
            >
              <div className="aspect-[4/5] bg-muted relative overflow-hidden flex items-center justify-center">
                {ann.imageUrl && ann.imageUrl.trim() !== "" && !ann.imageUrl.includes("kla4bkjx0zr1dvdghtnb") && ann.imageUrl !== "/placeholder.svg" ? (
                  <img
                    src={ann.imageUrl}
                    alt={ann.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 flex flex-col items-center justify-center p-6 text-center group-hover:scale-105 transition-transform duration-700">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 text-primary shadow-inner">
                      <Megaphone className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 font-heading">Announcement</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-semibold text-primary mb-2 block font-secondary">
                  {ann.date}
                </span>
                <h3 className="text-lg font-heading font-bold text-foreground mb-3 line-clamp-2">
                  {ann.title}
                </h3>
                <p className="text-muted-foreground text-sm font-body line-clamp-4 leading-relaxed mb-4">
                  {ann.description}
                </p>
                <div className="mt-auto pt-4 flex items-center text-primary text-xs font-semibold uppercase tracking-wider group-hover:text-primary/80 transition-colors">
                  <span>Read More</span>
                  <svg className="ml-1.5 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
