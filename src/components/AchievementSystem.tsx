import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Target, Zap, Crown, Gift } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'study' | 'quiz' | 'streak' | 'special';
  requirement: number;
  current: number;
  unlocked: boolean;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementSystemProps {
  achievements: Achievement[];
  onClaimReward?: (achievementId: string) => void;
}

const AchievementSystem: React.FC<AchievementSystemProps> = ({ 
  achievements, 
  onClaimReward 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);
  const [newUnlocked, setNewUnlocked] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: '전체', icon: <Trophy className="w-4 h-4" /> },
    { id: 'study', name: '학습', icon: <Target className="w-4 h-4" /> },
    { id: 'quiz', name: '퀴즈', icon: <Star className="w-4 h-4" /> },
    { id: 'streak', name: '연속', icon: <Zap className="w-4 h-4" /> },
    { id: 'special', name: '특별', icon: <Crown className="w-4 h-4" /> }
  ];

  const rarityColors = {
    common: 'from-gray-500 to-gray-600',
    rare: 'from-blue-500 to-blue-600',
    epic: 'from-purple-500 to-purple-600',
    legendary: 'from-yellow-500 to-orange-500'
  };

  const rarityBorders = {
    common: 'border-gray-400/30',
    rare: 'border-blue-400/30',
    epic: 'border-purple-400/30',
    legendary: 'border-yellow-400/30'
  };

  const filteredAchievements = achievements.filter(achievement => {
    const categoryMatch = selectedCategory === 'all' || achievement.category === selectedCategory;
    const unlockedMatch = !showUnlockedOnly || achievement.unlocked;
    return categoryMatch && unlockedMatch;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const completionRate = Math.round((unlockedCount / totalCount) * 100);

  // Check for new achievements
  useEffect(() => {
    const newlyUnlocked = achievements
      .filter(a => a.unlocked && !newUnlocked.includes(a.id))
      .map(a => a.id);
    
    if (newlyUnlocked.length > 0) {
      setNewUnlocked(prev => [...prev, ...newlyUnlocked]);
      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setNewUnlocked(prev => prev.filter(id => !newlyUnlocked.includes(id)));
      }, 5000);
    }
  }, [achievements, newUnlocked]);

  const getProgressPercentage = (achievement: Achievement) => {
    return Math.min((achievement.current / achievement.requirement) * 100, 100);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h3 className="korean-text text-white text-xl font-medium">업적 시스템</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-yellow-400">{unlockedCount}/{totalCount}</div>
          <div className="text-sm text-gray-400 korean-text">{completionRate}% 완료</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-black/20 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(category => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
              selectedCategory === category.id
                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'
                : 'bg-black/20 text-gray-400 border border-white/10 hover:bg-white/10'
            }`}
          >
            {category.icon}
            <span className="korean-text">{category.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Show Unlocked Only Toggle */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          id="showUnlocked"
          checked={showUnlockedOnly}
          onChange={(e) => setShowUnlockedOnly(e.target.checked)}
          className="rounded"
        />
        <label htmlFor="showUnlocked" className="korean-text text-gray-300 text-sm">
          달성한 업적만 보기
        </label>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              className={`relative bg-gradient-to-br ${
                achievement.unlocked 
                  ? rarityColors[achievement.rarity]
                  : 'from-gray-600/20 to-gray-700/20'
              } rounded-xl p-4 border ${
                achievement.unlocked 
                  ? rarityBorders[achievement.rarity]
                  : 'border-gray-600/30'
              } ${achievement.unlocked ? '' : 'opacity-60'}`}
            >
              {/* New Achievement Badge */}
              {newUnlocked.includes(achievement.id) && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute -top-2 -right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold korean-text"
                >
                  NEW!
                </motion.div>
              )}

              {/* Achievement Icon */}
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-3 rounded-lg ${
                  achievement.unlocked 
                    ? 'bg-white/20' 
                    : 'bg-gray-600/20'
                } text-2xl`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className="korean-text text-white font-bold mb-1">
                    {achievement.name}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {achievement.description}
                  </p>
                </div>
              </div>

              {/* Progress */}
              {!achievement.unlocked && (
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400 korean-text">진행도</span>
                    <span className="text-xs text-gray-400">
                      {achievement.current}/{achievement.requirement}
                    </span>
                  </div>
                  <div className="w-full bg-black/20 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressPercentage(achievement)}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              )}

              {/* Rarity Badge */}
              <div className="flex items-center justify-between">
                <div className={`px-2 py-1 rounded text-xs font-bold ${
                  achievement.rarity === 'common' ? 'bg-gray-500/20 text-gray-300' :
                  achievement.rarity === 'rare' ? 'bg-blue-500/20 text-blue-300' :
                  achievement.rarity === 'epic' ? 'bg-purple-500/20 text-purple-300' :
                  'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {achievement.rarity === 'common' ? '일반' :
                   achievement.rarity === 'rare' ? '레어' :
                   achievement.rarity === 'epic' ? '에픽' : '전설'}
                </div>

                {achievement.unlocked && achievement.unlockedAt && (
                  <div className="text-xs text-gray-400">
                    {new Date(achievement.unlockedAt).toLocaleDateString('ko-KR')}
                  </div>
                )}
              </div>

              {/* Claim Reward Button */}
              {achievement.unlocked && onClaimReward && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onClaimReward(achievement.id)}
                  className="w-full mt-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 rounded-lg text-sm korean-text font-medium flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4" />
                  보상 받기
                </motion.button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-8">
          <Trophy className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="korean-text text-gray-400">해당하는 업적이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default AchievementSystem;