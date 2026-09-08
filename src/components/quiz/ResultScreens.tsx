import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { buildCheckoutUrl } from "@/lib/utm";
import { ProgressBar } from "./ProgressBar";

interface Testimonial {
  name: string;
  title: string;
  body: string;
  image?: string;
}

const TESTIMONIALS_FEMALE: Testimonial[] = [
  {
    name: "María García",
    title: "Realmente este Plan es increíble",
    body:
      "Quedé realmente sorprendida con este plan, ¡no imaginé que haría tanta diferencia! Finalmente logré bajar de los 68kg y volver a mis 60kg. Siempre me gustó hacer ayuno, pero no sabía ni la mitad de las estrategias que ustedes enseñan... ¡La planificación de las comidas me ayudó muchísimo, gracias!!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Carolina López",
    title: "Extremadamente satisfecha",
    body:
      "Quedé muy feliz con el contenido. Después de consumir todo el material y empezar a hacer el ayuno, finalmente logré lo que quería... Siempre fui de esas personas que adelgazan pero después vuelven a engordar, y gracias al plan personalizado de ustedes eso cambió. ¡Ya llevo 6 meses con el mismo peso, nunca lo había logrado en mi vida!! gracias.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Ana Martínez",
    title: "Perder peso era muy difícil, ¡ahora lo estoy logrando sin esfuerzo!",
    body:
      "¡Estoy muy feliz con los resultados del Plan personalizado! Desde que empecé a seguir las indicaciones, noté una gran diferencia en el espejo... estoy mucho menos hinchada y con 5kg menos en la balanza. Pero eso ni fue lo mejor, lo que más cambió fue mi energía, antes ya me despertaba cansada ¿saben? ahora parezco tener 20 años nuevamente jaja, ¡¡gracias!!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
];

const TESTIMONIALS_MALE: Testimonial[] = [
  {
    name: "Carlos Rodríguez",
    title: "¡Nunca había visto un contenido parecido!",
    body:
      "El contenido de ustedes encajó perfectamente con lo que yo necesitaba. Siempre me gustó correr pero de 4 años para acá no podía, estaba con sobrepeso y era muy complicado... Fue cuando conocí el plan personalizado de ayuno de ustedes, perdí un poco más de 10kg... ¡Y el fin de semana pasado volví a correr, solo agradecer!!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Ricardo Torres",
    title: "Resultado sorprendente en pocas semanas",
    body:
      "Yo era muy escéptico con este tipo de cosas, pero decidí intentar. En 3 semanas ya había perdido 7kg y lo mejor: sin pasar hambre. El plan es muy bien estructurado y fácil de seguir. ¡Mi esposa vio mis resultados y ahora también lo está haciendo!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Diego Herrera",
    title: "Cambió completamente mi relación con la comida",
    body:
      "Siempre tuve dificultad para mantener una dieta, pero con el ayuno intermitente del plan todo se hizo más simple. Perdí 8kg en un mes y gané mucha más energía en el día a día. El soporte también es excelente, responden todas las dudas rápidamente.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
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
    <div className="flex flex-1 flex-col px-5 pt-1 pb-4 w-full min-h-0">
      <div>
        <h2 className="text-[25px] font-black leading-tight text-foreground text-center mt-1">
          Creando tu Plan Personalizado<br />de Ayuno
        </h2>
        
        <div className="mt-3 flex items-center justify-between text-[15px] font-semibold text-foreground">
          <span className="text-muted-foreground">Preparando...</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
        
        <div className="mt-1.5 w-full">
          <ProgressBar value={progress} />
        </div>
        
        <p className="mt-2 text-center text-[13px] text-muted-foreground">
          Estamos preparando tu plan exclusivo y personalizado..
        </p>

        <div className="mt-4 text-center">
          <div className="text-[26px] font-black text-foreground tracking-tight">+45 mil personas</div>
          <div className="mt-0.5 text-[13px] text-muted-foreground">nos eligieron, mira lo que dijeron sobre nosotros...</div>
        </div>
      </div>

      <div className="relative min-h-[210px] w-full flex items-center justify-center mt-10">
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
              className={`absolute inset-x-0 mx-auto w-full max-w-[380px] rounded-3xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between ${
                isActive ? "z-10 pointer-events-auto" : "z-0 pointer-events-none"
              }`}
              style={{ minHeight: "195px" }}
            >
              <div className="flex items-center gap-3">
                {t.image ? (
                  <img src={t.image} alt={t.name} className="h-9 w-9 rounded-full object-cover border border-border" />
                ) : (
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-muted text-xs font-semibold text-foreground">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div className="text-left">
                  <div className="font-bold text-sm text-foreground">{t.name}</div>
                  <div className="flex text-primary mt-0.5" aria-hidden>
                    {"★★★★★".split("").map((s, k) => (
                      <span key={k} className="text-[10px] text-emerald-500">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-left text-[14px] font-bold text-foreground leading-snug">{t.title}</div>
              <p className="mt-1 text-left text-[12.5px] leading-relaxed text-muted-foreground/90 flex-1">{t.body}</p>
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
  { emoji: "🍽️", title: "Cómo hacer el Ayuno de la Forma Correcta", body: "Basado en las investigaciones más recientes de universidades famosas como Harvard, desarrollamos el Protocolo Seca Ayuno, la forma más eficaz y segura de hacer el Ayuno intermitente para perder peso sin que pierdas músculo ni sientas mucha hambre." },
  { emoji: "🔥", title: "Potencia la Quema de Grasa", body: "Descubre exactamente qué comer para acelerar la quema de grasa y mantenerte con saciedad por más tiempo." },
  { emoji: "🪞", title: "Cómo Parecer otra Persona Frente al Espejo en 7 Días", body: "Aprende la forma más fácil de deshincharte y ver grandes resultados en el espejo en menos de 7 días." },
  { emoji: "🎹", title: "Protocolo Anti-Efecto Rebote", body: "Descubre cómo mantener el peso perdido y nunca más volver a engordar, incluso después de alcanzar tu objetivo." },
  { emoji: "⚡", title: "Cómo acelerar tu metabolismo y perder peso sin hacer nada", body: "Aprende las principales estrategias para acelerar tu metabolismo y quemar grasa aunque no hagas nada." },
  { emoji: "🎯", title: "Definición de metas diarias", body: "Cómo definir metas diarias para que te mantengas en el camino correcto" },
  { emoji: "⏳", title: "Protocolo Anti-procrastinación", body: "Descubre el secreto de los más grandes líderes para mantenerse siempre motivado" },
  { emoji: "📝", title: "Planilla de seguimiento", body: "Sabe exactamente cuánto estás evolucionando" },
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

function OfferCard({ gender }: { onCTA?: () => void; gender?: string }) {
  const parcelado = "2,48";
  const aVista = "14,90";
  const [checkoutUrl, setCheckoutUrl] = useState("https://pay.hotmart.com/O107345596O?off=r99n5isz&checkoutMode=10");

  useEffect(() => {
    setCheckoutUrl(buildCheckoutUrl("https://pay.hotmart.com/O107345596O?off=r99n5isz&checkoutMode=10"));
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-2xl border-2 border-primary">
        <div className="bg-primary py-2.5 text-center text-sm font-semibold text-primary-foreground">
          De US$ 39,90 por solo 👇
        </div>
        <div className="flex items-center justify-between gap-4 bg-background p-5">
          <div className="text-[17px] font-bold leading-tight text-foreground">
            Plan de Ayuno
            <br />Personalizado
          </div>
          <div className="rounded-lg bg-muted px-4 py-3 text-right">
            <div className="text-[11px] font-medium text-muted-foreground">6x de</div>
            <div className="text-xl font-extrabold text-foreground">
              US$<span className="text-3xl font-black">{parcelado}</span>
            </div>
            <div className="text-[11px] font-medium text-muted-foreground">O US${aVista} al contado</div>
          </div>
        </div>
      </div>
      <CountdownTimer />
      <a
        href={checkoutUrl}
        id="cta-recibir-mi-plan"
        className="cta-primary inline-flex h-[56px] items-center justify-center px-8 text-lg font-bold w-full uppercase tracking-wide cursor-pointer !no-underline text-center shadow-[var(--shadow-cta)] active:scale-[0.98] transition-all"
      >
        Recibir mi plan
      </a>
      <div className="flex items-center justify-around text-[11px] font-medium text-foreground">
        <div className="flex items-center gap-1"><span aria-hidden>✅</span><span>Compra<br /><b>SEGURA</b></span></div>
        <div className="flex items-center gap-1"><span aria-hidden>🏅</span><span>Satisfacción<br /><b>GARANTIZADA</b></span></div>
        <div className="flex items-center gap-1"><span aria-hidden>🔒</span><span>Privacidad<br /><b>PROTEGIDA</b></span></div>
      </div>
    </div>
  );
}

/** Full result / offer page — mirrors screenshots 42-56. */
export function ResultOffer({ targetWeight, onCTA, gender }: OfferProps) {
  const agoraMetaImg = gender === "female" ? "/agora-meta-female.webp" : "/agora-meta.webp";
  const testimonials = gender === "female" ? TESTIMONIALS_FEMALE : TESTIMONIALS_MALE;
  return (
    <div className="flex-1 w-full px-5 pb-16 pt-2 relative">
      <div className="mx-auto flex w-full flex-col gap-6">
        <h2 className="text-center text-[24px] font-extrabold leading-tight text-foreground">
          ¡Tu Plan Personalizado de Ayuno está listo!
        </h2>

        {/* Antes/Después */}
        <div className="overflow-hidden rounded-2xl border border-border">
          {gender !== "female" && (
            <div className="grid grid-cols-2 divide-x divide-border bg-[#F5F2EB] text-center text-sm font-bold text-foreground">
              <div className="py-2">Ahora</div>
              <div className="py-2">Meta</div>
            </div>
          )}
          <div className="bg-[#EFECE3] p-1.5 flex justify-center">
            <img 
              src={agoraMetaImg} 
              alt="Antes y Después" 
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Rótulos de tiempo */}
        <div className="grid grid-cols-2 text-center -mt-2">
          <div className="text-[27px] font-extrabold text-foreground text-left pl-2">Hoy</div>
          <div className="text-[27px] font-extrabold text-foreground text-left pl-6">En 21 días</div>
        </div>

        {/* Metrics compare */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <MetricSlider label="Tu Nivel de grasa" value="Alto" pct={0.8} color="red" />
          <MetricSlider label="Tu Nivel de grasa" value="Bajo" pct={0.15} color="green" />

          <MetricSlider label="Tu Nivel de energía" value="Bajo" pct={0.2} color="red" />
          <MetricSlider label="Tu Nivel de energía" value="Alto" pct={0.85} color="green" />

          <MetricSlider label="Tu Metabolismo" value="Bajo" pct={0.2} color="red" />
          <MetricSlider label="Tu Metabolismo" value="Alto" pct={0.85} color="green" />
        </div>

        <div className="rounded-2xl bg-[#D0F8D9] p-5 text-center border border-[#BCE8C5]">
          <div className="text-[24px] font-black text-[#155A27]">¿Cómo funciona el Plan?</div>
          <p className="mt-2 text-[15px] leading-relaxed text-[#1B4D27] font-medium">
            Basándonos en tu información personal y objetivos, creamos un plan de ayuno 100% personalizado para ti.
            Nuestro enfoque estratégico fue diseñado para que puedas potenciar tu pérdida de peso en 21 días,
            respetando tu estilo de vida, tu rutina y lo que te gusta comer.
          </p>
        </div>

        <h3 className="mt-2 text-center text-[26px] font-extrabold text-foreground">Tu plan incluye:</h3>

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
          <h3 className="mb-4 text-center text-[22px] font-extrabold text-foreground">Mira los cambios visibles después de una semana</h3>
          <div className="flex flex-col gap-3">
            {(gender === "female"
              ? ["/transform-female-1.webp", "/transform-female-2.webp", "/transform-female-3.webp", "/transform-female-4.webp", "/transform-female-5.webp"]
              : ["/transform-1.webp", "/transform-2.webp", "/transform-3.webp", "/transform-4.webp"]
            ).map((src, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-border shadow-sm">
                <img src={src} alt={`Transformación ${i + 1}`} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="mb-3 text-center text-[20px] font-extrabold text-foreground">Mira las historias de éxito de nuestros alumnos</h3>
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
        <div className="mt-4 flex flex-col items-center gap-3 text-center">
          <img src="/garantia-30dias.png" alt="Garantía de 30 días" className="h-auto object-contain mx-auto" style={{ width: '44%', maxWidth: '208px', minWidth: '128px' }} />
          <div className="text-[20px] font-extrabold text-foreground">Garantía de reembolso</div>
          <p className="text-[14px] text-muted-foreground">La compra de este material es totalmente sin riesgo para ti.</p>
          <p className="text-[15px] text-muted-foreground">
            Si no cumple con tus expectativas en los primeros 30 días después de la compra, te reembolsaremos todo el valor
            que pagaste, sin hacer preguntas.
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
