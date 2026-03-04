import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import logoRepla from "@/assets/logo-repla.png";

const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#atendimento-24h", label: "Atendimento 24h" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#avaliacoes", label: "Avaliações" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - 80, behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled
          ? "bg-[hsl(225_63%_12%/0.96)] backdrop-blur-xl shadow-[0_1px_0_hsl(38_92%_50%/0.15),0_8px_32px_hsl(0_0%_0%/0.3)]"
          : "bg-[hsl(225_63%_12%/0.6)] backdrop-blur-md border-b border-white/5"
        }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#" onClick={scrollToTop} className="flex items-center gap-3 group">
          <motion.img
            src={logoRepla}
            alt="REPLA ENERGIA"
            className="h-10 md:h-14 w-auto"
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => scrollToSection(e, href)}
              className="relative text-white/70 hover:text-white transition-colors font-medium text-sm group"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          <motion.a
            href="#contato"
            onClick={(e) => scrollToSection(e, "#contato")}
            className="inline-flex items-center gap-2 bg-primary text-black text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsl(38 92% 50% / 0.5)" }}
            whileTap={{ scale: 0.96 }}
          >
            <Zap className="w-4 h-4" />
            Fale Conosco
          </motion.a>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-white/80 hover:text-white"
          aria-label="Menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isMenuOpen ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden border-t border-white/10 bg-[hsl(225_63%_10%/0.98)] backdrop-blur-xl"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ href, label }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={(e) => scrollToSection(e, href)}
                  className="text-white/70 hover:text-primary transition-colors font-medium py-3 px-3 rounded-xl hover:bg-white/5 text-sm"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.05 }}
                >
                  {label}
                </motion.a>
              ))}
              <motion.a
                href="#contato"
                onClick={(e) => scrollToSection(e, "#contato")}
                className="btn-primary text-sm py-3 px-4 text-center mt-2 rounded-xl inline-flex items-center justify-center gap-2"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Zap className="w-4 h-4" />
                Fale Conosco
              </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
