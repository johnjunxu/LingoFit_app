import { useState } from 'react';
import { Moon, Sun, Save, User as UserIcon, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from '../components/AuthModal';
import { mockProfile } from '../lib/mockData';

export function Profile() {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [userPersona, setUserPersona] = useState(mockProfile.persona);
  const [isSaved, setIsSaved] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

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
          <div className="glass-gradient rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl">
                <UserIcon className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="text-center">
              {user ? (
                <>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    {user.email}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3">
                    Member since {new Date(user.created_at).getFullYear()}
                  </p>
                  <button
                    onClick={() => signOut()}
                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Guest User
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3">
                    Sign in to save your progress
                  </p>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-2xl"
                  >
                    Login / Sign Up
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="glass-gradient glass-hover rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-foreground">Theme</h3>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-lg transition-all border border-white/10"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-4 h-4" />
                    <span className="text-sm font-medium">Vibrant</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4" />
                    <span className="text-sm font-medium">Light</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              Switch between light and vibrant mode
            </p>
          </div>

          <div className="glass-gradient rounded-2xl p-6 shadow-2xl">
            <h3 className="font-semibold text-foreground mb-2">User Persona</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tell us about yourself to help the AI personalize your learning experience. This context will guide the feedback and suggestions you receive.
            </p>
            <textarea
              value={userPersona}
              onChange={(e) => setUserPersona(e.target.value)}
              placeholder="E.g., I am a business professional looking to improve my English for international meetings..."
              className="w-full min-h-[150px] p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none mb-4 shadow-lg"
            />
            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-2xl"
            >
              <Save className="w-5 h-5" />
              {isSaved ? 'Saved!' : 'Save Persona'}
            </button>
          </div>

        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}
