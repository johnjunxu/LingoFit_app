# 📱 LingoFit - Product Requirements Document (PRD)

**App Name**: LingoFit (Daily 3)
**Core Concept**: A "Fitness Tracker" for English learning. Users complete 3 AI-generated conversation challenges daily and review past mistakes using spaced repetition.

---

## 1. Core User Flow

### A. Dashboard (The Hub)
- **Goal**: Show progress and motivate the user.
- **Key Metrics**:
  - **Streak**: Consecutive days of learning (e.g., "🔥 5 Days").
  - **Today's Progress**: Circular progress bar (0/3 sessions).
  - **Review Queue**: Number of cards waiting for review (e.g., "8 Due").
- **Navigation**:
  - Clicking **Streak Card** -> Navigates to **History/Calendar**.
  - Clicking **"Start Session"** -> Navigates to **Practice**.

### B. Practice (Daily Input)
- **Logic**:
  - User receives 3 new questions daily based on their persona (e.g., "UI Designer").
  - User answers via text/voice.
  - **AI Feedback**: AI corrects grammar and provides 2 standard answers (Formal vs. Native).
- **Data State**: Once completed, these items are saved to the database with status `new`.

### C. Review (The Memory Gym)
- **Logic**: "Zero Inbox" strategy.
- **UI**: A list of items due for review.
- **Interaction**:
  - User clicks an item to reveal the answer/correction.
  - **Action - "Easy"**: Item is marked as `mastered` and **immediately disappears** from the list (Optimistic UI).
  - **Action - "Hard"**: Item stays in the queue or moves to the bottom.
- **Empty State**: When the list is empty, show a celebration animation.

### D. Profile (Settings)
- **Persona Setting**: User describes their role (e.g., "Senior Frontend Dev"). This guides the AI question generation.
- **Theme**: Light/Dark mode toggle.

---

## 2. Data Structure (TypeScript Interfaces)

Use these definitions to guide your Type Refactoring:

```typescript
// User's overall status
export interface UserProgress {
  streakDays: number;
  totalXp: number;
  sessionsCompletedToday: number; // 0 to 3
  itemsToReview: number; // Count of items with status 'reviewing'
}

// A single learning card
export interface Flashcard {
  id: string;
  scenario: string; // e.g., "Daily Standup"
  question: string;
  userAnswer?: string;
  aiCorrection?: string;
  status: 'new' | 'reviewing' | 'mastered';
  nextReviewDate: string; // ISO Date
}