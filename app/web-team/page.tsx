import { Github, Linkedin, Globe, Code, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default async function WebTeamPage() {
    let resolvedTeam: any[] = [];
    try {
        const { data } = await supabase
            .from("profiles")
            .select(`
                id,
                username,
                name,
                image_url,
                linkedin_url,
                github_url,
                department
            `)
            .in("username", ["saranskumar", "mahreen-zuraiq", "hari-narayanan-s"]);

        if (data) {
            const roleAndOrderMap: Record<string, { role: string; order: number; website?: string }> = {
                "saranskumar": { role: "Webmaster / Lead Developer", order: 0 },
                "mahreen-zuraiq": { role: "UI/UX Designer & Developer", order: 1 },
                "hari-narayanan-s": { role: "Frontend Developer", order: 2 }
            };

            resolvedTeam = data
                .map(p => {
                    const meta = roleAndOrderMap[p.username] || { role: "Web Developer", order: 9 };
                    return {
                        id: p.id,
                        name: p.name,
                        image: p.image_url || "/person.svg",
                        linkedin: p.linkedin_url || null,
                        github: p.github_url || null,
                        website: meta.website || null,
                        department: p.department || null,
                        role: meta.role,
                        username: p.username
                    };
                })
                .sort((a, b) => {
                    const orderA = roleAndOrderMap[a.username]?.order ?? 99;
                    const orderB = roleAndOrderMap[b.username]?.order ?? 99;
                    return orderA - orderB;
                });
        }
    } catch (err) {
        console.error("Error fetching web team profiles:", err);
    }


    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="py-20 md:py-28 bg-background relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-secondary/10 via-secondary/5 to-transparent rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4"></div>
                </div>

                <div className="section-container relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 border border-primary/20 backdrop-blur-sm">
                        <Code className="w-4 h-4" />
                        <span>Development Force</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-heading font-black text-foreground mb-8 tracking-tight">
                        The <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">Architects</span> of Digital Experience
                    </h1>
                    <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed opacity-80">
                        Bridging innovation and implementation. We build the interfaces that connect our community to the world of technology.
                    </p>
                </div>
            </section>

            {/* Team Grid */}
            <section className="pb-24 bg-background">
                <div className="section-container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {resolvedTeam.map((member, index) => (
                            <div
                                key={member.id}
                                className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 translate-y-0 hover:-translate-y-3"
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <div className="aspect-[4/5] relative overflow-hidden bg-muted">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                                    />
                                    
                                    {/* Glass Overlay on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                                        <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                            {member.linkedin && (
                                                <a
                                                    href={member.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-full bg-white/10 hover:bg-primary hover:text-white backdrop-blur-md text-white transition-all border border-white/20"
                                                    aria-label={`${member.name}'s LinkedIn`}
                                                >
                                                    <Linkedin className="w-5 h-5" />
                                                </a>
                                            )}
                                            {member.github && (
                                                <a
                                                    href={member.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-full bg-white/10 hover:bg-primary hover:text-white backdrop-blur-md text-white transition-all border border-white/20"
                                                    aria-label={`${member.name}'s GitHub`}
                                                >
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )}
                                            {member.website && (
                                                <a
                                                    href={member.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-full bg-white/10 hover:bg-primary hover:text-white backdrop-blur-md text-white transition-all border border-white/20"
                                                    aria-label={`${member.name}'s Portfolio`}
                                                >
                                                    <Globe className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 border-t border-border/50 bg-card/50 backdrop-blur-sm">
                                    <h3 className="text-xl font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm font-secondary text-primary/80 font-semibold tracking-wider uppercase">
                                        {member.role}
                                    </p>
                                    {member.department && (
                                        <p className="text-xs text-muted-foreground mt-2 font-body italic">
                                            {member.department}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-muted/20 border-t border-border/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                <div className="section-container relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-6">
                        Build the Future With Us  </h2> 
                    <p className="text-lg text-muted-foreground font-body mb-10 max-w-xl mx-auto opacity-90">
                        We're always looking for passionate developers, designers, and tech enthusiasts to join our creative collective.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button asChild size="lg" className="font-bold px-8 h-14 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all group">
                            <Link href="/contact?subject=Joining%20the%20Web%20Team" className="flex items-center gap-2">
                                Join
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="font-bold px-8 h-14 text-lg rounded-full border-2 hover:bg-background/80 transition-all">
                            <Link href="https://github.com/ieeesctsb" target="_blank">
                                View Open Source
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
