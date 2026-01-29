import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import EmergencySection from "@/components/EmergencySection";
import QuoteSection from "@/components/QuoteSection";
import WorksGallerySection from "@/components/WorksGallerySection";
import ReviewsSection from "@/components/ReviewsSection";
import WhyUsSection from "@/components/WhyUsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTopButton from "@/components/BackToTopButton";

const Index = () => {
  return (
    <div className="min-h-screen scroll-smooth">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <EmergencySection />
        <QuoteSection />
        <WorksGallerySection />
        <ReviewsSection />
        <WhyUsSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
    </div>
  );
};

export default Index;
