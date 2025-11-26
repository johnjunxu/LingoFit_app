// Based on PRODUCT_PRD.md

/**
 * Represents the user's overall progress and status.
 */
export interface UserProgress {
  streakDays: number;
  totalXp: number;
  sessionsCompletedToday: number; // Max 3
  itemsToReview: number;
  dailyTip?: string;
}

/**
 * Represents a single learning card for practice or review.
 */
export interface Flashcard {
  id: string;
  scenario: string;
  question: string;
  userAnswer?: string;
  aiCorrection?: string;
  aiFormalAnswer?: string;
  aiNativeAnswer?: string;
  status: 'new' | 'reviewing' | 'mastered';
  nextReviewDate: string; // ISO Date String
}

/**
 * Represents the user's profile settings.
 */
export interface UserProfile {
  name: string;
  email: string;
  persona: string; // e.g., "Senior Frontend Dev"
  theme: 'light' | 'dark';
}

/**
 * Represents AI feedback for a practice session.
 */
export interface AIFeedback {
  correction: string;
  formalAnswer: string;
  nativeAnswer: string;
}
