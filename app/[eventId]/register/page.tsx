"use client";

import Link from "next/link";
import { useState, useEffect, use } from "react";
import { ArrowLeft, CheckCircle, Loader2, AlertCircle, Calendar, MapPin, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

interface FormField {
    id: string;
    label: string;
    type: "text" | "number" | "textarea" | "select" | "checkbox";
    required: boolean;
    options: string[];
}

interface EventData {
    dbId: string;
    slug: string;
    title: string;
    date: string;
    time: string;
    form_schema: FormField[];
    registration_type: string;
    redirect_url: string | null;
    success_message: string | null;
    whatsapp_group_url: string | null;
    main_poster_url: string | null;
    venue: string | null;
    description: string | null;
}

export default function EventRegisterPage({ params }: { params: Promise<{ eventId: string }> }) {
    const { eventId } = use(params);

    const [event, setEvent] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Core fixed fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isIeeeMember, setIsIeeeMember] = useState("");
    const [ieeeMembershipId, setIeeeMembershipId] = useState("");
    // Dynamic form_schema field values keyed by field id
    const [customValues, setCustomValues] = useState<Record<string, string | boolean>>({});

    useEffect(() => {
        async function fetchEvent() {
            try {
                const { data, error: fetchErr } = await supabase
                    .from("events")
                    .select("id, title, slug, event_date, status, form_schema, registration_type, redirect_url, success_message, whatsapp_group_url, main_poster_url, venue, description")
                    .eq("slug", eventId)
                    .maybeSingle();

                if (fetchErr || !data) {
                    setError("Event not found.");
                    return;
                }

                if (data.status !== "published") {
                    setError("Registration is not currently open for this event.");
                    return;
                }

                // External registration: redirect immediately
                if (data.registration_type === "external" && data.redirect_url) {
                    window.location.href = data.redirect_url;
                    return;
                }

                let formattedDate = "";
                let formattedTime = "";
                if (data.event_date) {
                    const d = new Date(data.event_date);
                    formattedDate = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
                    formattedTime = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
                }

                setEvent({
                    dbId: data.id,
                    slug: data.slug,
                    title: data.title,
                    date: formattedDate || "TBA",
                    time: formattedTime,
                    form_schema: Array.isArray(data.form_schema) ? data.form_schema : [],
                    registration_type: data.registration_type || "external",
                    redirect_url: data.redirect_url || null,
                    success_message: data.success_message || null,
                    whatsapp_group_url: data.whatsapp_group_url || null,
                    main_poster_url: data.main_poster_url || null,
                    venue: data.venue || null,
                    description: data.description || null,
                });
            } catch {
                setError("Failed to load event data. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        fetchEvent();
    }, [eventId]);

    const handleCustomChange = (fieldId: string, value: string | boolean) => {
        setCustomValues(prev => ({ ...prev, [fieldId]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!event) return;
        setSubmitError(null);

        if (!name.trim() || !email.trim() || !phone.trim() || !isIeeeMember) {
            setSubmitError("Name, email, phone, and IEEE membership status are required.");
            return;
        }

        if (isIeeeMember === "Yes" && !ieeeMembershipId.trim()) {
            setSubmitError("IEEE Membership ID is required for IEEE members.");
            return;
        }

        for (const field of event.form_schema) {
            if (field.required) {
                const val = customValues[field.id];
                if (val === undefined || val === "" || val === false) {
                    setSubmitError(`"${field.label}" is required.`);
                    return;
                }
            }
        }

        setIsSubmitting(true);
        try {
            const { error: insertError } = await supabase.from("registrations").insert({
                event_id: event.dbId,
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                form_data: {
                    ...customValues,
                    is_ieee_member: isIeeeMember,
                    ieee_membership_id: isIeeeMember === "Yes" ? ieeeMembershipId.trim() : "",
                },
                status: "pending",
            });
            if (insertError) throw insertError;
            setIsSubmitted(true);
        } catch (err: any) {
            setSubmitError(err?.message || "Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="relative min-h-screen bg-background overflow-hidden pb-16 pt-6">
                {/* Ambient Background Glows */}
                <div className="absolute top-24 left-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-[8s]" />
                <div className="absolute bottom-24 right-1/4 w-[450px] h-[450px] bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse duration-[10s]" />

                <div className="section-container">
                    {/* Back Button Skeleton */}
                    <div className="h-10 w-36 bg-secondary/20 rounded-xl animate-pulse mb-8" />

                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-6">
                        {/* Left Side: Flyer & Details Skeleton */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="aspect-[4/5] bg-secondary/15 rounded-3xl animate-pulse border border-border/40 shadow-sm" />
                            <div className="glass-panel p-6 rounded-3xl border border-border/80 space-y-4">
                                <div className="h-6 w-3/4 bg-secondary/20 rounded-lg animate-pulse" />
                                <div className="space-y-2.5">
                                    <div className="h-4 bg-secondary/15 rounded-lg animate-pulse" />
                                    <div className="h-4 w-5/6 bg-secondary/15 rounded-lg animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form Skeleton */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="glass-panel p-8 md:p-10 rounded-3xl border border-border/80 space-y-6">
                                <div className="space-y-2">
                                    <div className="h-7 w-1/3 bg-secondary/20 rounded-lg animate-pulse" />
                                    <div className="h-4 w-2/3 bg-secondary/15 rounded-lg animate-pulse" />
                                </div>
                                <div className="space-y-6 pt-4">
                                    {[1, 2, 3, 4].map(idx => (
                                        <div key={idx} className="space-y-2">
                                            <div className="h-4 w-1/4 bg-secondary/15 rounded-md animate-pulse" />
                                            <div className="h-12 bg-secondary/10 rounded-xl animate-pulse" />
                                        </div>
                                    ))}
                                </div>
                                <div className="h-14 bg-secondary/20 rounded-xl animate-pulse mt-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <section className="section-padding bg-background min-h-[75vh] flex items-center">
                <div className="section-container text-center">
                    <div className="max-w-md mx-auto bg-card/65 rounded-3xl border border-border/80 p-8 shadow-xl backdrop-blur-md">
                        <AlertCircle className="w-14 h-14 text-destructive mx-auto mb-4" />
                        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Registration Unavailable</h1>
                        <p className="text-muted-foreground font-body text-sm mb-6 leading-relaxed">{error || "This event could not be found."}</p>
                        <Button asChild variant="outline" className="rounded-xl px-6 py-5 font-secondary border-border/85 hover:bg-secondary/20 transition-all duration-200">
                            <Link href="/events" className="flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                <span>Browse Events</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    if (isSubmitted) {
        return (
            <div className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center py-16 px-4">
                {/* Ambient Background Glows */}
                <div className="absolute top-24 left-1/4 w-[350px] h-[350px] bg-secondary/15 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse duration-[8s]" />
                <div className="absolute bottom-24 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-[10s]" />

                <div className="max-w-md w-full bg-card rounded-3xl border border-border/90 p-8 md:p-10 shadow-2xl text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <div className="relative flex justify-center">
                        {/* Animated circular check halos */}
                        <div className="absolute inset-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-md animate-ping duration-[3s]" />
                        <div className="w-20 h-20 rounded-full bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-500/25 flex items-center justify-center relative">
                            <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400 animate-in zoom-in-75 duration-300" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/5 dark:bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/15">
                            Registration Confirmed
                        </span>
                        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground tracking-tight pt-1">
                            You're Registered!
                        </h1>
                        {event.success_message ? (
                            <p className="text-sm text-muted-foreground font-body leading-relaxed whitespace-pre-wrap pt-2">
                                {event.success_message}
                            </p>
                        ) : (
                            <p className="text-sm text-muted-foreground font-body leading-relaxed pt-2">
                                Congratulations! Your credentials have been successfully verified for <strong className="text-foreground">{event.title}</strong>. We will keep you updated.
                            </p>
                        )}
                    </div>

                    <div className="pt-2 space-y-3.5">
                        {event.whatsapp_group_url && (
                            <Button asChild className="w-full font-secondary py-6 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] hover:scale-[1.01] hover:shadow-md active:scale-95 text-white border-none shadow-sm gap-2.5 transition-all duration-300">
                                <a href={event.whatsapp_group_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2.5">
                                    <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Join official WhatsApp Group
                                </a>
                            </Button>
                        )}
                        <Button asChild variant="outline" className="w-full font-secondary py-6 rounded-xl hover:scale-[1.01] active:scale-95 transition-all duration-300">
                            <Link href={`/${event.slug}`}>View Event Details</Link>
                        </Button>
                        <Button asChild variant="ghost" className="w-full font-secondary py-6 rounded-xl text-muted-foreground hover:text-foreground transition-all duration-300">
                            <Link href="/events" className="flex items-center justify-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                <span>Browse Other Events</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const posterUrl = event.main_poster_url
        ? (event.main_poster_url.includes("res.cloudinary.com")
            ? event.main_poster_url.replace("/image/upload/", "/image/upload/f_auto,q_auto/")
            : event.main_poster_url)
        : null;

    return (
        <div className="relative min-h-screen bg-background overflow-hidden pb-16">
            {/* Ambient Background Glows */}
            <div className="absolute top-24 left-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-[8s]" />
            <div className="absolute bottom-24 right-1/4 w-[450px] h-[450px] bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse duration-[10s]" />

            {/* Back Button Navigation */}
            <section className="py-6">
                <div className="section-container">
                    <Button variant="ghost" asChild className="gap-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/20 transition-all duration-200 pl-3 pr-4 py-5">
                        <Link href={`/${event.slug}`}>
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Event details</span>
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="pt-0">
                <div className="section-container">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        
                        {/* Left Column: Event details card & flyer image */}
                        <div className="lg:col-span-5 space-y-6">
                            
                            {/* Flyer Container */}
                            {posterUrl && (
                                <div className="group rounded-3xl overflow-hidden border border-border/80 bg-card shadow-lg transition-all duration-500 hover:shadow-xl hover:border-primary/20">
                                    <div className="aspect-[4/5] relative bg-muted/20 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={posterUrl}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                        />
                                        {/* Ambient vignette shadow overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                                    </div>
                                </div>
                            )}

                            {/* Details Summary Card */}
                            <div className="bg-card rounded-3xl border border-border/80 p-6 shadow-md shadow-primary/5 space-y-5">
                                <div>
                                    <span className="text-[9px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                                        Event Metadata
                                    </span>
                                    <h2 className="text-xl font-heading font-bold text-foreground mt-3 tracking-tight">
                                        {event.title}
                                    </h2>
                                </div>

                                <div className="space-y-3.5 pt-1 border-t border-border/50">
                                    <div className="flex items-center gap-3.5 text-foreground/90">
                                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Calendar className="w-4 h-4" />
                                        </div>
                                        <div className="text-xs">
                                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-0.5">Date</p>
                                            <span className="font-body font-semibold">{event.date}</span>
                                        </div>
                                    </div>

                                    {event.time && (
                                        <div className="flex items-center gap-3.5 text-foreground/90">
                                            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                <Clock className="w-4 h-4" />
                                            </div>
                                            <div className="text-xs">
                                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-0.5">Time</p>
                                                <span className="font-body font-semibold">{event.time}</span>
                                            </div>
                                        </div>
                                    )}

                                    {event.venue && (
                                        <div className="flex items-center gap-3.5 text-foreground/90">
                                            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                <MapPin className="w-4 h-4" />
                                            </div>
                                            <div className="text-xs">
                                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-0.5">Venue</p>
                                                <span className="font-body font-semibold truncate block max-w-[280px]">{event.venue}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {event.description && (
                                    <div className="pt-3.5 border-t border-border/50 text-xs text-muted-foreground leading-relaxed font-body">
                                        <p className="line-clamp-4">{event.description}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Registration Form Panel */}
                        <div className="lg:col-span-7">
                            
                            <form 
                                onSubmit={handleSubmit} 
                                className="bg-card rounded-3xl border border-border/95 p-6 md:p-10 shadow-xl shadow-primary/5 space-y-7"
                            >
                                <div className="border-b border-border/50 pb-5 mb-1 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <Info className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-heading font-bold text-foreground">Register for {event.title}</h2>
                                        <p className="text-xs text-muted-foreground mt-0.5">Please provide verified contact details for registration tracking.</p>
                                    </div>
                                </div>

                                {/* Full Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="reg-name" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                        Full Name <span className="text-destructive">*</span>
                                    </Label>
                                    <Input 
                                        id="reg-name" 
                                        type="text" 
                                        placeholder="e.g. Sandra Philip" 
                                        value={name} 
                                        onChange={e => setName(e.target.value)} 
                                        className="w-full font-body px-4 py-3.5 rounded-xl border border-border/70 bg-background/30 focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/60 hover:bg-background/70 hover:border-primary/30" 
                                        required 
                                    />
                                </div>

                                {/* Email Address */}
                                <div className="space-y-2">
                                    <Label htmlFor="reg-email" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                        Email Address <span className="text-destructive">*</span>
                                    </Label>
                                    <Input 
                                        id="reg-email" 
                                        type="email" 
                                        placeholder="e.g. sandra@example.com" 
                                        value={email} 
                                        onChange={e => setEmail(e.target.value)} 
                                        className="w-full font-body px-4 py-3.5 rounded-xl border border-border/70 bg-background/30 focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/60 hover:bg-background/70 hover:border-primary/30" 
                                        required 
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="reg-phone" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                        Phone Number <span className="text-destructive">*</span>
                                    </Label>
                                    <Input 
                                        id="reg-phone" 
                                        type="tel" 
                                        placeholder="e.g. +91 9876543210" 
                                        value={phone} 
                                        onChange={e => setPhone(e.target.value)} 
                                        className="w-full font-body px-4 py-3.5 rounded-xl border border-border/70 bg-background/30 focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/60 hover:bg-background/70 hover:border-primary/30" 
                                        required 
                                    />
                                </div>

                                {/* IEEE Member Status */}
                                <div className="space-y-2">
                                    <Label htmlFor="reg-ieee-member" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                        Are you an IEEE Member? <span className="text-destructive">*</span>
                                    </Label>
                                    <div className="relative">
                                        <select
                                            id="reg-ieee-member"
                                            value={isIeeeMember}
                                            onChange={e => {
                                                setIsIeeeMember(e.target.value);
                                                if (e.target.value !== "Yes") {
                                                    setIeeeMembershipId("");
                                                }
                                            }}
                                            required
                                            className="w-full rounded-xl border border-border/70 bg-background/30 px-4 py-3.5 text-sm font-body text-foreground transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary hover:bg-background/70 hover:border-primary/30 appearance-none cursor-pointer"
                                        >
                                            <option value="" className="bg-background text-foreground">Select an option</option>
                                            <option value="Yes" className="bg-background text-foreground">Yes, I am an IEEE member</option>
                                            <option value="No" className="bg-background text-foreground">No, I am not an IEEE member</option>
                                        </select>
                                        {/* Custom styled select chevron dropdown marker */}
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* IEEE ID Input (Conditional) */}
                                {isIeeeMember === "Yes" && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <Label htmlFor="reg-ieee-id" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                            IEEE Membership ID <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="reg-ieee-id"
                                            type="text"
                                            placeholder="Enter your IEEE ID"
                                            value={ieeeMembershipId}
                                            onChange={e => setIeeeMembershipId(e.target.value)}
                                            className="w-full font-body px-4 py-3.5 rounded-xl border border-border/70 bg-background/30 focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/60 hover:bg-background/70 hover:border-primary/30"
                                            required
                                        />
                                    </div>
                                )}

                                {/* Custom Fields Section Divider */}
                                {event.form_schema.length > 0 && (
                                    <div className="border-b border-border/50 pt-5 pb-3 mb-1">
                                        <h2 className="text-base font-heading font-bold text-foreground">Event Questionnaire</h2>
                                        <p className="text-xs text-muted-foreground mt-0.5">Please fill out these specific event coordinator questionnaire slots.</p>
                                    </div>
                                )}

                                {/* Dynamic Custom Fields from form_schema */}
                                {event.form_schema.map(field => (
                                    <div key={field.id} className="space-y-2">
                                        <Label htmlFor={`field-${field.id}`} className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                            {field.label}
                                            {field.required && <span className="text-destructive"> *</span>}
                                        </Label>

                                        {field.type === "textarea" ? (
                                            <textarea
                                                id={`field-${field.id}`}
                                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                                value={(customValues[field.id] as string) || ""}
                                                onChange={e => handleCustomChange(field.id, e.target.value)}
                                                required={field.required}
                                                rows={3}
                                                className="w-full rounded-xl border border-border/70 bg-background/30 px-4 py-3.5 text-sm font-body ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary transition-all duration-300 resize-none hover:bg-background/70 hover:border-primary/30"
                                            />
                                        ) : field.type === "select" && field.options?.length > 0 ? (
                                            <div className="relative">
                                                <select
                                                    id={`field-${field.id}`}
                                                    value={(customValues[field.id] as string) || ""}
                                                    onChange={e => handleCustomChange(field.id, e.target.value)}
                                                    required={field.required}
                                                    className="w-full rounded-xl border border-border/70 bg-background/30 px-4 py-3.5 text-sm font-body text-foreground transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary hover:bg-background/70 hover:border-primary/30 appearance-none cursor-pointer"
                                                >
                                                    <option value="" className="bg-background text-foreground">Select an option</option>
                                                    {field.options.map(opt => (
                                                        <option key={opt} value={opt} className="bg-background text-foreground">{opt}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ) : field.type === "checkbox" ? (
                                            <div className="flex items-center gap-3 py-1.5">
                                                <input
                                                    id={`field-${field.id}`}
                                                    type="checkbox"
                                                    checked={!!customValues[field.id]}
                                                    onChange={e => handleCustomChange(field.id, e.target.checked)}
                                                    required={field.required}
                                                    className="h-5 w-5 rounded-lg border-border/70 bg-background/30 text-primary focus:ring-primary/10 cursor-pointer accent-primary transition-all duration-200"
                                                />
                                                <span 
                                                    className="text-sm font-medium text-foreground/80 font-body select-none cursor-pointer hover:text-foreground transition-all duration-200" 
                                                    onClick={() => handleCustomChange(field.id, !customValues[field.id])}
                                                >
                                                    {field.label}
                                                </span>
                                            </div>
                                        ) : (
                                            <Input
                                                id={`field-${field.id}`}
                                                type={field.type === "number" ? "number" : "text"}
                                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                                value={(customValues[field.id] as string) || ""}
                                                onChange={e => handleCustomChange(field.id, e.target.value)}
                                                required={field.required}
                                                className="w-full font-body px-4 py-3.5 rounded-xl border border-border/70 bg-background/30 focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/60 hover:bg-background/70 hover:border-primary/30"
                                            />
                                        )}
                                    </div>
                                ))}

                                {/* Error Alert panel */}
                                {submitError && (
                                    <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-xs font-semibold text-destructive flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1">
                                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                        <span>{submitError}</span>
                                    </div>
                                )}

                                {/* Action Button */}
                                <Button 
                                    type="submit" 
                                    size="lg" 
                                    className="w-full font-secondary font-bold text-xs py-6 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 active:scale-[0.98]" 
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 className="w-4.5 h-4.5 animate-spin" />
                                            <span>Registering Credentials...</span>
                                        </span>
                                    ) : "Complete Registration"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

