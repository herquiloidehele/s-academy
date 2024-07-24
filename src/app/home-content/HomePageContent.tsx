import Header from "@/components/header/Header";
import HeroSection from "@/components/sections/hero-section/HeroSection";
import CoursesList from "@/components/sections/courses-list/CoursesList";
import TestimonialsSection from "@/components/sections/testimonials-section/TestimonialsSection";
import CallToActionSection from "@/components/sections/call-to-action-section/CallToActionSection";
import Footer from "@/components/footer/Footer";

export default async function HomePageContent() {
  return (
    <div className="w-full">
      <Header />
      <HeroSection />
      <CoursesList />
      <TestimonialsSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}
