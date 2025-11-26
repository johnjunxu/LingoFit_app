import { mockUserProgress } from '../lib/mockData';
import { StreakCard } from '../components/dashboard/StreakCard';
import { ProgressCard } from '../components/dashboard/ProgressCard';
import { ReviewCard } from '../components/dashboard/ReviewCard';
import { GlassTip } from '../components/layout/GlassTip';
import { useAuth } from '../contexts/AuthContext';

type DashboardProps = {
  onNavigate: (tab: 'practice' | 'review' | 'history') => void;
};

export function Dashboard({ onNavigate }: DashboardProps) {
  const { user } = useAuth();

  const progressData = user ? mockUserProgress : {
    streakDays: 0,
    sessionsCompletedToday: 0,
    itemsToReview: 0,
    dailyTip: "Log in to start your learning journey and track your progress!",
  };

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 relative overflow-hidden">
      <div className="gradient-orb-pink w-[400px] h-[400px] -top-48 -right-48" />
      <div className="gradient-orb-purple w-[550px] h-[550px] top-1/3 -left-64" />
      <div className="gradient-orb-orange w-[350px] h-[350px] bottom-20 right-10" />
      <div className="gradient-orb-cyan w-[300px] h-[300px] top-40 left-20" />

      <div className="max-w-lg mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">LingoFit</h1>
          <p className="text-muted-foreground">Your English learning journey</p>
        </div>

        <div className="grid grid-cols-2 gap-4 auto-rows-fr">
          <StreakCard
            days={progressData.streakDays}
            onClick={() => onNavigate('history')}
          />

          <ProgressCard
            completedSessions={progressData.sessionsCompletedToday}
            targetSessions={3}
            onClick={() => onNavigate('practice')}
          />

          <ReviewCard
            dueToday={progressData.itemsToReview}
            onClick={() => onNavigate('review')}
          />
        </div>

        {progressData.dailyTip && (
          <div className="mt-6">
            <GlassTip tip={progressData.dailyTip} />
          </div>
        )}
      </div>
    </div>
  );
}
