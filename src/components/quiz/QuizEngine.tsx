import { useEffect, useMemo, useState } from "react";
import { AppShell } from "./AppShell";
import { Header } from "./Header";
import { ScreenTransition } from "./ScreenTransition";
import { QuestionShell } from "./QuestionShell";
import { AnswerCard } from "./AnswerCard";
import { CTAButton } from "./CTAButton";
import { LoadingAnalysis } from "./LoadingAnalysis";
import { useQuiz } from "@/quiz/QuizContext";
import { useQuestions } from "@/quiz/useQuestions";
import type { Question } from "@/quiz/types";
import loadingData from "@/quiz/data/loading-steps.json";

/**
 * Renders the current question based on gender flow.
 * When the JSON files are empty, renders a placeholder inviting the user
 * to send the screen specs.
 */
export function QuizEngine() {
  const { answers, currentIndex, progress, setTotal, setAnswer, goNext, goBack } = useQuiz();
  const questions = useQuestions(answers.gender);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setTotal(questions.length);
  }, [questions.length, setTotal]);

  const question: Question | undefined = questions[currentIndex];

  const content = useMemo(() => {
    if (!answers.gender) return null;
    if (questions.length === 0) return <EmptyFlowPlaceholder />;
    if (done) return <ResultPlaceholder />;
    if (!question) {
      return (
        <LoadingAnalysis steps={loadingData.steps} onComplete={() => setDone(true)} />
      );
    }
    return (
      <QuestionRenderer
        question={question}
        onAnswer={(value) => {
          setAnswer(question.id, value);
          goNext(question.id);
        }}
      />
    );
  }, [answers.gender, done, question, questions.length, setAnswer, goNext]);

  return (
    <AppShell>
      <Header progress={progress} onBack={goBack} showBack={currentIndex > 0} />
      <ScreenTransition screenKey={question?.id ?? (done ? "done" : "empty")}>
        {content}
      </ScreenTransition>
    </AppShell>
  );
}

function QuestionRenderer({
  question,
  onAnswer,
}: {
  question: Question;
  onAnswer: (value: string | string[]) => void;
}) {
  // Minimal renderer for foundation — expanded per-screen later.
  if (question.type === "single") {
    return (
      <QuestionShell title={question.title} subtitle={question.subtitle} image={question.image}>
        {question.options?.map((opt) => (
          <AnswerCard
            key={opt.id}
            title={opt.label}
            description={opt.description}
            showCheck={false}
            onClick={() => onAnswer(opt.id)}
          />
        ))}
      </QuestionShell>
    );
  }
  return (
    <QuestionShell
      title={question.title}
      subtitle={question.subtitle}
      footer={<CTAButton onClick={() => onAnswer("")}>Continuar</CTAButton>}
    >
      <p className="text-sm text-muted-foreground">
        Tipo de pergunta <code>{question.type}</code> — implementação será adicionada quando esta
        tela for detalhada.
      </p>
    </QuestionShell>
  );
}

function EmptyFlowPlaceholder() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
      <div className="text-lg font-semibold text-foreground">Fluxo pronto para receber telas</div>
      <p className="text-sm text-muted-foreground">
        Adicione perguntas em <code>src/quiz/data/questions-*.json</code> para começar.
      </p>
    </div>
  );
}

function ResultPlaceholder() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
      <div className="text-2xl font-bold text-foreground">Seu protocolo está pronto</div>
      <p className="text-sm text-muted-foreground">
        Tela de resultado será construída quando você enviar os detalhes.
      </p>
    </div>
  );
}
