import { Suspense } from "react";
import type { Metadata } from "next";
import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with IEEE SCT Student Branch. We are here to answer your questions and help you get involved.",
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactContent />
    </Suspense>
  );
}
