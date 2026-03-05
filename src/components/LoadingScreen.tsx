import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import electricAnimation from "@/assets/eletric.json";

interface Props {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: Props) => {
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    // Simula progresso de carregamento
    const duration = 1200; // ms total
    const interval = 30;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      setProgress(Math.min(Math.round((current / steps) * 100), 100));

      if (current >= steps) {
        clearInterval(timer);
        setHiding(true);
        // Aguarda o fade-out antes de notificar
        setTimeout(onComplete, 600);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!hiding ? (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "hsl(225 63% 12%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          {/* Content */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Lottie animation */}
            <motion.div
              className="w-40 h-40"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Lottie
                animationData={electricAnimation}
                loop
                autoplay
                className="w-full h-full"
              />
            </motion.div>

            {/* Brand */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="text-white font-bold text-xl tracking-wide">REPLA ENERGIA</p>
              <p className="text-white/40 text-sm mt-1">Soluções Elétricas & Fotovoltaicas</p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-48 h-1 bg-white/10 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="h-full bg-primary rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </motion.div>

            {/* Percentage */}
            <motion.p
              className="text-white/30 text-xs tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {progress}%
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LoadingScreen;
