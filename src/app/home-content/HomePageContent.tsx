import Header from "@/components/header/Header";
import HeroSection from "@/components/sections/hero-section/HeroSection";
import PriceSection from "@/components/sections/price-section/PriceSection";
import CourseInfoSection from "@/components/sections/course-info-section/CourseInfoSection";

export default function HomePageContent() {
  return (
    <div className="w-full">
      <Header />
      <HeroSection />
      <CourseInfoSection />
      <PriceSection />
    </div>
  );
}
