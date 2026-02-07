import { events } from "@/lib/data/events";
import { notFound } from "next/navigation";
import EventPageTemplate from "@/components/EventPageTemplate";

export default async function EventDetailPage({ params }: { params: Promise<{ eventId: string }> }) {
    const { eventId } = await params;
    const event = events.find((e) => e.id === eventId);

    if (!event) {
        notFound();
    }

    return <EventPageTemplate event={event} />;
}
