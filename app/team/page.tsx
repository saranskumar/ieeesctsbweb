import { execom, sbcTeams } from "@/lib/data/team";
import { Mail, Linkedin } from "lucide-react";
import Link from "next/link";

export default function TeamPage() {
    return (
        <>
            {/* Hero */}
            <section className="section-padding bg-background">
                <div className="section-container">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                            Meet Our Team
                        </h1>
                        <p className="text-lg text-muted-foreground font-body leading-relaxed">
                            The dedicated individuals behind IEEE SCT Student Branch who work tirelessly to bring you the best technical and professional experiences.
                        </p>
                    </div>
                </div>
            </section>


            {/* Team Grid */}
            <section className="section-padding bg-card">
                <div className="section-container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {execom.map((member, index) => (
                            <div
                                key={index}
                                className="bg-background rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all hover:-translate-y-1 group relative"
                            >
                                <div className="aspect-square w-full bg-muted relative overflow-hidden">
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-heading font-bold text-4xl">
                                            {member.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="font-heading font-bold text-xl text-foreground mb-1">
                                        {/* Stretched link to profile */}
                                        <Link href={`/members/${member.id}`} className="after:absolute after:inset-0">
                                            {member.name}
                                        </Link>
                                    </h3>
                                    <p className="text-sm font-secondary text-primary mb-4 font-medium">
                                        {member.role}
                                    </p>

                                    <div className="flex gap-4 relative z-10">
                                        {member.email && (
                                            <a
                                                href={`mailto:${member.email}`}
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                                aria-label={`Email ${member.name}`}
                                            >
                                                <Mail className="w-5 h-5" />
                                            </a>
                                        )}
                                        {member.linkedin && (
                                            <a
                                                href={member.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                                aria-label={`LinkedIn profile of ${member.name}`}
                                            >
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SBC Teams */}
            <section className="section-padding bg-background border-t border-border">
                <div className="section-container">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">
                        Our Families
                    </h2>

                    <div className="space-y-16">
                        {Object.entries(sbcTeams).map(([chapterId, members]) => (
                            <div key={chapterId}>
                                <h3 className="text-2xl font-heading font-bold text-primary mb-8 border-l-4 border-primary pl-4 uppercase">
                                    {chapterId} Execom
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {members.map((member, index) => (
                                        <div
                                            key={`${chapterId}-${index}`}
                                            className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all hover:-translate-y-1 group relative"
                                        >
                                            <div className="aspect-square w-full bg-muted relative overflow-hidden">
                                                {member.image ? (
                                                    <img
                                                        src={member.image}
                                                        alt={member.name}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-heading font-bold text-4xl">
                                                        {member.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <h3 className="font-heading font-bold text-xl text-foreground mb-1">
                                                    <Link href={`/members/${member.id}`} className="after:absolute after:inset-0">
                                                        {member.name}
                                                    </Link>
                                                </h3>
                                                <p className="text-sm font-secondary text-primary mb-4 font-medium">
                                                    {member.role}
                                                </p>

                                                <div className="flex gap-4 relative z-10">
                                                    {member.email && (
                                                        <a
                                                            href={`mailto:${member.email}`}
                                                            className="text-muted-foreground hover:text-primary transition-colors"
                                                            aria-label={`Email ${member.name}`}
                                                        >
                                                            <Mail className="w-5 h-5" />
                                                        </a>
                                                    )}
                                                    {member.linkedin && (
                                                        <a
                                                            href={member.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-muted-foreground hover:text-primary transition-colors"
                                                            aria-label={`LinkedIn profile of ${member.name}`}
                                                        >
                                                            <Linkedin className="w-5 h-5" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
