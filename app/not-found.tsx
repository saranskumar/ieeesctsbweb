import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WifiOff, Home } from "lucide-react";

export default function NotFound() {
    return (
        <section className="min-h-[80vh] flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="section-container text-center relative z-10 px-4">
                <div className="mb-8 relative inline-block">
                    <div className="absolute inset-0 animate-ping opacity-20 bg-primary rounded-full"></div>
                    <div className="w-32 h-32 bg-card rounded-full flex items-center justify-center mx-auto border-4 border-muted shadow-xl relative z-10">
                        <WifiOff className="w-12 h-12 text-destructive animate-pulse" />
                    </div>
                </div>

                <h1 className="text-8xl md:text-9xl font-heading font-black text-primary/10 tracking-widest absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none">
                    404
                </h1>

                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                    Signal Lost
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground font-body max-w-lg mx-auto mb-10">
                    Whoops! It seems the circuit you're looking for is broken or hasn't been designed yet. Let's get you back to the main grid.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="font-secondary gap-2 shadow-lg hover:shadow-primary/25 transition-all">
                        <Link href="/">
                            <Home className="w-4 h-4" />
                            Return Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="font-secondary gap-2">
                        <Link href="/contact">
                            Report Glitch
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
