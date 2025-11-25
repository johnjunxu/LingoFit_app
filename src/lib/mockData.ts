import { UserProgress, Flashcard, UserProfile, AIFeedback } from '../types';

// Data for the main dashboard
export const mockUserProgress: UserProgress = {
  streakDays: 5,
  totalXp: 1250,
  sessionsCompletedToday: 1,
  itemsToReview: 3,
};

// A pool of flashcards for both practice and review
export const mockFlashcards: Flashcard[] = [
  {
    id: '1',
    scenario: 'Daily Standup',
    question: "What did you work on yesterday?",
    status: 'reviewing',
    nextReviewDate: new Date().toISOString(),
  },
  {
    id: '2',
    scenario: 'Job Interview',
    question: "Tell me about a time you faced a challenge.",
    status: 'reviewing',
    nextReviewDate: new Date().toISOString(),
  },
  {
    id: '3',
    scenario: 'Networking Event',
    question: "What are your thoughts on the latest industry trends?",
    status: 'new',
    nextReviewDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    scenario: "Giving Feedback",
    question: "How would you suggest an improvement to a colleague's work?",
    status: 'mastered',
    nextReviewDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
   {
    id: '5',
    scenario: "Client Call",
    question: "Can you walk me through the project timeline?",
    status: 'reviewing',
    nextReviewDate: new Date().toISOString(),
  },
];

// Data specifically for the Practice page (usually the 'new' items)
export const mockPracticeQuestions: Flashcard[] = mockFlashcards.filter(
  (card) => card.status === 'new'
);

// Data for the user's profile
export const mockProfile: UserProfile = {
  name: 'Alex',
  email: 'alex.doe@example.com',
  persona: 'Senior UI/UX Designer at a tech startup.',
  theme: 'dark',
};

// Example AI Feedback for a practice session
export const mockFeedback: AIFeedback = {
  correction: "Grammatically, your sentence is okay, but we can make it sound more natural. Instead of 'I do things for the button', try 'I implemented the functionality for the button'.",
  formalAnswer: "Yesterday, I focused on implementing the new authentication flow as per the requirements.",
  nativeAnswer: "I was pretty much heads-down on the auth stuff, trying to get the new login page working.",
};
