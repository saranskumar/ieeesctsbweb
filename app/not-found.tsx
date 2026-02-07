import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <section className="section-padding bg-background min-h-[60vh] flex items-center">
            <div className="section-container text-center">
                <h1 className="text-6xl font-heading font-bold text-primary mb-4">404</h1>
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
                    Page Not Found
                </h2>
                <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Button asChild size="lg" className="font-secondary">
                    <Link href="/">Go Home</Link>
                </Button>
            </div>
        </section>
    );
}
