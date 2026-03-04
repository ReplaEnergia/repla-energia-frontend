import { MapPin, Phone, Mail, Instagram, Briefcase, Send } from "lucide-react";
import { Link } from "react-router-dom";
import logoRepla from "@/assets/logo-repla.png";

const Footer = () => {
  return (
    <footer className="bg-[hsl(225_63%_12%)] py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Logo and info */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <img
              src={logoRepla}
              alt="REPLA ENERGIA"
              className="h-12 w-auto"
            />
            <p className="text-secondary-foreground/60 text-sm text-center md:text-left">
              Soluções Elétricas e Fotovoltaicas
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/repla_energia"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:replaenergia_dev@outlook.com"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Trabalhe Conosco */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-secondary-foreground">
              <Briefcase className="w-5 h-5 text-primary" />
              <span>Trabalhe Conosco</span>
            </div>
            <p className="text-secondary-foreground/60 text-sm text-center max-w-xs">
              Faça parte da nossa equipe e construa sua carreira no setor elétrico.
            </p>
            <Link
              to="/trabalhe-conosco"
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-5 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              <Send className="w-4 h-4" />
              Enviar Currículo
            </Link>
          </div>

          {/* Contact info */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-2 text-secondary-foreground/80">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">Atendimento em Osasco, Barueri e Grande São Paulo</span>
            </div>
            <div className="flex items-center gap-2 text-secondary-foreground/80">
              <Phone className="w-4 h-4 text-primary" />
              <a href="tel:+5511988271216" className="text-sm hover:text-primary transition-colors">
                (11) 98827-1216
              </a>
            </div>
            <div className="flex items-center gap-2 text-secondary-foreground/80">
              <Mail className="w-4 h-4 text-primary" />
              <a href="mailto:replaenergia_dev@outlook.com" className="text-sm hover:text-primary transition-colors">
                replaenergia_dev@outlook.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-secondary-foreground/80">
              <Instagram className="w-4 h-4 text-primary" />
              <a
                href="https://www.instagram.com/repla_energia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-primary transition-colors"
              >
                @repla_energia
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8">
          <p className="text-secondary-foreground/40 text-sm">
            © {new Date().getFullYear()} REPLA ENERGIA — Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
