import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoRepla from "@/assets/logo-repla.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const headerHeight = 80; // Altura do header fixo
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth"
      });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40
      bg-secondary/75 backdrop-blur-md
      transition-all duration-300
      border-b border-repla-orange/20
      ${isScrolled ? "bg-secondary/95 shadow-lg" : ""}`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" onClick={scrollToTop} className="flex items-center gap-3">
          <img
            src={logoRepla}
            alt="REPLA ENERGIA - Soluções Elétricas e Fotovoltaicas"
            className="h-10 md:h-14 w-auto"
          />
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#servicos" 
            onClick={(e) => scrollToSection(e, "#servicos")}
            className="text-secondary-foreground/80 hover:text-primary transition-colors font-medium"
          >
            Serviços
          </a>
          <a 
            href="#atendimento-24h" 
            onClick={(e) => scrollToSection(e, "#atendimento-24h")}
            className="text-secondary-foreground/80 hover:text-primary transition-colors font-medium"
          >
            Atendimento 24h
          </a>
          <a 
            href="#trabalhos" 
            onClick={(e) => scrollToSection(e, "#trabalhos")}
            className="text-secondary-foreground/80 hover:text-primary transition-colors font-medium"
          >
            Trabalhos
          </a>
          <a 
            href="#avaliacoes" 
            onClick={(e) => scrollToSection(e, "#avaliacoes")}
            className="text-secondary-foreground/80 hover:text-primary transition-colors font-medium"
          >
            Avaliações
          </a>
          <a 
            href="#contato" 
            onClick={(e) => scrollToSection(e, "#contato")}
            className="btn-primary text-sm py-2 px-4"
          >
            Fale Conosco
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-secondary-foreground"
          aria-label="Menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-secondary border-t border-border/20 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a 
              href="#servicos" 
              onClick={(e) => scrollToSection(e, "#servicos")}
              className="text-secondary-foreground/80 hover:text-primary transition-colors font-medium py-2"
            >
              Serviços
            </a>
            <a 
              href="#atendimento-24h" 
              onClick={(e) => scrollToSection(e, "#atendimento-24h")}
              className="text-secondary-foreground/80 hover:text-primary transition-colors font-medium py-2"
            >
              Atendimento 24h
            </a>
            <a 
              href="#trabalhos" 
              onClick={(e) => scrollToSection(e, "#trabalhos")}
              className="text-secondary-foreground/80 hover:text-primary transition-colors font-medium py-2"
            >
              Trabalhos
            </a>
            <a 
              href="#avaliacoes" 
              onClick={(e) => scrollToSection(e, "#avaliacoes")}
              className="text-secondary-foreground/80 hover:text-primary transition-colors font-medium py-2"
            >
              Avaliações
            </a>
            <a 
              href="#contato" 
              onClick={(e) => scrollToSection(e, "#contato")}
              className="btn-primary text-sm py-3 px-4 text-center"
            >
              Fale Conosco
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
