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
      <div className="flex flex-1 flex-col items-center justify-between px-5 pt-4 pb-6 w-full min-h-[calc(100dvh-70px)]">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-balance text-center text-[23px] font-black leading-[1.15] tracking-tight text-foreground">
            Este <span className="text-primary">Método de Ayuno Adaptado</span> está ayudando a Hombres y Mujeres a{" "}
            <span className="text-[#b30000]">eliminar hasta 10kg en 21 días</span> sin pasar hambre
          </h1>
          <p className="text-center text-[15px] font-bold text-foreground">
            Responde esta prueba gratuita de solo 2 minutos y aprende 👇
          </p>
        </div>

        <div className="w-full flex items-center justify-center my-3 py-1">
          <img
            src="/antes-depois.webp"
            alt="Antes y Después"
            className="w-[95%] sm:w-[92%] max-w-[460px] h-auto object-contain mx-auto"
          />
        </div>

        <div className="w-full z-10 pb-2 shrink-0">
          <CTAButton onClick={onStart}>¡QUIERO APRENDER TAMBIÉN! 😱</CTAButton>
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
      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-5 py-6 w-full min-h-[calc(100dvh-70px)]">
        <h1 className="text-center text-[28px] font-black text-foreground tracking-tight">
          Ayuno Intermitente para:
        </h1>
        <div className="grid w-full grid-cols-2 gap-3 my-auto">
          {(["male", "female"] as const).map((g) => {
            const active = hovered === g;
            return (
              <motion.button
                key={g}
                whileTap={{ scale: 0.98 }}
                onPointerEnter={() => setHovered(g)}
                onClick={() => setGender(g)}
                className="relative flex flex-col overflow-hidden rounded-xl border border-border shadow-sm aspect-[3/4] w-full"
                style={{
                  backgroundColor:
                    g === "male" ? "oklch(0.72 0.06 175)" : "oklch(0.90 0.05 60)",
                }}
              >
                <div className="flex-1 w-full overflow-hidden min-h-0">
                  <img
                    src={g === "male" ? "/homem.webp" : "/mulher.webp"}
                    alt={g === "male" ? "Hombre" : "Mujer"}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div
                  className={`flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors shrink-0 ${active
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground"
                    }`}
                >
                  <span>{g === "male" ? "Hombre" : "Mujer"}</span>
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full border ${active ? "border-primary-foreground/40" : "border-border-strong"
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
