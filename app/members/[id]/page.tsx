import { execom, sbcTeams } from "@/lib/data/team";
import { Mail, Linkedin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Generate static params for all team members
export async function generateStaticParams() {
    const allMembers = [
        ...execom,
        ...Object.values(sbcTeams).flat()
    ];
    return allMembers.map((member) => ({
        id: member.id,
    }));
}

export default async function MemberProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const allMembers = [
        ...execom,
        ...Object.values(sbcTeams).flat()
    ];
    const member = allMembers.find((m) => m.id === id);

    if (!member) {
        notFound();
    }

    return (
        <>
            <section className="section-padding bg-background min-h-[80vh] flex items-center">
                <div className="section-container">
                    <Link
                        href="/team"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Team
                    </Link>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Image */}
                        <div className="relative aspect-square md:aspect-[4/5] w-full max-w-md mx-auto rounded-lg overflow-hidden bg-muted shadow-lg">
                            {member.image ? (
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-heading font-bold text-6xl">
                                    {member.name.charAt(0)}
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-2">
                                {member.name}
                            </h1>
                            <p className="text-xl font-secondary text-primary font-medium mb-6">
                                {member.role}
                            </p>

                            {member.bio && (
                                <div className="prose prose-lg text-muted-foreground mb-8 font-body leading-relaxed">
                                    <p>{member.bio}</p>
                                </div>
                            )}

                            <div className="flex flex-col gap-4">
                                {member.email && (
                                    <a
                                        href={`mailto:${member.email}`}
                                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-body"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-primary" />
                                        </div>
                                        {member.email}
                                    </a>
                                )}
                                {member.linkedin && (
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-body"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Linkedin className="w-5 h-5 text-primary" />
                                        </div>
                                        <span>LinkedIn Profile</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
