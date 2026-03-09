import { useState, useRef } from "react";
import {
  Briefcase,
  Heart,
  Users,
  Zap,
  Sun,
  ClipboardList,
  Send,
  CheckCircle2,
  Shield,
  TrendingUp,
  Award,
  Upload,
  FileText,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTopButton from "@/components/BackToTopButton";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Pega apenas a string bruta em base64 removendo o data:mime/type;base64,
      const base64Data = result.split(",")[1];
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
  });
};

const values = [
  {
    icon: Shield,
    title: "Segurança em Primeiro Lugar",
    desc: "Trabalhamos com rigor técnico para garantir segurança em todos os projetos.",
  },
  {
    icon: Heart,
    title: "Compromisso com o Cliente",
    desc: "Nosso foco é a satisfação total, desde o primeiro contato até a entrega final.",
  },
  {
    icon: TrendingUp,
    title: "Crescimento Profissional",
    desc: "Investimos no desenvolvimento contínuo de nossos colaboradores.",
  },
  {
    icon: Award,
    title: "Excelência Técnica",
    desc: "Buscamos sempre os melhores padrões de qualidade e atualização técnica.",
  },
];

const benefits = [
  "Ambiente de trabalho colaborativo e respeitoso",
  "Oportunidades de crescimento e aprendizado",
  "Treinamentos e capacitações técnicas",
  "Ferramentas e equipamentos de qualidade",
  "Remuneração justa e compatível com o mercado",
  "Projetos diversificados e desafiadores",
];

const areas = [
  {
    icon: Zap,
    title: "Serviços Elétricos",
    desc: "Instalações, manutenções e atendimentos emergenciais",
  },
  {
    icon: ClipboardList,
    title: "Projetos Elétricos",
    desc: "Projetos residenciais, comerciais e industriais",
  },
  {
    icon: Sun,
    title: "Energia Solar",
    desc: "Instalação e manutenção de sistemas fotovoltaicos",
  },
];

const areaOptions = [
  "Eletricista",
  "Técnico em Energia Solar",
  "Projetista Elétrico",
  "Auxiliar Técnico",
  "Administrativo",
  "Outro",
];

const TrabalheConosco = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    area: "",
    message: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Por favor, envie apenas arquivos PDF.");
        return;
      }
      if (file.size > 3 * 1024 * 1024) {
        setError("O arquivo deve ter no máximo 3MB.");
        return;
      }
      setError("");
      setCvFile(file);
    }
  };

  const removeFile = () => {
    setCvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (!cvFile) {
        setError("Por favor, anexe seu currículo.");
        setIsSubmitting(false);
        return;
      }

      const base64Content = await fileToBase64(cvFile);

      const payload = {
        type: "resume",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        area: formData.area,
        subject: `Candidatura: ${formData.area}`,
        message: formData.message || "Não informada",
        attachment: {
          filename: cvFile.name,
          content: base64Content,
          type: cvFile.type,
        },
      };

      const res = await fetch(`${API_URL}/api/mail/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 429) {
        toast.error("Muitos envios", {
          description: "Por favor, aguarde um minuto e tente novamente.",
        });
        setError("Limite de envios atingido. Aguarde um minuto.");
        return;
      }

      if (!res.ok) {
        throw new Error("Erro na API.");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", area: "", message: "" });
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      toast.error("Erro no envio", {
        description: "Não foi possível enviar candidatura. Tente pelo WhatsApp.",
      });
      setError("Erro ao enviar. Por favor, tente novamente ou entre em contato pelo WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all";

  return (
    <div className="min-h-screen scroll-smooth">
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-repla-gray opacity-50" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(hsl(38 92% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(38 92% 50%) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
            <Briefcase className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Carreiras</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-repla-white mb-6 px-2">
            Trabalhe <span className="text-gradient">Conosco</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-repla-white/70 max-w-2xl mx-auto px-2">
            Faça parte da equipe REPLA ENERGIA e construa uma carreira sólida no
            setor elétrico e de energia solar.
          </p>
        </div>
      </section>

      {/* Cultura e Valores */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Nossa Cultura
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossos <span className="text-gradient">Valores</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Acreditamos que pessoas engajadas e valorizadas fazem a diferença.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((item, index) => (
              <div
                key={index}
                className="card-service group text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 md:py-24 section-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                Vantagens
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-foreground mb-6">
                Por que trabalhar na{" "}
                <span className="text-gradient">REPLA?</span>
              </h2>
              <p className="text-secondary-foreground/70 text-base md:text-lg">
                Oferecemos um ambiente de trabalho que valoriza cada profissional
                e incentiva o crescimento contínuo.
              </p>
            </div>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-repla-gray/30 border border-border/20 rounded-xl p-4 hover:border-primary/30 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-secondary-foreground/80 text-sm md:text-base">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Oportunidades
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Áreas de <span className="text-gradient">Atuação</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-14">
            {areas.map((area, index) => (
              <div
                key={index}
                className="card-service group text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <area.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  {area.title}
                </h3>
                <p className="text-muted-foreground text-sm">{area.desc}</p>
              </div>
            ))}
          </div>

          {/* Formulário */}
          <div className="max-w-lg mx-auto" id="formulario">
            {!isSubmitted ? (
              <div className="bg-muted border border-border rounded-2xl p-6 md:p-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-6 h-6 text-primary" />
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    Candidate-se
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm mb-6 text-center">
                  Preencha seus dados e entraremos em contato
                </p>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="tc-name"
                      className="text-sm font-medium text-foreground"
                    >
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="tc-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="tc-email"
                      className="text-sm font-medium text-foreground"
                    >
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="tc-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu.email@exemplo.com"
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="tc-phone"
                      className="text-sm font-medium text-foreground"
                    >
                      Telefone/WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="tc-phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(11) 99999-9999"
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="tc-area"
                      className="text-sm font-medium text-foreground"
                    >
                      Área de Interesse *
                    </label>
                    <select
                      id="tc-area"
                      name="area"
                      required
                      value={formData.area}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">Selecione a área</option>
                      {areaOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Upload de Currículo */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      Currículo (PDF) *
                    </label>
                    {!cvFile ? (
                      <label
                        htmlFor="tc-cv"
                        className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
                      >
                        <Upload className="w-8 h-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Clique para selecionar ou arraste seu PDF
                        </span>
                        <span className="text-xs text-muted-foreground/60">
                          Máximo 3MB
                        </span>
                        <input
                          type="file"
                          id="tc-cv"
                          name="cv"
                          ref={fileInputRef}
                          accept=".pdf"
                          required
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                        <FileText className="w-6 h-6 text-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {cvFile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(cvFile.size / 1024).toFixed(0)} KB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1 rounded-full hover:bg-destructive/10 transition-colors"
                        >
                          <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="tc-message"
                      className="text-sm font-medium text-foreground"
                    >
                      Mensagem (opcional)
                    </label>
                    <textarea
                      id="tc-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Conte um pouco sobre você e sua experiência..."
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  {/* Mensagem de erro */}
                  {error && (
                    <p className="text-sm text-destructive text-center bg-destructive/10 rounded-xl p-3">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Candidatura
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Seus dados e currículo serão enviados por e-mail para nossa equipe
                  </p>
                </form>
              </div>
            ) : (
              <div className="bg-muted border border-primary/20 rounded-2xl p-8 text-center animate-scale-in">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Candidatura Enviada! 🎉
                </h3>
                <p className="text-muted-foreground">
                  Obrigado pelo interesse! Entraremos em contato em breve.
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6"
                >
                  Enviar outra candidatura
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
    </div>
  );
};

export default TrabalheConosco;
