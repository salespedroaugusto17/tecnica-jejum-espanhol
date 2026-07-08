import { useEffect, useMemo, useState, useCallback } from "react";
import { AppShell } from "./AppShell";
import { Header } from "./Header";
import { ScreenTransition } from "./ScreenTransition";
import { QuestionShell } from "./QuestionShell";
import { AnswerCard } from "./AnswerCard";
import { CTAButton } from "./CTAButton";
import { SliderScreen } from "./SliderScreen";
import {
  BmiGauge,
  EnergyChart,
  FaceTransform,
  MetabolismChart,
  TrioMen,
  WeightLossChart,
} from "./InfoGraphics";
import { LoadingScreen, ResultOffer } from "./ResultScreens";
import { useQuiz } from "@/quiz/QuizContext";
import { useQuestions } from "@/quiz/useQuestions";
import type { AnswerOption, Question } from "@/quiz/types";

/**
 * Renders the quiz flow driven by JSON.
 */
export function QuizEngine() {
  const { answers, currentIndex, progress, setTotal, setAnswer, goNext, goBack } = useQuiz();
  const questions = useQuestions(answers.gender);

  useEffect(() => {
    setTotal(questions.length);
  }, [questions.length, setTotal]);

  const question: Question | undefined = questions[currentIndex];

  const advance = useCallback(
    (id: string, v: unknown) => {
      setAnswer(id, v as never);
      goNext(id);
    },
    [setAnswer, goNext],
  );

  const content = useMemo(() => {
    if (!question) return null;
    switch (question.type) {
      case "single":
        return <SingleRenderer question={question} onPick={(v) => advance(question.id, v)} />;
      case "multi":
        return (
          <MultiRenderer
            question={question}
            initial={(answers[question.id] as string[]) ?? []}
            onSubmit={(v) => advance(question.id, v)}
          />
        );
      case "slider":
        return <SliderRenderer question={question} onSubmit={(v) => advance(question.id, v)} />;
      case "input":
        return <InputRenderer question={question} onSubmit={(v) => advance(question.id, v)} />;
      case "info":
        return <InfoRenderer question={question} onNext={() => advance(question.id, true)} />;
      case "special":
        return (
          <SpecialRenderer question={question} onNext={() => advance(question.id, true)} />
        );
      default:
        return null;
    }
  }, [question, advance, answers]);

  const showProgress = question?.type !== "special" || question.screen === "plan_preview";

  return (
    <AppShell>
      <Header
        progress={progress}
        onBack={goBack}
        showBack={currentIndex > 0 && question?.screen !== "result"}
        showProgress={showProgress}
      />
      <ScreenTransition screenKey={question?.id ?? "end"}>
        {content ?? <EndPlaceholder />}
      </ScreenTransition>
    </AppShell>
  );
}

function EndPlaceholder() {
  return (
    <div className="flex flex-1 items-center justify-center p-10 text-center text-sm text-muted-foreground">
      Fim do fluxo.
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function SingleRenderer({ question, onPick }: { question: Question; onPick: (id: string) => void }) {
  const [pick, setPick] = useState<string | null>(null);
  return (
    <QuestionShell title={question.title} subtitle={question.subtitle}>
      {question.options?.map((opt) => (
        <AnswerCard
          key={opt.id}
          title={opt.label}
          emoji={opt.emoji}
          selected={pick === opt.id}
          onClick={() => {
            setPick(opt.id);
            setTimeout(() => onPick(opt.id), 220);
          }}
        />
      ))}
    </QuestionShell>
  );
}

function MultiRenderer({
  question,
  initial,
  onSubmit,
}: {
  question: Question;
  initial: string[];
  onSubmit: (v: string[]) => void;
}) {
  const [picks, setPicks] = useState<string[]>(initial);
  const toggle = (id: string) =>
    setPicks((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const canContinue = picks.length >= (question.minSelected ?? 1);

  if (question.layout === "grid") {
    // grouped grid — comidas favoritas
    const grouped = new Map<string, { emoji?: string; items: AnswerOption[] }>();
    for (const opt of question.options ?? []) {
      const key = opt.group ?? "";
      if (!grouped.has(key)) grouped.set(key, { emoji: opt.groupEmoji, items: [] });
      grouped.get(key)!.items.push(opt);
    }
    return (
      <QuestionShell
        title={question.title}
        subtitle={question.subtitle}
        centered={false}
        footer={
          <CTAButton disabled={!canContinue} onClick={() => onSubmit(picks)}>
            Continuar
          </CTAButton>
        }
      >
        <div className="flex flex-col gap-4">
          {[...grouped.entries()].map(([group, { emoji, items }]) => (
            <div key={group}>
              <div className="mb-2 flex items-center gap-1 text-[15px] font-bold text-foreground">
                <span aria-hidden>{emoji}</span>
                <span>{group}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {items.map((opt) => {
                  const on = picks.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggle(opt.id)}
                      className={`card-interactive px-3 py-2.5 text-left text-[13px] font-medium ${on ? "card-outline" : ""}`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </QuestionShell>
    );
  }

  return (
    <QuestionShell
      title={question.title}
      subtitle={question.subtitle}
      footer={
        <CTAButton disabled={!canContinue} onClick={() => onSubmit(picks)}>
          Continuar
        </CTAButton>
      }
    >
      {question.options?.map((opt) => (
        <AnswerCard
          key={opt.id}
          title={opt.label}
          description={opt.description}
          emoji={opt.emoji}
          selected={picks.includes(opt.id)}
          onClick={() => toggle(opt.id)}
          showCheck
        />
      ))}
    </QuestionShell>
  );
}

function SliderRenderer({
  question,
  onSubmit,
}: {
  question: Question;
  onSubmit: (v: { value: number; unit: string }) => void;
}) {
  const [val, setVal] = useState({ value: question.defaultValue ?? 0, unit: question.units?.[0].id ?? "" });
  return (
    <QuestionShell
      title={question.title}
      footer={<CTAButton onClick={() => onSubmit(val)}>Continuar</CTAButton>}
    >
      <SliderScreen
        question={question}
        onChange={(value, unit) => setVal({ value, unit })}
      />
    </QuestionShell>
  );
}

function InputRenderer({ question, onSubmit }: { question: Question; onSubmit: (v: string) => void }) {
  const [val, setVal] = useState("");
  const isValid = val.trim().length > 0 && (question.inputType !== "number" || Number(val) > 0);

  return (
    <QuestionShell
      title={question.title}
      footer={
        <CTAButton disabled={!isValid} onClick={() => onSubmit(val)}>
          Continuar
        </CTAButton>
      }
    >
      <input
        type={question.inputType === "number" ? "number" : "text"}
        inputMode={question.inputType === "number" ? "numeric" : "text"}
        placeholder={question.placeholder}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-full rounded-full border-1.5 border-border bg-background px-5 py-3.5 text-[15px] italic text-muted-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:italic-none focus:outline-none"
      />
      {question.info && (
        <div className="mt-2 rounded-xl bg-info px-4 py-3 text-info-foreground">
          <div className="text-[13px] font-bold">{question.info.title}</div>
          <p className="mt-1 text-[13px] leading-snug">{question.info.body}</p>
        </div>
      )}
    </QuestionShell>
  );
}

function InfoRenderer({ question, onNext }: { question: Question; onNext: () => void }) {
  const chart = (() => {
    switch (question.content) {
      case "energy_chart":
        return <EnergyChart />;
      case "metabolism_chart":
        return <MetabolismChart />;
      case "face_transform":
        return <FaceTransform />;
      case "trio_men":
        return <TrioMen />;
      default:
        return null;
    }
  })();

  return (
    <QuestionShell
      title={question.title}
      subtitle={question.subtitle}
      footer={<CTAButton onClick={onNext}>Continuar</CTAButton>}
    >
      {chart}
    </QuestionShell>
  );
}

function SpecialRenderer({ question, onNext }: { question: Question; onNext: () => void }) {
  const { answers } = useQuiz();

  switch (question.screen) {
    case "bmi_summary": {
      const weightAns = answers["weight"] as { value: number; unit: string } | undefined;
      const heightAns = answers["height"] as { value: number; unit: string } | undefined;
      const weight = weightAns?.value ?? 80;
      const heightCm = heightAns?.value ?? 175;
      const bmi = weight / Math.pow(heightCm / 100, 2);
      const pct = Math.min(100, Math.max(5, Math.round(((bmi - 15) / 25) * 100)));
      const level = bmi >= 30 ? "Obeso" : bmi >= 25 ? "Acima" : bmi >= 18.5 ? "Normal - entre 18,4 e 25" : "Abaixo";
      return (
        <QuestionShell
          title="Resumo do seu nível de condicionamento físico"
          centered={false}
          footer={<CTAButton onClick={onNext}>Continuar</CTAButton>}
        >
          <div className="flex flex-col gap-6">
            <BmiGauge percent={pct} label={level} />
            <div className="grid place-items-center py-3 text-[110px]">🫃</div>
            <div className="rounded-xl bg-[oklch(0.96_0.05_75)] px-4 py-3 text-[oklch(0.45_0.15_75)]">
              <div className="font-bold">Sua situação é preocupante!</div>
              <p className="mt-1 text-sm">
                Parabéns por dar o primeiro passo. Vamos criar um plano personalizado para acelerar seu metabolismo,
                aumentar sua força e melhorar sua saúde.
              </p>
            </div>
          </div>
        </QuestionShell>
      );
    }
    case "plan_preview": {
      const weightAns = answers["weight"] as { value: number; unit: string } | undefined;
      const w = weightAns?.value ?? 80;
      const target = Math.max(50, Math.round(w * 0.9));
      return (
        <QuestionShell
          title="O único plano que você precisa para entrar em forma"
          subtitle={`De acordo com as informações que você nos forneceu, você pode atingir o seu peso ideal:\n${target} kg em 21 dias`}
          centered={false}
          footer={<CTAButton onClick={onNext}>Continuar</CTAButton>}
        >
          <WeightLossChart currentWeight={w} targetWeight={target} />
        </QuestionShell>
      );
    }
    case "loading":
      return <LoadingScreen onComplete={onNext} />;
    case "result": {
      const weightAns = answers["weight"] as { value: number; unit: string } | undefined;
      const w = weightAns?.value ?? 80;
      const target = Math.max(50, Math.round(w * 0.9));
      return (
        <ResultOffer
          targetWeight={target}
          onCTA={() => alert("Redirecionar para checkout")}
        />
      );
    }
    default:
      return null;
  }
}
