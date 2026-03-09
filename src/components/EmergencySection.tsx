import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AlertTriangle, Clock, Phone, Zap } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const TiltCard = ({ children, className, wrapperStyle }: { children: React.ReactNode; className?: string; wrapperStyle?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-3deg", "3deg"]);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ perspective: "800px", ...wrapperStyle }} className="h-full">
      <motion.div style={{ rotateX, rotateY }} className={className}>
        {children}
      </motion.div>
    </div>
  );
};

const EmergencySection = () => {
  const whatsappLink =
    "https://wa.me/5511988271216?text=Ol%C3%A1!%20Preciso%20de%20atendimento%20emergencial%20da%20REPLA%20ENERGIA.";

  return (
    <section
      id="atendimento-24h"
      className="py-20 md:py-32 relative overflow-hidden bg-background"
    >
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Red urgency glow - subtle */}
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 w-[200px] h-[200px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "hsl(0 80% 50% / 0.04)" }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">

          {/* Alert badge */}
          <AnimatedSection variant="scaleIn" className="flex justify-center mb-8">
            <motion.div
              className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2"
              animate={{ boxShadow: ["0 0 0 0 hsl(0 80% 50% / 0)", "0 0 0 8px hsl(0 80% 50% / 0)", "0 0 0 0 hsl(0 80% 50% / 0)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-red-400 font-medium text-sm">Atendimento Emergencial</span>
            </motion.div>
          </AnimatedSection>

          {/* Main content */}
          <AnimatedSection variant="slideUp" delay={0.1} className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-5 px-2">
              Emergência elétrica{" "}
              <span className="text-gradient-animated">não pode esperar</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Atendimento imediato para problemas elétricos urgentes, com segurança e rapidez.
            </p>
          </AnimatedSection>

          {/* Pricing cards */}
          <StaggerContainer className="grid sm:grid-cols-2 gap-5 mb-12" staggerDelay={0.1}>
            <StaggerItem>
              <TiltCard className="card-premium h-full p-6 border-border/60">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-semibold">Horário Comercial</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">Segunda a sexta, das 8h às 18h a partir de</p>
                <div>
                  <span className="text-3xl font-bold text-primary">R$ 150</span>
                  <span className="text-lg text-primary">,00</span>
                </div>
              </TiltCard>
            </StaggerItem>

            <StaggerItem>
              <TiltCard
                className="card-premium h-full p-6 border-primary/20"
                wrapperStyle={{ background: "hsl(38 92% 50% / 0.04)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-semibold">Fora do Horário</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Finais de semana, feriados ou noturno
                </p>
                <p className="text-2xl font-bold text-primary">Valor sob consulta</p>
              </TiltCard>
            </StaggerItem>
          </StaggerContainer>

          {/* CTA */}
          <AnimatedSection variant="slideUp" delay={0.2} className="text-center">
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3 justify-center"
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px hsl(38 92% 50% / 0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone className="w-5 h-5" />
              Atendimento Emergencial
            </motion.a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default EmergencySection;
