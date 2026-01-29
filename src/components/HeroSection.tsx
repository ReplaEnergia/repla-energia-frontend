import { useState } from "react";
import { Zap, Phone, Shield, Clock, Calendar, Camera } from "lucide-react";
import LightningWatermark from "./LightningWatermark";
import { Button } from "./ui/button";
import QuoteFormModal from "./QuoteFormModal";
import logoRepla from "@/assets/logo-repla.png";

const HeroSection = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const urgentWhatsappLink =
    "https://wa.me/5511988271216?text=Ol%C3%A1!%20Preciso%20de%20um%20eletricista%20URGENTE!%20Vim%20pelo%20site%20da%20REPLA%20ENERGIA.";

  const scrollToWorks = () => {
    const element = document.getElementById("trabalhos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center bg-secondary overflow-hidden pt-20">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-repla-gray opacity-50" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(hsl(38 92% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(38 92% 50%) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Lightning watermark */}
        <LightningWatermark position="right" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            {/* Logo */}
            <div className="flex justify-center animate-fade-in">
              <img 
                src={logoRepla} 
                alt="REPLA ENERGIA - Soluções Elétricas e Fotovoltaicas" 
                className="h-40 md:h-32 lg:h-40 w-auto"
              />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-1 animate-fade-in">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Atendimento 24 horas</span>
            </div>

            {/* Main headline */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-repla-white mb-4 md:mb-6 animate-slide-up px-2">
              Eletricista <span className="text-gradient">24h</span> na{" "}
              <br className="hidden sm:block" />
              Grande São Paulo
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg lg:text-xl text-repla-white/70 mb-3 md:mb-8 max-w-2xl mx-auto animate-slide-up delay-100 px-2">
              Atendimento rápido, seguro e com preço justo. Residências, comércios e indústrias 
              em Osasco, Barueri e toda a Grande SP.
            </p>

            {/* Features */}
          <div className="flex flex-row flex-wrap justify-center gap-1 sm:gap-6 md:gap-8 mb-6 md:mb-10 animate-slide-up delay-200 px-4">
            <div className="flex items-center justify-center gap-2 text-repla-white/80 basis-[48%] sm:basis-auto">
              <Zap className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              <span className="text-xs md:text-sm">Serviços Completos</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-repla-white/80 basis-[48%] sm:basis-auto">
              <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              <span className="text-xs md:text-sm">Garantia 12 Meses</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-repla-white/80 basis-[48%] sm:basis-auto">
              <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              <span className="text-xs md:text-sm">Emergência 24h</span>
            </div>
          </div>


            {/* CTA Buttons - 3 options */}
            <div className="flex flex-col gap-4 justify-center items-center animate-slide-up delay-300 px-4">
              {/* Button 1: Urgent - Direct WhatsApp */}
              <a href={urgentWhatsappLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="hero" size="xl" className="w-full sm:w-auto animate-glow-pulse text-base md:text-lg">
                  <Phone className="h-5 w-5" />
                  Preciso de um Eletricista Urgente
                </Button>
              </a>

              {/* Secondary buttons row */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {/* Button 2: Quote - Open form */}
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="w-full sm:w-auto border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Calendar className="h-5 w-5" />
                  Solicitar Orçamento
                </Button>

                {/* Button 3: See works - Scroll to gallery */}
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={scrollToWorks}
                  className="w-full sm:w-auto border-repla-white/30 text-repla-white hover:bg-repla-white/10"
                >
                  <Camera className="h-5 w-5" />
                  Conheça Nossos Trabalhos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Modal */}
      <QuoteFormModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </>
  );
};

export default HeroSection;
