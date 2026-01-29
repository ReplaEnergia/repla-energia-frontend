import { Zap, Home, Sun } from "lucide-react";
import LightningWatermark from "./LightningWatermark";

const services = [
  {
    icon: Zap,
    title: "Serviços Elétricos",
    items: [
      "Instalações elétricas prediais e industriais",
      "Manutenção preventiva e corretiva",
      "Atendimentos emergenciais 24h",
      "Vistorias e laudos elétricos",
      "Projetos elétricos completos",
    ],
  },
  {
    icon: Home,
    title: "Automação e Segurança",
    items: [
      "Automação residencial (com ou sem Alexa)",
      "Instalação de câmeras e CFTV",
      "Cerca elétrica",
      "Perfis de LED e iluminação técnica",
    ],
  },
  {
    icon: Sun,
    title: "Energia Solar",
    items: [
      "Soluções fotovoltaicas completas",
      "Instalação e manutenção de sistemas solares",
      "Redução na conta de luz",
      "Projetos sob medida",
    ],
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-16 md:py-28 bg-background relative overflow-hidden">
      {/* Lightning watermark */}
      <LightningWatermark position="left" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Nossos Serviços
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 px-2">
            Soluções completas em{" "}
            <span className="text-gradient">eletricidade</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            Da instalação elétrica à energia solar, oferecemos tudo o que você precisa com qualidade e garantia.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-service group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-12 md:w-14 h-12 md:h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 md:w-7 h-6 md:h-7 text-primary" />
              </div>

              {/* Title */}
              <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-3 md:mb-4">
                {service.title}
              </h3>

              {/* Items list */}
              <ul className="space-y-2 md:space-y-3">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3 text-muted-foreground text-sm md:text-base">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
