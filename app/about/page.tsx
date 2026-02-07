import { Cpu, Users, Code, Zap, Wifi, Heart, Settings, Activity } from "lucide-react";

const timelineEvents = [
  { year: "2008", milestone: "IEEE SCT Student Branch established" },
  { year: "2010", milestone: "First technical symposium organized" },
  { year: "2013", milestone: "Computer Society chapter inaugurated" },
  { year: "2015", milestone: "Women in Engineering affinity group formed" },
  { year: "2018", milestone: "10th Anniversary celebrations" },
  { year: "2020", milestone: "Robotics and Automation Society chapter launched" },
  { year: "2023", milestone: "15th Anniversary milestone achieved" },
  { year: "2025", milestone: "Best Student Branch Award - Kerala Section" },
];

const chapters = [
  {
    name: "PES",
    fullName: "Power and Energy Society",
    icon: Zap,
    focus: "Power Generation, Energy Systems, Sustainability",
  },
  {
    name: "ComSoc",
    fullName: "Communications Society",
    icon: Wifi,
    focus: "Telecommunications, Networking, Information Theory",
  },
  {
    name: "RAS",
    fullName: "Robotics and Automation Society",
    icon: Cpu,
    focus: "Robotics, Automation, Intelligent Systems",
  },
  {
    name: "CS",
    fullName: "Computer Society",
    icon: Code,
    focus: "Computing, Software, Information Technology",
  },
  {
    name: "WIE",
    fullName: "Women in Engineering",
    icon: Users,
    focus: "Diversity, Inclusion, Women Empowerment",
  },
  {
    name: "SIGHT",
    fullName: "Special Interest Group on Humanitarian Technology",
    icon: Heart,
    focus: "Humanitarian Technology, Sustainable Development",
  },
  {
    name: "IAS",
    fullName: "Industry Applications Society",
    icon: Settings,
    focus: "Industrial Systems, Manufacturing, Process Control",
  },
  {
    name: "EMBS",
    fullName: "Engineering in Medicine and Biology Society",
    icon: Activity,
    focus: "Biomedical Engineering, Healthcare Technology",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              IEEE SCT SB
            </h1>
            <p className="text-lg text-muted-foreground font-body leading-relaxed mb-4">
              IEEE started off in Sree Chitra Thirunal College Of Engineering with the registration of members on 23rd October 2009 with 30 members in its first phase. The Student Branch is one of the top 10 SBs in the Travancore Hub. Sree Chitra Thirunal College Of Engineering is one of the leading engineering colleges in Thiruvananthapuram, Kerala.
            </p>
            <div className="flex flex-col gap-2 text-muted-foreground font-body">
              <p><span className="font-semibold text-foreground">Founded:</span> 2009</p>
              <p><span className="font-semibold text-foreground">Current Strength:</span> 117 Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* About IEEE */}
      <section className="section-padding bg-card">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                About IEEE
              </h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>
                  IEEE is the world’s largest technical professional organization dedicated to advancing technology for the benefit of humanity.
                </p>
                <p>
                  IEEE and its members inspire a global community to innovate for a better tomorrow through its more than 419,000 members in over 160 countries, and its highly cited publications, conferences, technology standards, and professional and educational activities.
                </p>
                <p>
                  IEEE is the trusted “voice” for engineering, computing, and technology information around the globe.
                </p>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">Mission</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    IEEE's core purpose is to foster technological innovation and excellence for the benefit of humanity.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">Vision</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    IEEE will be essential to the global technical community and to technical professionals everywhere, and be universally recognized for the contributions of technology and of technical professionals in improving global conditions.
                  </p>
                </div>
              </div>
            </div>
            <div className="card-ieee p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <p className="text-4xl font-heading font-bold text-primary mb-2">400K+</p>
                  <p className="text-sm text-muted-foreground font-body">Members Worldwide</p>
                </div>
                <div>
                  <p className="text-4xl font-heading font-bold text-primary mb-2">160+</p>
                  <p className="text-sm text-muted-foreground font-body">Countries</p>
                </div>
                <div>
                  <p className="text-4xl font-heading font-bold text-primary mb-2">39</p>
                  <p className="text-sm text-muted-foreground font-body">Technical Societies</p>
                </div>
                <div>
                  <p className="text-4xl font-heading font-bold text-primary mb-2">1884</p>
                  <p className="text-sm text-muted-foreground font-body">Founded</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">
            Our Journey
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

              {timelineEvents.map((event, index) => (
                <div
                  key={event.year}
                  className={`relative flex items-center gap-6 mb-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full md:-translate-x-1.5 z-10" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-secondary rounded-full mb-2">
                      {event.year}
                    </span>
                    <p className="text-foreground font-body">{event.milestone}</p>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="section-padding bg-card">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">
            Our Chapters
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {chapters.map((chapter) => (
              <div key={chapter.name} className="bg-background rounded-lg p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <chapter.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-xl text-primary mb-1">
                  {chapter.name}
                </h3>
                <p className="text-sm font-secondary text-foreground mb-2">
                  {chapter.fullName}
                </p>
                <p className="text-xs text-muted-foreground font-body">
                  {chapter.focus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
