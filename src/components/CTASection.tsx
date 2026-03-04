import { motion } from "framer-motion";
import { MessageCircle, Zap, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatedSection } from "./AnimatedSection";

const CTASection = () => {
  const whatsappLink =
    "https://wa.me/5511988271216?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20REPLA%20ENERGIA%20e%20gostaria%20de%20um%20or%C3%A7amento.";

  return (
    <section id="contato" className="py-20 md:py-32 relative overflow-hidden bg-[hsl(225_63%_12%)]">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Central glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Lightning watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <svg viewBox="0 0 24 24" fill="hsl(38 92% 50%)" className="w-[600px] h-[600px]">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Animated icon */}
          <AnimatedSection variant="scaleIn">
            <motion.div
              className="w-20 h-20 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-8"
              animate={{
                boxShadow: [
                  "0 0 20px hsl(38 92% 50% / 0.3)",
                  "0 0 50px hsl(38 92% 50% / 0.6)",
                  "0 0 20px hsl(38 92% 50% / 0.3)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="w-10 h-10 text-primary" />
            </motion.div>
          </AnimatedSection>

          <AnimatedSection variant="slideUp" delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 px-2">
              Precisa de um eletricista{" "}
              <span className="text-gradient-animated">agora</span>?
            </h2>
            <p className="text-white/50 text-base md:text-lg mb-10 max-w-xl mx-auto px-4 leading-relaxed">
              Atendimento imediato ou agendado, com total segurança e transparência.
            </p>
          </AnimatedSection>

          <AnimatedSection variant="slideUp" delay={0.2}>
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full sm:w-auto px-4"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                variant="hero"
                size="lg"
                className="gap-3 w-full sm:w-auto text-base md:text-lg shadow-[0_0_30px_hsl(38_92%_50%/0.4)]"
              >
                <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
                Chamar no WhatsApp Agora
              </Button>
            </motion.a>
          </AnimatedSection>

          <AnimatedSection variant="fadeIn" delay={0.35}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-white/40 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary/60" />
                <span>Atendimento 24h </span>
              </div>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
              <span>Profissionais qualificados</span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
              <span>Resposta imediata</span>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
