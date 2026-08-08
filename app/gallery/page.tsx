"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Fetch gallery from Supabase
  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data, error } = await supabase
          .from("gallery")
          .select("*")
          .order("display_order", { ascending: true });
        
        if (error) throw error;
        if (data) {
          // Map to match the existing interface properties
          setGalleryItems(data.map(item => ({
            id: item.id,
            title: item.title || "",
            description: item.description || "",
            image: item.image_url,
            category: item.category || "",
            date: item.event_date || "",
            order: item.display_order
          })));
        }
      } catch (err) {
        console.error("Error loading gallery:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  // Sort by order descending (newest first)
  const sorted = [...galleryItems].sort((a, b) => (b.order || 0) - (a.order || 0));

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % sorted.length);
    }
  }, [selectedIndex, sorted.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + sorted.length) % sorted.length);
    }
  }, [selectedIndex, sorted.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev, handleClose]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-background border-b border-border">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Gallery
            </h1>
            <p className="text-xl text-muted-foreground font-body leading-relaxed">
              Explore moments from our events, workshops, and activities throughout the years.
            </p>
          </div>
        </div>
      </section>

      {/* Flexible Gallery Grid (Masonry) */}
      <section className="section-padding bg-card">
        <div className="section-container">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {sorted.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedIndex(index)}
                className="group relative break-inside-avoid overflow-hidden rounded-xl bg-transparent transition-all duration-500 cursor-zoom-in shadow-sm hover:shadow-2xl"
              >
                {item.image && item.image.trim() !== "" && !item.image.includes("kla4bkjx0zr1dvdghtnb") && item.image !== "/placeholder.svg" ? (
                  <img
                    src={item.image}
                    alt={item.title || "Gallery Image"}
                    className="w-full h-auto block group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 flex flex-col items-center justify-center p-6 text-center group-hover:scale-105 transition-transform duration-700">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 font-heading">IEEE SCT SB</span>
                  </div>
                )}
                {/* Overlay - subtle hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.category && (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground mb-2">
                        {item.category}
                      </span>
                    )}
                    {item.title && (
                      <p className="text-white font-heading font-semibold text-sm leading-tight mb-1">
                        {item.title}
                      </p>
                    )}
                    {item.date && (
                      <p className="text-white/70 text-[10px] font-secondary">{item.date}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-all duration-300">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <X size={24} />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 md:left-8 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110 z-10"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 md:right-8 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110 z-10"
          >
            <ChevronRight size={32} />
          </button>

          {/* Image Container */}
          <div
            className="w-full h-full p-4 md:p-16 flex flex-col items-center justify-center"
            onClick={handleClose}
          >
            <div
              className="relative max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={sorted[selectedIndex].image}
                alt={sorted[selectedIndex].title || "Gallery Item"}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
              />
              
              {/* Info section in lightbox */}
              {(sorted[selectedIndex].title || sorted[selectedIndex].category) && (
                <div className="mt-4 text-center">
                  {sorted[selectedIndex].category && (
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground mb-2">
                      {sorted[selectedIndex].category}
                    </span>
                  )}
                  <h3 className="text-white font-heading font-semibold text-lg md:text-xl">
                    {sorted[selectedIndex].title}
                  </h3>
                  {sorted[selectedIndex].date && (
                    <p className="text-white/60 text-sm font-secondary mt-1">
                      {sorted[selectedIndex].date}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white/70 text-sm font-medium">
            {selectedIndex + 1} / {sorted.length}
          </div>
        </div>
      )}
    </>
  );
}
