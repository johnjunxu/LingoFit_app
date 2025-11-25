import { Home, BookOpen, RotateCcw, User } from 'lucide-react';

type TabType = 'dashboard' | 'practice' | 'review' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: Home },
    { id: 'practice' as TabType, label: 'Practice', icon: BookOpen },
    { id: 'review' as TabType, label: 'Review', icon: RotateCcw },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-gradient border-t border-white/10 z-50 shadow-2xl">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-around">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-all ${
                activeTab === id
                  ? 'text-primary scale-105'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
