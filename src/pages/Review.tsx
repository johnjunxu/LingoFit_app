import { useState } from 'react';
import { Calendar, RefreshCw, TrendingUp, ArrowLeft, Trophy, Sparkles } from 'lucide-react';
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
    if (selectedReview) {
      setReviewQueue(prev => [...prev.filter(item => item.id !== selectedReview.id), selectedReview]);
    }
    setSelectedReview(null);
  };
  
  return (
    <div className="min-h-screen pb-20 px-4 pt-6 bg-background relative overflow-hidden">
      <div className="gradient-orb-orange w-[380px] h-[380px] -top-40 right-10" />
      <div className="gradient-orb-purple w-[460px] h-[460px] top-1/3 -left-48" />
      <div className="gradient-orb-pink w-[320px] h-[320px] bottom-32 right-20" />
      
      <div className="max-w-lg mx-auto relative z-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1 text-foreground">Review</h1>
          <p className="text-sm text-muted-foreground">{reviewQueue.length} items to review</p>
        </div>
        
        {showCelebration ? (
          <div className="text-center p-8 glass-gradient rounded-2xl">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">All Done!</h2>
            <p>You've completed your reviews for today. Great job!</p>
          </div>
        ) : selectedReview ? (
          <div>
            {/* ... JSX for selected review ... */}
          </div>
        ) : reviewQueue.length > 0 ? (
          <div className="space-y-4">
            {reviewQueue.map(item => (
              <div key={item.id} onClick={() => setSelectedReview(item)} className="glass-gradient glass-hover rounded-2xl p-4 cursor-pointer">
                <p className="font-medium">{item.question}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 glass-gradient rounded-2xl">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Nothing to review!</h2>
            <p className="text-muted-foreground">You're all caught up. Check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
