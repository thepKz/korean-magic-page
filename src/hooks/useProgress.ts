import { useState, useEffect } from 'react';
import { GrammarPoint } from '../types/grammar';

interface QuizStats {
  correct: number;
  total: number;
  streak: number;
  bestStreak: number;
}

interface StudySession {
  date: Date;
  duration: number;
  grammarStudied: string[];
  quizResults: Array<{
    grammarId: string;
    quizType: string;
    isCorrect: boolean;
    timeSpent: number;
  }>;
}

interface UserProgress {
  savedGrammar: GrammarPoint[];
  quizStats: QuizStats;
  studySessions: StudySession[];
  totalStudyTime: number;
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    unlockedAt: Date;
  }>;
  weeklyGoal: {
    target: number;
    current: number;
    weekStart: Date;
  };
}

export const useProgress = (token: string | null) => {
  const [progress, setProgress] = useState<UserProgress>({
    savedGrammar: [],
    quizStats: { correct: 0, total: 0, streak: 0, bestStreak: 0 },
    studySessions: [],
    totalStudyTime: 0,
    achievements: [],
    weeklyGoal: { target: 300, current: 0, weekStart: new Date() }
  });
  const [loading, setLoading] = useState(false);

  const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

  // Load progress from server or localStorage
  useEffect(() => {
    if (token) {
      loadProgressFromServer();
    } else {
      loadProgressFromLocal();
    }
  }, [token]);

  const loadProgressFromServer = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/progress`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProgress(data);
      }
    } catch (error) {
      console.error('Error loading progress from server:', error);
      loadProgressFromLocal();
    } finally {
      setLoading(false);
    }
  };

  const loadProgressFromLocal = () => {
    try {
      const savedGrammar = JSON.parse(localStorage.getItem('korean-grammar-saved') || '[]');
      const quizStats = JSON.parse(localStorage.getItem('korean-grammar-stats') || '{"correct":0,"total":0,"streak":0,"bestStreak":0}');
      const studySessions = JSON.parse(localStorage.getItem('korean-grammar-sessions') || '[]');
      const totalStudyTime = parseInt(localStorage.getItem('korean-grammar-study-time') || '0');
      const achievements = JSON.parse(localStorage.getItem('korean-grammar-achievements') || '[]');
      const weeklyGoal = JSON.parse(localStorage.getItem('korean-grammar-weekly-goal') || '{"target":300,"current":0,"weekStart":"' + new Date().toISOString() + '"}');

      setProgress({
        savedGrammar,
        quizStats,
        studySessions: studySessions.map((session: any) => ({
          ...session,
          date: new Date(session.date)
        })),
        totalStudyTime,
        achievements: achievements.map((achievement: any) => ({
          ...achievement,
          unlockedAt: new Date(achievement.unlockedAt)
        })),
        weeklyGoal: {
          ...weeklyGoal,
          weekStart: new Date(weeklyGoal.weekStart)
        }
      });
    } catch (error) {
      console.error('Error loading progress from localStorage:', error);
    }
  };

  const saveGrammar = async (grammar: GrammarPoint) => {
    const updatedSaved = [...progress.savedGrammar];
    const exists = updatedSaved.find(g => g.id === grammar.id);
    
    if (!exists) {
      updatedSaved.push(grammar);
      
      const newProgress = { ...progress, savedGrammar: updatedSaved };
      setProgress(newProgress);

      if (token) {
        try {
          await fetch(`${API_URL}/progress/save-grammar`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ grammarId: grammar.id }),
          });
        } catch (error) {
          console.error('Error saving grammar to server:', error);
        }
      } else {
        localStorage.setItem('korean-grammar-saved', JSON.stringify(updatedSaved));
      }
    }
  };

  const recordQuizResult = async (grammarId: string, quizType: string, isCorrect: boolean, timeSpent: number = 0) => {
    const newQuizStats = { ...progress.quizStats };
    newQuizStats.total += 1;
    
    if (isCorrect) {
      newQuizStats.correct += 1;
      newQuizStats.streak += 1;
      newQuizStats.bestStreak = Math.max(newQuizStats.bestStreak, newQuizStats.streak);
    } else {
      newQuizStats.streak = 0;
    }

    // Update today's session
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const updatedSessions = [...progress.studySessions];
    let todaySession = updatedSessions.find(session => 
      session.date.getTime() === today.getTime()
    );

    if (!todaySession) {
      todaySession = {
        date: today,
        duration: 0,
        grammarStudied: [],
        quizResults: []
      };
      updatedSessions.push(todaySession);
    }

    todaySession.quizResults.push({
      grammarId,
      quizType,
      isCorrect,
      timeSpent
    });

    const newProgress = {
      ...progress,
      quizStats: newQuizStats,
      studySessions: updatedSessions
    };
    setProgress(newProgress);

    if (token) {
      try {
        await fetch(`${API_URL}/progress/quiz-result`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ grammarId, quizType, isCorrect, timeSpent }),
        });
      } catch (error) {
        console.error('Error recording quiz result to server:', error);
      }
    } else {
      localStorage.setItem('korean-grammar-stats', JSON.stringify(newQuizStats));
      localStorage.setItem('korean-grammar-sessions', JSON.stringify(updatedSessions));
    }
  };

  const updateStudyTime = async (duration: number, grammarIds: string[] = []) => {
    const newTotalTime = progress.totalStudyTime + duration;
    
    // Update today's session
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const updatedSessions = [...progress.studySessions];
    let todaySession = updatedSessions.find(session => 
      session.date.getTime() === today.getTime()
    );

    if (!todaySession) {
      todaySession = {
        date: today,
        duration: 0,
        grammarStudied: [],
        quizResults: []
      };
      updatedSessions.push(todaySession);
    }

    todaySession.duration += duration;
    
    // Add studied grammar (avoid duplicates)
    grammarIds.forEach(grammarId => {
      if (!todaySession!.grammarStudied.includes(grammarId)) {
        todaySession!.grammarStudied.push(grammarId);
      }
    });

    // Update weekly goal
    const updatedWeeklyGoal = { ...progress.weeklyGoal };
    updatedWeeklyGoal.current += duration;

    const newProgress = {
      ...progress,
      totalStudyTime: newTotalTime,
      studySessions: updatedSessions,
      weeklyGoal: updatedWeeklyGoal
    };
    setProgress(newProgress);

    if (token) {
      try {
        await fetch(`${API_URL}/progress/study-time`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ duration, grammarIds }),
        });
      } catch (error) {
        console.error('Error updating study time to server:', error);
      }
    } else {
      localStorage.setItem('korean-grammar-study-time', newTotalTime.toString());
      localStorage.setItem('korean-grammar-sessions', JSON.stringify(updatedSessions));
      localStorage.setItem('korean-grammar-weekly-goal', JSON.stringify(updatedWeeklyGoal));
    }
  };

  const unlockAchievement = (achievement: { id: string; name: string; description: string }) => {
    const exists = progress.achievements.find(a => a.id === achievement.id);
    if (exists) return;

    const newAchievement = {
      ...achievement,
      unlockedAt: new Date()
    };

    const updatedAchievements = [...progress.achievements, newAchievement];
    const newProgress = { ...progress, achievements: updatedAchievements };
    setProgress(newProgress);

    if (!token) {
      localStorage.setItem('korean-grammar-achievements', JSON.stringify(updatedAchievements));
    }
  };

  return {
    progress,
    loading,
    saveGrammar,
    recordQuizResult,
    updateStudyTime,
    unlockAchievement,
    refreshProgress: token ? loadProgressFromServer : loadProgressFromLocal
  };
};