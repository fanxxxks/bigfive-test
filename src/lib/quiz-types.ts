// Generic quiz types shared across all assessments

import type { Question } from './types';

/** Configuration for a quiz instance */
export interface QuizConfig {
  /** Unique slug for this quiz */
  id: string;
  /** Display title */
  title: string;
  /** Questions array */
  questions: Question[];
  /** Number of questions per page */
  itemsPerPage: number;
  /** Labels for the Likert scale (typically 1-7) */
  likertLabels: string[];
  /** sessionStorage key for persisting results */
  resultKey: string;
  /** Redirect URL after submission */
  resultUrl: string;
  /** Start screen configuration */
  startScreen: StartScreenConfig;
}

export interface StartScreenConfig {
  emoji: string;
  title: string;
  description?: string;
  features: string[];
  tip: string;
}

/** Generic result that all quiz results extend */
export interface BaseResult {
  timestamp: number;
}
