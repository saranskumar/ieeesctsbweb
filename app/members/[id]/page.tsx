import { getMember, members, TeamEntry } from "@/lib/data/members";
import { Mail, Linkedin, Github, Globe, ArrowLeft, Briefcase, Award } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { execom26, sbcTeams26 } from "@/lib/data/team26";
import { execom25, sbcTeams25 } from "@/lib/data/team25";
import { execom24, sbcTeams24 } from "@/lib/data/team24";
import { execom23, sbcTeams23 } from "@/lib/data/team23";
import { execom22, sbcTeams22 } from "@/lib/data/team22";
import { execom21, sbcTeams21 } from "@/lib/data/team21";
import { execom20, sbcTeams20 } from "@/lib/data/team20";

// Map years to their respective data modules
const teamData: Record<string, { execom: TeamEntry[], sbcTeams: Record<string, TeamEntry[]> }> = {
    "2026": { execom: execom26, sbcTeams: sbcTeams26 },
    "2025": { execom: execom25, sbcTeams: sbcTeams25 },
    "2024": { execom: execom24, sbcTeams: sbcTeams24 },
    "2023": { execom: execom23, sbcTeams: sbcTeams23 },
    "2022": { execom: execom22, sbcTeams: sbcTeams22 },
    "2021": { execom: execom21, sbcTeams: sbcTeams21 },
    "2020": { execom: execom20, sbcTeams: sbcTeams20 },
};

// Generate static params for all registered members
export async function generateStaticParams() {
    return Object.keys(members).map((id) => ({ id }));
}

function getMemberRoles(memberId: string) {
    const roles: { year: string; role: string; chapter: string }[] = [];
    
    // Sort years descending to get most recent first
    const years = Object.keys(teamData).sort((a, b) => parseInt(b) - parseInt(a));
    
    for (const year of years) {
        const data = teamData[year];
        
        // Check Execom
        const execomMatch = data.execom.find(e => e.memberId === memberId);
        if (execomMatch) {
            roles.push({ year, role: execomMatch.role, chapter: "SB Execom" });
        }
        
        // Check SBC Teams
        for (const [chapter, team] of Object.entries(data.sbcTeams)) {
            const sbcMatch = team.find(e => e.memberId === memberId);
            if (sbcMatch) {
                roles.push({ year, role: sbcMatch.role, chapter: chapter.toUpperCase() });
            }
        }
    }
    
    return roles;
}

export default async function MemberProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const member = getMember(id);

    if (!member) {
        notFound();
    }

    const roles = getMemberRoles(id);
    const latestRole = roles.length > 0 ? roles[0] : null;

    return (
        <div className="min-h-screen bg-background relative pb-20">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 to-transparent -z-10 blur-3xl opacity-50 pointer-events-none" />
            
            <div className="max-w-xl mx-auto px-4 pt-12">
                <div className="w-full flex justify-start mb-8">
                    <Link
                        href="/team"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body bg-muted/50 hover:bg-muted px-4 py-2 rounded-full"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Team
                    </Link>
                </div>

                <div className="flex flex-col items-center text-center mb-10">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-background shadow-xl mb-6">
                        {member.image && member.image !== "/team/placeholder.jpg" ? (
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-heading font-bold text-5xl">
                                {member.name.charAt(0)}
                            </div>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                        {member.name}
                    </h1>

                    {latestRole && (
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full font-secondary text-sm font-medium mb-4 shadow-sm">
                            <Briefcase className="w-4 h-4" />
                            {latestRole.role} ({latestRole.chapter})
                        </div>
                    )}

                    {member.department && (
                        <div className="flex items-center gap-3 text-sm text-muted-foreground font-body">
                            <span>{member.department}</span>
                        </div>
                    )}

                    {member.bio && (
                        <p className="text-muted-foreground font-body mt-6 max-w-sm mx-auto leading-relaxed text-sm">
                            {member.bio}
                        </p>
                    )}
                </div>

                <div className="space-y-4 w-full">
                    {/* Linktree-Style Buttons */}
                    {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center p-4 bg-card hover:bg-muted border border-border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#0077b5]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <Linkedin className="w-5 h-5 text-[#0077b5]" />
                            </div>
                            <span className="flex-grow text-center font-heading font-semibold text-foreground group-hover:text-primary transition-colors mr-12">LinkedIn</span>
                        </a>
                    )}
                    {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="group flex items-center p-4 bg-card hover:bg-muted border border-border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <Github className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <span className="flex-grow text-center font-heading font-semibold text-foreground group-hover:text-primary transition-colors mr-12">GitHub</span>
                        </a>
                    )}
                    {member.instagram && (
                        <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-center p-4 bg-card hover:bg-muted border border-border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#E1306C]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </div>
                            <span className="flex-grow text-center font-heading font-semibold text-foreground group-hover:text-primary transition-colors mr-12">Instagram</span>
                        </a>
                    )}
                    {member.website && (
                        <a href={member.website} target="_blank" rel="noopener noreferrer" className="group flex items-center p-4 bg-card hover:bg-muted border border-border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <Globe className="w-5 h-5 text-primary" />
                            </div>
                            <span className="flex-grow text-center font-heading font-semibold text-foreground group-hover:text-primary transition-colors mr-12">Portfolio / Website</span>
                        </a>
                    )}
                    {member.email && (
                        <a href={`mailto:${member.email}`} className="group flex items-center p-4 bg-card hover:bg-muted border border-border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <Mail className="w-5 h-5 text-amber-500" />
                            </div>
                            <span className="flex-grow text-center font-heading font-semibold text-foreground group-hover:text-primary transition-colors mr-12">Email</span>
                        </a>
                    )}
                </div>

                {member.awards && member.awards.length > 0 && (
                    <div className="mt-12 bg-card border border-border rounded-2xl p-6 shadow-sm">
                        <h3 className="flex items-center gap-2 font-heading font-bold text-foreground mb-4">
                            <Award className="w-5 h-5 text-primary" />
                            Achievements & Awards
                        </h3>
                        <ul className="space-y-3">
                            {member.awards.map((award, i) => (
                                <li key={i} className="text-muted-foreground font-body text-sm flex items-start gap-3">
                                    <span className="text-primary mt-0.5">•</span>
                                    {award}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {roles.length > 1 && (
                    <div className="mt-8 bg-card border border-border rounded-2xl p-6 shadow-sm">
                        <h3 className="flex items-center gap-2 font-heading font-bold text-foreground mb-4">
                            <Briefcase className="w-5 h-5 text-muted-foreground" />
                            Past Roles
                        </h3>
                        <ul className="space-y-3">
                            {roles.slice(1).map((r, i) => (
                                <li key={i} className="text-muted-foreground font-body text-sm flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0">
                                    <span>{r.role} ({r.chapter})</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
        </div>
    );
}
