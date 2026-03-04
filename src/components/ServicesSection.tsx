import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Zap, Sun, AlertTriangle, Lightbulb } from "lucide-react";
import { StaggerContainer, StaggerItem, AnimatedSection } from "./AnimatedSection";

const services = [
  {
    icon: Zap,
    title: "Serviços e Projetos Elétricos",
    items: [
      "Instalações elétricas prediais e industriais",
      "Manutenção preventiva e corretiva",
      "Projetos elétricos residenciais e comerciais",
      "Gerenciamento e Execução de Projetos",
      "Serviços Industriais e para Comércios",
      "Automação residencial (com ou sem Alexa)",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Urgências 24h",
    items: [
      "Painel elétrico com problemas",
      "Curto-circuito",
      "Fios pegando fogo",
      "Falta de energia total",
      "Chuveiros elétricos",
      "Interruptores"
    ],
  },
  {
    icon: Sun,
    title: "Energia Solar",
    items: [
      "Soluções fotovoltaicas completas",
      "Instalação e manutenção de sistemas solares",
      "Limpeza de painéis solares",
      "Venda de materiais",
      "Manutenção preventiva",
    ],
  },
  {
    icon: Lightbulb,
    title: "Instalações e Design",
    items: [
      "Lustres e luminárias",
      "Fitas LED decorativas",
      "Pendentes e spots",
      "Iluminação para ambientes",
    ],
  },
];

// 3D tilt card component
const TiltCard = ({ children }: { children: React.ReactNode }) => {
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
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX);
    y.set(relY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    // Wrapper div handles perspective & preserve-3d (CSS only, no MotionStyle conflict)
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "800px" }}
      className="relative h-full group cursor-default"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative h-full rounded-2xl border border-border/60 bg-card overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_20px_60px_hsl(0_0%_0%/0.25),0_0_0_1px_hsl(38_92%_50%/0.1)]"
      >
        {/* Shine overlay — follows mouse via inline style update */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl shine-overlay"
        />

        {/* Top accent line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* Content */}
        <div className="p-6 md:p-7">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-20 md:py-30 bg-background relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />


      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <AnimatedSection variant="slideUp" className="text-center mb-14 md:mb-20">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            Nossos Serviços
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-5">
            Soluções completas em{" "}
            <span className="text-gradient-animated">eletricidade</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Da instalação elétrica à energia solar, oferecemos tudo o que você
            precisa com qualidade e garantia.
          </p>
        </AnimatedSection>

        {/* Services grid */}
        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6"
          staggerDelay={0.1}
        >
          {services.map((service, index) => (
            <StaggerItem key={index} className="h-full">
              <TiltCard>
                {/* Icon */}
                <div className="w-12 md:w-14 h-12 md:h-14 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mb-5">
                  <service.icon className="w-6 md:w-7 h-6 md:h-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Items list */}
                <ul className="space-y-2.5 mb-5">
                  {service.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default ServicesSection;
