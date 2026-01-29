import { UserCheck, Clock, Shield, FileText, Headphones, BadgeDollarSign } from "lucide-react";
import LightningWatermark from "./LightningWatermark";

const features = [
  { icon: UserCheck, title: "Profissionais capacitados" },
  { icon: Clock, title: "Atendimento rápido" },
  { icon: Shield, title: "Garantia de 12 meses" },
  { icon: FileText, title: "Nota fiscal" },
  { icon: Headphones, title: "Acompanhamento técnico" },
  { icon: BadgeDollarSign, title: "Preço justo" },
];

const WhyUsSection = () => {
  return (
    <section className="py-16 md:py-28 bg-background relative overflow-hidden">
      {/* Lightning watermark */}
      <LightningWatermark position="right" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Por que nos escolher
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 px-2">
              Por que escolher a <span className="text-gradient">REPLA ENERGIA</span>?
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
              A REPLA ENERGIA é especializada em executar e gerenciar serviços elétricos com 
              responsabilidade, qualidade e compromisso.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 md:p-6 rounded-2xl bg-muted hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 md:w-14 h-12 md:h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <feature.icon className="w-6 md:w-7 h-6 md:h-7 text-primary" />
                </div>
                <p className="font-semibold text-foreground text-sm md:text-base">{feature.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
