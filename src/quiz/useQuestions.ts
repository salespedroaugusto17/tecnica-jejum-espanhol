import { useMemo } from "react";
import male from "./data/questions-male.json";
import female from "./data/questions-female.json";
import type { Gender, Question } from "./types";

export function useQuestions(gender: Gender | undefined): Question[] {
  return useMemo(() => {
    if (!gender) return [];
    const src = gender === "male" ? male : female.questions.length ? female : male;
    return (src.questions as unknown as Question[]) ?? [];
  }, [gender]);
}
