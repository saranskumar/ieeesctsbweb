import { Trophy, Calendar, Award } from "lucide-react";
import { achievements } from "@/lib/data/achievements";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Achievements | IEEE SCT Student Branch",
    description: "Explore the awards and recognitions earned by IEEE SCT Student Branch over the years.",
};

export default function AchievementsPage() {
    // Sort achievements by year (descending)
    const sortedAchievements = [...achievements].sort((a, b) =>
        parseInt(b.year) - parseInt(a.year)
    );

    return (
        <>
            {/* Hero Section */}
            <section className="py-12 md:py-16 bg-background">
                <div className="section-container">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                            Our Achievements
                        </h1>
                        <p className="text-lg text-muted-foreground font-body leading-relaxed">
                            A testament to our dedication, hard work, and commitment to technical excellence.
                            Here are the milestones that mark our journey.
                        </p>
                    </div>
                </div>
            </section>

            {/* Achievements Grid */}
            <section className="section-padding bg-card">
                <div className="section-container">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedAchievements.map((achievement) => (
                            <div
                                key={achievement.id}
                                className="bg-background rounded-xl p-8 border border-border hover:border-primary/50 transition-all hover:-translate-y-1 group"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <Trophy className="w-6 h-6 text-primary group-hover:text-current" />
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 text-sm font-medium font-secondary">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {achievement.year}
                                    </span>
                                </div>

                                <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                    {achievement.title}
                                </h3>

                                <div className="flex items-center gap-2 text-sm text-primary font-medium mb-4">
                                    <Award className="w-4 h-4" />
                                    {achievement.level}
                                </div>

                                {achievement.description && (
                                    <p className="text-muted-foreground font-body leading-relaxed">
                                        {achievement.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
