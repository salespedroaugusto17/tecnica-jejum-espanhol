import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CTAButton } from "./CTAButton";
import { ProgressBar } from "./ProgressBar";

interface Testimonial {
  name: string;
  title: string;
  body: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rogéria Cardoso",
    title: "Realmente esse Plano é incrível",
    body:
      "Fiquei realmente surpresa com esse plano, não imaginei que iria fazer tanta diferença! Finalmente consegui sair dos 68kg e voltar para os meus 60kg. Eu sempre gostei de fazer jejum, mas eu não sabia nem da metade das estratégias que vcs passam... O planejamento das refeições me ajudou demais, gratidão!!",
  },
  {
    name: "Sérgio Augusto",
    title: "Nunca tinha visto nenhum conteúdo parecido!",
    body:
      "O conteúdo de vcs se encaixou perfeitamente com o que eu precisava. Eu sempre gostei de correr mas de 4 anos pra cá eu não conseguia, estava acima do peso e era muito complicado... Foi quando eu conheci o plano personalizado de jejum de vocês, perdi um pouco mais de 10kg...",
  },
  {
    name: "Cláudia Santos",
    title: "Perder peso era muito difícil, agora eu estou conseguindo sem esforço!",
    body:
      "Estou muito feliz com os resultados do Plano personalizado! Desde que comecei a seguir as orientações, notei uma grande diferença no espelho... to muito menos inchada e to com menos 5kg na balança...",
  },
];

interface LoadingScreenProps {
  onComplete: () => void;
}

/** Simulated AI plan-building loading, with rotating testimonial cards. */
export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [tIndex, setTIndex] = useState(0);

  useEffect(() => {
    const total = 7000; // 7s
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const p = Math.min(1, (performance.now() - start) / total);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 400);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  useEffect(() => {
    const id = setInterval(() => setTIndex((i) => (i + 1) % TESTIMONIALS.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-6 px-5 py-6">
      <div>
        <h2 className="text-[22px] font-extrabold leading-tight text-foreground">
          Criando o seu Plano Personalizado de Jejum
        </h2>
        <div className="mt-4 flex items-center justify-between text-sm font-semibold text-foreground">
          <span className="text-muted-foreground">Preparando...</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
        <div className="mt-2">
          <ProgressBar value={progress} />
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Estamos preparando o seu plano exclusivo e personalizado..
        </p>
      </div>

      <div className="mt-4 text-center">
        <div className="text-2xl font-extrabold text-foreground">+45 mil pessoas</div>
        <div className="mt-1 text-xs text-muted-foreground">nos escolheram, veja o que eles falaram sobre nós...</div>
      </div>

      <div className="relative min-h-[240px]">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={false}
            animate={{
              opacity: i === tIndex ? 1 : 0,
              x: i === tIndex ? 0 : 30,
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 rounded-2xl border border-border bg-card p-4 shadow-sm"
            aria-hidden={i !== tIndex}
          >
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-muted text-sm font-semibold">
                {t.name.charAt(0)}
              </div>
              <div className="font-semibold text-foreground">{t.name}</div>
              <div className="ml-auto flex text-primary" aria-hidden>
                {"★★★★★".split("").map((s, k) => (
                  <span key={k} className="text-xs">{s}</span>
                ))}
              </div>
            </div>
            <div className="mt-2 text-sm font-bold text-foreground">{t.title}</div>
            <p className="mt-1 line-clamp-6 text-xs leading-relaxed text-muted-foreground">{t.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

interface PlanIncludeItem {
  emoji: string;
  title: string;
  body: string;
}
const PLAN_ITEMS: PlanIncludeItem[] = [
  { emoji: "🍽️", title: "Como fazer o Jejum do Jeito Certo", body: "Baseado nas pesquisas mais recentes de universidades famosas como Havard, desenvolvemos o Protocolo Seca Jejum, a forma mais eficaz e segura de fazer o Jejum intermitente para perder peso sem que você perca músculos ou sinta muita fome." },
  { emoji: "🔥", title: "Potencialize a Queima de Gordura", body: "Saiba exatamente o que comer para acelerar a queima de gordura e te manter com saciedade por mais tempo." },
  { emoji: "🪞", title: "Como Parecer outra Pessoa na Frente do Espelho em 7 Dias", body: "Aprenda o jeito mais fácil de desinchar e ver grandes resultados no espelho em menos de 7 dias." },
  { emoji: "🎹", title: "Protocolo Anti-Efeito Sanfona", body: "Descubra como manter o peso perdido e nunca mais voltar a engordar, mesmo depois de atingir seu objetivo." },
  { emoji: "⚡", title: "Como acelerar o seu metabolismo e perder peso sem fazer nada", body: "Aprenda as principais estratégias para acelerar o seu metabolismo e queimar gordura mesmo que você não faça nada." },
  { emoji: "🎯", title: "Definição de metas diárias", body: "Como definir metas diárias para você se manter no caminho certo" },
  { emoji: "⏳", title: "Protocolo Anti-procrastinação", body: "Descubra o segredo dos maiores líderes para se manter sempre motivado" },
  { emoji: "📝", title: "Planilha de acompanhamento", body: "Saiba exatamente quanto você está evoluindo" },
];

interface OfferProps {
  targetWeight: number;
  onCTA: () => void;
}

function CountdownTimer() {
  const [remaining, setRemaining] = useState(15 * 60 + 37);
  useEffect(() => {
    const id = setInterval(() => setRemaining((r) => (r <= 0 ? 0 : r - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = Math.floor(remaining / 60).toString().padStart(2, "0");
  const ss = (remaining % 60).toString().padStart(2, "0");
  return (
    <div className="flex items-center justify-center gap-1.5">
      <div className="rounded-lg bg-[oklch(0.96_0.05_25)] px-3 py-1 text-center">
        <div className="text-xl font-extrabold text-[oklch(0.62_0.22_25)]">{mm}</div>
        <div className="-mt-0.5 text-[10px] font-medium text-[oklch(0.62_0.22_25)]">min</div>
      </div>
      <span className="text-lg font-bold text-[oklch(0.62_0.22_25)]">:</span>
      <div className="rounded-lg bg-[oklch(0.96_0.05_25)] px-3 py-1 text-center">
        <div className="text-xl font-extrabold text-[oklch(0.62_0.22_25)]">{ss}</div>
        <div className="-mt-0.5 text-[10px] font-medium text-[oklch(0.62_0.22_25)]">seg</div>
      </div>
    </div>
  );
}

function OfferCard({ onCTA }: { onCTA: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-2xl border-2 border-primary">
        <div className="bg-primary py-1.5 text-center text-xs font-semibold text-primary-foreground">
          De R$ 197,90 por apenas 👇
        </div>
        <div className="flex items-center justify-between gap-3 bg-background p-4">
          <div className="text-[15px] font-bold leading-tight text-foreground">
            Plano de Jejum
            <br />Personalizado
          </div>
          <div className="rounded-lg bg-muted px-3 py-2 text-right">
            <div className="text-[10px] font-medium text-muted-foreground">6x de</div>
            <div className="text-xl font-extrabold text-foreground">
              R$<span className="text-2xl">5,32</span>
            </div>
            <div className="text-[10px] font-medium text-muted-foreground">Ou R$27,00 à vista</div>
          </div>
        </div>
      </div>
      <CountdownTimer />
      <CTAButton onClick={onCTA} className="uppercase tracking-wide">
        Receber o meu plano
      </CTAButton>
      <div className="flex items-center justify-around text-[11px] font-medium text-foreground">
        <div className="flex items-center gap-1"><span aria-hidden>✅</span><span>Compra<br /><b>SEGURA</b></span></div>
        <div className="flex items-center gap-1"><span aria-hidden>🏅</span><span>Satisfação<br /><b>GARANTIDA</b></span></div>
        <div className="flex items-center gap-1"><span aria-hidden>🔒</span><span>Privacidade<br /><b>PROTEGIDA</b></span></div>
      </div>
    </div>
  );
}

/** Full result / offer page — mirrors screenshots 42-56. */
export function ResultOffer({ targetWeight, onCTA }: OfferProps) {
  return (
    <div className="flex-1 overflow-y-auto px-5 pb-16 pt-2 no-scrollbar">
      <div className="mx-auto flex w-full max-w-[400px] flex-col gap-6">
        <h2 className="text-center text-[22px] font-extrabold leading-tight text-foreground">
          O seu Plano Personalizado de Jejum está pronto!
        </h2>

        {/* Antes/Depois */}
        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="grid grid-cols-2 divide-x divide-border bg-muted text-center text-sm font-semibold">
            <div className="py-2">Agora</div>
            <div className="py-2">Meta</div>
          </div>
          <div className="grid grid-cols-2 gap-0 bg-[oklch(0.90_0.02_60)]">
            <div className="grid aspect-[3/4] place-items-center text-7xl">🫃</div>
            <div className="grid aspect-[3/4] place-items-center text-7xl">💪</div>
          </div>
        </div>

        {/* Metrics compare */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { l: "Seu Nível de gordura", a: "Alto", b: "Baixo", va: 0.9, vb: 0.15 },
            { l: "Seu Nível de energia", a: "Baixo", b: "Alto", va: 0.15, vb: 0.9 },
            { l: "Seu Metabolismo", a: "Baixo", b: "Alto", va: 0.15, vb: 0.9 },
          ].flatMap((m, i) => [
            <MetricRow key={`a${i}`} label={m.l} value={m.a} pct={m.va} />,
            <MetricRow key={`b${i}`} label={m.l} value={m.b} pct={m.vb} />,
          ])}
        </div>

        <div className="rounded-2xl bg-[oklch(0.95_0.08_150)] p-5 text-center">
          <div className="text-lg font-extrabold text-foreground">Como funciona o Plano?</div>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            Com base nas suas informações pessoais e objetivos, criamos um plano de jejum 100% personalizado para você.
            Nossa abordagem estratégica foi feita para que você consiga potencializar sua perda de peso em 21 dias,
            respeitando seu estilo de vida, sua rotina e o que você gosta de comer.
          </p>
        </div>

        <h3 className="mt-2 text-center text-2xl font-extrabold text-foreground">Seu plano inclui:</h3>

        <div className="flex flex-col gap-4">
          {PLAN_ITEMS.map((it) => (
            <div key={it.title} className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto grid h-24 w-24 place-items-center text-5xl">{it.emoji}</div>
              <div className="mt-4 text-[17px] font-extrabold leading-tight text-foreground">{it.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
            </div>
          ))}
        </div>

        <OfferCard onCTA={onCTA} />

        {/* Before/after photos placeholders */}
        <div>
          <h3 className="mb-3 text-center text-lg font-extrabold text-foreground">Veja mudanças visíveis após uma semana</h3>
          <div className="flex flex-col gap-3">
            {["🧔‍♂️", "👨‍🦳", "🧔"].map((e, i) => (
              <div key={i} className="grid grid-cols-2 overflow-hidden rounded-xl border border-border bg-muted">
                <div className="grid aspect-square place-items-center text-6xl">{e}</div>
                <div className="grid aspect-square place-items-center text-6xl">💪</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="mb-3 text-center text-lg font-extrabold text-foreground">Veja as histórias de sucesso dos nossos alunos</h3>
          <div className="flex flex-col gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-muted text-sm font-semibold">
                    {t.name.charAt(0)}
                  </div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="ml-auto flex text-primary" aria-hidden>
                    {"★★★★★".split("").map((s, k) => (
                      <span key={k} className="text-xs">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-2 text-sm font-bold text-foreground">{t.title}</div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t.body}</p>
              </div>
            ))}
          </div>
        </div>

        <OfferCard onCTA={onCTA} />

        {/* Guarantee */}
        <div className="mt-2 flex flex-col items-center gap-2 text-center">
          <div className="text-5xl">🏅</div>
          <div className="text-lg font-extrabold text-foreground">Garantia de reembolso</div>
          <p className="text-sm text-muted-foreground">A compra deste material é totalmente sem risco para você.</p>
          <p className="text-sm text-muted-foreground">
            Se ele não atender às suas expectativas nos primeiros 30 dias após a compra, nós reembolsaremos todo o valor
            que você pagou, sem fazer perguntas.
          </p>
          <p className="text-sm text-muted-foreground">
            Basta enviar um e-mail para o suporte em <span className="font-semibold text-foreground underline">suporte@secajejum.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-[13px] font-bold text-foreground">{label}</div>
      <div className="text-[12px] text-muted-foreground">{value}</div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${pct * 100}%` }}
        />
      </div>
    </div>
  );
}
