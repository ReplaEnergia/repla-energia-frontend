import { useState, useEffect, useCallback } from "react";
import { Zap } from "lucide-react";

interface GalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  thumbnail: string;
  title: string;
  category: string;
  categorySlug: string;
}

interface CategoryCardProps {
  category: string;
  items: GalleryItem[];
  onClick: () => void;
}

const CategoryCard = ({ category, items, onClick }: CategoryCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-rotate images ALWAYS (not just on hover) for a dynamic feel
  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % items.length);
    }, isHovering ? 800 : 2500); // Faster on hover, slower when idle

    return () => clearInterval(interval);
  }, [items.length, isHovering]);

  // Limit indicators to max 5 dots for cleaner UI
  const maxIndicators = 5;
  const showIndicators = items.length > 1;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-border/10 hover:border-primary/40"
    >
      {/* Images with smooth crossfade */}
      {items.map((item, index) => (
        <img
          key={item.id}
          src={item.thumbnail}
          alt={item.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
            index === currentImageIndex 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-110"
          }`}
          loading="lazy"
        />
      ))}

      {/* Permanent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
        <span className="inline-block px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-1.5 shadow-md">
          {category}
        </span>
        <p className="text-white/90 text-xs md:text-sm font-medium">
          {items.length} {items.length === 1 ? "trabalho" : "trabalhos"}
        </p>
      </div>

      {/* Image indicators - compact progress bar style */}
      {showIndicators && (
        <div className="absolute bottom-[72px] md:bottom-[76px] left-3 right-3 flex gap-0.5 z-10">
          {items.slice(0, Math.min(items.length, 6)).map((_, index) => (
            <div
              key={index}
              className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${
                index === (currentImageIndex % Math.min(items.length, 6))
                  ? "bg-primary" 
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}

      {/* Lightning accent - always visible */}
      <div className="absolute top-2.5 right-2.5 md:top-3 md:right-3">
        <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary drop-shadow-lg" />
      </div>

      {/* Hover border glow effect */}
      <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-primary/50 transition-all duration-300 pointer-events-none" />
    </div>
  );
};

export default CategoryCard;
