import { Calendar, MapPin, Monitor } from "lucide-react";

export default function EventsLoading() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-background border-b border-border text-center md:text-left">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Events & Announcements
            </h1>
            <p className="text-xl text-muted-foreground font-body leading-relaxed">
              Explore our workshops, talk sessions, hackathons, and community announcements that drive innovation forward.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-card min-h-[60vh]">
        <div className="section-container space-y-20">
          
          {/* Live Section - Active & Ongoing */}
          <div>
            <div className="mb-10 flex items-center gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold tracking-widest text-sm mb-2 uppercase">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  Live Now
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                  Active & Ongoing
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-background rounded-xl overflow-hidden border border-border p-5 space-y-5 shadow-sm">
                  <div className="aspect-[4/5] bg-secondary/15 animate-pulse rounded-xl" />
                  <div className="space-y-4">
                    <div className="h-6 bg-secondary/15 animate-pulse rounded w-3/4" />
                    <div className="space-y-3 pt-2">
                      <div className="h-4 bg-secondary/10 animate-pulse rounded w-1/2" />
                      <div className="h-4 bg-secondary/10 animate-pulse rounded w-2/3" />
                    </div>
                    <div className="h-10 bg-secondary/20 animate-pulse rounded w-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements Section */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                Announcements
              </h2>
              <p className="text-muted-foreground font-body">
                Latest updates, honors, and official news from IEEE SCT SB.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-background rounded-xl overflow-hidden border border-border shadow-sm flex flex-col h-full">
                  <div className="aspect-video bg-secondary/15 animate-pulse" />
                  <div className="p-6 flex flex-col flex-grow space-y-4">
                    <div className="h-3.5 bg-secondary/10 animate-pulse rounded w-1/4" />
                    <div className="h-5 bg-secondary/15 animate-pulse rounded w-3/4" />
                    <div className="space-y-2.5 pt-2">
                      <div className="h-3.5 bg-secondary/10 animate-pulse rounded w-full" />
                      <div className="h-3.5 bg-secondary/10 animate-pulse rounded w-5/6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent & Past Activities Section */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                Recent & Past Activities
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-background rounded-xl overflow-hidden border border-border p-5 space-y-5 shadow-sm">
                  <div className="aspect-[4/5] bg-secondary/15 animate-pulse rounded-xl" />
                  <div className="space-y-4">
                    <div className="h-6 bg-secondary/15 animate-pulse rounded w-3/4" />
                    <div className="space-y-3 pt-2">
                      <div className="h-4 bg-secondary/10 animate-pulse rounded w-1/2" />
                      <div className="h-4 bg-secondary/10 animate-pulse rounded w-2/3" />
                    </div>
                    <div className="h-10 bg-secondary/15 animate-pulse rounded w-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
