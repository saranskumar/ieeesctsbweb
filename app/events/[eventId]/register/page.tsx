"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { notFound } from "next/navigation";

const allEvents = [
    { id: 1, title: "TechTalk: AI in Healthcare", date: "March 15, 2026" },
    { id: 2, title: "Workshop: IoT Fundamentals", date: "March 22, 2026" },
    { id: 3, title: "Hackathon 2026", date: "April 5-6, 2026" },
    { id: 4, title: "Career Guidance Session", date: "April 15, 2026" },
];

export default function EventRegisterPage({ params }: { params: { eventId: string } }) {
    const { toast } = useToast();
    const event = allEvents.find((e) => e.id === Number(params.eventId));
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        college: "",
        department: "",
        year: "",
        ieeeId: "",
    });

    if (!event) {
        notFound();
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.college) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitted(true);
        toast({
            title: "Registration Successful!",
            description: `You have registered for ${event.title}`,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (isSubmitted) {
        return (
            <section className="section-padding bg-background min-h-[60vh] flex items-center">
                <div className="section-container text-center">
                    <div className="max-w-md mx-auto bg-card rounded-lg p-8">
                        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                            Registration Successful!
                        </h1>
                        <p className="text-muted-foreground font-body mb-6">
                            You have successfully registered for <strong>{event.title}</strong>.
                            A confirmation email will be sent to your registered email address.
                        </p>
                        <div className="space-y-3">
                            <Button asChild className="w-full font-secondary">
                                <Link href={`/events/${event.id}`}>View Event Details</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full font-secondary">
                                <Link href="/events">Browse More Events</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            {/* Back Navigation */}
            <section className="py-4 bg-background">
                <div className="section-container">
                    <Button variant="ghost" asChild className="gap-2">
                        <Link href={`/events/${event.id}`}>
                            <ArrowLeft className="w-4 h-4" />
                            Back to Event
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Registration Form */}
            <section className="section-padding bg-background pt-0">
                <div className="section-container">
                    <div className="max-w-2xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                                Event Registration
                            </h1>
                            <p className="text-muted-foreground font-body">
                                Register for <strong>{event.title}</strong>
                            </p>
                            <p className="text-sm text-primary font-secondary mt-1">{event.date}</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="bg-card rounded-lg p-6 md:p-8">
                            <div className="grid gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="font-secondary">
                                        Full Name <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="font-body"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="font-secondary">
                                        Email Address <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="font-body"
                                        required
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="font-secondary">
                                        Phone Number <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="font-body"
                                        required
                                    />
                                </div>

                                {/* College */}
                                <div className="space-y-2">
                                    <Label htmlFor="college" className="font-secondary">
                                        College/Institution <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="college"
                                        name="college"
                                        type="text"
                                        placeholder="Enter your college name"
                                        value={formData.college}
                                        onChange={handleChange}
                                        className="font-body"
                                        required
                                    />
                                </div>

                                {/* Department & Year */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="department" className="font-secondary">
                                            Department
                                        </Label>
                                        <Input
                                            id="department"
                                            name="department"
                                            type="text"
                                            placeholder="e.g., Computer Science"
                                            value={formData.department}
                                            onChange={handleChange}
                                            className="font-body"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="year" className="font-secondary">
                                            Year of Study
                                        </Label>
                                        <Input
                                            id="year"
                                            name="year"
                                            type="text"
                                            placeholder="e.g., 3rd Year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            className="font-body"
                                        />
                                    </div>
                                </div>

                                {/* IEEE ID */}
                                <div className="space-y-2">
                                    <Label htmlFor="ieeeId" className="font-secondary">
                                        IEEE Membership ID (Optional)
                                    </Label>
                                    <Input
                                        id="ieeeId"
                                        name="ieeeId"
                                        type="text"
                                        placeholder="Enter your IEEE ID if applicable"
                                        value={formData.ieeeId}
                                        onChange={handleChange}
                                        className="font-body"
                                    />
                                </div>

                                {/* Submit */}
                                <Button type="submit" size="lg" className="w-full font-secondary mt-4">
                                    Complete Registration
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
