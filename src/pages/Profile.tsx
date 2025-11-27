import { useState } from 'react';
import { Moon, Sun, Save } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { mockProfile } from '../lib/mockData';

export function Profile() {
  const { theme, toggleTheme } = useTheme();
  const [userPersona, setUserPersona] = useState(mockProfile.persona);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 relative overflow-hidden">
      <div className="gradient-orb-purple w-[440px] h-[440px] -top-32 right-0" />
      <div className="gradient-orb-pink w-[360px] h-[360px] top-1/2 -left-40" />
      <div className="gradient-orb-orange w-[300px] h-[300px] bottom-20 right-20" />
      <div className="gradient-orb-cyan w-[260px] h-[260px] top-1/4 left-10" />

      <div className="max-w-lg mx-auto relative z-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 text-foreground">Profile</h1>
          <p className="text-muted-foreground">Customize your learning experience</p>
        </div>

        <div className="space-y-6">
          <div className="glass-gradient glass-hover rounded-2xl p-6 shadow-2xl">
             <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-foreground">Theme</h3>
              <button onClick={toggleTheme} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="glass-gradient rounded-2xl p-6 shadow-2xl">
            <h3 className="font-semibold text-foreground mb-2">User Persona</h3>
            <textarea
              value={userPersona}
              onChange={(e) => setUserPersona(e.target.value)}
              className="w-full min-h-[150px] p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
            />
            <button onClick={handleSave} className="w-full mt-4 bg-primary text-white py-3 rounded-xl font-medium">
              {isSaved ? 'Saved!' : 'Save Persona'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
