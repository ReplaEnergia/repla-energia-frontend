import { useState, useEffect, useMemo } from "react";
import { Camera } from "lucide-react";
import LightningWatermark from "./LightningWatermark";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryCard from "./gallery/CategoryCard";
import CategoryGallery from "./gallery/CategoryGallery";

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

const GALLERY_API_URL = "https://google-api-repla.vercel.app/api/gallery";

const WorksGallerySection = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Fetch gallery items from API
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

  // Group items by category
  const itemsByCategory = useMemo(() => {
    const grouped: Record<string, GalleryItem[]> = {};
    galleryItems.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  }, [galleryItems]);

  // Extract unique categories from items
  const categories = useMemo(() => {
    return ["Todos", ...Object.keys(itemsByCategory)];
  }, [itemsByCategory]);

  // Get filtered items for specific category
  const filteredItems = useMemo(() => {
    if (selectedCategory === "Todos") {
      return [];
    }
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [galleryItems, selectedCategory]);

  const handleCategoryCardClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <section id="trabalhos" className="py-20 md:py-28 bg-muted relative overflow-hidden">
      <LightningWatermark position="left" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            <Camera className="w-4 h-4" />
            Nosso Portfólio
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Conheça nossos <span className="text-gradient">trabalhos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Veja alguns dos serviços que realizamos com qualidade e profissionalismo
          </p>
        </div>

        {/* Category Filter */}
        {isLoading ? (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Content */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="aspect-square rounded-2xl" />
            ))}
          </div>
        ) : selectedCategory === "Todos" ? (
          /* Category Cards View - One card per category with hover carousel */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {Object.entries(itemsByCategory).map(([category, items]) => (
              <CategoryCard
                key={category}
                category={category}
                items={items}
                onClick={() => handleCategoryCardClick(category)}
              />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum trabalho encontrado nesta categoria</p>
          </div>
        ) : (
          /* Category Gallery View - Full carousel for selected category */
          <CategoryGallery items={filteredItems} category={selectedCategory} />
        )}

        {/* Info text */}
        <p className="text-center text-muted-foreground mt-8 text-sm">
          📸 Atualizamos regularmente com novos trabalhos realizados
        </p>
      </div>
    </section>
  );
};

export default WorksGallerySection;
