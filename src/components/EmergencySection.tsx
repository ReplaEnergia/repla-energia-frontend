import { AlertTriangle, Clock, Phone, Zap } from "lucide-react";
import LightningWatermark from "./LightningWatermark";

const EmergencySection = () => {
  const whatsappLink =
    "https://wa.me/5511988271216?text=Ol%C3%A1!%20Preciso%20de%20atendimento%20emergencial%20da%20REPLA%20ENERGIA.";

  return (
    <section id="atendimento-24h" className="py-16 md:py-28 section-dark relative overflow-hidden">
      {/* Lightning watermark */}
      <LightningWatermark position="right" />
      
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Alert badge */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-3 md:px-4 py-2">
              <AlertTriangle className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-primary font-medium text-xs md:text-sm">Atendimento Emergencial</span>
            </div>
          </div>

          {/* Main content */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-4 md:mb-6 px-2">
              Emergência elétrica <span className="text-gradient">não pode esperar</span>
            </h2>
            <p className="text-secondary-foreground/70 text-base md:text-lg max-w-2xl mx-auto px-4">
              Atendimento imediato para problemas elétricos urgentes, com segurança e rapidez.
            </p>
          </div>

          {/* Pricing cards */}
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="bg-repla-gray/50 border border-border/20 rounded-2xl p-5 md:p-6 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <Clock className="w-5 md:w-6 h-5 md:h-6 text-primary" />
                <span className="text-secondary-foreground font-semibold text-sm md:text-base">Horário Comercial</span>
              </div>
              <p className="text-secondary-foreground/60 text-xs md:text-sm mb-2 md:mb-3">Segunda a sexta, das 8h às 18h</p>
              <p className="text-2xl md:text-3xl font-bold text-primary">
                A partir de R$ 150<span className="text-base md:text-lg">,00</span>
              </p>
            </div>

            <div className="bg-repla-gray/50 border border-border/20 rounded-2xl p-5 md:p-6 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <Zap className="w-5 md:w-6 h-5 md:h-6 text-primary" />
                <span className="text-secondary-foreground font-semibold text-sm md:text-base">Fora do Horário</span>
              </div>
              <p className="text-secondary-foreground/60 text-xs md:text-sm mb-2 md:mb-3">Finais de semana, feriados ou noturno</p>
              <p className="text-xl md:text-2xl font-bold text-primary">Valor sob consulta</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <Phone className="w-5 h-5" />
              <span>Atendimento Emergencial</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencySection;
