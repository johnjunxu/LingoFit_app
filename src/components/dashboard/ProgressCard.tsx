import { Target } from 'lucide-react';

interface ProgressCardProps {
  completedSessions: number;
  targetSessions: number;
  onClick: () => void;
}

export function ProgressCard({ completedSessions, targetSessions, onClick }: ProgressCardProps) {
  const progressPercentage = (completedSessions / targetSessions) * 100;

  return (
    <button
      onClick={onClick}
      className="glass-gradient rounded-2xl p-6 shadow-2xl hover:scale-[1.02] transition-transform cursor-pointer text-left w-full"
    >
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-6 h-6 text-primary" />
        <h3 className="font-semibold text-foreground">Today's Progress</h3>
      </div>
      <div className="space-y-2">
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-foreground">
            {completedSessions}
          </span>
          <span className="text-muted-foreground mb-1">
            / {targetSessions}
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden backdrop-blur-sm">
          <div
            className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all shadow-sm"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">Sessions completed</p>
      </div>
    </button>
  );
}
