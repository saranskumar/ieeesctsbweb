"use client";

import Link from "next/link";
import { useState, useEffect, use } from "react";
import { ArrowLeft, CheckCircle, Loader2, AlertCircle } from "lucide-react";
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
    // Dynamic form_schema field values keyed by field id
    const [customValues, setCustomValues] = useState<Record<string, string | boolean>>({});

    useEffect(() => {
        async function fetchEvent() {
            try {
                const { data, error: fetchErr } = await supabase
                    .from("events")
                    .select("id, title, slug, event_date, status, form_schema, registration_type, redirect_url, success_message, whatsapp_group_url")
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

        if (!name.trim() || !email.trim() || !phone.trim()) {
            setSubmitError("Name, email, and phone are required.");
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
                form_data: customValues,
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
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !event) {
        return (
            <section className="section-padding bg-background min-h-[60vh] flex items-center">
                <div className="section-container text-center">
                    <div className="max-w-md mx-auto">
                        <AlertCircle className="w-14 h-14 text-destructive mx-auto mb-4" />
                        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Registration Unavailable</h1>
                        <p className="text-muted-foreground font-body mb-6">{error || "This event could not be found."}</p>
                        <Button asChild variant="outline"><Link href="/events">Browse Events</Link></Button>
                    </div>
                </div>
            </section>
        );
    }

    if (isSubmitted) {
        return (
            <section className="section-padding bg-background min-h-[60vh] flex items-center">
                <div className="section-container text-center">
                    <div className="max-w-md mx-auto bg-card rounded-2xl border border-border p-8 shadow-lg">
                        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Registration Successful!</h1>
                        {event.success_message ? (
                            <p className="text-muted-foreground font-body mb-6 whitespace-pre-wrap">
                                {event.success_message}
                            </p>
                        ) : (
                            <p className="text-muted-foreground font-body mb-6">
                                You've registered for <strong>{event.title}</strong>. We'll be in touch with further details.
                            </p>
                        )}
                        <div className="space-y-3">
                            {event.whatsapp_group_url && (
                                <Button asChild className="w-full font-secondary bg-[#25D366] hover:bg-[#20ba5a] text-white border-none shadow-sm gap-2">
                                    <a href={event.whatsapp_group_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Join WhatsApp Group
                                    </a>
                                </Button>
                            )}
                            <Button asChild className="w-full font-secondary">
                                <Link href={`/${event.slug}`}>View Event Details</Link>
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
            <section className="py-4 bg-background">
                <div className="section-container">
                    <Button variant="ghost" asChild className="gap-2 text-muted-foreground hover:text-foreground">
                        <Link href={`/${event.slug}`}>
                            <ArrowLeft className="w-4 h-4" />
                            Back to Event
                        </Link>
                    </Button>
                </div>
            </section>

            <section className="section-padding bg-background pt-0">
                <div className="section-container">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Event Registration</h1>
                            <p className="text-muted-foreground font-body">
                                Register for <strong>{event.title}</strong>
                            </p>
                            {event.date && (
                                <p className="text-sm text-primary font-secondary mt-1">
                                    {event.date}{event.time && ` • ${event.time}`}
                                </p>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-6">
                            {/* Core Fields */}
                            <div className="space-y-2">
                                <Label htmlFor="reg-name" className="font-secondary">
                                    Full Name <span className="text-destructive">*</span>
                                </Label>
                                <Input id="reg-name" type="text" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} className="font-body" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reg-email" className="font-secondary">
                                    Email Address <span className="text-destructive">*</span>
                                </Label>
                                <Input id="reg-email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="font-body" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reg-phone" className="font-secondary">
                                    Phone Number <span className="text-destructive">*</span>
                                </Label>
                                <Input id="reg-phone" type="tel" placeholder="Enter your phone number" value={phone} onChange={e => setPhone(e.target.value)} className="font-body" required />
                            </div>

                            {/* Dynamic Custom Fields from form_schema */}
                            {event.form_schema.map(field => (
                                <div key={field.id} className="space-y-2">
                                    <Label htmlFor={`field-${field.id}`} className="font-secondary">
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
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                                        />
                                    ) : field.type === "select" && field.options?.length > 0 ? (
                                        <select
                                            id={`field-${field.id}`}
                                            value={(customValues[field.id] as string) || ""}
                                            onChange={e => handleCustomChange(field.id, e.target.value)}
                                            required={field.required}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        >
                                            <option value="">Select an option</option>
                                            {field.options.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : field.type === "checkbox" ? (
                                        <div className="flex items-center gap-2">
                                            <input
                                                id={`field-${field.id}`}
                                                type="checkbox"
                                                checked={!!customValues[field.id]}
                                                onChange={e => handleCustomChange(field.id, e.target.checked)}
                                                required={field.required}
                                                className="h-4 w-4 rounded border-input"
                                            />
                                            <span className="text-sm text-muted-foreground font-body">{field.label}</span>
                                        </div>
                                    ) : (
                                        <Input
                                            id={`field-${field.id}`}
                                            type={field.type === "number" ? "number" : "text"}
                                            placeholder={`Enter ${field.label.toLowerCase()}`}
                                            value={(customValues[field.id] as string) || ""}
                                            onChange={e => handleCustomChange(field.id, e.target.value)}
                                            required={field.required}
                                            className="font-body"
                                        />
                                    )}
                                </div>
                            ))}

                            {submitError && (
                                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                    {submitError}
                                </div>
                            )}

                            <Button type="submit" size="lg" className="w-full font-secondary" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</>
                                ) : "Complete Registration"}
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

