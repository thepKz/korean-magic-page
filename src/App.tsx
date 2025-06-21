import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import AuthModal from './components/AuthModal';
import GrammarRooms from './components/GrammarRooms';
import MuseumEntrance from './components/MuseumEntrance';
import PersonalNotebook from './components/PersonalNotebook';
import { useAuth } from './hooks/useAuth';
import { useProgress } from './hooks/useProgress';
import { GrammarPoint } from './types/grammar';

function App() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  
  const auth = useAuth();
  const { savedGrammar: initialSavedGrammar, saveGrammar, loading, error } = useProgress(auth.user?.token);

  const [savedGrammar, setSavedGrammar] = useState<GrammarPoint[]>([]);

  useEffect(() => {
    if (initialSavedGrammar) {
      setSavedGrammar(initialSavedGrammar);
    }
  }, [initialSavedGrammar]);

  const handleSaveGrammar = async (grammar: GrammarPoint) => {
    if (!auth.user) {
      setAuthModalOpen(true);
      return;
    }
    await saveGrammar(grammar);
    // Optimistically update UI
    setSavedGrammar(prev => [...prev, grammar]);
  };

  const handleLogin = async (email: string, password: string) => {
    await auth.login(email, password);
    setAuthModalOpen(false);
  };

  const handleRegister = async (username: string, email: string, password: string) => {
    await auth.register(username, email, password);
    setAuthModalOpen(false);
  };
  
  return (
    <div className="bg-gray-900">
      <Routes>
        <Route path="/" element={<MuseumEntrance onOpenAuth={() => setAuthModalOpen(true)} isLoggedIn={!!auth.user} onOpenAdmin={() => {}} />} />
        <Route element={<AppLayout onOpenAuth={() => setAuthModalOpen(true)} />}>
          <Route 
            path="/rooms/:level" 
            element={<GrammarRooms onSaveGrammar={handleSaveGrammar} />} 
          />
          <Route 
            path="/notebook" 
            element={<PersonalNotebook savedGrammar={savedGrammar} />} 
          />
        </Route>
      </Routes>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
}

export default App;