// Domain types for the "Seca Jejum" quiz engine.

export type Gender = "male" | "female";

export type QuestionType =
  | "single" // auto-advance on selection
  | "multi" // multi-select + Continuar
  | "slider" // numeric slider with unit toggle
  | "input" // free text/number input
  | "info" // informational screen with Continuar
  | "special"; // custom component (result, offer, bmi-summary, etc.)

export interface AnswerOption {
  id: string;
  label: string;
  description?: string;
  emoji?: string;
  image?: string;
  imagePosition?: "left" | "right";
  /** grouping label for grid-of-options (comidas favoritas) */
  group?: string;
  groupEmoji?: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options?: AnswerOption[];
  /** Optional side image for split layouts */
  sideImage?: string;
  /** Optional alert box under sliders */
  infoBox?: { title: string; body: string };
  /** slider config */
  units?: Array<{ id: string; label: string }>;
  min?: number;
  max?: number;
  defaultValue?: number;
  step?: number;
  /** input config */
  placeholder?: string;
  info?: { title: string; body: string };
  inputType?: "number" | "text";
  /** info screen config */
  content?: string; // key referencing an info renderer
  /** special screen key */
  screen?: string;
  /** multi-select limits */
  minSelected?: number;
  layout?: "list" | "grid";
}

export interface LoadingStep {
  label: string;
  durationMs: number;
}

export type AnswerValue = string | number | boolean | string[] | null;

export interface QuizAnswers {
  gender?: Gender;
  [key: string]: AnswerValue | undefined;
}
