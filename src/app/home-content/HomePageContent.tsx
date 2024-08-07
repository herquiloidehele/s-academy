import Header from "@/components/header/Header";
import HeroSection from "@/components/sections/hero-section/HeroSection";
import CourseInfoSection from "@/components/sections/course-info-section/CourseInfoSection";
import PriceSection from "@/components/sections/price-section/PriceSection";
import TestimonialsSection from "@/components/sections/testimonials-section/TestimonialsSection";
import CallToActionSection from "@/components/sections/call-to-action-section/CallToActionSection";
import Footer from "@/components/footer/Footer";
import { getDefaultCourse } from "@/app/backend/actions/course";

export default async function HomePageContent() {
  const baseCourse = await getDefaultCourse();

  if (!baseCourse) {
    return <div>Course not found</div>;
  }

  return (
    <div className="w-full">
      <Header />
      <HeroSection course={baseCourse} />
      <CourseInfoSection />
      <PriceSection course={baseCourse} />
      <TestimonialsSection />
      <CallToActionSection course={baseCourse} />
      <Footer />
    </div>
  );
}
