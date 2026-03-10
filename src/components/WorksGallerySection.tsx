import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Images } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryCard from "./gallery/CategoryCard";
import CategoryGallery from "./gallery/CategoryGallery";
import { AnimatedSection } from "./AnimatedSection";

interface GalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  thumbnail: string;
  title: string;
  category: string;
  categorySlug: string;
}

interface GalleryResponse {
  items: GalleryItem[];
}

const GALLERY_API_URL = `${import.meta.env.VITE_API_URL}/api/gallery`;

const WorksGallerySection = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(GALLERY_API_URL);
        const data: GalleryResponse = await response.json();
        setGalleryItems(data.items || []);
      } catch (error) {
        console.error("Erro ao carregar galeria:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const itemsByCategory = useMemo(() => {
    const grouped: Record<string, GalleryItem[]> = {};
    galleryItems.forEach((item) => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });
    return grouped;
  }, [galleryItems]);

  const categories = useMemo(
    () => ["Todos", ...Object.keys(itemsByCategory)],
    [itemsByCategory]
  );

  const filteredItems = useMemo(() => {
    if (selectedCategory === "Todos") return [];
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [galleryItems, selectedCategory]);

  return (
    <section
      id="trabalhos"
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection variant="slideUp" className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            <Camera className="w-4 h-4" />
            Nosso Portfólio
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Conheça nossos{" "}
            <span className="text-gradient-animated">trabalhos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Veja alguns dos serviços que realizamos com qualidade e profissionalismo
          </p>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection variant="fadeIn" delay={0.1} className="mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {isLoading
              ? [1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-10 w-28 rounded-full" />
              ))
              : categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedCategory === category
                    ? "text-black"
                    : "text-muted-foreground hover:text-foreground border border-border hover:border-primary/30 bg-muted"
                    }`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {selectedCategory === category && (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </motion.button>
              ))}
          </div>
        </AnimatedSection>

        {/* Gallery Content */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5"
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="aspect-square rounded-2xl bg-white/10" />
              ))}
            </motion.div>
          ) : selectedCategory === "Todos" ? (
            <motion.div
              key="category-grid"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5"
            >
              {Object.entries(itemsByCategory).map(([category, items]) => (
                <CategoryCard
                  key={category}
                  category={category}
                  items={items}
                  onClick={() => setSelectedCategory(category)}
                />
              ))}
            </motion.div>
          ) : filteredItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum trabalho encontrado nesta categoria</p>
            </motion.div>
          ) : (
            <motion.div
              key={`gallery-${selectedCategory}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <CategoryGallery items={filteredItems} category={selectedCategory} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer info */}
        <AnimatedSection variant="fadeIn" delay={0.2} className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
            <Images className="w-4 h-4" />
            <span>Atualizamos regularmente com novos trabalhos realizados</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default WorksGallerySection;
