import { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
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

  const handleBack = useCallback(() => {
    if (currentIndex === 0) {
      setAnswer("gender", undefined as any);
    } else {
      goBack();
    }
  }, [currentIndex, goBack, setAnswer]);

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
        return <InfoRenderer question={question} onNext={() => advance(question.id, true)} gender={answers.gender} />;
      case "special":
        return (
          <SpecialRenderer question={question} onNext={() => advance(question.id, true)} onBack={handleBack} />
        );
      default:
        return null;
    }
  }, [question, advance, answers, handleBack]);



  const showProgress = question?.type !== "special" || question.screen === "plan_preview";
  const showBack = question?.screen !== "loading";

  return (
    <AppShell>
      <Header
        progress={progress}
        onBack={handleBack}
        showBack={showBack}
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

  const content = (
    <div className={question.sideImage ? "flex gap-4 items-center justify-between min-h-0" : "flex flex-col gap-2.5"}>
      {question.sideImage && (
        <div className="w-[42%] shrink-0 flex items-center justify-center min-h-0">
          <img 
            src={question.sideImage} 
            alt="" 
            className="w-full h-auto object-contain max-h-[55vh] mix-blend-multiply" 
          />
        </div>
      )}
      <div className={question.sideImage ? "flex-1 flex flex-col gap-2.5 min-h-0 justify-center" : "flex flex-col gap-2"}>
        {question.options?.map((opt) => (
          <AnswerCard
            key={opt.id}
            title={opt.label}
            emoji={opt.emoji}
            image={opt.image}
            selected={pick === opt.id}
            onClick={() => {
              setPick(opt.id);
              setTimeout(() => onPick(opt.id), 220);
            }}
            size={(question.options?.length ?? 0) > 5 ? "sm" : "md"}
          />
        ))}
      </div>
    </div>
  );

  return (
    <QuestionShell
      title={question.title}
      subtitle={question.subtitle}
      subtitleStyle={question.id === "important_event" ? "small-muted" : "default"}
    >
      {content}
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
  const [shakeGroup, setShakeGroup] = useState<string | null>(null);

  const toggle = (id: string) =>
    setPicks((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const canContinue = useMemo(() => {
    return picks.length >= (question.minSelected ?? 1);
  }, [question.minSelected, picks]);

  const handleContinue = () => {
    if (question.layout === "grid") {
      const groups = Array.from(new Set(question.options?.map(opt => opt.group ?? "")));
      const firstUnfilledGroup = groups.find(groupName => {
        const groupOptionIds = question.options
          ?.filter(opt => (opt.group ?? "") === groupName)
          .map(opt => opt.id) ?? [];
        return !groupOptionIds.some(id => picks.includes(id));
      });

      if (firstUnfilledGroup) {
        setShakeGroup(firstUnfilledGroup);
        const element = document.getElementById(`group-${firstUnfilledGroup.replace(/\s+/g, "-")}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        setTimeout(() => setShakeGroup(null), 500);
        return;
      }
    }
    onSubmit(picks);
  };

  const shakeVariants = {
    shake: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.4 }
    }
  };

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
          <CTAButton onClick={handleContinue}>
            Continuar
          </CTAButton>
        }
      >
        <div className="flex flex-col gap-4">
          {[...grouped.entries()].map(([group, { emoji, items }]) => {
            const isShaking = shakeGroup === group;
            return (
              <motion.div
                key={group}
                id={`group-${group.replace(/\s+/g, "-")}`}
                animate={isShaking ? "shake" : "normal"}
                variants={shakeVariants}
                className="rounded-xl p-1"
              >
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
              </motion.div>
            );
          })}
        </div>
      </QuestionShell>
    );
  }

  const isCompact = (question.options?.length ?? 0) > 5;

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
      <div className="flex flex-col gap-2">
        {question.options?.map((opt) => (
          <AnswerCard
            key={opt.id}
            title={opt.label}
            description={opt.description}
            emoji={opt.emoji}
            image={opt.image}
            imagePosition={opt.imagePosition}
            selected={picks.includes(opt.id)}
            onClick={() => toggle(opt.id)}
            showCheck
            size={isCompact ? "sm" : "md"}
          />
        ))}
      </div>
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
      <div className="flex flex-col gap-5">
        <SliderScreen
          question={question}
          onChange={(value, unit) => setVal({ value, unit })}
        />
        {question.infoBox && (
          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 text-left text-[14px] leading-relaxed text-blue-700">
            <div className="font-bold text-blue-800 mb-1.5">{question.infoBox.title}</div>
            <p className="font-medium">{question.infoBox.body}</p>
          </div>
        )}
      </div>
    </QuestionShell>
  );
}

function InputRenderer({ question, onSubmit }: { question: Question; onSubmit: (v: string) => void }) {
  const [val, setVal] = useState("");
  // Sempre válido para permitir continuar vazio
  const isValid = true;

  const handleContinue = () => {
    onSubmit(val.trim() === "" ? "30" : val);
  };

  return (
    <QuestionShell
      title={question.title}
      footer={
        <CTAButton disabled={!isValid} onClick={handleContinue}>
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
        className="w-full rounded-full border-2 border-border bg-background px-5 py-3.5 text-[15px] text-foreground placeholder:italic placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
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

function InfoRenderer({ question, onNext, gender }: { question: Question; onNext: () => void; gender?: string }) {
  const chart = (() => {
    switch (question.content) {
      case "energy_chart":
        return <EnergyChart />;
      case "metabolism_chart":
        return <MetabolismChart />;
      case "face_transform":
        return <FaceTransform gender={gender} />;
      case "trio_men":
        return <TrioMen gender={gender} />;
      default:
        return null;
    }
  })();

  const isFaceTransform = question.content === "face_transform";

  return (
    <QuestionShell
      title={question.title}
      subtitle={isFaceTransform ? undefined : question.subtitle}
      footer={<CTAButton onClick={onNext}>Continuar</CTAButton>}
    >
      {chart}
      {isFaceTransform && question.subtitle && (
        <p className="mt-3 text-pretty text-center text-[16px] font-semibold leading-relaxed text-foreground/80">
          {question.subtitle}
        </p>
      )}
    </QuestionShell>
  );
}

function SpecialRenderer({ question, onNext, onBack }: { question: Question; onNext: () => void; onBack: () => void }) {
  const { answers } = useQuiz();

  switch (question.screen) {
    case "bmi_summary": {
      const weightAns = answers["weight"] as { value: number; unit: string } | undefined;
      const heightAns = answers["height"] as { value: number; unit: string } | undefined;
      const weight = weightAns?.value ?? 80;
      const heightCm = heightAns?.value ?? 175;
      const bmi = weight / Math.pow(heightCm / 100, 2);
      const pct = Math.min(100, Math.max(5, Math.round(((bmi - 15) / 25) * 100)));
      
      // Force label to "Normal - entre 18,4 e 25" just like the 83% screenshot
      const level = "Normal - entre 18,4 e 25";
      const summaryImage = answers.gender === "female" ? "/summary-female.png" : "/summary-man.png";
      return (
        <QuestionShell
          title="Resumo do seu nível de condicionamento físico"
          centered={false}
          footer={<CTAButton onClick={onNext}>Continuar</CTAButton>}
        >
          <div className="flex flex-col gap-5 pt-2">
            <BmiGauge percent={pct} label={level} large />
            <div className="flex justify-center py-1">
              <img
                src={summaryImage}
                alt="Status Corporal"
                className="h-52 w-auto object-contain mix-blend-multiply scale-100"
              />
            </div>
            <div className="rounded-2xl bg-[oklch(0.96_0.05_75)] px-6 py-5 text-[oklch(0.45_0.15_75)] shadow-sm">
              <div className="font-black text-[18px]">Sua situação é preocupante!</div>
              <p className="mt-2 text-[16px] font-medium leading-relaxed">
                Parabéns por dar o primeiro passo. Vamos criar um plano personalizado para acelerar seu metabolismo,
                aumentar sua força e melhorar sua saúde.
              </p>
            </div>
          </div>
        </QuestionShell>
      );
    }
    case "shape_plan": {
      const weightAns = answers["weight"] as { value: number; unit: string } | undefined;
      const w = weightAns?.value ?? 80;
      return (
        <QuestionShell
          title="O único plano que você precisa para entrar em forma"
          subtitle={
            <div className="flex flex-col items-center text-center mt-2 leading-snug">
              <span className="text-[16px] font-medium text-foreground/80">
                De acordo com as informações que você nos forneceu, você pode atingir o seu peso ideal:
              </span>
              <span className="mt-2 text-[18px] font-black text-foreground underline decoration-[2.5px] underline-offset-4">
                -10 kg em 21 dias
              </span>
            </div>
          }
          subtitleStyle="default"
          centered={false}
          footer={<CTAButton onClick={onNext}>Continuar</CTAButton>}
        >
          <WeightLossChart currentWeight={w} targetWeight={70} />
        </QuestionShell>
      );
    }
    case "plan_preview": {
      const weightAns = answers["weight"] as { value: number; unit: string } | undefined;
      const w = weightAns?.value ?? 80;
      return (
        <QuestionShell
          title="O seu Plano Personalizado de Jejum está pronto!"
          subtitle={
            <div className="flex flex-col items-center text-center mt-2 leading-snug">
              <span className="text-[16px] font-medium text-foreground/80">
                De acordo com as informações que você nos forneceu, você pode atingir o seu peso ideal:
              </span>
              <span className="mt-2 text-[18px] font-black text-foreground">
                Você perderá 10kg em 21 dias
              </span>
            </div>
          }
          subtitleStyle="default"
          centered={false}
          footer={<CTAButton onClick={onNext}>Continuar</CTAButton>}
        >
          <WeightLossChart currentWeight={w} targetWeight={70} />
        </QuestionShell>
      );
    }
    case "loading":
      return <LoadingScreen onComplete={onNext} onBack={onBack} gender={answers.gender} />;
    case "result": {
      const weightAns = answers["weight"] as { value: number; unit: string } | undefined;
      const w = weightAns?.value ?? 80;
      const target = Math.max(50, Math.round(w * 0.9));
      return (
        <ResultOffer
          targetWeight={target}
          onCTA={() => alert("Redirecionar para checkout")}
          onBack={onBack}
          gender={answers.gender}
        />
      );
    }
    default:
      return null;
  }
}
