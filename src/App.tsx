import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './pages/Dashboard';
import { Practice } from './pages/Practice';
import { Review } from './pages/Review';
import { Profile } from './pages/Profile';
import { History } from './pages/History';

type TabType = 'dashboard' | 'practice' | 'review' | 'profile' | 'history';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          {activeTab === 'dashboard' && <Dashboard onNavigate={setActiveTab} />}
          {activeTab === 'practice' && <Practice />}
          {activeTab === 'review' && <Review />}
          {activeTab === 'profile' && <Profile />}
          {activeTab === 'history' && <History onBack={() => setActiveTab('dashboard')} />}
          {activeTab !== 'history' && <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
