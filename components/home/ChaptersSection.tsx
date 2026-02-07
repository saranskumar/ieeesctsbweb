import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { chapters } from "@/lib/data/chapters";

const ChaptersSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Student Branch Chapters
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Specialized communities driving innovation in their respective domains
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chapters.map((chapter, index) => (
            <Link
              key={chapter.id}
              href={`/${chapter.id}`}
              className="card-ieee group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 mb-4 flex items-center justify-center transition-transform hover:scale-110">
                {chapter.image ? (
                  <img
                    src={chapter.image}
                    alt={chapter.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full rounded-lg bg-primary/10 flex items-center justify-center">
                    <chapter.icon className="w-7 h-7 text-primary" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-heading font-bold text-xl text-primary">
                  {chapter.name}
                </h3>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
              <p className="text-sm font-secondary text-foreground mb-2">
                {chapter.fullName}
              </p>
              <p className="text-sm text-muted-foreground font-body line-clamp-2">
                {chapter.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="outline" className="font-secondary">
            <Link href="/chapters">
              Explore All Chapters
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChaptersSection;
