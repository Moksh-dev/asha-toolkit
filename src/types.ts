export type Edition = "school" | "volunteer";
export type SceneKind =
  | "welcome"
  | "objectives"
  | "definition"
  | "compare"
  | "panels"
  | "myth"
  | "patterns"
  | "messages"
  | "choice"
  | "job"
  | "steps"
  | "decision"
  | "privacy"
  | "actions"
  | "network"
  | "supporting"
  | "quiz"
  | "recap"
  | "closing"
  | "agreement"
  | "carousel"
  | "discussion"
  | "protocol"
  | "local";
export interface Point {
  title: string;
  text: string;
}
export interface Choice {
  text: string;
  feedback: string;
  preferred?: boolean;
}
export interface Question {
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
}
export interface Scene {
  id: string;
  title: string;
  label: string;
  kind: SceneKind;
  intro: string;
  points?: Point[];
  statement?: string;
  reality?: boolean;
  explanation?: string;
  choices?: Choice[];
  notes: string[];
  minutes: number;
  source?: string;
}
export interface ActivityState {
  revealed?: boolean;
  choice?: number;
  message?: number;
  carousel?: number;
  answers?: Record<number, number>;
}
export interface SessionConfig {
  duration: number;
  format: string;
  tally: boolean;
}
export interface Tally {
  [scene: string]: number[];
}
