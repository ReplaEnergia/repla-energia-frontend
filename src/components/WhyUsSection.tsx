import { motion } from "framer-motion";
import { Timer, Star, Clock, MessageCircle, Zap, Shield } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const diferenciais = [
  {
    icon: Timer,
    title: "Chegamos em até 30 min",
    desc: "Equipes estrategicamente posicionadas na sua região",
  },
  {
    icon: Star,
    title: "Mais de 10 anos",
    desc: "Experiência comprovada em serviços elétricos",
  },
  {
    icon: Clock,
    title: "Suporte 24h",
    desc: "Madrugada, fim de semana ou feriado",
  },
  {
    icon: MessageCircle,
    title: "Resposta Imediata",
    desc: "WhatsApp direto sem burocracia",
  },
  {
    icon: Zap,
    title: "Solução Completa",
    desc: "Da emergência à instalação decorativa",
  },
  {
    icon: Shield,
    title: "Garantia Total",
    desc: "Todos os serviços com garantia",
  },
];

const WhyUsSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <AnimatedSection variant="slideUp" className="text-center mb-14 md:mb-20">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            Nossos Diferenciais
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Por que escolher a{" "}
            <span className="text-gradient-animated">Repla Energia</span>?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Diferenciais que fazem a diferença quando você mais precisa
          </p>
        </AnimatedSection>

        {/* Cards grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto"
          staggerDelay={0.08}
        >
          {diferenciais.map((item, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="flex items-start gap-4 p-5 md:p-6 rounded-2xl border border-border bg-muted hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group cursor-default h-full"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:border-primary/40 transition-colors duration-300">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-semibold text-sm md:text-base text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default WhyUsSection;
