import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-card border-t border-border">
            <div className="section-container py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="relative w-14 h-14 flex-shrink-0">
                                <img
                                    src="/logo.png"
                                    alt="IEEE SCT SB Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <p className="font-heading font-semibold text-foreground">
                                    IEEE SCT SB
                                </p>
                                <p className="text-xs text-muted-foreground font-secondary">
                                    Student Branch
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground font-body leading-relaxed">
                            Advancing technology for the benefit of humanity through innovation, education, and collaboration.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-semibold text-foreground mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            {["About", "Events", "Chapters", "Gallery", "Contact"].map((link) => (
                                <li key={link}>
                                    <Link
                                        href={`/${link.toLowerCase()}`}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors font-body"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading font-semibold text-foreground mb-4">
                            Contact Us
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground font-body">
                                    SCT College of Engineering, Pappanamcode, Trivandrum
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                                <a
                                    href="mailto:mailtoieeesctsb@gmail.com"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-body"
                                >
                                    mailtoieeesctsb@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="text-sm text-muted-foreground font-body">
                                   +91 9567694707
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-heading font-semibold text-foreground mb-4">
                            Follow Us
                        </h4>
                        <div className="flex gap-3">
                            {[
                                { icon: Facebook, label: "Facebook" },
                                { icon: Twitter, label: "Twitter" },
                                { icon: Linkedin, label: "LinkedIn" },
                                { icon: Instagram, label: "Instagram" },
                            ].map(({ icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href="#"
                                    aria-label={label}
                                    className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border flex flex-col items-center gap-4">
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground font-body">
                        <a href="https://www.ieee.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">IEEE.org</a>
                        <span>|</span>
                        <a href="https://ieeexplore.ieee.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">IEEE Xplore Digital Library</a>
                        <span>|</span>
                        <a href="https://standards.ieee.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">IEEE Standards</a>
                        <span>|</span>
                        <a href="https://spectrum.ieee.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">IEEE Spectrum</a>
                        <span>|</span>
                        <a href="https://ieee-kerala.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">IEEE Kerala Section</a>
                        <span>|</span>
                        <a href="https://www.ieeer10.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">IEEE Region 10</a>
                        <span>|</span>
                        <a href="https://www.ieee.org/sitemap" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">More Sites</a>
                    </div>
                    <p className="text-center text-sm text-muted-foreground font-body">
                        © {new Date().getFullYear()} IEEE SCT Student Branch. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
