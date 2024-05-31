import Header from "@/components/header/Header";
import HeroSection from "@/components/sections/hero-section/HeroSection";
import PriceSection from "@/components/sections/price-section/PriceSection";
import CourseInfoSection from "@/components/sections/course-info-section/CourseInfoSection";
import TestimonialsSection from "@/components/sections/testimonials-section/TestimonialsSection";
import CallToActionSection from "@/components/sections/call-to-action-section/CallToActionSection";
import Footer from "@/components/footer/Footer";

export default function HomePageContent() {
  return (
    <div className="w-full">
      <Header />
      <HeroSection />
      <CourseInfoSection />
      <PriceSection />
      <TestimonialsSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}
