import { AdminPreview } from "@/components/sections/AdminPreview";
import { BookingFlow } from "@/components/sections/BookingFlow";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SpecialistsSection } from "@/components/sections/SpecialistsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <HowItWorks />
      <ServicesSection />
      <BookingFlow />
      <SpecialistsSection />
      <TestimonialsSection />
      <AdminPreview />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
