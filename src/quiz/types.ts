// Domain types for the quiz engine. Both gender flows share these shapes.

export type Gender = "male" | "female";

export type QuestionType =
  | "single" // one option selectable, auto-advance
  | "multi" // several options, manual advance
  | "slider" // numeric slider (age, weight, height)
  | "input" // free numeric/text input
  | "info" // informational screen (no answer)
  | "loading" // AI-analysis simulated loading
  | "result"; // result / offer screen

export interface AnswerOption {
  id: string;
  label: string;
  description?: string;
  icon?: string; // lucide icon name
  image?: string; // path/URL
  value?: string | number | boolean;
}

export interface Validation {
  min?: number;
  max?: number;
  minSelected?: number;
  maxSelected?: number;
  required?: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  subtitle?: string;
  image?: string;
  options?: AnswerOption[];
  unit?: string; // "kg", "cm", "anos"
  placeholder?: string;
  validation?: Validation;
  // Optional dynamic branching: pick next question id from current answer.
  next?: string | Record<string, string>;
  // Skip if predicate on answers is true.
  skipIf?: { key: string; equals: unknown };
  // For loading step
  steps?: LoadingStep[];
}

export interface LoadingStep {
  label: string;
  durationMs: number;
}

export type AnswerValue = string | number | boolean | string[] | null;

export interface QuizAnswers {
  gender?: Gender;
  age?: number;
  height?: number;
  weight?: number;
  targetWeight?: number;
  goal?: string;
  difficulties?: string[];
  habits?: string[];
  [key: string]: AnswerValue | undefined;
}
