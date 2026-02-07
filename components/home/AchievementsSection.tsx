import { Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const achievements = [
  {
    id: 1,
    title: "Best Student Branch Award",
    year: "2025",
    level: "Kerala Section",
  },
  {
    id: 2,
    title: "Outstanding Technical Activity",
    year: "2024",
    level: "National Level",
  },
  {
    id: 3,
    title: "Membership Growth Excellence",
    year: "2024",
    level: "Region 10",
  },
  {
    id: 4,
    title: "Best Project Award",
    year: "2023",
    level: "All India Level",
  },
];

const AchievementsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
              Achievements
            </h2>
            <p className="text-muted-foreground font-body">
              Recognitions that inspire us to excel
            </p>
          </div>
          <Button asChild variant="outline" className="font-secondary self-start sm:self-auto">
            <Link href="/achievements">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="card-ieee text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-2">
                {achievement.title}
              </h3>
              <p className="text-2xl font-heading font-bold text-primary mb-1">
                {achievement.year}
              </p>
              <p className="text-sm text-muted-foreground font-body">
                {achievement.level}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
