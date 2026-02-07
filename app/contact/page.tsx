"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              Have questions or want to get involved? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-card">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      Address
                    </h3>
                    <p className="text-muted-foreground font-body">
                      SCT College of Engineering<br />
                      Pappanamcode, Trivandrum<br />
                      Kerala, India - 695018
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:ieee@sctce.ac.in"
                      className="text-primary hover:underline font-body"
                    >
                      ieee@sctce.ac.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      Phone
                    </h3>
                    <p className="text-muted-foreground font-body">
                      +91 XXX XXX XXXX
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-background rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-secondary">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="font-body"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-secondary">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="font-body"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-secondary">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Message subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="font-body"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-secondary">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    className="font-body min-h-[150px]"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full font-secondary gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
