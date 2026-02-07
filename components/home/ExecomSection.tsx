import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const execomMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Chairperson",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Vice Chairperson",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Secretary",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Treasurer",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "David Kumar",
    role: "Technical Lead",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Priya Sharma",
    role: "Webmaster",
    image: "/placeholder.svg",
  },
];

const ExecomSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
              Executive Committee
            </h2>
            <p className="text-muted-foreground font-body">
              Meet our 2025-26 leadership team
            </p>
          </div>
          <Button asChild variant="outline" className="font-secondary self-start sm:self-auto">
            <Link href="/team">
              View Full Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {execomMembers.map((member, index) => (
            <div
              key={member.id}
              className="text-center"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative mb-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary rounded-full">
                  <span className="text-xs font-secondary text-primary-foreground whitespace-nowrap">
                    {member.role}
                  </span>
                </div>
              </div>
              <h3 className="font-heading font-semibold text-foreground text-sm md:text-base mt-4">
                {member.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecomSection;
