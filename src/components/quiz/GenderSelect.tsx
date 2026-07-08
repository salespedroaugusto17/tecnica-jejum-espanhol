import { motion } from "framer-motion";
import { useQuiz } from "@/quiz/QuizContext";
import { AppShell } from "./AppShell";
import { Header } from "./Header";

/** First screen: gender selection — branches the whole flow. */
export function GenderSelect() {
  const { setGender } = useQuiz();

  return (
    <AppShell>
      <Header showBack={false} />
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold leading-tight text-foreground">
            Descubra seu protocolo de jejum
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Um plano personalizado em menos de 2 minutos
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-4">
          {(["male", "female"] as const).map((g) => (
            <motion.button
              key={g}
              whileTap={{ scale: 0.97 }}
              onClick={() => setGender(g)}
              className="card-interactive flex flex-col items-center gap-3 py-8"
            >
              <span className="text-4xl" aria-hidden>
                {g === "male" ? "👨" : "👩"}
              </span>
              <span className="text-base font-semibold">
                {g === "male" ? "Homem" : "Mulher"}
              </span>
            </motion.button>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Seus dados são privados e usados apenas para personalizar seu plano.
        </p>
      </div>
    </AppShell>
  );
}
