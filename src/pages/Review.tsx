import { useState } from 'react';
import { Calendar, RefreshCw, TrendingUp, ArrowLeft, MessageSquare, Trophy, Sparkles } from 'lucide-react';
import { mockFlashcards } from '../lib/mockData';
import { Flashcard } from '../types';

export function Review() {
  const [reviewQueue, setReviewQueue] = useState<Flashcard[]>(
    mockFlashcards.filter(card => card.status === 'new' || card.status === 'reviewing')
  );
  const [selectedReview, setSelectedReview] = useState<Flashcard | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleEasy = () => {
    setReviewQueue(prev => prev.filter(item => item.id !== selectedReview?.id));
    setSelectedReview(null);

    if (reviewQueue.length === 1) {
      setShowCelebration(true);
    }
  };

  const handleHard = () => {
    setReviewQueue(prev => {
      const filtered = prev.filter(item => item.id !== selectedReview?.id);
      return selectedReview ? [...filtered, selectedReview] : filtered;
    });
    setSelectedReview(null);
  };

  if (selectedReview) {
    return (
      <div className="min-h-screen pb-20 px-4 pt-6 bg-background relative overflow-hidden">
        <div className="gradient-orb-purple w-[450px] h-[450px] -top-32 -right-32" />
        <div className="gradient-orb-pink w-[350px] h-[350px] top-1/2 -left-40" />
        <div className="gradient-orb-cyan w-[280px] h-[280px] bottom-40 right-20" />

        <div className="max-w-lg mx-auto relative z-10">
          <button
            onClick={() => setSelectedReview(null)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Reviews</span>
          </button>

          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 text-foreground">{selectedReview.question}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Next review: {new Date(selectedReview.nextReviewDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* AI response and user answer would go here. For now, it's just a static view. */}
          <div className="space-y-4 glass-gradient rounded-2xl p-4">
             <p className="text-sm text-muted-foreground">Your Answer:</p>
             <p className="text-foreground">{selectedReview.userAnswer || 'You have not answered this question yet.'}</p>
             <p className="text-sm text-muted-foreground pt-4 border-t border-white/10">AI Correction:</p>
             <p className="text-foreground">{selectedReview.aiCorrection || 'No corrections available.'}</p>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleHard}
              className="flex-1 glass-gradient rounded-xl p-4 font-semibold text-foreground hover:scale-[1.02] transition-transform shadow-2xl"
            >
              Hard
            </button>
            <button
              onClick={handleEasy}
              className="flex-1 bg-gradient-to-br from-primary to-accent rounded-xl p-4 font-semibold text-white hover:scale-[1.02] transition-transform shadow-2xl"
            >
              Easy
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showCelebration) {
    return (
      <div className="min-h-screen pb-20 px-4 pt-6 bg-background relative overflow-hidden flex items-center justify-center">
        <div className="gradient-orb-pink w-[600px] h-[600px] top-1/4 -left-64 animate-pulse" />
        <div className="gradient-orb-purple w-[550px] h-[550px] top-1/3 -right-48 animate-pulse" />
        <div className="gradient-orb-orange w-[400px] h-[400px] bottom-1/4 left-1/4 animate-pulse" />
        <div className="gradient-orb-cyan w-[450px] h-[450px] bottom-1/3 right-1/4 animate-pulse" />

        <div className="max-w-lg mx-auto relative z-10 text-center">
          <div className="relative mb-8 animate-bounce">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl" />
            <Trophy className="w-32 h-32 mx-auto text-primary relative z-10" />
            <div className="absolute -top-4 -right-4 animate-spin" style={{ animationDuration: '3s' }}>
              <Sparkles className="w-12 h-12 text-accent" />
            </div>
            <div className="absolute -bottom-4 -left-4 animate-spin" style={{ animationDuration: '4s' }}>
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-4 text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            All Caught Up!
          </h1>
          <p className="text-2xl text-muted-foreground mb-8">
            You are awesome.
          </p>

          <button
            onClick={() => setShowCelebration(false)}
            className="bg-gradient-to-br from-primary to-accent rounded-xl px-8 py-4 font-semibold text-white hover:scale-[1.05] transition-transform shadow-2xl"
          >
            Back to Reviews
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 bg-background relative overflow-hidden">
      <div className="gradient-orb-pink w-[420px] h-[420px] top-10 -right-48" />
      <div className="gradient-orb-purple w-[480px] h-[480px] top-1/2 -left-56" />
      <div className="gradient-orb-orange w-[320px] h-[320px] bottom-10 right-10" />

      <div className="max-w-lg mx-auto relative z-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 text-foreground">Review</h1>
          <p className="text-muted-foreground">
            Reinforce what you've learned with spaced repetition
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="glass-gradient rounded-xl p-4 text-center shadow-2xl">
            <div className="text-2xl font-bold text-primary mb-1">
              {reviewQueue.filter((item) => new Date(item.nextReviewDate) <= new Date()).length}
            </div>
            <p className="text-xs text-muted-foreground">Due Today</p>
          </div>
          <div className="glass-gradient rounded-xl p-4 text-center shadow-2xl">
            <div className="text-2xl font-bold text-muted-foreground mb-1">
              {reviewQueue.length}
            </div>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>

        <div className="space-y-3">
          {reviewQueue.map((item) => (
            <div
              key={item.id}
              className="glass-gradient glass-hover rounded-xl p-5 shadow-2xl transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="text-foreground font-medium leading-relaxed flex-1">
                  {item.question}
                </p>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap backdrop-blur-sm bg-primary/30 text-primary border border-primary/30`}
                >
                  {item.scenario}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Due: {new Date(item.nextReviewDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/10">
                <button
                  onClick={() => setSelectedReview(item)}
                  className="text-sm font-medium text-primary hover:text-accent transition-colors flex items-center gap-1"
                >
                  <TrendingUp className="w-4 h-4" />
                  Start Review
                </button>
              </div>
            </div>
          ))}
        </div>

        {reviewQueue.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 glass-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              All caught up!
            </h3>
            <p className="text-sm text-muted-foreground">
              No items due for review right now. Check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
