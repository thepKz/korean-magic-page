import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Save, Volume2, ChevronLeft, ChevronRight, Target, Shuffle, Edit3, Trophy, Clock, CheckCircle, XCircle, RotateCcw, Zap, Brain, GamepadIcon } from 'lucide-react';
import { GrammarLevel, GrammarPoint } from '../types/grammar';

interface GrammarRoomsProps {
  level: GrammarLevel;
  onBack: () => void;
  onSaveGrammar: (grammar: GrammarPoint) => void;
  onOpenNotebook: () => void;
}

type QuizType = 'translation' | 'fill-blank' | 'multiple-choice' | 'sentence-order' | 'grammar-match' | 'usage-context';

interface QuizQuestion {
  type: QuizType;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  grammarPoint: string;
}

const GrammarRooms: React.FC<GrammarRoomsProps> = ({ 
  level, 
  onBack, 
  onSaveGrammar, 
  onOpenNotebook 
}) => {
  const [selectedGrammar, setSelectedGrammar] = useState<GrammarPoint | null>(null);
  const [currentExample, setCurrentExample] = useState(0);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizResult, setQuizResult] = useState<'correct' | 'incorrect' | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion | null>(null);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [quizStreak, setQuizStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [selectedQuizType, setSelectedQuizType] = useState<QuizType>('translation');

  // Complete TOPIK 3 grammar data with enhanced examples
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
        korean: 'N 밖에 + 부정',
        english: 'Only / Nothing but',
        structure: 'Noun + 밖에 + negative verb',
        examples: [
          {
            korean: '오빠밖에 사랑하지 않아요.',
            english: 'I only love my older brother.',
            romanization: 'Oppabakke saranghaji anayo.'
          },
          {
            korean: '물밖에 마시지 않아요.',
            english: 'I only drink water.',
            romanization: 'Mulbakke masiji anayo.'
          }
        ],
        usage: 'Used to express "only" or "nothing but" with negative verbs',
        level: 'intermediate'
      },
      {
        id: 'int-2',
        korean: 'N(이)라고 하다',
        english: 'To be called / To say that',
        structure: 'Noun + (이)라고 하다',
        examples: [
          {
            korean: '한국어를 베트남말로 띠엔 한이라고 해요.',
            english: 'Korean is called "Tieng Han" in Vietnamese.',
            romanization: 'Hangugeoreul beteunamallo ttien hanirago haeyo.'
          },
          {
            korean: '이 음식을 김치라고 해요.',
            english: 'This food is called kimchi.',
            romanization: 'I eumsigeul gimchirago haeyo.'
          }
        ],
        usage: 'Used to say what something is called or to quote what someone said',
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

  // Timer effect
  useEffect(() => {
    let interval: number;
    if (isTimerActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleQuizTimeout();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const handleGrammarSelect = (grammar: GrammarPoint) => {
    setSelectedGrammar(grammar);
    setCurrentExample(0);
    setShowQuiz(false);
    setQuizResult(null);
    setQuizAnswer('');
    setCurrentQuiz(null);
  };

  const handleSave = (grammar: GrammarPoint) => {
    onSaveGrammar(grammar);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
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

  const nextExample = () => {
    if (selectedGrammar && currentExample < selectedGrammar.examples.length - 1) {
      setCurrentExample(currentExample + 1);
    }
  };

  const prevExample = () => {
    if (currentExample > 0) {
      setCurrentExample(currentExample - 1);
    }
  };

  const handleQuizTimeout = () => {
    setIsTimerActive(false);
    setQuizResult('incorrect');
    setQuizScore(prev => ({
      correct: prev.correct,
      total: prev.total + 1
    }));
    setQuizStreak(0);
    
    setTimeout(() => {
      setQuizResult(null);
      setQuizAnswer('');
      setShowQuiz(false);
      setCurrentQuiz(null);
    }, 2000);
  };

  const getRandomGrammar = () => {
    const randomIndex = Math.floor(Math.random() * currentGrammarPoints.length);
    handleGrammarSelect(currentGrammarPoints[randomIndex]);
  };

  const resetQuizStats = () => {
    setQuizScore({ correct: 0, total: 0 });
    setQuizStreak(0);
  };

  const levelInfo = {
    beginner: { korean: '초급', english: 'Beginner' },
    intermediate: { korean: '중급', english: 'Intermediate' },
    advanced: { korean: '고급', english: 'Advanced' }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
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
          <h1 className="text-2xl font-light korean-text text-white">
            {levelInfo[level].korean}
          </h1>
          <p className="text-sm english-text text-gray-400">
            {levelInfo[level].english}
            {level === 'intermediate' && ' • TOPIK 3급'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Quiz Stats */}
          {quizScore.total > 0 && (
            <div className="flex items-center gap-2 bg-emerald-500/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-emerald-400/20">
              <Trophy className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm">
                {quizScore.correct}/{quizScore.total}
              </span>
              {quizStreak > 0 && (
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span className="text-yellow-300 text-xs">{quizStreak}</span>
                </div>
              )}
            </div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={getRandomGrammar}
            className="flex items-center gap-2 bg-purple-500/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-purple-400/20 text-purple-300 hover:text-purple-200 hover:bg-purple-500/20 transition-all"
          >
            <Shuffle className="w-4 h-4" />
            <span className="korean-text text-sm">랜덤</span>
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
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Grammar List */}
        <div className="lg:col-span-2">
          <div className="max-h-[75vh] overflow-y-auto space-y-3 pr-2">
            {currentGrammarPoints.map((grammar, index) => (
              <motion.div
                key={grammar.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ x: 5 }}
                onClick={() => handleGrammarSelect(grammar)}
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedGrammar?.id === grammar.id ? 'border-white/30 bg-white/10' : 'hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="korean-text text-white font-medium mb-1">
                      {grammar.korean}
                    </h3>
                    <p className="english-text text-gray-400 text-sm">
                      {grammar.english}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 ml-2">
                    #{index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grammar Detail */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {selectedGrammar ? (
              <motion.div
                key={selectedGrammar.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-light korean-text text-white mb-2">
                      {selectedGrammar.korean}
                    </h2>
                    <p className="english-text text-gray-300 text-lg">
                      {selectedGrammar.english}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSave(selectedGrammar)}
                    className="bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/20 transition-colors"
                  >
                    <Save className="w-5 h-5 text-white" />
                  </motion.button>
                </div>

                {/* Structure */}
                <div className="mb-8">
                  <h3 className="korean-text text-white font-medium mb-3">구조</h3>
                  <div className="bg-black/20 rounded-lg p-4">
                    <code className="text-yellow-300 font-mono">
                      {selectedGrammar.structure}
                    </code>
                  </div>
                </div>

                {/* Usage */}
                <div className="mb-8">
                  <h3 className="korean-text text-white font-medium mb-3">사용법</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedGrammar.usage}
                  </p>
                </div>

                {/* Examples */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="korean-text text-white font-medium">예문</h3>
                    {selectedGrammar.examples.length > 1 && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={prevExample}
                          disabled={currentExample === 0}
                          className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm text-gray-400">
                          {currentExample + 1} / {selectedGrammar.examples.length}
                        </span>
                        <button
                          onClick={nextExample}
                          disabled={currentExample === selectedGrammar.examples.length - 1}
                          className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentExample}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-black/20 rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <p className="korean-text text-white text-xl font-medium leading-relaxed">
                          {selectedGrammar.examples[currentExample].korean}
                        </p>
                        <button className="text-gray-400 hover:text-white transition-colors ml-4">
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="english-text text-gray-300 mb-2 text-lg">
                        {selectedGrammar.examples[currentExample].english}
                      </p>
                      <p className="text-gray-500 font-mono text-sm">
                        {selectedGrammar.examples[currentExample].romanization}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Other Interactive Features */}
                <div className="flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 px-4 py-2 rounded-lg border border-green-400/20 text-green-300 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="korean-text">발음</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 px-4 py-2 rounded-lg border border-orange-400/20 text-orange-300 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="korean-text">문장 만들기</span>
                  </motion.button>

                  {quizScore.total > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetQuizStats}
                      className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-lg border border-red-400/20 text-red-300 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span className="korean-text">초기화</span>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 text-center"
              >
                <div className="text-gray-500 mb-4">
                  <BookOpen className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="korean-text text-white text-xl mb-2">
                  문법을 선택하세요
                </h3>
                <p className="english-text text-gray-400 mb-6">
                  Select a grammar point to study
                </p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white">{currentGrammarPoints.length}</div>
                    <div className="text-sm text-gray-400 korean-text">총 문법</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl font-bold text-emerald-400">{quizScore.correct}</div>
                    <div className="text-sm text-gray-400 korean-text">정답 수</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-400">{quizStreak}</div>
                    <div className="text-sm text-gray-400 korean-text">연속 정답</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Save Success Animation */}
      <AnimatePresence>
        {showSaveSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-8 right-8 bg-emerald-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            <p className="korean-text font-medium">저장되었습니다! ✨</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GrammarRooms;