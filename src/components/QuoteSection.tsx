import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FileText, Clock, CheckCircle } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

// Subtle 3D tilt wrapper
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
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
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ perspective: "800px" }}>
      <motion.div style={{ rotateX, rotateY }} className={className}>
        {children}
      </motion.div>
    </div>
  );
};

const checkItems = [
  { title: "Análise técnica completa", desc: "Avaliação detalhada do seu projeto" },
  { title: "Transparência total", desc: "Sem custos ocultos ou surpresas" },
  { title: "Resposta rápida", desc: "Orçamento em até 24 horas após a visita" },
];

const QuoteSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Content */}
            <AnimatedSection variant="slideLeft">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-[0.2em] mb-4">
                Orçamentos
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Orçamento claro e{" "}
                <span className="text-gradient-animated">sem surpresas</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Trabalhamos com visitas técnicas para entender exatamente sua
                necessidade. Após a visita, o orçamento é entregue em até{" "}
                <strong className="text-foreground">24 horas</strong>.
              </p>

              <StaggerContainer className="space-y-4" staggerDelay={0.09}>
                {checkItems.map(({ title, desc }) => (
                  <StaggerItem key={title}>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/25 transition-colors">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground text-sm">{title}</p>
                        <p className="text-muted-foreground text-sm">{desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </AnimatedSection>

            {/* Pricing card */}
            <AnimatedSection variant="slideRight" delay={0.1}>
              <TiltCard className="card-premium p-8">
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    Visita Técnica
                  </h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-gradient-animated">R$ 80</span>
                    <span className="text-lg text-muted-foreground">,00</span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">
                    Dias úteis em horário comercial
                  </p>
                </div>

                <div className="bg-muted/50 border border-border rounded-xl p-4 mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Fora do horário comercial
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Feriados ou fins de semana: valor combinado previamente
                  </p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  O valor da visita cobre deslocamento e análise técnica especializada.
                </p>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
