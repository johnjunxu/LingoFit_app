import { useState, useEffect } from 'react';
import { Calendar, RefreshCw, TrendingUp, ArrowLeft, Trophy, Sparkles } from 'lucide-react';
import { getFlashcards } from '../lib/database';
import { Flashcard } from '../types';
import { useAuth } from '../contexts/AuthContext';

export function Review() {
  const { user } = useAuth();
  const [reviewQueue, setReviewQueue] = useState<Flashcard[]>([]);
  
  useEffect(() => {
    async function loadFlashcards() {
      if (user) {
        const allCards = await getFlashcards(user.id);
        const cardsToReview = allCards.filter(card => card.status === 'new' || card.status === 'reviewing');
        setReviewQueue(cardsToReview);
      } else {
        setReviewQueue([]);
      }
    }
    loadFlashcards();
  }, [user]);

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
        
        {/* ... JSX for different states */}
      </div>
    </div>
  );
}
