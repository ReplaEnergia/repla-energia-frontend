import { MessageCircle, Zap } from "lucide-react";
import LightningWatermark from "./LightningWatermark";
import { Button } from "./ui/button";

const CTASection = () => {
  const whatsappLink =
    "https://wa.me/5511988271216?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20REPLA%20ENERGIA%20e%20gostaria%20de%20um%20or%C3%A7amento.";

  return (
    <section id="contato" className="py-16 md:py-28 section-dark relative overflow-hidden">
      {/* Lightning watermark */}
      <LightningWatermark position="center" className="opacity-50" />
      
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="w-16 md:w-20 h-16 md:h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 glow-orange">
            <Zap className="w-8 md:w-10 h-8 md:h-10 text-primary" />
          </div>

          {/* Headline */}
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-4 md:mb-6 px-2">
            Precisa de um eletricista <span className="text-gradient">agora</span>?
          </h2>

          {/* Description */}
          <p className="text-secondary-foreground/70 text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto px-4">
            Atendimento imediato ou agendado, com total segurança e transparência.
          </p>

          {/* CTA button */}
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto px-4">
            <Button variant="hero" size="lg" className="gap-3 animate-glow-pulse w-full sm:w-auto text-base md:text-lg">
              <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
              Chamar no WhatsApp Agora
            </Button>
          </a>

          {/* Phone number */}
          <p className="mt-5 md:mt-6 text-secondary-foreground/60 text-sm md:text-base">
            📞 Ou ligue: <a href="tel:+5511988271216" className="text-primary hover:underline">(11) 98827-1216</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
