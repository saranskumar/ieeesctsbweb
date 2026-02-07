"use client";

import { useState } from "react";
import { execom25, sbcTeams25 } from "@/lib/data/team25";
import { execom24, sbcTeams24 } from "@/lib/data/team24";
import { execom23, sbcTeams23 } from "@/lib/data/team23";
import { execom22, sbcTeams22 } from "@/lib/data/team22";
import { execom21, sbcTeams21 } from "@/lib/data/team21";
import { execom20, sbcTeams20 } from "@/lib/data/team20";
import { Mail, Linkedin, ChevronLeft, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TeamMember } from "@/lib/data/team";

// Map years to their respective data modules
const teamData: Record<string, { execom: TeamMember[], sbcTeams: Record<string, TeamMember[]> }> = {
    "2025": { execom: execom25, sbcTeams: sbcTeams25 },
    "2024": { execom: execom24, sbcTeams: sbcTeams24 },
    "2023": { execom: execom23, sbcTeams: sbcTeams23 },
    "2022": { execom: execom22, sbcTeams: sbcTeams22 },
    "2021": { execom: execom21, sbcTeams: sbcTeams21 },
    "2020": { execom: execom20, sbcTeams: sbcTeams20 },
    // Add future years here
};

const availableYears = Object.keys(teamData).sort((a, b) => Number(b) - Number(a)); // ["2025", "2024"]

export default function TeamPage() {
    const [year, setYear] = useState<string>(availableYears[0]);
    const currentIndex = availableYears.indexOf(year);

    const handlePreviousYear = () => {
        if (currentIndex < availableYears.length - 1) {
            setYear(availableYears[currentIndex + 1]);
        }
    };

    const handleNextYear = () => {
        if (currentIndex > 0) {
            setYear(availableYears[currentIndex - 1]);
        }
    };

    const currentData = teamData[year];
    const { execom, sbcTeams } = currentData;

    const isFaculty = (role: string) => role.includes("Advisor") || role.includes("Counselor");

    const coreRoles = [
        "Chairperson",
        "Vice Chairperson",
        "Secretary",
        "Treasurer",
        "Sub Treasurer",
        "Link Representative",
        "Webmaster",
        "Activity Coordinator",
        "Tech Head",
        "Tech Lead"
    ];

    const facultyTeam = execom.filter(member => isFaculty(member.role));
    const coreTeam = execom.filter(member => coreRoles.includes(member.role) && !isFaculty(member.role));
    const otherTeam = execom.filter(member => !coreRoles.includes(member.role) && !isFaculty(member.role));

    return (
        <>
            {/* Hero */}
            <section className="section-padding bg-background">
                <div className="section-container">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                                Meet Our Team
                            </h1>
                            <p className="text-lg text-muted-foreground font-body leading-relaxed">
                                The dedicated individuals behind IEEE SCT Student Branch who work tirelessly to bring you the best technical and professional experiences.
                            </p>
                        </div>

                        {/* Year Navigation */}
                        <div className="flex items-center gap-4 bg-card p-2 rounded-full border border-border shadow-sm">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handlePreviousYear}
                                disabled={currentIndex === availableYears.length - 1}
                                className="rounded-full hover:bg-muted"
                                aria-label="Previous Year"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>

                            <span className="text-xl font-heading font-bold text-primary min-w-[3ch] text-center flex flex-col items-center">
                                {year}
                                {currentIndex === 0 && (
                                    <span className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground mt-[-4px]">
                                        Latest
                                    </span>
                                )}
                            </span>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleNextYear}
                                disabled={currentIndex === 0}
                                className="rounded-full hover:bg-muted"
                                aria-label="Next Year"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Team Grid */}
            <section className="section-padding bg-card">
                <div className="section-container">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">
                        {year} Core Execom
                    </h2>
                    {coreTeam.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {coreTeam.map((member, index) => (
                                <div
                                    key={index}
                                    className="bg-background rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all hover:-translate-y-1 group relative"
                                >
                                    <div className="aspect-square w-full bg-muted relative overflow-hidden flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        {member.image && member.image !== "/team/placeholder.jpg" ? (
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <User className="w-16 h-16 text-primary/40 group-hover:text-primary transition-colors duration-300" />
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-heading font-bold text-xl text-foreground mb-1">
                                            {member.id.startsWith("past") ? (
                                                <span>{member.name}</span>
                                            ) : (
                                                <Link href={`/members/${member.id}`} className="after:absolute after:inset-0">
                                                    {member.name}
                                                </Link>
                                            )}
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
                    ) : (
                        <div className="text-center text-muted-foreground py-12 bg-background/50 rounded-lg border border-dashed border-border text-lg">
                            Data for {year} Core Execom not available.
                        </div>
                    )}
                </div>
            </section>

            {/* Faculties Grid */}
            <section className="section-padding bg-background border-t border-border">
                <div className="section-container">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">
                        Faculty Advisors
                    </h2>
                    {facultyTeam.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                            {facultyTeam.map((member, index) => (
                                <div
                                    key={index}
                                    className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all hover:-translate-y-1 group relative"
                                >
                                    <div className="aspect-square w-full bg-muted relative overflow-hidden flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        {member.image && member.image !== "/team/placeholder.jpg" ? (
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <User className="w-16 h-16 text-primary/40 group-hover:text-primary transition-colors duration-300" />
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-heading font-bold text-xl text-foreground mb-1">
                                            {member.id.startsWith("past") ? (
                                                <span>{member.name}</span>
                                            ) : (
                                                <Link href={`/members/${member.id}`} className="after:absolute after:inset-0">
                                                    {member.name}
                                                </Link>
                                            )}
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
                    ) : (
                        <div className="text-center text-muted-foreground py-12 bg-card/50 rounded-lg border border-dashed border-border text-lg">
                            Faculty list for {year} is not available.
                        </div>
                    )}
                </div>
            </section>

            {/* Other Execom Grid */}
            <section className="section-padding bg-card border-t border-border">
                <div className="section-container">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">
                        Execom Members
                    </h2>
                    {otherTeam.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {otherTeam.map((member, index) => (
                                <div
                                    key={index}
                                    className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all hover:-translate-y-1 group relative"
                                >
                                    <div className="aspect-square w-full bg-muted relative overflow-hidden flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        {member.image && member.image !== "/team/placeholder.jpg" ? (
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <User className="w-16 h-16 text-primary/40 group-hover:text-primary transition-colors duration-300" />
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-heading font-bold text-xl text-foreground mb-1">
                                            {member.id.startsWith("past") ? (
                                                <span>{member.name}</span>
                                            ) : (
                                                <Link href={`/members/${member.id}`} className="after:absolute after:inset-0">
                                                    {member.name}
                                                </Link>
                                            )}
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
                    ) : (
                        <div className="text-center text-muted-foreground py-12 bg-card/50 rounded-lg border border-dashed border-border text-lg">
                            Detailed member list for {year} is not available.
                        </div>
                    )}
                </div>
            </section>

            {/* SBC Teams */}
            <section className="section-padding bg-background border-t border-border">
                <div className="section-container">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">
                        Our Families
                    </h2>

                    <div className="space-y-16">
                        {Object.keys(sbcTeams).length > 0 ? (
                            Object.entries(sbcTeams).map(([chapterId, members]) => (
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
                                                <div className="aspect-square w-full bg-muted relative overflow-hidden flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                    {member.image && member.image !== "/team/placeholder.jpg" ? (
                                                        <img
                                                            src={member.image}
                                                            alt={member.name}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <User className="w-16 h-16 text-primary/40 group-hover:text-primary transition-colors duration-300" />
                                                    )}
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="font-heading font-bold text-xl text-foreground mb-1">
                                                        {member.id.startsWith("past") ? (
                                                            <span>{member.name}</span>
                                                        ) : (
                                                            <Link href={`/members/${member.id}`} className="after:absolute after:inset-0">
                                                                {member.name}
                                                            </Link>
                                                        )}
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
                            ))
                        ) : (
                            <div className="text-center text-muted-foreground py-8 bg-card/50 rounded-lg border border-dashed border-border text-lg">
                                Society teams for {year} are not available.
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
