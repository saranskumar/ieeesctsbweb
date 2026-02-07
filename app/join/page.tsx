import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Users, Rocket, Globe } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Join IEEE",
    description: "Become a member of IEEE SCT Student Branch. Discover the benefits of membership, from networking to career growth.",
};

export default function JoinPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="py-12 md:py-16 bg-background relative overflow-hidden">
                <div className="section-container relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
                            Join the <span className="text-primary">IEEE SCT SB</span> Family
                        </h1>
                        <p className="text-xl text-muted-foreground font-body leading-relaxed mb-8">
                            Be part of the world's largest technical professional organization. Connect, learn, and grow with a vibrant community of innovators.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button size="lg" className="font-secondary gap-2 min-w-[200px]" asChild>
                                <a href="https://www.ieee.org/membership/join/index.html" target="_blank" rel="noopener noreferrer">
                                    Join IEEE Global
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </Button>
                            <Button size="lg" variant="outline" className="font-secondary gap-2 min-w-[200px]" asChild>
                                <Link href="/contact?subject=Membership%20Enquiry">
                                    Contact for Help
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Join Section */}
            <section className="section-padding bg-card">
                <div className="section-container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">Why Join IEEE?</h2>
                        <p className="text-lg text-muted-foreground font-body leading-relaxed">
                            IEEE membership offers access to technical innovation, cutting-edge information, networking opportunities, and exclusive member benefits. Empower your career and future with the resources of the world's largest technical professional organization.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Conferences */}
                        <div className="bg-background p-8 rounded-xl border border-border hover:border-primary/50 transition-all hover:-translate-y-1">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-foreground mb-3">Conferences & Events</h3>
                            <p className="text-muted-foreground font-body">
                                Get discounts and access to thousands of IEEE technical conferences. Present your papers, network with experts, and stay updated with the latest research.
                            </p>
                        </div>

                        {/* Professional Exposure */}
                        <div className="bg-background p-8 rounded-xl border border-border hover:border-primary/50 transition-all hover:-translate-y-1">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                                <Rocket className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-foreground mb-3">Professional Exposure</h3>
                            <p className="text-muted-foreground font-body">
                                Build your professional identity. Connect with mentors, industry leaders, and potential employers. showcasing your skills and dedication.
                            </p>
                        </div>

                        {/* Technical Resources */}
                        <div className="bg-background p-8 rounded-xl border border-border hover:border-primary/50 transition-all hover:-translate-y-1">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                                <Globe className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-foreground mb-3">Technical Resources</h3>
                            <p className="text-muted-foreground font-body">
                                Access the IEEE Xplore Digital Library, Spectrum Magazine, and hundreds of technical journals to fuel your projects and research.
                            </p>
                        </div>

                        {/* Career Growth */}
                        <div className="bg-background p-8 rounded-xl border border-border hover:border-primary/50 transition-all hover:-translate-y-1">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-foreground mb-3">Career Development</h3>
                            <p className="text-muted-foreground font-body">
                                Utilize the IEEE Job Site, mentorship programs, and continuing education courses to accelerate your career path and land your dream job.
                            </p>
                        </div>

                        {/* Awards & Competitions */}
                        <div className="bg-background p-8 rounded-xl border border-border hover:border-primary/50 transition-all hover:-translate-y-1">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                                <Rocket className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-foreground mb-3">Awards & Competitions</h3>
                            <p className="text-muted-foreground font-body">
                                Participate in global competitions like IEEEXtreme, and vie for prestigious awards, scholarships, and travel grants available only to members.
                            </p>
                        </div>

                        {/* Volunteering */}
                        <div className="bg-background p-8 rounded-xl border border-border hover:border-primary/50 transition-all hover:-translate-y-1">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-foreground mb-3">Volunteering</h3>
                            <p className="text-muted-foreground font-body">
                                Develop leadership skills by organizing events, leading chapters, and contributing to humanitarian projects through SIGHT.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Steps to Join */}
            <section className="section-padding bg-background border-t border-border">
                <div className="section-container">
                    <h2 className="text-3xl font-heading font-bold text-foreground mb-12 text-center">How to Join</h2>
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">1</div>
                            <div>
                                <h3 className="text-xl font-heading font-bold text-foreground mb-2">Create an IEEE Account</h3>
                                <p className="text-muted-foreground font-body">Visit the official IEEE website and create your personal account.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">2</div>
                            <div>
                                <h3 className="text-xl font-heading font-bold text-foreground mb-2">Select Membership</h3>
                                <p className="text-muted-foreground font-body">Choose "Student Membership" if you are currently enrolled in an undergraduate or graduate program.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">3</div>
                            <div>
                                <h3 className="text-xl font-heading font-bold text-foreground mb-2">Add Student Branch</h3>
                                <p className="text-muted-foreground font-body">Search and add "Sree Chitra Thirunal College of Engineering" as your Student Branch.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">4</div>
                            <div>
                                <h3 className="text-xl font-heading font-bold text-foreground mb-2">Complete Payment</h3>
                                <p className="text-muted-foreground font-body">Complete the payment process to activate your membership.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
