import { Flame } from 'lucide-react';

interface StreakCardProps {
  days: number;
  onClick: () => void;
}

export function StreakCard({ days, onClick }: StreakCardProps) {
  return (
    <button
      onClick={onClick}
      className="col-span-2 relative overflow-hidden rounded-2xl p-6 shadow-2xl bg-gradient-to-br from-orange-500/80 via-red-500/80 to-pink-500/80 backdrop-blur-xl border border-white/20 hover:scale-[1.02] transition-transform cursor-pointer text-left w-full"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <Flame className="w-8 h-8 text-white" />
          <span className="text-5xl font-bold text-white">{days}</span>
        </div>
        <p className="text-white/90 text-lg font-medium">Day Streak</p>
        <p className="text-white/70 text-sm mt-1">Keep going! You're on fire!</p>
      </div>
    </button>
  );
}
