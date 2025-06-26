import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import AuthModal from './components/AuthModal';
import DeckDetail from './components/DeckDetail';
import DeckList from './components/DeckList';
import GrammarRooms from './components/GrammarRooms';
import MergeDeckPage from './components/MergeDeckPage';
import MuseumEntrance from './components/MuseumEntrance';
import PersonalNotebook from './components/PersonalNotebook';
import ProfilePage from './components/ProfilePage';
import { useAuth } from './hooks/useAuth';
import { useProgress } from './hooks/useProgress';
import { GrammarPoint } from './types/grammar';

function App() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  
  const auth = useAuth();
  const { progress, saveGrammar, loading } = useProgress();
  const [savedGrammar, setSavedGrammar] = useState<GrammarPoint[]>([]);

  // Sync local savedGrammar state whenever progress data is updated
  useEffect(() => {
    if (progress?.savedGrammar) {
      const normalizedList: GrammarPoint[] = progress.savedGrammar.map((g: any) =>
        'grammarId' in g ? (g.grammarId as GrammarPoint) : (g as GrammarPoint)
      );
      setSavedGrammar(normalizedList);
    }
  }, [progress]);

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
        <Route element={<AppLayout onLoginClick={() => setAuthModalOpen(true)} />}>
          <Route 
            path="/rooms/:level" 
            element={<GrammarRooms onSaveGrammar={handleSaveGrammar} />} 
          />
          <Route 
            path="/notebook" 
            element={<PersonalNotebook savedGrammar={savedGrammar} />} 
          />
          <Route
            path="/profile"
            element={<ProfilePage />}
          />
          <Route path="/flashcards" element={<DeckList />} />
          <Route path="/flashcards/deck/:id" element={<DeckDetail />} />
          <Route path="/flashcards/merge" element={<MergeDeckPage />} />
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