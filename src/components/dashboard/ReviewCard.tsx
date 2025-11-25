import { Clock } from 'lucide-react';

interface ReviewCardProps {
  dueToday: number;
  onClick: () => void;
}

export function ReviewCard({ dueToday, onClick }: ReviewCardProps) {
  return (
    <button
      onClick={onClick}
      className="glass-gradient rounded-2xl p-6 shadow-2xl hover:scale-[1.02] transition-transform cursor-pointer text-left w-full"
    >
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-6 h-6 text-accent" />
        <h3 className="font-semibold text-foreground">Review Queue</h3>
      </div>
      <div className="space-y-3">
        <div>
          <div className="text-3xl font-bold text-foreground">
            {dueToday}
          </div>
          <p className="text-xs text-muted-foreground">Due today</p>
        </div>
      </div>
    </button>
  );
}
