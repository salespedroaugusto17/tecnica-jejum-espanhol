import { useMemo } from "react";
import male from "./data/questions-male.json";
import female from "./data/questions-female.json";
import type { Gender, Question } from "./types";

/** Returns the question set for a given gender. JSON-driven — no hardcoded flow. */
export function useQuestions(gender: Gender | undefined): Question[] {
  return useMemo(() => {
    if (!gender) return [];
    const src = gender === "male" ? male : female;
    return (src.questions as unknown as Question[]) ?? [];
  }, [gender]);
}
