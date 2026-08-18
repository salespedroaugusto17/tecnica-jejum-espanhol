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
          "Método de Ayuno Adaptado que está ayudando a hombres y mujeres a eliminar hasta 10kg en 21 días sin pasar hambre. Haz la prueba gratuita de 2 minutos.",
      },
      { property: "og:title", content: "Seca Ayuno — Descubre tu Protocolo de Ayuno Personalizado" },
      {
        property: "og:description",
        content: "Método de Ayuno Adaptado que está ayudando a hombres y mujeres a eliminar hasta 10kg en 21 días sin pasar hambre. Haz la prueba gratuita de 2 minutos.",
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
  if (!answers.gender) return <GenderSelect onBack={() => setStarted(false)} />;
  return <QuizEngine />;
}
