import { getMember, members } from "@/lib/data/members";
import { Mail, Linkedin, Github, Globe, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Generate static params for all registered members
export async function generateStaticParams() {
    return Object.keys(members).map((id) => ({ id }));
}

export default async function MemberProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const member = getMember(id);

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
                            {member.image && member.image !== "/team/placeholder.jpg" ? (
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

                            {member.batch && (
                                <p className="text-sm font-secondary text-muted-foreground mb-1">
                                    Batch of {member.batch}
                                </p>
                            )}
                            {member.department && (
                                <p className="text-sm font-secondary text-muted-foreground mb-4">
                                    {member.department}
                                </p>
                            )}

                            {member.bio && (
                                <div className="prose prose-lg text-muted-foreground mb-8 font-body leading-relaxed">
                                    <p>{member.bio}</p>
                                </div>
                            )}

                            {member.awards && member.awards.length > 0 && (
                                <div className="mb-8">
                                    <h2 className="text-sm font-secondary uppercase tracking-wider text-muted-foreground mb-3">Awards</h2>
                                    <ul className="space-y-1">
                                        {member.awards.map((award, i) => (
                                            <li key={i} className="text-foreground font-body text-sm flex items-start gap-2">
                                                <span className="text-primary mt-1">✦</span> {award}
                                            </li>
                                        ))}
                                    </ul>
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
                                {member.github && (
                                    <a
                                        href={member.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-body"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Github className="w-5 h-5 text-primary" />
                                        </div>
                                        <span>GitHub</span>
                                    </a>
                                )}
                                {member.instagram && (
                                    <a
                                        href={member.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-body"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                        </div>
                                        <span>Instagram</span>
                                    </a>
                                )}
                                {member.website && (
                                    <a
                                        href={member.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-body"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Globe className="w-5 h-5 text-primary" />
                                        </div>
                                        <span>Website</span>
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
