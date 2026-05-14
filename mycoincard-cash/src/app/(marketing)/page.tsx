"use client";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { Process } from "@/components/home/process";
import { LoanCalculator } from "@/components/home/calculator";
import { Testimonials } from "@/components/home/testimonials";
import { FaqSection } from "@/components/home/faq-section";
import { CTA } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Process />
      <LoanCalculator />
      <Testimonials />
      <FaqSection />
      <CTA />
    </>
  );
}
