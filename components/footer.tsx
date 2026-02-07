import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-card text-card-foreground border-t border-border">
            <div className="section-container py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 flex-shrink-0">
                                <img
                                    src="/logo.png"
                                    alt="IEEE SCT SB Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-lg leading-tight">
                                    IEEE SCT SB
                                </h3>
                                <p className="text-sm text-muted-foreground font-secondary">
                                    Student Branch Code: <strong>32041</strong>
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xs">
                            Advancing technology for the benefit of humanity through innovation, education, and collaboration.
                        </p>

                        {/* Social Links (Moved here for better visibility) */}
                        <div className="flex gap-3 pt-2">
                            {[
                                { icon: Instagram, url: "https://www.instagram.com/ieeesctsb/", label: "Instagram" },
                                { icon: Linkedin, url: "https://in.linkedin.com/company/ieeesctsb", label: "LinkedIn" },
                                { icon: Facebook, url: "https://www.facebook.com/ieeesctsb", label: "Facebook" }, // Assuming FB link exists/is wanted, keeping generic if not
                                { icon: Mail, url: "mailto:ieeesctsb@gmail.com", label: "Email" },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-all duration-300 transform hover:scale-110"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick & IEEE Links (Combined Column for better spacing) */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-heading font-semibold text-lg mb-6 relative inline-block">
                                Quick Links
                                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-accent rounded-full"></span>
                            </h4>
                            <ul className="space-y-3">
                                {["About", "Events", "Chapters", "Gallery", "Contact"].map((link) => (
                                    <li key={link}>
                                        <Link
                                            href={`/${link.toLowerCase()}`}
                                            className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-300 font-body block"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-heading font-semibold text-lg mb-6 relative inline-block">
                                IEEE
                                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-accent rounded-full"></span>
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    { name: "IEEE.org", url: "https://www.ieee.org" },
                                    { name: "IEEE Xplore", url: "https://ieeexplore.ieee.org" },
                                    { name: "IEEE Standards", url: "https://standards.ieee.org" },
                                    { name: "IEEE Spectrum", url: "https://spectrum.ieee.org" },
                                    { name: "Kerala Section", url: "https://ieee-kerala.org" },
                                ].map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-300 font-body block"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-1">
                        <h4 className="font-heading font-semibold text-lg mb-6 relative inline-block">
                            Contact Us
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-accent rounded-full"></span>
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4 group">
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/80 transition-colors">
                                    <MapPin className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-sm text-muted-foreground font-body leading-relaxed">
                                    SCT College of Engineering,<br />Pappanamcode, Trivandrum<br />Kerala, India
                                </span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/80 transition-colors">
                                    <Mail className="w-4 h-4 text-primary" />
                                </div>
                                <a
                                    href="mailto:ieeesctsb@gmail.com"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-body"
                                >
                                    ieeesctsb@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/80 transition-colors">
                                    <Phone className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-sm text-muted-foreground font-body">
                                    +91 95676 94707
                                </span>
                            </li>
                        </ul>
                    </div>


                </div>

                {/* Sub Footer */}
                <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <p className="text-xs text-muted-foreground font-body">
                        © {new Date().getFullYear()} IEEE SCT SB. All rights reserved.
                        <span> Use of this website signifies your agreement to the <a href="https://www.ieee.org/about/help/site-terms-conditions.html" className="hover:text-primary underline decoration-dotted">IEEE Terms and Conditions</a>.</span>
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground font-body">
                        <a href="https://www.ieee.org/accessibility-statement.html" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Accessibility</a>
                        <a href="https://www.ieee.org/about/corporate/governance/p9-26.html" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Nondiscrimination</a>
                        <a href="https://www.ieee.org/security-privacy.html" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Privacy</a>
                    </div>

                    <p className="text-xs text-muted-foreground font-body flex items-center gap-1">
                        Made with <span className="text-red-500 animate-pulse">❤️</span> by <Link href="/web-team" className="font-semibold text-foreground hover:text-primary transition-colors">Web Team</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
