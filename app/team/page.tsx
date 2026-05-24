"use client";

import { useState, useEffect } from "react";
import { Mail, Linkedin, ChevronLeft, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const getSbcKey = (role: string): string | null => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes("advisor") || roleLower.includes("counselor")) {
        return null; // Faculty advisors are part of SB Execom
    }
    if (roleLower.startsWith("cs ") || roleLower === "women in computing" || roleLower === "ai sig coordinator") return "cs";
    if (roleLower.startsWith("embs ")) return "embs";
    if (roleLower.startsWith("ras ")) return "ras";
    if (roleLower.startsWith("ias ")) return "ias";
    if (roleLower.startsWith("pes ") || roleLower === "women in power") return "pes";
    if (roleLower.startsWith("comsoc ") || roleLower === "wice") return "comsoc";
    if (roleLower.startsWith("sight ") || roleLower === "project head") return "sight";
    if (roleLower.startsWith("wie ")) return "wie";
    return null;
};

export default function TeamPage() {
    const [availableYears, setAvailableYears] = useState<string[]>([]);
    const [year, setYear] = useState<string>("");
    const [yearIdMap, setYearIdMap] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [dbEntries, setDbEntries] = useState<any[]>([]);

    useEffect(() => {
        async function fetchYears() {
            try {
                const { data, error } = await supabase
                    .from("team_years")
                    .select("id, year, is_active")
                    .order("year", { ascending: false });
                
                if (data && data.length > 0) {
                    const mappedYears = data.map(y => y.year.split("-")[0]);
                    const idMap: Record<string, string> = {};
                    data.forEach(y => {
                        idMap[y.year.split("-")[0]] = y.id;
                    });
                    setYearIdMap(idMap);
                    setAvailableYears(mappedYears);
                    
                    const activeRow = data.find(y => y.is_active);
                    if (activeRow) {
                        setYear(activeRow.year.split("-")[0]);
                    } else {
                        setYear(mappedYears[0]);
                    }
                }
            } catch (err) {
                console.error("Error fetching team years:", err);
            }
        }
        fetchYears();
    }, []);

    useEffect(() => {
        const yearId = yearIdMap[year];
        if (!yearId) {
            if (availableYears.length > 0) {
                setDbEntries([]);
                setLoading(false);
            }
            return;
        }

        async function fetchEntries() {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("team_entries")
                    .select(`
                        id,
                        role,
                        display_order,
                        user_id,
                        users (
                            email
                        ),
                        profiles (
                            id,
                            name,
                            image_url,
                            linkedin_url,
                            github_url,
                            department,
                            batch,
                            bio
                        )
                    `)
                    .eq("team_year_id", yearId)
                    .order("display_order", { ascending: true });
                
                if (data) {
                    setDbEntries(data);
                } else {
                    setDbEntries([]);
                }
            } catch (err) {
                console.error("Error fetching team entries:", err);
                setDbEntries([]);
            } finally {
                setLoading(false);
            }
        }
        fetchEntries();
    }, [year, yearIdMap]);

    const currentIndex = availableYears.indexOf(year);

    const handlePreviousYear = () => {
        if (currentIndex < availableYears.length - 1) setYear(availableYears[currentIndex + 1]);
    };
    const handleNextYear = () => {
        if (currentIndex > 0) setYear(availableYears[currentIndex - 1]);
    };

    const mapped = dbEntries.map(entry => {
        const p = entry.profiles;
        const name = p?.name || "Unknown Member";
        const email = entry.users?.email || (Array.isArray(entry.users) ? entry.users[0]?.email : null) || null;
        
        return {
            id: p ? p.id : entry.user_id,
            name: name,
            image: p?.image_url || "/person.svg",
            department: p?.department || null,
            batch: p?.batch || null,
            linkedin: p?.linkedin_url || null,
            github: p?.github_url || null,
            email: email,
            bio: p?.bio || null,
            role: entry.role
        };
    });

    const isFaculty = (role: string) => /(advisor|counselor)/i.test(role);
    const coreRoles = ["Chairperson", "Vice Chairperson", "Secretary"];
    
    const execomEntries = mapped.filter(m => getSbcKey(m.role) === null);
    const sbcEntries = mapped.filter(m => getSbcKey(m.role) !== null);

    const facultyTeam = execomEntries.filter(m => isFaculty(m.role));
    const coreTeam = execomEntries.filter(m => coreRoles.includes(m.role) && !isFaculty(m.role));
    const otherTeam = execomEntries.filter(m => !coreRoles.includes(m.role) && !isFaculty(m.role));

    const resolvedSbc: Record<string, any[]> = {};
    sbcEntries.forEach(m => {
        const key = getSbcKey(m.role);
        if (key) {
            if (!resolvedSbc[key]) {
                resolvedSbc[key] = [];
            }
            resolvedSbc[key].push(m);
        }
    });


    return (
        <>
            {/* Hero */}
            <section className="py-8 md:py-12 bg-background">
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
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto gap-6 sm:gap-8">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="bg-background rounded-lg overflow-hidden border border-border p-4 space-y-4 shadow-sm animate-pulse">
                                    <div className="aspect-square w-full bg-muted rounded-lg" />
                                    <div className="space-y-2">
                                        <div className="h-5 bg-muted rounded w-3/4" />
                                        <div className="h-4 bg-muted rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : coreTeam.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto gap-6 sm:gap-8">
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
                                    <div className="p-4">
                                        <h3 className="font-heading font-bold text-base md:text-lg text-foreground mb-1 leading-tight">
                                            <Link href={`/members/${member.id}`} className="after:absolute after:inset-0">
                                                {member.name}
                                            </Link>
                                        </h3>
                                        <p className="text-xs font-secondary text-primary mb-3 font-medium line-clamp-2">
                                            {member.role}
                                        </p>

                                        <div className="flex gap-3 relative z-10">
                                            {member.email && (
                                                <a
                                                    href={`mailto:${member.email}`}
                                                    className="text-muted-foreground hover:text-primary transition-colors"
                                                    aria-label={`Email ${member.name}`}
                                                >
                                                    <Mail className="w-4 h-4" />
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
                                                    <Linkedin className="w-4 h-4" />
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
                    {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 justify-center">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <div key={n} className="bg-card rounded-lg overflow-hidden border border-border p-4 space-y-4 shadow-sm animate-pulse">
                                    <div className="aspect-square w-full bg-muted rounded-lg" />
                                    <div className="space-y-2">
                                        <div className="h-5 bg-muted rounded w-3/4" />
                                        <div className="h-4 bg-muted rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : facultyTeam.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 justify-center">
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
                    {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <div key={n} className="bg-card rounded-lg overflow-hidden border border-border p-4 space-y-4 shadow-sm animate-pulse">
                                    <div className="aspect-square w-full bg-muted rounded-lg" />
                                    <div className="space-y-2">
                                        <div className="h-5 bg-muted rounded w-3/4" />
                                        <div className="h-4 bg-muted rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : otherTeam.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
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
                                    <div className="p-4">
                                        <h3 className="font-heading font-bold text-base md:text-lg text-foreground mb-1 leading-tight">
                                            <Link href={`/members/${member.id}`} className="after:absolute after:inset-0">
                                                {member.name}
                                            </Link>
                                        </h3>
                                        <p className="text-xs font-secondary text-primary mb-3 font-medium line-clamp-2">
                                            {member.role}
                                        </p>

                                        <div className="flex gap-3 relative z-10">
                                            {member.email && (
                                                <a
                                                    href={`mailto:${member.email}`}
                                                    className="text-muted-foreground hover:text-primary transition-colors"
                                                    aria-label={`Email ${member.name}`}
                                                >
                                                    <Mail className="w-4 h-4" />
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
                                                    <Linkedin className="w-4 h-4" />
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
                        Our Societies
                    </h2>

                    <div className="space-y-16">
                        {loading ? (
                            <div className="space-y-8">
                                {[1, 2].map((sbc) => (
                                    <div key={sbc} className="space-y-4">
                                        <div className="h-6 bg-muted rounded w-1/4 animate-pulse" />
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                                            {[1, 2, 3, 4].map((n) => (
                                                <div key={n} className="bg-card rounded-lg overflow-hidden border border-border p-4 space-y-4 shadow-sm animate-pulse">
                                                    <div className="aspect-square w-full bg-muted rounded-lg" />
                                                    <div className="space-y-2">
                                                        <div className="h-5 bg-muted rounded w-3/4" />
                                                        <div className="h-4 bg-muted rounded w-1/2" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : Object.keys(resolvedSbc).length > 0 ? (
                            Object.entries(resolvedSbc).map(([chapterId, members]) => (
                                <div key={chapterId}>
                                    <h3 className="text-2xl font-heading font-bold text-primary mb-8 border-l-4 border-primary pl-4 uppercase">
                                        {chapterId} Execom
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
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
                                                <div className="p-4">
                                                    <h3 className="font-heading font-bold text-base md:text-lg text-foreground mb-1 leading-tight">
                                                        <Link href={`/members/${member.id}`} className="after:absolute after:inset-0">
                                                            {member.name}
                                                        </Link>
                                                    </h3>
                                                    <p className="text-xs font-secondary text-primary mb-3 font-medium line-clamp-2">
                                                        {member.role}
                                                    </p>

                                                    <div className="flex gap-3 relative z-10">
                                                        {member.email && (
                                                            <a
                                                                href={`mailto:${member.email}`}
                                                                className="text-muted-foreground hover:text-primary transition-colors"
                                                                aria-label={`Email ${member.name}`}
                                                            >
                                                                <Mail className="w-4 h-4" />
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
                                                                <Linkedin className="w-4 h-4" />
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
