import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryItem = {
  src: string;
  title: string;
};

interface GalleryLightboxProps {
  open: boolean;
  items: GalleryItem[];
  category: string;
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const FADE_DURATION_MS = 300;

const GalleryLightbox = ({
  open,
  items,
  category,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) => {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // next frame so the animation class can kick in
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    if (!mounted) return;

    setVisible(false);
    const t = window.setTimeout(() => setMounted(false), FADE_DURATION_MS);
    return () => window.clearTimeout(t);
  }, [open, mounted]);

  if (typeof document === "undefined" || !mounted) return null;

  return createPortal(
    <div
      className={
        "fixed inset-0 z-[1000] bg-foreground/95 flex flex-col items-center justify-center " +
        (visible ? "animate-fade-in" : "animate-fade-out")
      }
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualização ampliada"
    >
      {/* Close button - always above header */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="fixed top-4 right-4 md:top-6 md:right-6 p-3 md:p-3 rounded-full bg-background/10 hover:bg-background/15 border border-background/20 backdrop-blur-sm transition-all duration-200 z-[1010] shadow-xl"
        aria-label="Fechar"
      >
        <X className="w-6 h-6 md:w-5 md:h-5 text-background" />
      </button>

      {/* Desktop navigation */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/10 hover:bg-background/20 transition-colors z-[1010] items-center justify-center"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6 text-background" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/10 hover:bg-background/20 transition-colors z-[1010] items-center justify-center"
        aria-label="Próximo"
      >
        <ChevronRight className="w-6 h-6 text-background" />
      </button>

      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-24 left-0 right-0 flex justify-center gap-8 z-[1010]">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="p-3 rounded-full bg-background/20 hover:bg-background/30 transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6 text-background" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="p-3 rounded-full bg-background/20 hover:bg-background/30 transition-colors"
          aria-label="Próximo"
        >
          <ChevronRight className="w-6 h-6 text-background" />
        </button>
      </div>

      {/* Content */}
      <div
        className="w-full h-full flex flex-col items-center justify-center px-4 py-16 md:px-16 md:py-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-w-2xl max-h-[50vh] md:max-h-[60vh] flex items-center justify-center">
          <img
            src={items[currentIndex]?.src}
            alt={items[currentIndex]?.title}
            className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
          />
        </div>

        <div className="text-center mt-4 md:mt-6">
          <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs md:text-sm font-medium rounded-full mb-2">
            {category}
          </span>
          <h3 className="text-background text-base md:text-lg font-semibold px-4">
            {items[currentIndex]?.title}
          </h3>
          <p className="text-background/60 text-sm mt-1">
            {currentIndex + 1} / {items.length}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default GalleryLightbox;
