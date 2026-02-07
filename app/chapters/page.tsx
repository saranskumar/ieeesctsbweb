import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { chapters } from "@/lib/data/chapters";
import { Glass } from "@/components/ui/glass";

export default function ChaptersPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Our Societies & Chapters
            </h1>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              IEEE SCT Student Branch hosts multiple technical chapters and affinity groups,
              each focusing on specific domains of engineering, technology, and community development.
            </p>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="section-padding bg-card">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {chapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/${chapter.id}`}
                className="block group h-full"
              >
                <Glass
                  variant="subtle"
                  className="h-full flex-col hover:scale-105 transition-transform duration-300 !p-6 !items-stretch"
                  backgroundOpacity={0.2}
                >
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <div className="w-24 h-24 mb-4 flex-shrink-0 flex items-center justify-center">
                      {chapter.image ? (
                        <img
                          src={chapter.image}
                          alt={chapter.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                          <chapter.icon className="w-10 h-10 text-primary" />
                        </div>
                      )}
                    </div>
                    <h2 className="font-heading font-bold text-xl text-foreground text-center group-hover:text-primary transition-colors">
                      {chapter.name}
                    </h2>
                    <p className="text-sm text-muted-foreground font-body text-center mt-1">
                      {chapter.fullName}
                    </p>
                  </div>
                </Glass>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
