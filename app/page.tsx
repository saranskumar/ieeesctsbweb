import HeroSection from "@/components/home/HeroSection";
import EventsSection from "@/components/home/EventsSection";
import AchievementsSection from "@/components/home/AchievementsSection";
import ExecomSection from "@/components/home/ExecomSection";
import ChaptersSection from "@/components/home/ChaptersSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | IEEE SCT Student Branch",
  description: "Welcome to IEEE SCT Student Branch. Explore our chapters, events, and achievements at SCT College of Engineering.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EventsSection />
      <AchievementsSection />
      <ExecomSection />
      <ChaptersSection />
    </>
  );
}
