import { chapters } from "@/lib/data/chapters";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Calendar } from "lucide-react";
import Link from "next/link";

interface ChapterDetailProps {
    chapterId: string;
}

export default function ChapterDetail({ chapterId }: ChapterDetailProps) {
    const chapter = chapters.find((c) => c.id === chapterId);

    if (!chapter) {
        notFound();
    }

    return (
        <>
            {/* Hero */}
            <section className="section-padding bg-background border-b border-border">
                <div className="section-container">
                    <div className="mb-8">
                        <Link
                            href="/chapters"
                            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Chapters
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0 flex items-center justify-center">
                            {chapter.image ? (
                                <img
                                    src={chapter.image}
                                    alt={chapter.name}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="w-full h-full rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <chapter.icon className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-2">
                                {chapter.name}
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground font-body">
                                {chapter.fullName}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding bg-card">
                <div className="section-container">
                    <div className="grid lg:grid-cols-3 gap-12">

                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-12">

                            {/* About */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-heading font-bold text-foreground">About</h2>
                                <p className="text-muted-foreground font-body leading-relaxed text-lg">
                                    {chapter.description}
                                </p>
                            </div>

                            {/* Mission & Vision */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-background p-6 rounded-lg border border-border">
                                    <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Mission</h3>
                                    <p className="text-muted-foreground font-body">
                                        {chapter.mission}
                                    </p>
                                </div>
                                <div className="bg-background p-6 rounded-lg border border-border">
                                    <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Vision</h3>
                                    <p className="text-muted-foreground font-body">
                                        {chapter.vision}
                                    </p>
                                </div>
                            </div>

                            {/* Activities */}
                            <div>
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Key Activities</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {chapter.activities?.map((activity, index) => (
                                        <div key={index} className="flex items-center p-4 bg-background rounded-lg border border-border">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                                                <Calendar className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="font-body text-foreground">{activity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar / CTA */}
                        <div className="lg:col-span-1">
                            <div className="bg-background rounded-xl p-6 border border-border sticky top-24">
                                <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                                    Get Involved
                                </h3>
                                <p className="text-muted-foreground font-body mb-6">
                                    Interested in joining the {chapter.fullName}? Connect with us to learn more about upcoming events and membership benefits.
                                </p>

                                <div className="space-y-4">
                                    <Button className="w-full flex items-center justify-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        Contact {chapter.name}
                                    </Button>
                                    {chapter.email && (
                                        <p className="text-center text-sm text-muted-foreground font-body">
                                            or email us at <br />
                                            <a href={`mailto:${chapter.email}`} className="text-primary hover:underline">
                                                {chapter.email}
                                            </a>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
