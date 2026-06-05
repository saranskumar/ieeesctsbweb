"use client";

import Link from "next/link";
import { useState, useEffect, use } from "react";
import { ArrowLeft, CheckCircle, Loader2, AlertCircle, Calendar, MapPin, Clock, Info, UploadCloud, X, Check, Copy } from "lucide-react";
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
    upi_id: string;
    payment_instructions: string | null;
    sbc_id: string | null;
    tier_non_ieee_name: string;
    tier_non_ieee_fee: number;
    tier_ieee_name: string;
    tier_ieee_fee: number;
    tier_sbc_name: string;
    tier_sbc_fee: number;
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
    const [isSbcMember, setIsSbcMember] = useState("");

    // Payment states
    const [paymentMode, setPaymentMode] = useState("");
    const [paymentProofUrl, setPaymentProofUrl] = useState("");
    const [isUploadingProof, setIsUploadingProof] = useState(false);
    const [dragActiveProof, setDragActiveProof] = useState(false);
    // Dynamic form_schema field values keyed by field id
    const [customValues, setCustomValues] = useState<Record<string, string | boolean>>({});

    // Dynamically calculate resolved fee and tier name based on member inputs
    const getResolvedPricing = () => {
        if (!event) return { fee: 0, tierName: "Free" };

        const isFree = event.tier_non_ieee_fee === 0 && event.tier_ieee_fee === 0 && event.tier_sbc_fee === 0;
        if (isFree) return { fee: 0, tierName: "Free" };

        if (isIeeeMember === "No" || !isIeeeMember) {
            return { fee: event.tier_non_ieee_fee, tierName: event.tier_non_ieee_name };
        }

        // IEEE Member status is "Yes"
        if (event.sbc_id && isSbcMember === "Yes") {
            return { fee: event.tier_sbc_fee, tierName: event.tier_sbc_name };
        }

        return { fee: event.tier_ieee_fee, tierName: event.tier_ieee_name };
    };

    const { fee: resolvedFee, tierName: resolvedTierName } = getResolvedPricing();

    useEffect(() => {
        async function fetchEvent() {
            try {
                const { data, error: fetchErr } = await supabase
                    .from("events")
                    .select("id, title, slug, event_date, status, form_schema, registration_type, redirect_url, success_message, whatsapp_group_url, main_poster_url, venue, description, event_fee, upi_id, payment_instructions, sbc_id, tier_non_ieee_name, tier_non_ieee_fee, tier_ieee_name, tier_ieee_fee, tier_sbc_name, tier_sbc_fee")
                    .eq("slug", eventId)
                    .maybeSingle();

                if (fetchErr || !data) {
                    setError("Event not found.");
                    return;
                }

                if (data.status !== "open") {
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
                    upi_id: data.upi_id || "ieee-sctsb@upi",
                    payment_instructions: data.payment_instructions || null,
                    sbc_id: data.sbc_id || null,
                    tier_non_ieee_name: data.tier_non_ieee_name || "Non-IEEE Member",
                    tier_non_ieee_fee: Number(data.tier_non_ieee_fee || 0),
                    tier_ieee_name: data.tier_ieee_name || "IEEE Member",
                    tier_ieee_fee: Number(data.tier_ieee_fee || 0),
                    tier_sbc_name: data.tier_sbc_name || "IEEE SBC Member",
                    tier_sbc_fee: Number(data.tier_sbc_fee || 0),
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

    const compressImageIfNeeded = (file: File): Promise<File> => {
        return new Promise((resolve) => {
            if (file.size <= 1024 * 1024) {
                resolve(file);
                return;
            }

            const img = new Image();
            const objectUrl = URL.createObjectURL(file);
            img.src = objectUrl;

            img.onload = () => {
                URL.revokeObjectURL(objectUrl);
                
                let width = img.width;
                let height = img.height;
                const maxDim = 1600;
                if (width > maxDim || height > maxDim) {
                    if (width > height) {
                        height = Math.round((height * maxDim) / width);
                        width = maxDim;
                    } else {
                        width = Math.round((width * maxDim) / height);
                        height = maxDim;
                    }
                }

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    resolve(file);
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                                type: "image/jpeg",
                                lastModified: Date.now()
                            });
                            resolve(compressedFile);
                        } else {
                            resolve(file);
                        }
                    },
                    "image/jpeg",
                    0.8
                );
            };

            img.onerror = () => {
                resolve(file);
            };
        });
    };

    const handleProofUpload = async (rawFile: File) => {
        if (!rawFile.type.startsWith("image/")) {
            alert("Please upload a valid image file (PNG, JPG, or WEBP) as payment proof.");
            return;
        }

        let file = rawFile;
        if (rawFile.size > 1024 * 1024) {
            try {
                setIsUploadingProof(true);
                file = await compressImageIfNeeded(rawFile);
            } catch (err) {
                console.error("Compression failed:", err);
            } finally {
                setIsUploadingProof(false);
            }
        }

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            // Fallback: Read as Base64
            if (file.size > 2.5 * 1024 * 1024) {
                alert("Payment proof screenshot must be less than 2.5MB to save directly.");
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setPaymentProofUrl(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
            return;
        }

        try {
            setIsUploadingProof(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset);

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!res.ok) {
                throw new Error("Failed to upload screenshot to Cloudinary. Verify your connection.");
            }

            const data = await res.json();
            if (data.secure_url) {
                setPaymentProofUrl(data.secure_url);
            } else {
                throw new Error("Invalid Cloudinary upload response.");
            }
        } catch (error: any) {
            alert(error.message || "An error occurred during file upload.");
        } finally {
            setIsUploadingProof(false);
        }
    };

    const handleProofFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleProofUpload(file);
        }
    };

    const handleProofDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActiveProof(true);
        } else if (e.type === "dragleave") {
            setDragActiveProof(false);
        }
    };

    const handleProofDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActiveProof(false);
        
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleProofUpload(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!event) return;
        setSubmitError(null);

        if (!name.trim() || !email.trim() || !phone.trim() || !isIeeeMember) {
            setSubmitError("Name, email, phone, and IEEE membership status are required.");
            return;
        }

        const cleanedPhone = phone.trim().replace(/\D/g, "");
        if (cleanedPhone.length !== 10) {
            setSubmitError("Please enter a valid 10-digit phone number.");
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

        if (resolvedFee > 0) {
            if (!paymentMode) {
                setSubmitError("Please select a payment mode.");
                return;
            }
            if (!paymentProofUrl) {
                setSubmitError("Please upload a screenshot of your payment proof.");
                return;
            }
        }

        setIsSubmitting(true);
        try {
            const { error: insertError } = await supabase.from("registrations").insert({
                event_id: event.dbId,
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                payment_proof_url: resolvedFee > 0 ? paymentProofUrl : null,
                form_data: {
                    ...customValues,
                    is_ieee_member: isIeeeMember,
                    ieee_membership_id: isIeeeMember === "Yes" ? ieeeMembershipId.trim() : "",
                    is_sbc_member: (event.sbc_id && isIeeeMember === "Yes") ? isSbcMember : "No",
                    payment_mode: resolvedFee > 0 ? paymentMode : "Free",
                    payment_tier: resolvedTierName,
                    amount_paid: resolvedFee,
                },
                status: "pending",
            });
            if (insertError) throw insertError;

            // Save registration entry locally in localStorage to persist registered events
            const regEntry = {
                eventId: event.slug,
                dbId: event.dbId,
                eventTitle: event.title,
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                status: "pending",
                registeredAt: new Date().toISOString(),
            };
            try {
                const cached = JSON.parse(localStorage.getItem("sctsb_registrations") || "[]");
                const filtered = cached.filter((r: any) => r.eventId !== event.slug);
                localStorage.setItem("sctsb_registrations", JSON.stringify([...filtered, regEntry]));
            } catch (e) {
                console.error("Local storage sync error:", e);
            }

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
                                    <div className="flex">
                                        <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-border/70 bg-secondary/15 text-sm font-semibold text-muted-foreground select-none">
                                            +91
                                        </span>
                                        <Input 
                                            id="reg-phone" 
                                            type="tel" 
                                            maxLength={10}
                                            placeholder="9876543210" 
                                            value={phone} 
                                            onChange={e => {
                                                const val = e.target.value.replace(/\D/g, "");
                                                setPhone(val.slice(0, 10));
                                            }} 
                                            className="w-full font-body px-4 py-3.5 rounded-r-xl rounded-l-none border border-border/70 bg-background/30 focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/60 hover:bg-background/70 hover:border-primary/30" 
                                            required 
                                        />
                                    </div>
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

                                {/* SBC Membership check (Conditional on sbc_id and isIeeeMember === "Yes") */}
                                {isIeeeMember === "Yes" && event.sbc_id && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <Label htmlFor="reg-sbc-member" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                            Are you a member of IEEE {event.sbc_id.toUpperCase()} Chapter? <span className="text-destructive">*</span>
                                        </Label>
                                        <div className="relative">
                                            <select
                                                id="reg-sbc-member"
                                                value={isSbcMember}
                                                onChange={e => setIsSbcMember(e.target.value)}
                                                required
                                                className="w-full rounded-xl border border-border/70 bg-background/30 px-4 py-3.5 text-sm font-body text-foreground transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary hover:bg-background/70 hover:border-primary/30 appearance-none cursor-pointer"
                                            >
                                                <option value="" className="bg-background text-foreground">Select an option</option>
                                                <option value="Yes" className="bg-background text-foreground">Yes, I am a member of IEEE {event.sbc_id.toUpperCase()}</option>
                                                <option value="No" className="bg-background text-foreground">No, I am not a member of IEEE {event.sbc_id.toUpperCase()}</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                                </svg>
                                            </div>
                                        </div>
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

                                {/* Payment Configuration Block (Conditional on resolvedFee > 0) */}
                                {resolvedFee > 0 && (
                                    <div className="border-t border-border/50 pt-6 space-y-6 animate-in fade-in duration-300">
                                        <div className="border-b border-border/50 pb-3 mb-1 flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                <Info className="w-4.5 h-4.5" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Registration Payment</h3>
                                                <p className="text-[10px] text-muted-foreground mt-0.5">This event requires a registration fee of INR {resolvedFee} ({resolvedTierName}).</p>
                                            </div>
                                        </div>

                                        {/* Payment Mode Selector */}
                                        <div className="space-y-2">
                                            <Label htmlFor="payment-mode" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                                Payment Mode <span className="text-destructive">*</span>
                                            </Label>
                                            <div className="relative">
                                                <select
                                                    id="payment-mode"
                                                    value={paymentMode}
                                                    onChange={e => {
                                                        setPaymentMode(e.target.value);
                                                        setPaymentProofUrl(""); // clear uploaded proof if mode changes
                                                    }}
                                                    required
                                                    className="w-full rounded-xl border border-border/70 bg-background/30 px-4 py-3.5 text-sm font-body text-foreground transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary hover:bg-background/70 hover:border-primary/30 appearance-none cursor-pointer"
                                                >
                                                    <option value="" className="bg-background text-foreground">Select a payment mode</option>
                                                    <option value="UPI" className="bg-background text-foreground">UPI (Instant Verification)</option>
                                                    <option value="Bank Transfer" className="bg-background text-foreground">Bank Transfer / IMPS</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* UPI Payment Flow */}
                                        {paymentMode === "UPI" && (
                                            <div className="bg-secondary/10 border border-border/80 rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                                <div className="flex flex-col md:flex-row items-center gap-5 justify-between">
                                                    <div className="space-y-2 text-center md:text-left">
                                                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                                                            Pay with UPI QR
                                                        </span>
                                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                                            Scan the QR code using any UPI app (GPay, PhonePe, Paytm) or copy the UPI ID below to pay <strong className="text-foreground">INR {resolvedFee}</strong>.
                                                        </p>
                                                        <div className="flex items-center gap-2 justify-center md:justify-start pt-1.5">
                                                            <span className="font-mono text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-background/50 select-all">
                                                                {event.upi_id}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(event.upi_id);
                                                                    alert("UPI ID copied to clipboard!");
                                                                }}
                                                                className="p-2 rounded-lg border border-border bg-background hover:bg-secondary/40 text-muted-foreground hover:text-foreground transition cursor-pointer"
                                                                title="Copy UPI ID"
                                                            >
                                                                <Copy className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="shrink-0 bg-white p-3 rounded-2xl border border-border shadow-sm flex items-center justify-center">
                                                        <img
                                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                                                                `upi://pay?pa=${event.upi_id}&pn=${encodeURIComponent(event.title)}&am=${resolvedFee}&cu=INR`
                                                            )}`}
                                                            alt="UPI Payment QR Code"
                                                            className="w-32 h-32 object-contain"
                                                        />
                                                    </div>
                                                </div>

                                                {event.payment_instructions && (
                                                    <div className="text-[11px] text-muted-foreground border-t border-border/50 pt-3 font-body leading-relaxed whitespace-pre-wrap">
                                                        <strong className="text-foreground block mb-1">Instructions:</strong>
                                                        {event.payment_instructions}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Bank Transfer Info Flow */}
                                        {paymentMode === "Bank Transfer" && (
                                            <div className="bg-secondary/10 border border-border/80 rounded-2xl p-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                                <span className="text-[9px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                                                    Bank Account Details
                                                </span>
                                                {event.payment_instructions ? (
                                                    <p className="text-xs text-muted-foreground font-body leading-relaxed whitespace-pre-wrap pt-1">
                                                        {event.payment_instructions}
                                                    </p>
                                                ) : (
                                                    <p className="text-xs text-muted-foreground italic font-body">
                                                        Please complete the transfer to the official bank account listed in the instructions.
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {/* Payment Receipt / Screenshot Uploader */}
                                        {paymentMode && (
                                            <div className="space-y-2 animate-in fade-in duration-300">
                                                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                                    Upload Payment Proof / Screenshot <span className="text-destructive">*</span>
                                                </Label>

                                                {!paymentProofUrl ? (
                                                    <div
                                                        onDragEnter={handleProofDrag}
                                                        onDragOver={handleProofDrag}
                                                        onDragLeave={handleProofDrag}
                                                        onDrop={handleProofDrop}
                                                        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 transition-all duration-300 text-center cursor-pointer ${
                                                            dragActiveProof
                                                                ? "border-primary bg-primary/5 shadow-md scale-[1.01]"
                                                                : "border-border hover:border-primary/40 hover:bg-secondary/10"
                                                        }`}
                                                    >
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleProofFileChange}
                                                            disabled={isUploadingProof}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                        />
                                                        {isUploadingProof ? (
                                                            <div className="flex flex-col items-center gap-2">
                                                                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                                                <p className="text-xs font-semibold text-foreground mt-1">Uploading proof...</p>
                                                                <p className="text-[10px] text-muted-foreground">Compressing and sending screenshot...</p>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center gap-2">
                                                                <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center text-muted-foreground mb-1">
                                                                    <UploadCloud className="w-5 h-5 text-primary" />
                                                                </div>
                                                                <p className="text-xs font-bold text-foreground">
                                                                    Drag & Drop Receipt or Click to Browse
                                                                </p>
                                                                <p className="text-[10px] text-muted-foreground">
                                                                    Supports PNG, JPG, or WEBP. Max size 2.5MB.
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="relative rounded-2xl border border-border bg-secondary/15 p-3 flex items-center gap-3 group animate-in zoom-in-95 duration-200">
                                                        <div className="w-12 h-15 rounded-lg overflow-hidden border border-border shrink-0 bg-white">
                                                            <img
                                                                src={paymentProofUrl}
                                                                alt="Screenshot Preview"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-bold text-foreground truncate">Screenshot uploaded successfully</p>
                                                            <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                                                                <Check className="w-3 h-3" /> Ready to Submit
                                                            </p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => setPaymentProofUrl("")}
                                                            className="p-1.5 rounded-lg border border-border bg-background hover:bg-secondary/40 text-muted-foreground hover:text-foreground transition cursor-pointer"
                                                            title="Remove screenshot"
                                                        >
                                                            <X className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

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

