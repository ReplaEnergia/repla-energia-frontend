import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Gift, Users, DollarSign, Send, Copy, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 100, damping: 25 });
  const ySpring = useSpring(y, { stiffness: 100, damping: 25 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ perspective: "1000px" }}
      className="h-full z-10"
    >
      <motion.div
        style={{ rotateX, rotateY, ...({ transformStyle: "preserve-3d" } as React.CSSProperties) }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

const generateReferralCode = (name: string): string => {
  const cleanName = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase()
    .slice(0, 4);
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `REPLA-${cleanName}${randomNum}`;
};

const serviceTypes = [
  "Serviços Elétricos",
  "Projetos Elétricos",
  "Energia Solar",
  "Serviços Industriais",
  "Serviços para Comércios",
  "Automação Residencial",
  "Urgência 24h",
  "Instalações e Design",
  "Outro",
];

const steps = [
  {
    icon: Users,
    step: "01",
    title: "Indique",
    desc: "Cadastre-se e receba seu código exclusivo de indicação",
  },
  {
    icon: DollarSign,
    step: "02",
    title: "Cliente Fecha",
    desc: "Seu indicado entra em contato e fecha o orçamento",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Ganhe Comissão",
    desc: "Receba comissão sobre o valor do orçamento aprovado",
  },
];

const inputClasses =
  "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm";

const labelClasses = "block text-sm font-medium text-white/70 mb-1.5";

const ReferralProgramSection = () => {
  const [step, setStep] = useState<"info" | "form" | "code">("info");
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerPhone: "",
    referredName: "",
    referredPhone: "",
    serviceType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateCode = (e: React.FormEvent) => {
    e.preventDefault();
    const code = generateReferralCode(formData.referrerName);
    setReferralCode(code);
    setStep("code");
  };

  const handleSubmitReferral = () => {
    const message = `*NOVA INDICAÇÃO - PROGRAMA INDIQUE E GANHE*\n\n*Código de Indicação:* ${referralCode}\n\n*INDICADOR:*\n*Nome:* ${formData.referrerName}\n*Telefone:* ${formData.referrerPhone}\n\n*INDICADO:*\n*Nome:* ${formData.referredName}\n*Telefone:* ${formData.referredPhone}\n*Serviço de Interesse:* ${formData.serviceType}`;
    window.open(`https://wa.me/5511988271216?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setStep("info");
    setReferralCode("");
    setCopied(false);
    setFormData({ referrerName: "", referrerPhone: "", referredName: "", referredPhone: "", serviceType: "" });
  };

  return (
    <section
      id="indique-e-ganhe"
      className="py-20 md:py-32 bg-[hsl(225_63%_12%)] relative overflow-hidden"
    >


      {/* Central glow */}
      <motion.div
        className="absolute top-30 left-6 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <AnimatedSection variant="slideUp" className="text-center mb-14 md:mb-20">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            <Gift className="w-4 h-4" />
            Programa de Parceiros
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Indique e <span className="text-gradient-animated">Ganhe</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Indique nossos serviços e ganhe comissão por cada orçamento aprovado.
            Transforme sua rede de contatos em uma renda extra!
          </p>
        </AnimatedSection>

        {/* Steps */}
        <StaggerContainer
          className="grid sm:grid-cols-3 gap-4 md:gap-6 mb-14 md:mb-20 max-w-3xl mx-auto"
          staggerDelay={0.1}
        >
          {steps.map((item, index) => (
            <StaggerItem key={index} className="h-full">
              <TiltCard className="relative bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 text-center hover:border-primary/30 hover:bg-white/8 transition-colors duration-300 group h-full">
                {/* 3D Inner Content translation */}
                <div style={{ transform: "translateZ(30px)" }}>
                  {/* Step badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-primary/20">
                    {item.step}
                  </div>
                  {/* Connector arrow (all except last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-5 h-5 text-primary/40" />
                    </div>
                  )}
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4 mt-3 group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors shadow-inner">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-base md:text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Interactive area */}
        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {/* Step: Info (CTA button) */}
            {step === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-center"
              >
                <motion.button
                  onClick={() => setStep("form")}
                  className="inline-flex items-center gap-2.5 bg-primary text-black font-bold px-8 py-4 rounded-xl text-base shadow-lg shadow-primary/20"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 40px hsl(38 92% 50% / 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Gift className="w-5 h-5" />
                  Quero Participar
                </motion.button>
              </motion.div>
            )}

            {/* Step: Form */}
            {step === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
              >
                {/* Accent top */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                <h3 className="font-heading text-xl font-bold text-white mb-6 text-center">
                  Cadastre sua Indicação
                </h3>

                <form onSubmit={handleGenerateCode} className="space-y-4">
                  {/* Indicador */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClasses}>Seu Nome *</label>
                      <input type="text" name="referrerName" required value={formData.referrerName} onChange={handleChange} placeholder="Nome completo" className={inputClasses} />
                    </div>
                    <div>
                      <label className={labelClasses}>Seu Telefone *</label>
                      <input type="tel" name="referrerPhone" required value={formData.referrerPhone} onChange={handleChange} placeholder="(11) 99999-9999" className={inputClasses} />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3 py-1">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-xs text-white/30 uppercase tracking-wider">Dados do Indicado</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  {/* Indicado */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClasses}>Nome do Indicado *</label>
                      <input type="text" name="referredName" required value={formData.referredName} onChange={handleChange} placeholder="Nome da pessoa" className={inputClasses} />
                    </div>
                    <div>
                      <label className={labelClasses}>Telefone do Indicado *</label>
                      <input type="tel" name="referredPhone" required value={formData.referredPhone} onChange={handleChange} placeholder="(11) 99999-9999" className={inputClasses} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>Tipo de Serviço *</label>
                    <select name="serviceType" required value={formData.serviceType} onChange={handleChange} className={`${inputClasses} cursor-pointer`}>
                      <option value="" className="bg-[#0C1736]">Selecione o serviço</option>
                      {serviceTypes.map((type) => (
                        <option key={type} value={type} className="bg-[#0C1736]">{type}</option>
                      ))}
                    </select>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-black font-bold px-6 py-3.5 rounded-xl text-sm mt-2"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(38 92% 50% / 0.35)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-4 h-4" />
                    Gerar Meu Código de Indicação
                  </motion.button>
                </form>
              </motion.div>
            )}

            {/* Step: Code */}
            {step === "code" && (
              <motion.div
                key="code"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 text-center"
              >
                {/* Success icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                  className="w-16 h-16 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </motion.div>

                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  Seu Código de Indicação
                </h3>
                <p className="text-white/40 text-sm mb-6">
                  Compartilhe este código ou envie diretamente pelo WhatsApp
                </p>

                {/* Code display */}
                <div className="bg-primary/5 border-2 border-primary/30 rounded-xl p-4 mb-6 flex items-center justify-center gap-3">
                  <span className="text-2xl font-mono font-bold text-primary tracking-widest">
                    {referralCode}
                  </span>
                  <motion.button
                    onClick={handleCopyCode}
                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                    whileTap={{ scale: 0.9 }}
                    title="Copiar código"
                  >
                    {copied
                      ? <CheckCircle2 className="w-5 h-5 text-green-400" />
                      : <Copy className="w-5 h-5 text-primary" />
                    }
                  </motion.button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={handleSubmitReferral}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-black font-bold px-5 py-3 rounded-xl text-sm"
                    whileHover={{ scale: 1.03, boxShadow: "0 0 25px hsl(38 92% 50% / 0.35)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Send className="w-4 h-4" />
                    Enviar Indicação
                  </motion.button>
                  <motion.button
                    onClick={handleReset}
                    className="flex-1 inline-flex items-center justify-center gap-2 border border-white/15 text-white/70 hover:text-white hover:border-white/30 px-5 py-3 rounded-xl text-sm transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Nova Indicação
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ReferralProgramSection;
