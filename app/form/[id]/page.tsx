"use client";

import { useState, useEffect, use } from "react";
import { supabase } from "@/lib/supabase";
import {
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
  Calendar,
  Sparkles,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

interface FormField {
  id: string;
  label: string;
  type: "text" | "number" | "textarea" | "select" | "checkbox";
  required: boolean;
  options: string[];
}

interface CustomForm {
  id: string;
  title: string;
  description: string | null;
  fields: FormField[];
  created_at: string;
}

export default function PublicCustomFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [form, setForm] = useState<CustomForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form Submission
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 1. Fetch Form Definition
  useEffect(() => {
    async function fetchForm() {
      try {
        const { data, error } = await supabase
          .from("custom_forms")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) {
          setForm({
            id: data.id,
            title: data.title,
            description: data.description,
            fields: Array.isArray(data.fields) ? (data.fields as FormField[]) : [],
            created_at: data.created_at
          });

          // Initialize form inputs
          const initialData: Record<string, any> = {};
          (data.fields as FormField[]).forEach(f => {
            if (f.type === "checkbox") {
              initialData[f.id] = [];
            } else {
              initialData[f.id] = "";
            }
          });
          setFormData(initialData);
        }
      } catch (err: any) {
        console.error(err);
        setError("Form not found or database link failed.");
      } finally {
        setLoading(false);
      }
    }

    fetchForm();
  }, [id]);

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleCheckboxChange = (fieldId: string, option: string, checked: boolean) => {
    const currentList = Array.isArray(formData[fieldId]) ? [...formData[fieldId]] : [];
    if (checked) {
      if (!currentList.includes(option)) currentList.push(option);
    } else {
      const idx = currentList.indexOf(option);
      if (idx > -1) currentList.splice(idx, 1);
    }
    handleInputChange(fieldId, currentList);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    if (!form) return;

    // Validate inputs based on requirements
    for (const field of form.fields) {
      const val = formData[field.id];
      
      // Check required
      if (field.required) {
        if (field.type === "checkbox") {
          if (!Array.isArray(val) || val.length === 0) {
            setSubmitError(`"${field.label}" requires at least one selection.`);
            setIsSubmitting(false);
            return;
          }
        } else if (!val || String(val).trim() === "") {
          setSubmitError(`"${field.label}" is a required field.`);
          setIsSubmitting(false);
          return;
        }
      }

      // Check general validation patterns (emails / phones)
      if (val && typeof val === "string" && val.trim() !== "") {
        const lowerLabel = field.label.toLowerCase();
        if (lowerLabel.includes("email")) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val.trim())) {
            setSubmitError(`Please enter a valid email address for "${field.label}".`);
            setIsSubmitting(false);
            return;
          }
        }
        if (lowerLabel.includes("phone") || lowerLabel.includes("whatsapp") || lowerLabel.includes("contact")) {
          const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;
          if (!phoneRegex.test(val.trim())) {
            setSubmitError(`Please enter a valid phone number for "${field.label}".`);
            setIsSubmitting(false);
            return;
          }
        }
      }
    }

    try {
      // Post to custom_form_responses
      const { error } = await supabase
        .from("custom_form_responses")
        .insert([
          {
            form_id: form.id,
            response_data: formData
          }
        ]);

      if (error) throw error;
      setIsSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || "Failed to submit form responses. Please check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20 px-4">
        <div className="max-w-md w-full glass-panel border border-border p-8 text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h2 className="text-xl font-bold text-foreground">Form Loading Failure</h2>
          <p className="text-sm text-muted-foreground">{error || "The form you are looking for does not exist or has been removed."}</p>
          <Link href="/">
            <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium bg-secondary/35 px-4 py-2 rounded-xl border border-border/50 cursor-pointer mt-4">
              <ArrowLeft className="h-4 w-4" /> Go back home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative pb-20 pt-24 md:pt-32">
      {/* Ambient background glow */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/5 to-transparent -z-10 blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4">
        
        {isSubmitted ? (
          /* Submission success view */
          <div className="glass-panel border border-border p-8 md:p-12 text-center space-y-6 relative overflow-hidden animate-in zoom-in-95 duration-350">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />
            
            <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 flex items-center justify-center rounded-full mx-auto">
              <CheckCircle className="h-10 w-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-heading text-foreground flex items-center justify-center gap-2">
                Response Received <Sparkles className="h-5 w-5 text-amber-500" />
              </h2>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Thank you! Your form response has been successfully cataloged and verified in our database records.
              </p>
            </div>

            <div className="pt-4 border-t border-border/40 max-w-sm mx-auto">
              <Link href="/">
                <button className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold bg-secondary/40 text-foreground hover:bg-secondary border border-border/60 py-2.5 px-4 rounded-xl cursor-pointer">
                  Return to Home
                </button>
              </Link>
            </div>
          </div>
        ) : (
          /* Form rendering view */
          <form onSubmit={handleSubmit} className="glass-panel border border-border p-6 md:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
            
            <div className="border-b border-border/50 pb-4">
              <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">{form.title}</h1>
              {form.description && (
                <p className="text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed whitespace-pre-wrap">
                  {form.description}
                </p>
              )}
              <div className="flex items-center gap-1.5 mt-3 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider bg-secondary/40 border border-border/40 py-1 px-2 rounded w-fit">
                <Calendar className="h-3 w-3" /> Published on {new Date(form.created_at).toLocaleDateString()}
              </div>
            </div>

            {/* Submitter inputs list */}
            <div className="space-y-5">
              {form.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <label htmlFor={field.id} className="text-sm font-semibold flex items-center gap-1">
                    {field.label}
                    {field.required && <span className="text-destructive font-bold">*</span>}
                  </label>

                  {/* Short Text */}
                  {field.type === "text" && (
                    <input
                      id={field.id}
                      type="text"
                      required={field.required}
                      value={formData[field.id] || ""}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="flex h-10 w-full rounded-xl border border-input bg-card/65 px-4 py-2 text-sm shadow-sm transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-foreground placeholder:text-muted-foreground/60"
                      placeholder="Your answer"
                    />
                  )}

                  {/* Number */}
                  {field.type === "number" && (
                    <input
                      id={field.id}
                      type="number"
                      required={field.required}
                      value={formData[field.id] || ""}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="flex h-10 w-full rounded-xl border border-input bg-card/65 px-4 py-2 text-sm shadow-sm transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-foreground placeholder:text-muted-foreground/60"
                      placeholder="Your number answer"
                    />
                  )}

                  {/* Long text */}
                  {field.type === "textarea" && (
                    <textarea
                      id={field.id}
                      required={field.required}
                      rows={4}
                      value={formData[field.id] || ""}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="flex min-h-[80px] w-full rounded-xl border border-input bg-card/65 px-4 py-2.5 text-sm shadow-sm transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-foreground placeholder:text-muted-foreground/60"
                      placeholder="Your detailed answer"
                    />
                  )}

                  {/* Dropdown Select */}
                  {field.type === "select" && (
                    <select
                      id={field.id}
                      required={field.required}
                      value={formData[field.id] || ""}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="flex h-10 w-full rounded-xl border border-input bg-card/65 px-4 py-1.5 text-sm shadow-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-foreground"
                    >
                      <option value="">Select choice option</option>
                      {field.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}

                  {/* Checklist options */}
                  {field.type === "checkbox" && (
                    <div className="space-y-2 border border-border/40 p-4 rounded-xl bg-secondary/10">
                      {field.options.map(opt => {
                        const checked = Array.isArray(formData[field.id]) && formData[field.id].includes(opt);
                        return (
                          <label key={opt} className="flex items-center gap-2.5 cursor-pointer select-none text-sm font-medium">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => handleCheckboxChange(field.id, opt, e.target.checked)}
                              className="rounded border-input text-primary focus:ring-primary h-4.5 w-4.5 cursor-pointer"
                            />
                            <span className="text-foreground">{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Error alerts */}
            {submitError && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-xs text-destructive flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Action submit */}
            <div className="border-t border-border/40 pt-4 mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/95 shadow-md shadow-primary/20 py-2.5 px-4 rounded-xl transition-all disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" /> Submitting response...
                  </>
                ) : (
                  "Submit Form"
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
