"use client";
import { FaqSection } from "@/components/home/faq-section";

export default function FaqPage() {
  return (
    <div className="pt-28 pb-16">
      <div className="text-center mb-4 px-4">
        <span className="badge-gold mb-4 inline-flex">FAQ</span>
        <h1 className="section-title text-4xl sm:text-5xl">Help Center</h1>
        <p className="text-text-soft mt-3 max-w-md mx-auto">Find answers to common questions about our platform.</p>
      </div>
      <FaqSection />
    </div>
  );
}
