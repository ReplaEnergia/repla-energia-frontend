import { Star, ExternalLink, Quote, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimatedSection } from "./AnimatedSection";
import CounterAnimation from "./CounterAnimation";

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
const API_URL = `${import.meta.env.VITE_API_URL}/api/reviews`;

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
    <section id="avaliacoes" className="py-20 md:py-28 bg-[hsl(225_63%_12%)] relative overflow-hidden">
      {/* background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      {/* Background lightning watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] text-primary/5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <AnimatedSection variant="slideUp" className="text-center mb-10 md:mb-14">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            Avaliações do Google
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            O que nossos clientes <span className="text-gradient-animated">dizem</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Avaliações reais de clientes satisfeitos com nossos serviços
          </p>
        </AnimatedSection>

        {/* ── Animated stats ─────────────────────────── */}
        <AnimatedSection variant="slideUp" delay={0.1} className="mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 p-8 rounded-2xl glass-dark border border-white/10 max-w-3xl mx-auto">
            {[
              { value: totalReviews, suffix: "+", label: "Avaliações Google", decimals: 0 },
              { value: overallRating, suffix: "★", label: "Nota Média", decimals: 1 },
              { value: 12, suffix: " meses", label: "Garantia", decimals: 0 },
            ].map(({ value, suffix, label, decimals }) => (
              <motion.div
                key={label}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient-animated mb-1">
                  <CounterAnimation to={value} suffix={suffix} decimals={decimals} duration={2} />
                </div>
                <div className="text-white/50 text-sm">{label}</div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>



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
                    <div className="rounded-2xl p-6 border border-white/10 bg-white/5 animate-pulse h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-white/10" />
                        <div className="flex-1">
                          <div className="h-4 bg-white/10 rounded w-24 mb-2" />
                          <div className="h-3 bg-white/10 rounded w-16" />
                        </div>
                      </div>
                      <div className="h-4 bg-white/10 rounded w-full mb-2" />
                      <div className="h-4 bg-white/10 rounded w-3/4" />
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
                      <div
                        className="relative rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group h-full cursor-pointer overflow-hidden"
                      >
                        {/* Subtle top accent */}
                        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                        {/* Header with avatar */}
                        <div className="flex items-center gap-3 mb-4">
                          {review.profile_photo_url ? (
                            <img
                              src={review.profile_photo_url}
                              alt={review.author_name}
                              className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/20"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-base">
                              {getInitials(review.author_name)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <span className="font-semibold text-white text-sm block truncate group-hover:text-primary transition-colors">
                              {review.author_name}
                            </span>
                            <p className="text-xs text-white/40">{review.relative_time_description}</p>
                          </div>
                          <img
                            src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                            alt="Google"
                            className="w-5 h-5 flex-shrink-0"
                          />
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-0.5 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                          ))}
                        </div>

                        {/* Quote */}
                        <div className="relative">
                          <Quote className="absolute -top-1 -left-1 w-6 h-6 text-primary/25" />
                          <p className="text-white/80 text-sm pl-5 leading-relaxed line-clamp-4">
                            {review.text}
                          </p>
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
        <AnimatedSection variant="slideUp" delay={0.1}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="https://g.page/r/CW8qxUgzlQS9EBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-primary text-black font-semibold px-7 py-3.5 rounded-xl text-sm"
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px hsl(38 92% 50% / 0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Star className="w-4 h-4" />
              Avaliar a REPLA ENERGIA
            </motion.a>

            <motion.a
              href="https://g.page/r/CW8qxUgzlQS9EBM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/40 backdrop-blur-sm text-sm font-medium transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ExternalLink className="w-4 h-4" />
              Ver todas as avaliações
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ReviewsSection;
