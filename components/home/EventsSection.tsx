import { supabase } from "@/lib/supabase";
import { events as staticEvents, Event } from "@/lib/data/events";
import EventsScroll from "@/components/EventsScroll";
import AnnouncementsScroll from "@/components/AnnouncementsScroll";

async function getHomeEvents(): Promise<Event[]> {
  try {
    const { data: dbEvents, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: false })
      .limit(20);

    if (error || !dbEvents || dbEvents.length === 0) {
      return staticEvents.slice(0, 10);
    }

    return dbEvents.map((e: any) => {
      const statusVal = (e.status === "open" ? "Open" : e.status === "closed" ? "Closed" : "Completed") as "Open" | "Closed" | "Completed";
      
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

      return {
        id: e.slug,
        title: e.title,
        date: formattedDate || "TBA",
        time: formattedTime,
        mode: "Offline" as const,
        venue: e.venue || "",
        status: statusVal,
        description: e.description,
        image: e.main_poster_url 
          ? (e.main_poster_url.includes("res.cloudinary.com") 
              ? e.main_poster_url.replace("/image/upload/", "/image/upload/f_auto,q_auto/") 
              : e.main_poster_url) 
          : "https://res.cloudinary.com/djsime0yn/image/upload/f_auto,q_auto/v1779484601/kla4bkjx0zr1dvdghtnb.jpg",
        order: e.order || 0,
      };
    });
  } catch (err) {
    console.error("Error fetching home events from Supabase:", err);
    return staticEvents.slice(0, 10);
  }
}

async function getHomeAnnouncements() {
  try {
    const { data: dbAnnouncements, error } = await supabase
      .from("announcements")
      .select("*")
      .order("announcement_date", { ascending: false })
      .limit(20);

    if (error || !dbAnnouncements || dbAnnouncements.length === 0) {
      return [];
    }

    return dbAnnouncements.map((a: any) => {
      let formattedDate = "";
      if (a.announcement_date) {
        const d = new Date(a.announcement_date);
        formattedDate = d.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      }
      return {
        id: a.slug,
        title: a.title,
        description: a.description,
        imageUrl: a.image_url 
          ? (a.image_url.includes("res.cloudinary.com") 
              ? a.image_url.replace("/image/upload/", "/image/upload/f_auto,q_auto/") 
              : a.image_url) 
             : "https://res.cloudinary.com/djsime0yn/image/upload/f_auto,q_auto/v1779484601/kla4bkjx0zr1dvdghtnb.jpg",
        date: formattedDate || "TBA",
      };
    });
  } catch (err) {
    console.error("Error fetching home announcements from Supabase:", err);
    return [];
  }
}

const EventsSection = async () => {
  const [sortedEvents, announcements] = await Promise.all([
    getHomeEvents(),
    getHomeAnnouncements(),
  ]);

  return (
    <section className="section-padding bg-card">
      <div className="section-container space-y-20">
        
        {/* Events Row */}
        {sortedEvents.length > 0 && (
          <EventsScroll events={sortedEvents} />
        )}

        {/* Announcements Row */}
        {announcements.length > 0 && (
          <AnnouncementsScroll announcements={announcements} />
        )}

      </div>
    </section>
  );
};

export default EventsSection;
