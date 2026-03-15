"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Chapters", path: "/chapters" },
    { name: "Team", path: "/team" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const touchStartY = useRef<number | null>(null);

    const isActive = (path: string) => pathname === path;

    // Swipe down on the whole nav to open, swipe up to close
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartY.current === null) return;
        const delta = e.changedTouches[0].clientY - touchStartY.current;
        if (delta > 30) setIsOpen(true);
        else if (delta < -20) setIsOpen(false);
        touchStartY.current = null;
    };

    return (
        <nav
            className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border"
        >
            <div className="w-full px-4 sm:px-6 lg:px-8">
                {/* The bar row — entire row is tappable on mobile */}
                <div
                    className="flex items-center justify-between h-16 md:h-20 relative md:cursor-default cursor-pointer select-none"
                    onClick={() => {
                        // Only toggle on mobile widths
                        if (window.innerWidth < 768) setIsOpen((prev) => !prev);
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Logo — stop click so tapping logo navigates, not toggles */}
                    <Link
                        href="/"
                        className="flex items-center gap-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
                            <img
                                src="/logo.png"
                                alt="IEEE SCT SB Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="hidden sm:flex flex-col gap-0">
                            <p className="font-heading font-semibold text-foreground text-sm md:text-base leading-none">
                                IEEE SCT
                            </p>
                            <p className="text-xs text-muted-foreground font-secondary leading-none mt-0.5">
                                Student Branch
                            </p>
                        </div>
                    </Link>

                    {/* Centered Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
                                className={`px-4 py-2 rounded-md text-sm font-medium font-secondary transition-colors ${
                                    isActive(link.path)
                                        ? "bg-primary text-primary-foreground"
                                        : "text-foreground hover:bg-secondary"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button asChild className="ml-2 font-secondary rounded-full px-5 h-9">
                            <a href="/join"  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}>Join IEEE</a>
                        </Button>
                    </div>

                    {/* Right Side: IEEE Logo */}
                    <div className="flex items-center">
                        <div className="relative w-auto h-7 md:h-9 flex-shrink-0">
                            <img
                                src="/ieee_black.png"
                                alt="IEEE Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile pull-down navigation panel */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    {/* Drag handle visual */}
                    <div className="flex justify-center py-2">
                        <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
                    </div>
                    <div className="flex flex-col gap-1 pb-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                }}
                                className={`px-4 py-3 rounded-md text-sm font-medium font-secondary transition-colors ${
                                    isActive(link.path)
                                        ? "bg-primary text-primary-foreground"
                                        : "text-foreground hover:bg-secondary"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button asChild className="w-full mt-2 font-secondary">
                            <a href="https://www.ieee.org/membership/join" target="_blank" rel="noopener noreferrer" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.stopPropagation(); setIsOpen(false); }}>Join IEEE</a>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;