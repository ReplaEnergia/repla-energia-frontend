import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import EmergencySection from "@/components/EmergencySection";
import QuoteSection from "@/components/QuoteSection";
import ReferralProgramSection from "@/components/ReferralProgramSection";
import WorksGallerySection from "@/components/WorksGallerySection";
import ReviewsSection from "@/components/ReviewsSection";
import FeedbackSection from "@/components/FeedbackSection";
import CTASection from "@/components/CTASection";
import WhyUsSection from "@/components/WhyUsSection";
import SectionDivider from "@/components/SectionDivider";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTopButton from "@/components/BackToTopButton";
import LoadingScreen from "@/components/LoadingScreen";

// Color tokens – must match section backgrounds exactly
const DARK = "hsl(225, 63%, 12%)";
const LIGHT = "hsl(0, 0%, 100%)";

// Só exibe o loading na primeira visita da sessão
const shouldShowLoading = () => !sessionStorage.getItem("repla-loaded");

const Index = () => {
  const [loading, setLoading] = useState(shouldShowLoading);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("repla-loaded", "1");
    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen scroll-smooth">
      <Header />
      <main>
        {/* 1. Hero (escuro) */}
        <HeroSection />

        {/* ▼ escuro → claro  (entalhe esquerda) */}
        <SectionDivider fromColor={DARK} toColor={LIGHT} variant="diagonal" />

        {/* 2. Por quê nós (claro) */}
        <WhyUsSection />

        {/* 3. Serviços (claro) */}
        <ServicesSection />

        {/* 4. Portfólio (claro) */}
        <WorksGallerySection />

        {/* ▼ claro → escuro  (entalhe direita) */}
        <SectionDivider fromColor={LIGHT} toColor={DARK} variant="diagonal" flip />

        {/* 5. Avaliações (escuro) */}
        <ReviewsSection />

        {/* ▼ escuro → claro  (entalhe esquerda) */}
        <SectionDivider fromColor={DARK} toColor={LIGHT} variant="diagonal" />

        {/* 6. Emergência (claro) */}
        <EmergencySection />

        {/* 7. Orçamento (claro) */}
        <QuoteSection />

        {/* ▼ claro → escuro  (entalhe direita) */}
        <SectionDivider fromColor={LIGHT} toColor={DARK} variant="diagonal" flip />

        {/* 8. Indicação (escuro) */}
        <ReferralProgramSection />

        {/* 9. CTA (escuro) */}
        <CTASection />
      </main>

      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
      <FeedbackSection />
    </div>
  );
};

export default Index;
