import { supabase } from "@/lib/supabase";
import { events as staticEvents } from "@/lib/data/events";
import { notFound } from "next/navigation";
import EventPageTemplate from "@/components/EventPageTemplate";

export const revalidate = 60; // Revalidate every minute

export default async function EventDetailPage({ params }: { params: Promise<{ eventId: string }> }) {
    const { eventId } = await params;
    
    let event = null;
    try {
        const { data, error } = await supabase
            .from("events")
            .select("*")
            .eq("slug", eventId)
            .maybeSingle();
            
        if (data && !error) {
            const statusVal = data.status === "published" ? "Registration Open" : "Completed";
            let formattedDate = "";
            let formattedTime = "";
            if (data.event_date) {
                const d = new Date(data.event_date);
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
            
            event = {
                id: data.slug,
                title: data.title,
                date: formattedDate || "TBA",
                time: formattedTime,
                mode: "Offline" as const,
                venue: data.venue || "",
                status: statusVal,
                description: data.description,
                image: data.main_poster_url 
                  ? (data.main_poster_url.includes("res.cloudinary.com") 
                      ? data.main_poster_url.replace("/image/upload/", "/image/upload/f_auto,q_auto/") 
                      : data.main_poster_url) 
                  : "https://res.cloudinary.com/djsime0yn/image/upload/f_auto,q_auto/v1779484601/kla4bkjx0zr1dvdghtnb.jpg",
                order: 0,
                redirectLinks: data.redirect_links || [],
                guidelines: data.guidelines || [],
                rules: data.rules || [],
            };
        }

        if (!event) {
            const { data: annData, error: annError } = await supabase
                .from("announcements")
                .select("*")
                .eq("slug", eventId)
                .eq("is_published", true)
                .maybeSingle();

            if (annData && !annError) {
                let formattedDate = "";
                if (annData.announcement_date) {
                    const d = new Date(annData.announcement_date);
                    formattedDate = d.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    });
                }
                event = {
                    id: annData.slug,
                    title: annData.title,
                    date: formattedDate || "TBA",
                    time: "",
                    mode: "Offline" as const,
                    venue: "",
                    status: null,
                    description: annData.description,
                    image: annData.image_url 
                      ? (annData.image_url.includes("res.cloudinary.com") 
                          ? annData.image_url.replace("/image/upload/", "/image/upload/f_auto,q_auto/") 
                          : annData.image_url) 
                      : "https://res.cloudinary.com/djsime0yn/image/upload/f_auto,q_auto/v1779484601/kla4bkjx0zr1dvdghtnb.jpg",
                    order: 0,
                    isAnnouncement: true,
                    redirectLinks: annData.redirect_links || [],
                    guidelines: annData.guidelines || [],
                    rules: annData.rules || [],
                };
            }
        }
    } catch (err) {
        console.error("Error fetching single event/announcement from Supabase:", err);
    }
    
    // Fallback to static if db query didn't find it
    if (!event) {
        event = staticEvents.find((e) => e.id === eventId);
    }

    if (!event) {
        notFound();
    }

    // @ts-ignore
    return <EventPageTemplate event={event} />;
}
