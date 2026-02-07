import Link from "next/link";
import { Calendar, MapPin, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

const upcomingEvents = [
  {
    id: 1,
    title: "TechTalk: AI in Healthcare",
    date: "March 15, 2026",
    mode: "Online",
    status: "Registration Open",
    description: "Explore the transformative impact of artificial intelligence in modern healthcare systems.",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Workshop: IoT Fundamentals",
    date: "March 22, 2026",
    mode: "Offline",
    venue: "Main Auditorium",
    status: "Upcoming",
    description: "Hands-on workshop covering the basics of Internet of Things and sensor integration.",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Hackathon 2026",
    date: "April 5-6, 2026",
    mode: "Hybrid",
    venue: "Innovation Lab",
    status: "Registration Open",
    description: "Annual 24-hour coding marathon with exciting prizes and industry mentorship.",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Career Guidance Session",
    date: "April 15, 2026",
    mode: "Online",
    status: "Upcoming",
    description: "Industry experts share insights on career opportunities in technology.",
    image: "/placeholder.svg",
  },
];

export default function EventsPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Events
            </h1>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              Join us for exciting technical events, workshops, and networking opportunities
              throughout the year.
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="section-padding bg-card">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-background rounded-lg overflow-hidden group">
                <div className="aspect-[4/5] bg-muted overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-secondary mb-3 ${event.status === "Registration Open"
                      ? "badge-upcoming"
                      : "badge-completed"
                      }`}
                  >
                    {event.status}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm mb-4">
                    {event.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-body">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      {event.mode === "Online" ? (
                        <Monitor className="w-4 h-4 text-primary" />
                      ) : (
                        <MapPin className="w-4 h-4 text-primary" />
                      )}
                      <span className="font-body">
                        {event.mode}
                        {event.venue && ` • ${event.venue}`}
                      </span>
                    </div>
                  </div>
                  <Button asChild className="w-full font-secondary">
                    <Link href={`/events/${event.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
