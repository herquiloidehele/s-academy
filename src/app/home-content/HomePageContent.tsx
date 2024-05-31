import Header from "@/components/header/Header";
import HeroSection from "@/components/sections/hero-section/HeroSection";
import PriceSection from "@/components/sections/price-section/PriceSection";

export default function HomePageContent() {
  return (
    <div className="w-full">
      <Header />
      <HeroSection />
      <PriceSection />
    </div>
  );
}
