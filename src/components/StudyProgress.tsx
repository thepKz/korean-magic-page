import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, TrendingUp, Award } from 'lucide-react';

interface StudyProgressProps {
  quizStats: {
    correct: number;
    total: number;
    streak: number;
    bestStreak: number;
  };
  studyTime: number;
  grammarMastered: number;
  totalGrammar: number;
}

const StudyProgress: React.FC<StudyProgressProps> = ({
  quizStats,
  studyTime,
  grammarMastered,
  totalGrammar
}) => {
  const [showAchievement, setShowAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<string>('');

  const accuracy = quizStats.total > 0 ? Math.round((quizStats.correct / quizStats.total) * 100) : 0;
  const progress = Math.round((grammarMastered / totalGrammar) * 100);

  const achievements = [
    { id: 'first-quiz', name: 'First Quiz', description: 'Complete your first quiz', condition: () => quizStats.total >= 1 },
    { id: 'streak-5', name: '5 Streak', description: '5 correct answers in a row', condition: () => quizStats.streak >= 5 },
    { id: 'streak-10', name: '10 Streak', description: '10 correct answers in a row', condition: () => quizStats.streak >= 10 },
    { id: 'accuracy-80', name: 'Accuracy Master', description: '80% accuracy or higher', condition: () => accuracy >= 80 && quizStats.total >= 10 },
    { id: 'grammar-master', name: 'Grammar Master', description: 'Complete all grammar points', condition: () => progress >= 100 },
  ];

  useEffect(() => {
    const newAchievements = achievements.filter(achievement => 
      achievement.condition() && !localStorage.getItem(`achievement-${achievement.id}`)
    );

    if (newAchievements.length > 0) {
      const achievement = newAchievements[0];
      localStorage.setItem(`achievement-${achievement.id}`, 'true');
      setCurrentAchievement(achievement.name);
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 3000);
    }
  }, [quizStats, accuracy, progress]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-emerald-400" />
        <h3 className="text-white text-xl font-medium">Study Progress</h3>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-black/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400 mb-1">{progress}%</div>
          <div className="text-sm text-gray-400">Completion</div>
        </div>
        <div className="bg-black/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">{accuracy}%</div>
          <div className="text-sm text-gray-400">Accuracy</div>
        </div>
        <div className="bg-black/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-1">{quizStats.streak}</div>
          <div className="text-sm text-gray-400">Current Streak</div>
        </div>
        <div className="bg-black/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">{formatTime(studyTime)}</div>
          <div className="text-sm text-gray-400">Study Time</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white text-sm">Overall Progress</span>
          <span className="text-emerald-400 text-sm">{grammarMastered}/{totalGrammar}</span>
        </div>
        <div className="w-full bg-black/20 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full"
          />
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="space-y-2">
        <h4 className="text-white font-medium mb-3">Recent Achievements</h4>
        {achievements.filter(a => localStorage.getItem(`achievement-${a.id}`)).slice(-3).map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 bg-black/20 rounded-lg p-3"
          >
            <Award className="w-5 h-5 text-yellow-400" />
            <div>
              <div className="text-white text-sm font-medium">{achievement.name}</div>
              <div className="text-gray-400 text-xs">{achievement.description}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-4 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6" />
              <div>
                <div className="font-bold">New Achievement!</div>
                <div className="text-sm">{currentAchievement}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudyProgress;