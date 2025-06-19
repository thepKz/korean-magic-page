import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Zap, Crown, ArrowLeft, Notebook } from 'lucide-react';
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
      korean: '초급관',
      english: 'Beginner Hall',
      description: '기초 문법의 세계',
      englishDesc: 'World of Basic Grammar',
      icon: BookOpen,
      color: 'from-green-400 to-emerald-600',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/50',
      emoji: '🌱'
    },
    {
      id: 'intermediate' as GrammarLevel,
      korean: '중급관',
      english: 'Intermediate Hall',
      description: '실용 문법의 정원',
      englishDesc: 'Garden of Practical Grammar',
      icon: Zap,
      color: 'from-blue-400 to-cyan-600',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/50',
      emoji: '⚡'
    },
    {
      id: 'advanced' as GrammarLevel,
      korean: '고급관',
      english: 'Advanced Hall',
      description: '고급 문법의 궁전',
      englishDesc: 'Palace of Advanced Grammar',
      icon: Crown,
      color: 'from-purple-400 to-pink-600',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-400/50',
      emoji: '👑'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="min-h-screen p-4 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="korean-text">돌아가기</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenNotebook}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors"
        >
          <Notebook className="w-5 h-5" />
          <span className="korean-text">개인 노트</span>
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold korean-text text-white mb-4">
            전시관 선택
          </h1>
          <p className="text-xl english-text text-blue-200">
            Choose Your Exhibition Hall
          </p>
        </motion.div>

        {/* Mascot Guide */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl"
          >
            👘
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-4 border border-white/20"
          >
            <p className="korean-text text-white text-center">
              안녕하세요! 저는 여러분의 가이드 한복이에요. 어떤 전시관을 둘러보고 싶으신가요?
            </p>
            <p className="english-text text-blue-200 text-sm text-center mt-2">
              Hello! I'm Hanbok, your guide. Which exhibition hall would you like to explore?
            </p>
          </motion.div>
        </motion.div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {levels.map((level, index) => {
            const IconComponent = level.icon;
            return (
              <motion.div
                key={level.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onLevelSelect(level.id)}
                className={`${level.bgColor} ${level.borderColor} border-2 rounded-2xl p-8 cursor-pointer backdrop-blur-sm hover:backdrop-blur-md transition-all duration-300 group`}
              >
                {/* Icon and Emoji */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                      className="text-4xl mb-2"
                    >
                      {level.emoji}
                    </motion.div>
                    <div className={`bg-gradient-to-r ${level.color} p-3 rounded-full`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold korean-text text-white mb-2 group-hover:scale-105 transition-transform">
                    {level.korean}
                  </h3>
                  <p className="english-text text-blue-200 mb-4 font-medium">
                    {level.english}
                  </p>
                  <p className="korean-text text-white/80 mb-2">
                    {level.description}
                  </p>
                  <p className="english-text text-blue-300 text-sm">
                    {level.englishDesc}
                  </p>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(45deg, ${level.color.split(' ')[1]}, ${level.color.split(' ')[3]})`,
                    opacity: 0.1
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Guide */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-12 text-center"
        >
          <p className="korean-text text-white/60 mb-2">
            각 전시관을 클릭하여 문법의 세계를 탐험해보세요
          </p>
          <p className="english-text text-blue-300/60 text-sm">
            Click on each hall to explore the world of grammar
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MuseumEntrance;