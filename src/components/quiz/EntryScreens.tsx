import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { Header } from "./Header";
import { AppShell } from "./AppShell";
import { useQuiz } from "@/quiz/QuizContext";

/** Intro landing screen — screenshot_1 hero + before/after collage. */
export function IntroLanding({ onStart }: { onStart: () => void }) {
  return (
    <AppShell>
      <Header showBack={false} progress={0.03} />
      <div className="flex flex-1 flex-col items-center justify-between px-5 pt-4 pb-6 overflow-y-auto no-scrollbar min-h-0">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-balance text-center text-[23px] font-black leading-[1.15] tracking-tight text-foreground">
            Esse <span className="text-primary">Método de Jejum Adaptado</span> está ajudando Homens e Mulheres a{" "}
            <span className="text-[#b30000]">eliminar até 10kg em 21 dias</span> sem passar fome
          </h1>
          <p className="text-center text-[15px] font-bold text-foreground">
            Responda esse teste gratuito de apenas 2 minutos e aprenda 👇
          </p>
        </div>

        <div className="relative flex-1 w-full flex items-center justify-center min-h-0 my-2">
          <img 
            src="/antes-depois.png" 
            alt="Antes e Depois" 
            className="w-[105%] max-w-[400px] max-h-[100%] object-contain"
          />
        </div>

        <div className="w-full z-10 pb-2 shrink-0">
          <CTAButton onClick={onStart}>QUERO APRENDER TAMBÉM! 😱</CTAButton>
        </div>
      </div>
    </AppShell>
  );
}

function BeforeAfterTile({
  label,
  tone,
  emoji,
  female,
}: {
  label: string;
  tone: "red" | "green";
  emoji: string;
  female?: boolean;
}) {
  const bg = female ? "oklch(0.88 0.04 30)" : "oklch(0.82 0.02 250)";
  const chip = tone === "red"
    ? "bg-[oklch(0.62_0.22_25)] text-white"
    : "bg-primary text-primary-foreground";
  return (
    <div className="relative overflow-hidden rounded-md" style={{ backgroundColor: bg }}>
      <div className="grid aspect-[3/4] place-items-center text-6xl">{emoji}</div>
      <span className={`absolute left-1.5 top-1.5 rounded px-1.5 py-0.5 text-[11px] font-bold ${chip}`}>
        {label}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/** Gender select — two big cards with photo + labeled bottom bar. */
export function GenderSelect({ onBack }: { onBack?: () => void }) {
  const { setGender } = useQuiz();
  const [hovered, setHovered] = useState<"male" | "female" | null>("male");

  return (
    <AppShell>
      <Header showBack={true} onBack={onBack} progress={0.05} />
      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-5 pb-8">
        <h1 className="text-center text-[28px] font-black text-foreground tracking-tight">
          Jejum Intermitente para:
        </h1>
        <div className="grid w-full grid-cols-2 gap-3 max-h-[60vh]">
          {(["male", "female"] as const).map((g) => {
            const active = hovered === g;
            return (
              <motion.button
                key={g}
                whileTap={{ scale: 0.98 }}
                onPointerEnter={() => setHovered(g)}
                onClick={() => setGender(g)}
                className="relative flex flex-col overflow-hidden rounded-xl border border-border shadow-sm"
                style={{
                  backgroundColor:
                    g === "male" ? "oklch(0.72 0.06 175)" : "oklch(0.90 0.05 60)",
                }}
              >
                <div className="flex-1 w-full overflow-hidden">
                  <img 
                    src={g === "male" ? "/homem.png" : "/mulher.png"} 
                    alt={g === "male" ? "Homem" : "Mulher"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className={`flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground"
                  }`}
                >
                  <span>{g === "male" ? "Homem" : "Mulher"}</span>
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full border ${
                      active ? "border-primary-foreground/40" : "border-border-strong"
                    }`}
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
