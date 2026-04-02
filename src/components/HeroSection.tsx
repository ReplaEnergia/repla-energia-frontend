import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Phone, Shield, Clock, Calendar, Camera, Star, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import QuoteFormModal from "./QuoteFormModal";
import logoRepla from "@/assets/logo-repla.png";

// Floating spark particles
const Spark = ({ x, y, delay }: { x: string; y: string; delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-primary rounded-full"
    style={{ left: x, top: y }}
    animate={{
      y: [0, -80, -160],
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
    }}
    transition={{
      duration: 2.5,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

// Animated orb
const Orb = ({
  size,
  color,
  x,
  y,
  delay = 0,
}: {
  size: string;
  color: string;
  x: string;
  y: string;
  delay?: number;
}) => (
  <motion.div
    className="absolute rounded-full blur-3xl pointer-events-none"
    style={{ width: size, height: size, background: color, left: x, top: y }}
    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
    transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const sparks = [
  { x: "10%", y: "70%" }, { x: "20%", y: "80%" }, { x: "35%", y: "75%" },
  { x: "65%", y: "72%" }, { x: "78%", y: "82%" }, { x: "88%", y: "68%" },
  { x: "50%", y: "88%" }, { x: "5%", y: "55%" }, { x: "92%", y: "60%" },
];

const HeroSection = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const urgentWhatsappLink =
    "https://wa.me/5511988271216?text=Ol%C3%A1!%20Preciso%20de%20um%20eletricista%20URGENTE!%20Vim%20pelo%20site%20da%20REPLA%20ENERGIA.";

  const scrollToWorks = () => {
    const element = document.getElementById("trabalhos");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[hsl(225_63%_12%)]">

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(225_63%_12%)] pointer-events-none" />

        {/* Animated orbs */}
        <Orb size="600px" color="hsl(38 92% 50% / 0.12)" x="-10%" y="10%" delay={0} />
        <Orb size="400px" color="hsl(228 68% 50% / 0.15)" x="60%" y="-5%" delay={2} />
        <Orb size="350px" color="hsl(38 92% 50% / 0.08)" x="75%" y="55%" delay={1} />

        {/* Spark Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {sparks.map((s, i) => (
            <Spark key={i} x={s.x} y={s.y} delay={i * 0.3} />
          ))}
        </div>

        {/* Lightning watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-[500px] h-[500px] text-primary">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            {/* Logo */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                src={logoRepla}
                alt="REPLA ENERGIA - Soluções Elétricas e Fotovoltaicas"
                className="h-36 md:h-40 w-auto drop-shadow-2xl"
              />
            </motion.div>

            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-white/90">Atendimento 24 horas — Grande São Paulo</span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            >
              Eletricista{" "}
              <span className="text-gradient-animated">24h</span>
              <br />
              <span className="text-white/90">que você pode</span>{" "}
              <span className="text-gradient-animated">confiar</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-base md:text-lg lg:text-xl text-white/60 mb-8 max-w-2xl mx-auto px-2 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              Atendimento rápido, seguro e com preço justo em residências,
              comércios e indústrias em Osasco, Barueri e toda a Grande SP.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              {[
                { icon: Zap, text: "Serviços Completos" },
                { icon: Shield, text: "Garantia 12 Meses" },
                { icon: MapPin, text: "Grande São Paulo" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass text-white/80 text-sm"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  {text}
                </div>
              ))}
            </motion.div>

            {/* Phone Number Call Link */}
            <motion.div
              className="mb-5 flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a
                href="tel:11988271216"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-white/90 hover:text-primary hover:border-primary/50 transition-all duration-300 group"
              >
                <Phone className="w-4 h-4 text-primary animate-pulse group-hover:scale-110 transition-transform" />
                <span className="text-sm  tracking-tight">(11) 98827-1216</span>
              </a>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col gap-4 justify-center items-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <motion.a
                href={urgentWhatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
              </motion.a>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="w-full sm:w-auto border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground backdrop-blur-sm"
                  >
                    <Calendar className="h-5 w-5" />
                    Solicitar Orçamento
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={scrollToWorks}
                    className="w-full sm:w-auto border-white/20 text-white/80 hover:bg-white/10 backdrop-blur-sm"
                  >
                    <Camera className="h-5 w-5" />
                    Conheça Nossos Trabalhos
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}

      </section>

      <QuoteFormModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
};

export default HeroSection;
