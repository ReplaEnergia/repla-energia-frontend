import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareHeart, Send, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "";

const FeedbackWidget = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim() || !formRef.current) return;

    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        type: "contact",
        name: "Visitante (Feedback)",
        email: "feedback@repla.com.br",
        subject: "Novo Feedback do Site",
        message: feedback,
      };

      const res = await fetch(`${API_URL}/api/mail/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 429) {
        toast.error("Muitos envios", {
          description: "Por favor, aguarde um minuto antes de enviar novamente.",
        });
        setError("Limite de envios atingido. Aguarde um pouco.");
        return;
      }

      if (!res.ok) {
        throw new Error("Erro na API.");
      }

      setIsSubmitted(true);
      setFeedback("");

      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
      }, 3500);
    } catch {
      toast.error("Erro no envio", {
        description: "Não foi possível enviar seu feedback agora. Tente de novo mais tarde.",
      });
      setError("Erro ao enviar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Side tab */}
      <div
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" } as React.CSSProperties}
      >
        <motion.button
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Nos ajude a melhorar"
          className="flex items-center gap-2 bg-primary text-black font-bold text-[11px] tracking-wide px-2.5 py-3 rounded-r-xl shadow-xl cursor-pointer hover:shadow-primary/30"
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.18 }}
        >
          <MessageSquareHeart
            className="w-3.5 h-3.5 flex-shrink-0"
            style={{ writingMode: "horizontal-tb" } as React.CSSProperties}
          />
          <span>FEEDBACK</span>
        </motion.button>
      </div>

      {/* Overlay + Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed left-0 top-0 bottom-0 w-[320px] max-w-[92vw] z-50 flex flex-col"
              style={{ background: "hsl(225 63% 12%)" } as React.CSSProperties}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                    <MessageSquareHeart className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">Nos Ajude a Melhorar</p>
                    <p className="text-white/35 text-[11px] mt-0.5">Sua opinião é muito importante</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto flex flex-col">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      ref={formRef}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex-1 p-5 flex flex-col gap-5"
                    >
                      <p className="text-white/45 text-sm leading-relaxed mb-4">
                        Deixe sua sugestão ou opinião. Queremos sempre oferecer o melhor para você!
                      </p>

                      <div className="flex flex-col gap-1.5 flex-1">
                        <p className="text-white/50 text-xs font-medium uppercase tracking-wider">
                          Sua mensagem
                        </p>
                        <textarea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          required
                          placeholder="Escreva sua sugestão aqui..."
                          className="flex-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-primary/40 text-white placeholder:text-white/20 focus:outline-none  transition-all resize-none text-sm leading-relaxed"
                        />
                      </div>

                      {error && (
                        <p className="text-red-400 text-xs text-center bg-red-400/10 rounded-lg p-2">
                          {error}
                        </p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={isSubmitting || !feedback.trim()}
                        className="w-full inline-flex items-center justify-center gap-2 bg-primary text-black font-bold px-5 py-3 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        whileHover={{ scale: feedback.trim() ? 1.02 : 1, boxShadow: feedback.trim() ? "0 0 24px hsl(38 92% 50% / 0.35)" : "none" }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-black/25 border-t-black rounded-full animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Enviar Feedback
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center gap-4 text-center p-8 min-h-[300px]"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                        className="w-16 h-16 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                      </motion.div>
                      <div>
                        <p className="font-bold text-white text-lg">Obrigado!</p>
                        <p className="text-white/40 text-sm mt-1 leading-relaxed">
                          Sua opinião nos ajuda a melhorar cada vez mais.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-white/6 flex items-center justify-center">
                <p className="text-white/20 text-[10px] tracking-wide uppercase">Repla Energia © 2026</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackWidget;
