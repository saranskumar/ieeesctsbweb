import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

async function getHomeExecom() {
  try {
    const { data: activeYear } = await supabase
      .from("team_years")
      .select("id, year")
      .eq("is_active", true)
      .maybeSingle();

    if (!activeYear) return [];

    const { data: entries, error } = await supabase
      .from("team_entries")
      .select(`
        id,
        role,
        display_order,
        profiles (
          id,
          name,
          image_url
        )
      `)
      .eq("team_year_id", activeYear.id)
      .order("display_order", { ascending: true })
      .limit(12);

    if (error || !entries) return [];

    return entries
      .filter((e: any) => e.profiles && e.profiles.name)
      .map((e: any) => ({
        id: e.profiles.id || e.id,
        name: e.profiles.name,
        role: e.role,
        image: e.profiles.image_url || "",
      }));
  } catch (err) {
    console.error("Error fetching home execom from Supabase:", err);
    return [];
  }
}

const ExecomSection = async () => {
  const displayMembers = await getHomeExecom();
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {displayMembers.map((member, index) => (
            <div
              key={`${member.id}-${index}`}
              className="text-center"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative mb-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                  {member.image && member.image !== "/team/placeholder.jpg" && member.image.trim() !== "" ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg font-heading">
                      {member.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </div>
                  )}
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
