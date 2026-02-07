import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-secondary text-muted-foreground">
                Advancing Technology for Humanity
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 text-balance">
              IEEE SCT Student Branch
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-10 leading-relaxed">
              Empowering future engineers and technologists through innovation, 
              collaboration, and professional development since 2008.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-secondary">
                <Link href="/events">
                  Explore Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-secondary">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Info Cards */}
          <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="card-ieee">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                About IEEE
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                The Institute of Electrical and Electronics Engineers (IEEE) is the world's 
                largest technical professional organization dedicated to advancing technology 
                for the benefit of humanity.
              </p>
            </div>
            <div className="card-ieee">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                About IEEE SCT SB
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Established in 2008, IEEE SCT Student Branch has been fostering technical 
                excellence and professional growth among students at SCT College of Engineering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
