import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QuizProvider, useQuiz } from "@/quiz/QuizContext";
import { IntroLanding, GenderSelect } from "@/components/quiz/EntryScreens";
import { QuizEngine } from "@/components/quiz/QuizEngine";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seca Jejum — Descubra seu Protocolo de Jejum Personalizado" },
      {
        name: "description",
        content:
          "Método de Jejum Adaptado que está ajudando homens e mulheres a eliminar até 10kg em 21 dias sem passar fome. Faça o teste gratuito de 2 minutos.",
      },
      { property: "og:title", content: "Seca Jejum — Descubra seu Protocolo de Jejum Personalizado" },
      {
        property: "og:description",
        content: "Método de Jejum Adaptado que está ajudando homens e mulheres a eliminar até 10kg em 21 dias sem passar fome. Faça o teste gratuito de 2 minutos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  return (
    <QuizProvider>
      <QuizRouter />
    </QuizProvider>
  );
}

function QuizRouter() {
  const { answers } = useQuiz();
  const [started, setStarted] = useState(false);

  if (!started) return <IntroLanding onStart={() => setStarted(true)} />;
  if (!answers.gender) return <GenderSelect />;
  return <QuizEngine />;
}
