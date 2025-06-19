import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Gamepad2, TrendingUp, BarChart3, CreditCard, Puzzle } from 'lucide-react';
import { GrammarLevel } from '../types/grammar';

interface MuseumEntranceProps {
  onLevelSelect: (level: GrammarLevel) => void;
  onOpenNotebook: () => void;
  onOpenGames: () => void;
  onOpenProgress: () => void;
  onOpenAnalytics: () => void;
  onOpenFlashcards: () => void;
  onOpenInteractiveGames: () => void;
  onBack: () => void;
}

const MuseumEntrance: React.FC<MuseumEntranceProps> = ({ 
  onLevelSelect, 
  onOpenNotebook,
  onOpenGames,
  onOpenProgress,
  onOpenAnalytics,
  onOpenFlashcards,
  onOpenInteractiveGames,
  onBack 
}) => {
  const levels = [
    {
      id: 'beginner' as GrammarLevel,
      korean: '초급',
      english: 'Beginner',
      description: '기초 문법',
      count: '2개 문법',
      color: 'border-emerald-500/30 hover:border-emerald-400/50',
      gradient: 'from-emerald-500/10 to-green-500/10'
    },
    {
      id: 'intermediate' as GrammarLevel,
      korean: '중급',
      english: 'Intermediate', 
      description: 'TOPIK 3급',
      count: '50개 문법',
      color: 'border-blue-500/30 hover:border-blue-400/50',
      gradient: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      id: 'advanced' as GrammarLevel,
      korean: '고급',
      english: 'Advanced',
      description: '고급 문법',
      count: '1개 문법',
      color: 'border-purple-500/30 hover:border-purple-400/50',
      gradient: 'from-purple-500/10 to-pink-500/10'
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      korean: '개인 노트',
      english: 'Personal Notes',
      description: '저장된 문법 보기',
      onClick: onOpenNotebook,
      color: 'text-blue-400'
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      korean: '플래시카드',
      english: 'Flashcards',
      description: '카드로 복습하기',
      onClick: onOpenFlashcards,
      color: 'text-purple-400'
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      korean: '문법 게임',
      english: 'Grammar Games',
      description: '재미있게 학습하기',
      onClick: onOpenGames,
      color: 'text-green-400'
    },
    {
      icon: <Puzzle className="w-6 h-6" />,
      korean: '인터랙티브 게임',
      english: 'Interactive Games',
      description: '다양한 게임 모드',
      onClick: onOpenInteractiveGames,
      color: 'text-orange-400'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      korean: '학습 진도',
      english: 'Study Progress',
      description: '성취도 확인하기',
      onClick: onOpenProgress,
      color: 'text-emerald-400'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      korean: '고급 분석',
      english: 'Advanced Analytics',
      description: '상세한 학습 분석',
      onClick: onOpenAnalytics,
      color: 'text-cyan-400'
    }
  ];

  const handleLevelClick = (levelId: GrammarLevel) => {
    onLevelSelect(levelId);
  };

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onBack();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-16">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBackClick}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="korean-text">돌아가기</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl font-light korean-text text-white mb-2">
            한국어 문법 박물관
          </h1>
          <p className="text-sm english-text text-gray-400">
            Korean Grammar Museum
          </p>
        </div>

        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light korean-text text-white mb-4">
            학습 단계 선택
          </h2>
          <p className="text-lg english-text text-gray-400">
            Choose your learning path
          </p>
        </motion.div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {levels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLevelClick(level.id)}
              className={`bg-gradient-to-br ${level.gradient} backdrop-blur-sm border-2 ${level.color} rounded-2xl p-8 cursor-pointer transition-all duration-300 group hover:shadow-2xl`}
            >
              <div className="text-center">
                <h3 className="text-2xl font-medium korean-text text-white mb-2 group-hover:scale-105 transition-transform">
                  {level.korean}
                </h3>
                <p className="english-text text-gray-300 mb-4 font-light">
                  {level.english}
                </p>
                <p className="korean-text text-gray-400 text-sm mb-2">
                  {level.description}
                </p>
                <p className="text-xs text-gray-500">
                  {level.count}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={feature.onClick}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 cursor-pointer border border-white/10 hover:border-white/20 transition-all group"
            >
              <div className="text-center">
                <div className={`${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="korean-text text-white font-medium mb-2">
                  {feature.korean}
                </h3>
                <p className="english-text text-gray-400 text-sm mb-2">
                  {feature.english}
                </p>
                <p className="korean-text text-gray-500 text-xs">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Features Preview */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
            <div className="text-2xl mb-2">🤖</div>
            <p className="korean-text text-white text-sm mb-1">AI 튜터</p>
            <p className="english-text text-gray-400 text-xs">AI Chatbot</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
            <div className="text-2xl mb-2">🎯</div>
            <p className="korean-text text-white text-sm mb-1">다양한 퀴즈</p>
            <p className="english-text text-gray-400 text-xs">Various Quizzes</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
            <div className="text-2xl mb-2">🎮</div>
            <p className="korean-text text-white text-sm mb-1">게임 모드</p>
            <p className="english-text text-gray-400 text-xs">Game Modes</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
            <div className="text-2xl mb-2">📊</div>
            <p className="korean-text text-white text-sm mb-1">진도 추적</p>
            <p className="english-text text-gray-400 text-xs">Progress Tracking</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MuseumEntrance;

export default MuseumEntrance