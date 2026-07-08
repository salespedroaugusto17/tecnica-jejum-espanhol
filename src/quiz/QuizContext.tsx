import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react";
import type { AnswerValue, Gender, QuizAnswers } from "./types";

interface QuizState {
  answers: QuizAnswers;
  history: string[]; // question ids visited (for back nav / progress)
  currentIndex: number;
  totalSteps: number;
}

type QuizAction =
  | { type: "SET_ANSWER"; key: string; value: AnswerValue }
  | { type: "SET_GENDER"; gender: Gender }
  | { type: "SET_TOTAL"; total: number }
  | { type: "GO_NEXT"; questionId?: string }
  | { type: "GO_BACK" }
  | { type: "RESET" };

const initialState: QuizState = {
  answers: {},
  history: [],
  currentIndex: 0,
  totalSteps: 0,
};

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SET_ANSWER":
      return { ...state, answers: { ...state.answers, [action.key]: action.value } };
    case "SET_GENDER":
      return { ...state, answers: { ...state.answers, gender: action.gender } };
    case "SET_TOTAL":
      return { ...state, totalSteps: action.total };
    case "GO_NEXT":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        history: action.questionId ? [...state.history, action.questionId] : state.history,
      };
    case "GO_BACK":
      return {
        ...state,
        currentIndex: Math.max(0, state.currentIndex - 1),
        history: state.history.slice(0, -1),
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface QuizContextValue extends QuizState {
  setAnswer: (key: string, value: AnswerValue) => void;
  setGender: (gender: Gender) => void;
  setTotal: (total: number) => void;
  goNext: (questionId?: string) => void;
  goBack: () => void;
  reset: () => void;
  progress: number; // 0..1
}

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<QuizContextValue>(
    () => ({
      ...state,
      progress: state.totalSteps > 0 ? Math.min(1, state.currentIndex / state.totalSteps) : 0,
      setAnswer: (key, value) => dispatch({ type: "SET_ANSWER", key, value }),
      setGender: (gender) => dispatch({ type: "SET_GENDER", gender }),
      setTotal: (total) => dispatch({ type: "SET_TOTAL", total }),
      goNext: (questionId) => dispatch({ type: "GO_NEXT", questionId }),
      goBack: () => dispatch({ type: "GO_BACK" }),
      reset: () => dispatch({ type: "RESET" }),
    }),
    [state],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used inside <QuizProvider>");
  return ctx;
}
