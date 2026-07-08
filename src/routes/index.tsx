import { createFileRoute } from "@tanstack/react-router";
import { QuizProvider, useQuiz } from "@/quiz/QuizContext";
import { GenderSelect } from "@/components/quiz/GenderSelect";
import { QuizEngine } from "@/components/quiz/QuizEngine";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Truque Jejum — Descubra seu protocolo personalizado" },
      {
        name: "description",
        content:
          "Quiz personalizado de emagrecimento por jejum intermitente. Receba um protocolo sob medida em menos de 2 minutos.",
      },
      { property: "og:title", content: "Truque Jejum — Protocolo personalizado" },
      {
        property: "og:description",
        content: "Descubra em 2 minutos seu protocolo ideal de jejum intermitente.",
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
  return answers.gender ? <QuizEngine /> : <GenderSelect />;
}
