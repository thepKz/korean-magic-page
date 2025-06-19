import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { GrammarLevel } from '../types/grammar';

interface MuseumEntranceProps {
  onLevelSelect: (level: GrammarLevel) => void;
  onOpenNotebook: () => void;
  onBack: () => void;
}

const MuseumEntrance: React.FC<MuseumEntranceProps> = ({ 
  onLevelSelect, 
  onOpenNotebook, 
  onBack 
}) => {
  const levels = [
    {
      id: 'beginner' as GrammarLevel,
      korean: '초급',
      english: 'Beginner',
      description: '기초 문법',
      count: '2개 문법',
      color: 'border-emerald-500/30 hover:border-emerald-400/50'
    },
    {
      id: 'intermediate' as GrammarLevel,
      korean: '중급',
      english: 'Intermediate', 
      description: 'TOPIK 3급',
      count: '50개 문법',
      color: 'border-blue-500/30 hover:border-blue-400/50'
    },
    {
      id: 'advanced' as GrammarLevel,
      korean: '고급',
      english: 'Advanced',
      description: '고급 문법',
      count: '1개 문법',
      color: 'border-purple-500/30 hover:border-purple-400/50'
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

  const handleNotebookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenNotebook();
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

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNotebookClick}
          className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
        >
          <BookOpen className="w-4 h-4" />
          <span className="korean-text">노트</span>
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-light korean-text text-white mb-4">
            학습 단계 선택
          </h1>
          <p className="text-lg english-text text-gray-400">
            Choose your learning level
          </p>
        </motion.div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              className={`bg-white/5 backdrop-blur-sm border-2 ${level.color} rounded-2xl p-8 cursor-pointer transition-all duration-300 group`}
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

        {/* Interactive Features Preview */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
            <div className="text-2xl mb-2">🎯</div>
            <p className="korean-text text-white text-sm mb-1">퀴즈 모드</p>
            <p className="english-text text-gray-400 text-xs">Quiz Mode</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
            <div className="text-2xl mb-2">🔊</div>
            <p className="korean-text text-white text-sm mb-1">발음 연습</p>
            <p className="english-text text-gray-400 text-xs">Pronunciation</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
            <div className="text-2xl mb-2">📝</div>
            <p className="korean-text text-white text-sm mb-1">문장 만들기</p>
            <p className="english-text text-gray-400 text-xs">Sentence Builder</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MuseumEntrance;