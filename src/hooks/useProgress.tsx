import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { GrammarPoint } from '../types/grammar';
import { useAuth } from './useAuth';

// Define the shape of user progress
interface QuizStats {
  total: number;
  correct: number;
  streak: number;
  bestStreak: number;
  averageTime: number;
}

interface SavedGrammar {
  grammarId: GrammarPoint;
  savedAt: string;
  mastered: boolean;
  masteredAt?: string;
}

interface UserProgress {
  savedGrammar: SavedGrammar[];
  quizStats: QuizStats;
  totalStudyTime: number; // in seconds
  // ... other progress fields can be added here
}

// Define the shape of the context
interface ProgressContextType {
  progress: UserProgress | null;
  loading: boolean;
  fetchProgress: () => Promise<void>;
  saveGrammar: (grammarPoint: GrammarPoint) => Promise<void>;
  removeSavedGrammar: (grammarId: string) => Promise<void>;
  recordQuizResult: (result: { grammarId: string; isCorrect: boolean; timeSpent: number; }) => Promise<void>;
  updateStudyTime: (duration: number) => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

// Custom hook to use the progress context
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

// Provider component
export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const progressLogic = useProgressState();
  return (
    <ProgressContext.Provider value={progressLogic}>
      {children}
    </ProgressContext.Provider>
  );
};

// The core logic for the hook
export const useProgressState = (): ProgressContextType => {
  const { user, token } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

  const fetchProgress = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    };
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/progress`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch progress');
      const data = await response.json();
      setProgress(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [token, API_URL]);

  useEffect(() => {
    if (user) {
      fetchProgress();
    } else {
      // Handle anonymous user progress via localStorage if needed
      setProgress(null);
      setLoading(false);
    }
  }, [user, fetchProgress]);
  
  const saveGrammar = async (grammarPoint: GrammarPoint) => {
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/progress/save-grammar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ grammarId: grammarPoint._id }),
      });
      if (!response.ok) throw new Error('Failed to save grammar');
      // Refetch or optimistically update state
      await fetchProgress(); 
    } catch (error) {
      console.error(error);
    }
  };

  const removeSavedGrammar = async (grammarId: string) => {
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/progress/save-grammar/${grammarId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to remove grammar');
      await fetchProgress();
    } catch (error) {
      console.error(error);
    }
  };
  
  const recordQuizResult = async (result: { grammarId: string; isCorrect: boolean; timeSpent: number; }) => {
    if (!token) return;
    try {
      await fetch(`${API_URL}/progress/quiz-result`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(result),
      });
      await fetchProgress();
    } catch (error) {
      console.error("Failed to record quiz result", error);
    }
  };

  const updateStudyTime = async (duration: number) => {
    if (!token) return;
    try {
      await fetch(`${API_URL}/progress/study-time`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ duration }),
      });
      await fetchProgress();
    } catch (error) {
        console.error("Failed to update study time", error);
    }
  };

  return {
    progress,
    loading,
    fetchProgress,
    saveGrammar,
    removeSavedGrammar,
    recordQuizResult,
    updateStudyTime,
  };
}; 