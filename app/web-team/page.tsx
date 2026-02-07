import { webTeam } from "@/lib/data/web-team";
import { Github, Linkedin, Globe, Code } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WebTeamPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="section-padding py-20 bg-primary/5 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="section-container relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <Code className="w-4 h-4" />
                        <span>Behind the Code</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
                        Meet the <span className="text-primary">Web Team</span>
                    </h1>
                    <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
                        The creative minds and technical wizards who designed and developed the IEEE SCT SB website. Passionate about pixels, code, and community.
                    </p>
                </div>
            </section>

            {/* Team Grid */}
            <section className="section-padding bg-background">
                <div className="section-container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {webTeam.map((member) => (
                            <div
                                key={member.id}
                                className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="aspect-square relative overflow-hidden bg-muted">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <div className="flex gap-4">
                                            {member.linkedin && (
                                                <a
                                                    href={member.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white hover:text-primary transition-colors"
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
                                                    className="text-white hover:text-primary transition-colors"
                                                    aria-label={`${member.name}'s GitHub`}
                                                >
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )}
                                            {member.portfolio && (
                                                <a
                                                    href={member.portfolio}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white hover:text-primary transition-colors"
                                                    aria-label={`${member.name}'s Portfolio`}
                                                >
                                                    <Globe className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm font-secondary text-primary font-medium">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack / CTA */}
            <section className="section-padding bg-muted/30 border-t border-border">
                <div className="section-container text-center">
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                        Interested in Web Development?
                    </h2>
                    <p className="text-muted-foreground font-body mb-8 max-w-lg mx-auto">
                        Join the IEEE SCT SB Web Team to learn, build, and contribute to real-world projects.
                    </p>
                    <Button asChild size="lg" className="font-secondary">
                        <Link href="/contact">Join the Team</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
