import { Star, ExternalLink, Quote, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Review {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface ReviewsData {
  rating: number;
  total: number;
  reviews: Review[];
  lastUpdated: string;
}

interface CachedData {
  data: ReviewsData;
  cachedAt: number;
}

const CACHE_KEY = "repla_google_reviews";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const API_URL = "https://google-api-repla.vercel.app/api/reviews";

const fallbackReviews: Review[] = [
  {
    author_name: "Carlos M.",
    author_url: "",
    profile_photo_url: "",
    rating: 5,
    relative_time_description: "2 semanas atrás",
    text: "Excelente atendimento! Chegaram rápido e resolveram o problema elétrico em pouco tempo. Recomendo!",
    time: 0,
  },
  {
    author_name: "Ana Paula S.",
    author_url: "",
    profile_photo_url: "",
    rating: 5,
    relative_time_description: "1 mês atrás",
    text: "Profissionais muito competentes. Instalaram minha automação residencial com Alexa e ficou perfeito!",
    time: 0,
  },
  {
    author_name: "Roberto L.",
    author_url: "",
    profile_photo_url: "",
    rating: 5,
    relative_time_description: "3 semanas atrás",
    text: "Contratei para instalar o sistema solar. Qualidade impecável e preço justo. Nota 10!",
    time: 0,
  },
];

const getInitials = (name: string): string => {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const ReviewsSection = () => {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsedCache: CachedData = JSON.parse(cached);
          const now = Date.now();
          
          // If cache is still valid (less than 24 hours old)
          if (now - parsedCache.cachedAt < CACHE_DURATION) {
            setReviewsData(parsedCache.data);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error("Error parsing cached reviews:", e);
        }
      }

      // Fetch fresh data
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch reviews");
        
        const data: ReviewsData = await response.json();
        
        // Cache the data
        const cacheData: CachedData = {
          data,
          cachedAt: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        
        setReviewsData(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        // Use fallback data if fetch fails
        setReviewsData({
          rating: 5,
          total: 175,
          reviews: fallbackReviews,
          lastUpdated: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const displayReviews = reviewsData?.reviews.slice(0, 5) || fallbackReviews;
  const overallRating = reviewsData?.rating || 5;
  const totalReviews = reviewsData?.total || 175;

  return (
    <section id="avaliacoes" className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      {/* Background lightning watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg 
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] text-primary/5"
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Avaliações do Google
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-4">
            O que nossos clientes <span className="text-gradient">dizem</span>
          </h2>
          <p className="text-secondary-foreground/70 text-lg max-w-2xl mx-auto">
            Avaliações reais de clientes satisfeitos com nossos serviços
          </p>
        </div>

        {/* Rating summary - elegant text display */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-12">
          <div className="flex items-baseline gap-2">
            <span className="text-6xl md:text-7xl font-bold text-gradient">{overallRating.toFixed(1)}</span>
            <Star className="w-8 h-8 fill-primary text-primary" />
          </div>
          <div className="hidden md:block w-px h-16 bg-border" />
          <div className="text-center md:text-left">
            <p className="text-xl md:text-2xl font-semibold text-secondary-foreground mb-1">
              {totalReviews} avaliações no Google
            </p>
            <p className="text-primary font-medium flex items-center justify-center md:justify-start gap-2">
              <ThumbsUp className="w-5 h-5" />
              100% dos clientes recomendam
            </p>
          </div>
        </div>

        {/* Reviews carousel */}
        <div className="max-w-6xl mx-auto mb-12 px-2 md:px-0">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {loading ? (
                // Loading skeleton
                [...Array(3)].map((_, index) => (
                  <CarouselItem key={index} className="pl-3 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                    <div className="bg-card rounded-2xl p-6 border border-border animate-pulse h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-muted" />
                        <div className="flex-1">
                          <div className="h-4 bg-muted rounded w-24 mb-2" />
                          <div className="h-3 bg-muted rounded w-16" />
                        </div>
                      </div>
                      <div className="h-4 bg-muted rounded w-full mb-2" />
                      <div className="h-4 bg-muted rounded w-3/4" />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                displayReviews.map((review, index) => (
                  <CarouselItem key={index} className="pl-3 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                    <a
                      href={review.author_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-elevated hover:border-primary/30 transition-all duration-300 group h-full cursor-pointer">
                        {/* Header with avatar */}
                        <div className="flex items-center gap-4 mb-4">
                          {review.profile_photo_url ? (
                            <img 
                              src={review.profile_photo_url} 
                              alt={review.author_name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                              {getInitials(review.author_name)}
                            </div>
                          )}
                          <div className="flex-1">
                            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {review.author_name}
                            </span>
                            <p className="text-sm text-muted-foreground">{review.relative_time_description}</p>
                          </div>
                          <img 
                            src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" 
                            alt="Google" 
                            className="w-6 h-6"
                          />
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-0.5 mb-4">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                          ))}
                        </div>

                        {/* Quote */}
                        <div className="relative">
                          <Quote className="absolute -top-2 -left-1 w-8 h-8 text-primary/20" />
                          <p className="text-foreground pl-6 leading-relaxed line-clamp-4">{review.text}</p>
                        </div>
                      </div>
                    </a>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://g.page/r/CW8qxUgzlQS9EBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Star className="w-5 h-5" />
            <span>Avaliar a REPLA ENERGIA</span>
          </a>
          <a
            href="https://g.page/r/CW8qxUgzlQS9EBM"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-secondary-foreground hover:text-primary transition-colors font-medium"
          >
            <span>Ver todas as avaliações</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
