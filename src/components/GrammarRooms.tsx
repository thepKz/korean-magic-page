import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Play, Save, Notebook, Star, Volume2 } from 'lucide-react';
import { GrammarLevel, GrammarPoint } from '../types/grammar';

interface GrammarRoomsProps {
  level: GrammarLevel;
  onBack: () => void;
  onSaveGrammar: (grammar: GrammarPoint) => void;
  onOpenNotebook: () => void;
}

const GrammarRooms: React.FC<GrammarRoomsProps> = ({ 
  level, 
  onBack, 
  onSaveGrammar, 
  onOpenNotebook 
}) => {
  const [selectedGrammar, setSelectedGrammar] = useState<GrammarPoint | null>(null);
  const [currentExample, setCurrentExample] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  // Sample grammar data
  const grammarData: Record<GrammarLevel, GrammarPoint[]> = {
    beginner: [
      {
        id: 'be-1',
        korean: '이다/아니다',
        english: 'To be / Not to be',
        structure: 'Noun + 이다/아니다',
        examples: [
          {
            korean: '저는 학생이에요.',
            english: 'I am a student.',
            romanization: 'Jeoneun haksaeng-ieyo.'
          },
          {
            korean: '이것은 책이 아니에요.',
            english: 'This is not a book.',
            romanization: 'Igeoseun chaegi anieyo.'
          }
        ],
        usage: 'Used to state what something is or is not',
        level: 'beginner'
      },
      {
        id: 'be-2',
        korean: '있다/없다',
        english: 'To have / Not to have',
        structure: 'Noun + 이/가 있다/없다',
        examples: [
          {
            korean: '시간이 있어요.',
            english: 'I have time.',
            romanization: 'Sigani isseoyo.'
          },
          {
            korean: '돈이 없어요.',
            english: 'I don\'t have money.',
            romanization: 'Doni eopseoyo.'
          }
        ],
        usage: 'Used to express existence or possession',
        level: 'beginner'
      }
    ],
    intermediate: [
      {
        id: 'int-1',
        korean: '-(으)ㄹ 것 같다',
        english: 'It seems like / I think',
        structure: 'Verb stem + (으)ㄹ 것 같다',
        examples: [
          {
            korean: '비가 올 것 같아요.',
            english: 'It seems like it will rain.',
            romanization: 'Biga ol geot gatayo.'
          },
          {
            korean: '그 사람이 올 것 같지 않아요.',
            english: 'I don\'t think that person will come.',
            romanization: 'Geu sarami ol geot gatji anayo.'
          }
        ],
        usage: 'Used to express assumption or probability',
        level: 'intermediate'
      }
    ],
    advanced: [
      {
        id: 'adv-1',
        korean: '-(으)ㄴ/는 바에야',
        english: 'If one is going to do / Rather than',
        structure: 'Verb stem + (으)ㄴ/는 바에야',
        examples: [
          {
            korean: '하는 바에야 제대로 하자.',
            english: 'If we\'re going to do it, let\'s do it properly.',
            romanization: 'Haneun baeya jedaero haja.'
          }
        ],
        usage: 'Used to express determination or preference',
        level: 'advanced'
      }
    ]
  };

  const currentGrammarPoints = grammarData[level];

  const levelInfo = {
    beginner: {
      korean: '초급관',
      english: 'Beginner Hall',
      color: 'from-green-400 to-emerald-600',
      bgColor: 'bg-green-500/20',
      emoji: '🌱'
    },
    intermediate: {
      korean: '중급관',
      english: 'Intermediate Hall',
      color: 'from-blue-400 to-cyan-600',
      bgColor: 'bg-blue-500/20',
      emoji: '⚡'
    },
    advanced: {
      korean: '고급관',
      english: 'Advanced Hall',
      color: 'from-purple-400 to-pink-600',
      bgColor: 'bg-purple-500/20',
      emoji: '👑'
    }
  };

  const handleGrammarSelect = (grammar: GrammarPoint) => {
    setSelectedGrammar(grammar);
    setCurrentExample(0);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000);
  };

  const handleSave = (grammar: GrammarPoint) => {
    onSaveGrammar(grammar);
    // Show success animation
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000);
  };

  const playExample = () => {
    // In a real app, this would use text-to-speech
    console.log('Playing audio for:', selectedGrammar?.examples[currentExample].korean);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen p-4"
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
          <span className="korean-text">전시관으로</span>
        </motion.button>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenNotebook}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            <Notebook className="w-5 h-5" />
            <span className="korean-text">노트</span>
          </motion.button>
        </div>
      </div>

      {/* Room Title */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-4xl">{levelInfo[level].emoji}</span>
          <h1 className="text-3xl md:text-5xl font-bold korean-text text-white">
            {levelInfo[level].korean}
          </h1>
        </div>
        <p className="text-xl english-text text-blue-200">
          {levelInfo[level].english}
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Grammar Points List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold korean-text text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            문법 전시품
          </h2>
          
          {currentGrammarPoints.map((grammar, index) => (
            <motion.div
              key={grammar.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
              onClick={() => handleGrammarSelect(grammar)}
              className={`${levelInfo[level].bgColor} border border-white/20 rounded-xl p-6 cursor-pointer backdrop-blur-sm hover:backdrop-blur-md transition-all duration-300 group ${
                selectedGrammar?.id === grammar.id ? 'ring-2 ring-white/50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold korean-text text-white mb-2 group-hover:scale-105 transition-transform">
                    {grammar.korean}
                  </h3>
                  <p className="english-text text-blue-200 mb-2">
                    {grammar.english}
                  </p>
                  <p className="text-sm text-white/60 font-mono">
                    {grammar.structure}
                  </p>
                </div>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl"
                >
                  🎨
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Grammar Detail Panel */}
        <div className="lg:sticky lg:top-4">
          <AnimatePresence mode="wait">
            {selectedGrammar ? (
              <motion.div
                key={selectedGrammar.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              >
                {/* Grammar Title */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold korean-text text-white mb-2">
                      {selectedGrammar.korean}
                    </h3>
                    <p className="english-text text-blue-200">
                      {selectedGrammar.english}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSave(selectedGrammar)}
                    className="bg-korean-red/20 hover:bg-korean-red/30 p-3 rounded-full border border-korean-red/50 transition-colors"
                  >
                    <Save className="w-5 h-5 text-korean-red" />
                  </motion.button>
                </div>

                {/* Structure */}
                <div className="mb-6">
                  <h4 className="korean-text text-white font-semibold mb-2">구조:</h4>
                  <p className="font-mono text-yellow-300 bg-black/20 p-3 rounded-lg">
                    {selectedGrammar.structure}
                  </p>
                </div>

                {/* Usage */}
                <div className="mb-6">
                  <h4 className="korean-text text-white font-semibold mb-2">사용법:</h4>
                  <p className="text-blue-200">
                    {selectedGrammar.usage}
                  </p>
                </div>

                {/* Examples */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="korean-text text-white font-semibold">예문:</h4>
                    <div className="flex gap-2">
                      {selectedGrammar.examples.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentExample(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            currentExample === index ? 'bg-white' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentExample}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-black/20 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <p className="korean-text text-white text-lg font-medium">
                          {selectedGrammar.examples[currentExample].korean}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={playExample}
                          className="text-blue-300 hover:text-blue-200 transition-colors"
                        >
                          <Volume2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                      <p className="english-text text-blue-200 mb-2">
                        {selectedGrammar.examples[currentExample].english}
                      </p>
                      <p className="text-sm text-white/60 font-mono">
                        {selectedGrammar.examples[currentExample].romanization}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Interactive Elements */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={playExample}
                    className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 px-4 py-2 rounded-lg border border-blue-400/50 text-blue-300 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    <span className="korean-text">발음 듣기</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-yellow-500/20 hover:bg-yellow-500/30 px-4 py-2 rounded-lg border border-yellow-400/50 text-yellow-300 transition-colors"
                  >
                    <Star className="w-4 h-4" />
                    <span className="korean-text">퀴즈</span>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
              >
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="korean-text text-white text-xl mb-2">
                  전시품을 선택해주세요
                </h3>
                <p className="english-text text-blue-300">
                  Select an exhibition piece to explore
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Success Animation */}
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <div className="bg-korean-red/90 backdrop-blur-sm rounded-full p-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="text-4xl text-white"
              >
                ✨
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GrammarRooms;