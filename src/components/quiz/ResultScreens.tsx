import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { ProgressBar } from "./ProgressBar";

interface Testimonial {
  name: string;
  title: string;
  body: string;
  image?: string;
}

const TESTIMONIALS_FEMALE: Testimonial[] = [
  {
    name: "Rogéria Cardoso",
    title: "Realmente esse Plano é incrível",
    body:
      "Fiquei realmente surpresa com esse plano, não imaginei que iria fazer tanta diferença! Finalmente consegui sair dos 68kg e voltar para os meus 60kg. Eu sempre gostei de fazer jejum, mas eu não sabia nem da metade das estratégias que vcs passam... O planejamento das refeições me ajudou demais, gratidão!!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Gleide Almeida",
    title: "Extremamente satisfeita",
    body:
      "Fiquei muito feliz com o conteúdo. Depois de consumir todo o material e começar a fazer o jejum, finalmente consegui o que eu queria... Eu sempre fui aquelas pessoas que emagrecem mas logo dps engordava dnv, e graças ao plano personalizado de vocês isso mudou. Já estou a 6 meses com o mesmo peso, nunca consegui isso na minha vida!! obrigada.",
    image: "/avatar-gleide.webp",
  },
  {
    name: "Cláudia Santos",
    title: "Perder peso era muito difícil, agora eu estou conseguindo sem esforço!",
    body:
      "Estou muito feliz com os resultados do Plano personalizado! Desde que comecei a seguir as orientações, notei uma grande diferença no espelho... to muito menos inchada e to com menos 5kg na balança. Mas isso nem foi o melhor, o que mais mudou foi a minha energia, antes eu já acordava cansada sabe? agora pareço ter 20 anos novamente kkkk, obrigada!!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
];

const TESTIMONIALS_MALE: Testimonial[] = [
  {
    name: "Sérgio Augusto",
    title: "Nunca tinha visto nenhum conteúdo parecido!",
    body:
      "O conteúdo de vcs se encaixou perfeitamente com o que eu precisava. Eu sempre gostei de correr mas de 4 anos pra cá eu não conseguia, estava acima do peso e era muito complicado... Foi quando eu conheci o plano personalizado de jejum de vocês, perdi um pouco mais de 10kg... E no final de semana passado voltei a correr, só agradecer!!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
  },
];

interface LoadingScreenProps {
  onComplete: () => void;
  onBack?: () => void;
  gender?: string;
}

/** Simulated AI plan-building loading, with rotating testimonial cards. */
export function LoadingScreen({ onComplete, onBack, gender }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [tIndex, setTIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const testimonials = gender === "female" ? TESTIMONIALS_FEMALE : TESTIMONIALS_MALE;

  useEffect(() => {
    const total = 7000; // Exatamente 7 segundos
    const start = performance.now();
    let raf = 0;
    let completed = false;

    const tick = () => {
      const p = Math.min(1, (performance.now() - start) / total);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!completed) {
        completed = true;
        onCompleteRef.current();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Rotacionar depoimentos de 3.5 em 3.5 segundos (mais lento)
  useEffect(() => {
    const id = setInterval(() => {
      setTIndex((i) => (i + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <div className="flex flex-1 flex-col gap-5 px-5 py-4 min-h-0 overflow-y-auto no-scrollbar">
      {onBack && (
        <button
          onClick={onBack}
          className="absolute left-4 top-4 z-30 p-1 text-foreground/80 hover:text-foreground"
          aria-label="Voltar"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
      )}
      
      <div className="mt-4">
        <h2 className="text-[24px] font-extrabold leading-tight text-foreground text-center">
          Criando o seu Plano Personalizado de Jejum
        </h2>
        <div className="mt-4 flex items-center justify-between text-[15px] font-semibold text-foreground">
          <span className="text-muted-foreground">Preparando...</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
        <div className="mt-2">
          <ProgressBar value={progress} />
        </div>
        <p className="mt-3 text-center text-[13px] text-muted-foreground">
          Estamos preparando o seu plano exclusivo e personalizado..
        </p>
      </div>

      <div className="mt-2 text-center">
        <div className="text-[26px] font-extrabold text-foreground">+45 mil pessoas</div>
        <div className="mt-0.5 text-[13px] text-muted-foreground">nos escolheram, veja o que eles falaram sobre nós...</div>
      </div>

      <div className="relative min-h-[220px] w-full flex items-center justify-center">
        {testimonials.map((t, i) => {
          const isActive = i === tIndex;
          return (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : (i < tIndex ? -50 : 50),
                scale: isActive ? 1 : 0.95,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className={`absolute inset-x-0 mx-auto max-w-[380px] rounded-2xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between ${
                isActive ? "z-10 pointer-events-auto" : "z-0 pointer-events-none"
              }`}
              style={{ minHeight: "210px" }}
            >
              <div className="flex items-center gap-3">
                {t.image ? (
                  <img src={t.image} alt={t.name} className="h-9 w-9 rounded-full object-cover border border-border" />
                ) : (
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-muted text-sm font-semibold text-foreground">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div className="text-left">
                  <div className="font-semibold text-sm text-foreground">{t.name}</div>
                  <div className="flex text-primary mt-0.5" aria-hidden>
                    {"★★★★★".split("").map((s, k) => (
                      <span key={k} className="text-[10px] text-emerald-500">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-left text-[14px] font-bold text-foreground leading-snug">{t.title}</div>
              <p className="mt-1 text-left text-[12px] leading-relaxed text-muted-foreground/90 flex-1">{t.body}</p>
            </motion.div>
          );
        })}
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
  onBack?: () => void;
  gender?: string;
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

function OfferCard({ onCTA, gender }: { onCTA: () => void; gender?: string }) {
  const parcelado = "5,72";
  const aVista = "29,00";

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-2xl border-2 border-primary">
        <div className="bg-primary py-2.5 text-center text-sm font-semibold text-primary-foreground">
          De R$ 197,90 por apenas 👇
        </div>
        <div className="flex items-center justify-between gap-4 bg-background p-5">
          <div className="text-[17px] font-bold leading-tight text-foreground">
            Plano de Jejum
            <br />Personalizado
          </div>
          <div className="rounded-lg bg-muted px-4 py-3 text-right">
            <div className="text-[11px] font-medium text-muted-foreground">6x de</div>
            <div className="text-xl font-extrabold text-foreground">
              R$<span className="text-3xl font-black">{parcelado}</span>
            </div>
            <div className="text-[11px] font-medium text-muted-foreground">Ou R${aVista} à vista</div>
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
export function ResultOffer({ targetWeight, onCTA, gender }: OfferProps) {
  const agoraMetaImg = gender === "female" ? "/agora-meta-female.webp" : "/agora-meta.webp";
  const testimonials = gender === "female" ? TESTIMONIALS_FEMALE : TESTIMONIALS_MALE;
  return (
    <div className="flex-1 overflow-y-auto px-5 pb-16 pt-2 no-scrollbar relative">
      <div className="mx-auto flex w-full flex-col gap-6">
        <h2 className="text-center text-[24px] font-extrabold leading-tight text-foreground">
          O seu Plano Personalizado de Jejum está pronto!
        </h2>

        {/* Antes/Depois */}
        <div className="overflow-hidden rounded-2xl border border-border">
          {gender !== "female" && (
            <div className="grid grid-cols-2 divide-x divide-border bg-[#F5F2EB] text-center text-sm font-bold text-foreground">
              <div className="py-2">Agora</div>
              <div className="py-2">Meta</div>
            </div>
          )}
          <div className="bg-[#EFECE3] p-1.5 flex justify-center">
            <img 
              src={agoraMetaImg} 
              alt="Antes e Depois" 
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Rótulos de tempo */}
        <div className="grid grid-cols-2 text-center -mt-2">
          <div className="text-[27px] font-extrabold text-foreground text-left pl-2">Hoje</div>
          <div className="text-[27px] font-extrabold text-foreground text-left pl-6">Em 21 dias</div>
        </div>

        {/* Metrics compare */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <MetricSlider label="Seu Nível de gordura" value="Alto" pct={0.8} color="red" />
          <MetricSlider label="Seu Nível de gordura" value="Baixo" pct={0.15} color="green" />

          <MetricSlider label="Seu Nível de energia" value="Baixo" pct={0.2} color="red" />
          <MetricSlider label="Seu Nível de energia" value="Alto" pct={0.85} color="green" />

          <MetricSlider label="Seu Metabolismo" value="Baixo" pct={0.2} color="red" />
          <MetricSlider label="Seu Metabolismo" value="Alto" pct={0.85} color="green" />
        </div>

        <div className="rounded-2xl bg-[#D0F8D9] p-5 text-center border border-[#BCE8C5]">
          <div className="text-[24px] font-black text-[#155A27]">Como funciona o Plano?</div>
          <p className="mt-2 text-[15px] leading-relaxed text-[#1B4D27] font-medium">
            Com base nas suas informações pessoais e objetivos, criamos um plano de jejum 100% personalizado para você.
            Nossa abordagem estratégica foi feita para que você consiga potencializar sua perda de peso em 21 dias,
            respeitando seu estilo de vida, sua rotina e o que você gosta de comer.
          </p>
        </div>

        <h3 className="mt-2 text-center text-[26px] font-extrabold text-foreground">Seu plano inclui:</h3>

        <div className="flex flex-col gap-4">
          {PLAN_ITEMS.map((it) => (
            <div key={it.title} className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto grid h-24 w-24 place-items-center text-5xl">{it.emoji}</div>
              <div className="mt-4 text-[18px] font-extrabold leading-tight text-foreground">{it.title}</div>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{it.body}</p>
            </div>
          ))}
        </div>

        <OfferCard onCTA={onCTA} gender={gender} />

        {/* Before/after photos */}
        <div>
          <h3 className="mb-4 text-center text-[22px] font-extrabold text-foreground">Veja mudanças visíveis após uma semana</h3>
          <div className="flex flex-col gap-3">
            {(gender === "female"
              ? ["/transform-female-1.webp", "/transform-female-2.webp", "/transform-female-3.webp", "/transform-female-4.webp", "/transform-female-5.webp"]
              : ["/transform-1.webp", "/transform-2.webp", "/transform-3.webp", "/transform-4.webp"]
            ).map((src, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-border shadow-sm">
                <img src={src} alt={`Transformação ${i + 1}`} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="mb-3 text-center text-[20px] font-extrabold text-foreground">Veja as histórias de sucesso dos nossos alunos</h3>
          <div className="flex flex-col gap-4">
            {testimonials.map((t) => (
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
                <div className="mt-2 text-[15px] font-bold text-foreground">{t.title}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{t.body}</p>
              </div>
            ))}
          </div>
        </div>

        <OfferCard onCTA={onCTA} gender={gender} />

        {/* Guarantee */}
        <div className="mt-2 flex flex-col items-center gap-3 text-center">
          <img src="/garantia-30dias.webp" alt="Garantia de 30 dias" className="w-24 h-24 object-contain" />
          <div className="text-[20px] font-extrabold text-foreground">Garantia de reembolso</div>
          <p className="text-[14px] text-muted-foreground whitespace-nowrap">A compra deste material é totalmente sem risco para você.</p>
          <p className="text-[15px] text-muted-foreground">
            Se ele não atender às suas expectativas nos primeiros 30 dias após a compra, nós reembolsaremos todo o valor
            que você pagou, sem fazer perguntas.
          </p>
        </div>
      </div>
    </div>
  );
}

function MetricSlider({ label, value, pct, color }: { label: string; value: string; pct: number; color: "red" | "green" }) {
  const fillColor = color === "red" ? "bg-[#FF3B30]" : "bg-[#34C759]";
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="text-[13px] font-bold text-foreground leading-tight">{label}</div>
      <div className="text-[11px] text-muted-foreground -mt-0.5">{value}</div>
      <div className="relative h-1.5 w-full rounded-full bg-[#E5E5EA] mt-1.5">
        <div
          className={`h-full rounded-full ${fillColor}`}
          style={{ width: `${pct * 100}%` }}
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border border-black/10 bg-white shadow-md"
          style={{ left: `calc(${pct * 100}% - 7px)` }}
        />
      </div>
    </div>
  );
}
