import { FileText, Clock, CheckCircle } from "lucide-react";

const QuoteSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                Orçamentos
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Orçamento claro e <span className="text-gradient">sem surpresas</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Trabalhamos com visitas técnicas para entender exatamente sua necessidade.
                Após a visita, o orçamento é entregue em até <strong className="text-foreground">24 horas</strong>.
              </p>

              {/* Features list */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Análise técnica completa</p>
                    <p className="text-muted-foreground text-sm">Avaliação detalhada do seu projeto</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Transparência total</p>
                    <p className="text-muted-foreground text-sm">Sem custos ocultos ou surpresas</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Resposta rápida</p>
                    <p className="text-muted-foreground text-sm">Orçamento em até 24 horas após a visita</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing card */}
            <div className="bg-muted rounded-3xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Visita Técnica
                </h3>
              </div>

              <div className="mb-6">
                <p className="text-4xl font-bold text-foreground mb-2">
                  R$ 80<span className="text-lg text-muted-foreground">,00</span>
                </p>
                <p className="text-muted-foreground">Dias úteis em horário comercial</p>
              </div>

              <div className="bg-background rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Fora do horário comercial</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Feriados ou fins de semana: valor combinado previamente
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                O valor da visita cobre deslocamento e análise técnica especializada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
